// Generates the Altinn landscape drawings (draw.io SVGs) from the source code of the Altinn repositories.
// See README.md in this folder for how to run it.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const arg = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
// Folder that holds the cloned Altinn repositories side by side (default: the parent of this docs repo)
const REPOS = path.resolve(arg('--repos') || process.env.ALTINN_REPOS || path.join(__dirname, '..', '..', '..'));
const FETCH = process.argv.includes('--fetch');
const OUT = path.resolve(__dirname, '..', '..', 'content', 'technology', 'architecture', 'altinn-landscape', 'altinn_super_detailed.drawio.svg');
const MARKS = {};

// File list of origin/main in a local clone. The working tree is never read, so local branches do not matter.
const TREES = {};
function gitTree(repo) {
  if (TREES[repo]) return TREES[repo];
  const dir = path.join(REPOS, repo);
  if (!fs.existsSync(dir)) throw new Error(`Missing repository ${dir}. Clone https://github.com/Altinn/${repo}.git into ${REPOS}.`);
  const branch = execFileSync('git', ['-C', dir, 'symbolic-ref', '--short', 'refs/remotes/origin/HEAD'], { encoding: 'utf8' }).trim().replace(/^origin\//, '');
  if (FETCH) execFileSync('git', ['-C', dir, 'fetch', '--quiet', 'origin', branch], { stdio: 'inherit' });
  const list = execFileSync('git', ['-C', dir, 'ls-tree', '-r', '--name-only', 'origin/' + branch], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  const files = list.split('\n').filter(Boolean);
  TREES[repo] = { files, set: new Set(files), dirs: new Set(files.flatMap(f => f.split('/').slice(0, -1).map((_, i, a) => a.slice(0, i + 1).join('/')))) };
  return TREES[repo];
}
const inTree = (repo, p) => { const t = gitTree(repo); return t.set.has(p) ? 'blob' : t.dirs.has(p) ? 'tree' : null; };
const AM_PREFIX = 'src/apps/Altinn.AccessManagement/src/';
const GH = 'https://github.com/Altinn/altinn-auth/blob/main/src/apps/Altinn.AccessManagement/src/';
const GHTREE = 'https://github.com/Altinn/altinn-auth/tree/main/src/apps/Altinn.AccessManagement/src/';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- source index ----------
const files = gitTree('altinn-auth').files
  .filter(f => f.startsWith(AM_PREFIX) && f.endsWith('.cs') && !/\/(bin|obj|Migrations)\//.test(f))
  .map(f => f.slice(AM_PREFIX.length));
const unresolved = [];
function find(file, prefer = []) {
  const hits = files.filter(f => f.endsWith('/' + file));
  if (!hits.length) return null;
  for (const p of prefer) { const h = hits.find(f => f.startsWith(p) || f.includes(p)); if (h) return h; }
  return hits[0];
}
const HOSTPROJ = {
  Enduser: 'Altinn.AccessManagement.Api.Enduser/', ServiceOwner: 'Altinn.AccessManagement.Api.ServiceOwner/',
  Internal: 'Altinn.AccessManagement.Api.Internal/', Enterprise: 'Altinn.AccessManagement.Api.Enterprise/',
  Maskinporten: 'Altinn.AccessManagement.Api.Maskinporten/', Metadata: 'Altinn.AccessManagement.Api.Metadata/',
  'Legacy host': 'Altinn.AccessManagement/', ResourceOwner: 'Altinn.AccessManagement/',
};
function link(layer, text) {
  let t = text.replace(/^[(=]\s*|\)$/g, '').trim();
  let rel = null;
  if (layer === 'api') {
    const m = t.match(/^(.+?) · ([\w/]+)/);
    if (m) {
      const proj = HOSTPROJ[m[1]];
      const name = m[2].split('/').pop() + 'Controller.cs';
      const hits = files.filter(f => f.startsWith(proj) && f.endsWith('/' + name) && (!m[2].includes('/') || f.includes('/' + m[2].split('/')[0] + '/')));
      rel = hits[0];
    }
  } else if (layer === 'svc') {
    if (t.startsWith('PAP')) rel = find('PolicyAdministrationPoint.cs');
    else rel = find(t.split(/[ /]/)[0] + '.cs', ['Altinn.AccessMgmt.Core/', 'Altinn.AccessManagement.Core/']);
  } else if (layer === 'evt') {
    rel = find(t.split(/[ /]/)[0].replace(/(Pending|Reviewed)$/, '$1') + 'Notification.cs', ['Altinn.AccessMgmt.Core/Notifications']);
  } else if (layer === 'data') {
    if (t.startsWith('consent.')) rel = find('ConsentRepository.cs');
    else if (t.startsWith('delegation.')) rel = find('DelegationMetadataEF.cs');
    else if (t.startsWith('Blob')) rel = find('PolicyRepository.cs');
    else if (t.startsWith('Connection')) rel = find('Connection.cs', ['Altinn.AccessMgmt.PersistenceEF/Models']);
    else rel = find(t.split(/[ /(]/)[0] + '.cs', ['Altinn.AccessMgmt.PersistenceEF/Models']);
  }
  if (!rel) { unresolved.push(`${layer}: ${text}`); return null; }
  return GH + rel;
}

// ---------- content per sub-module ----------
const COLS = [
  { name: 'Connections', home: 'ConnectionService.cs',
    api: ['Enduser · Connections', 'ServiceOwner · Connections', 'Internal · InternalConnections'],
    svc: ['ConnectionService', 'ServiceOwnerConnectionService'],
    evt: ['RightholderAdded / Removed', 'AgentAdded / Removed'],
    data: ['Connection (read model)', '= Assignment ∪ Delegation'] },
  { name: 'Assignments & Roles', home: 'AssignmentService.cs',
    api: ['Metadata · Roles', '(writes via Connections)'],
    svc: ['AssignmentService', 'RoleService'],
    evt: [],
    data: ['Assignment', 'AssignmentPackage', 'AssignmentResource', 'Role / RoleMap', 'RolePackage / RoleResource', 'A2ClientRole'] },
  { name: 'Delegation', home: 'DelegationService.cs',
    api: ['Enduser · Connections', '(packages / resources)'],
    svc: ['DelegationService'],
    evt: ['AccessAdded / Removed'],
    data: ['Delegation', 'DelegationPackage', 'DelegationResource'] },
  { name: 'Client Admin', home: 'ClientDelegationService.cs',
    api: ['Enduser · ClientDelegation', 'Enduser · V2/ClientDelegation', 'Internal · SystemUserClientDelegation'],
    svc: ['ClientDelegationService'],
    evt: ['ClientAdded / Removed'],
    data: ['Delegation (client → agent)', 'A2ClientRole'] },
  { name: 'Requests', home: 'RequestService.cs',
    api: ['Enduser · Request', 'ServiceOwner · Request'],
    svc: ['RequestService', 'DelegationRequestService (A2)'],
    evt: ['RequestPending', 'RequestReviewed'],
    data: ['RequestAssignment', 'RequestAssignmentPackage', 'RequestAssignmentResource'] },
  { name: 'Consent', home: 'ConsentService.cs',
    api: ['Enterprise · Consent', 'Maskinporten · Consent', 'Internal · Bff/Consent'],
    svc: ['ConsentService', 'ConsentDelegationCheckService'],
    evt: [],
    data: ['consent.consentrequest', 'consent.consentright', 'consent.consentevent', 'consent.context', 'consent.metadata', 'consent.resourceattribute'] },
  { name: 'Maskinporten Delegation', home: 'MaskinportenSupplierService.cs',
    api: ['Enduser · MaskinportenSuppliers', 'Enduser · MaskinportenConsumers', 'ServiceOwner · MaskinportenDelegations'],
    svc: ['MaskinportenSupplierService', 'MaskinportenDelegationLookupService'],
    evt: [],
    data: ['Assignment (role: Supplier)', 'AssignmentResource (scope)'] },
  { name: 'Authorized Parties', home: 'AuthorizedPartiesServiceEf.cs',
    api: ['Enduser · AuthorizedParties', 'ServiceOwner · AuthorizedParties', 'Legacy host · InternalAuthorizedParties'],
    svc: ['AuthorizedPartiesServiceEf', 'AuthorizedPartyRepoServiceEf'],
    evt: [],
    data: ['Connection (read model)', 'EntityLookup', 'delegation.delegationchanges'] },
  { name: 'Instance & Legacy Rights', home: 'SingleRightsService.cs',
    api: ['ResourceOwner · AppsInstanceDelegation', 'Legacy host · PolicyInformationPoint', 'Internal · Bff/IdPortenAuthorization'],
    svc: ['AppsInstanceDelegationService', 'SingleRightsService', 'PAP · PIP · PRP', 'ContextRetrievalService', 'ResourceAdministrationPoint', 'IdPortenAuthorizationService'],
    evt: ['InstanceAdded / Removed'],
    data: ['AssignmentInstance', 'delegation.delegationchanges', 'delegation.ResourceRegistryDelegationChanges', 'Blob · XACML policies'] },
  { name: 'Metadata', home: 'PackageService.cs',
    api: ['Metadata · Packages', 'Metadata · Types', 'Internal · Party'],
    svc: ['PackageService', 'ResourceService', 'ProviderService', 'EntityService', 'PartyService', 'AMPartyService', 'UserProfileLookupService'],
    evt: [],
    data: ['Package / PackageResource', 'Area / AreaGroup', 'Resource / ResourceType', 'Provider / ProviderType', 'Entity / EntityType', 'EntityVariant / VariantRole', 'EntityLookup'] },
];
const C = Object.fromEntries(COLS.map((c, i) => [c.name, i]));

// Module dependencies, derived from constructor injection / DbContext usage in AccessMgmt.Core + AccessManagement.Core
// [from, to, label, fromService?]
const ARROWS = false;
const DEPS_ALL = [
  ['Connections', 'Assignments & Roles', 'writes Assignment*'],
  ['Connections', 'Instance & Legacy Rights', 'ISingleRightsService, IPolicyRetrievalPoint'],
  ['Connections', 'Metadata', 'IAMPartyService'],
  ['Assignments & Roles', 'Instance & Legacy Rights', 'IPolicyRetrievalPoint'],
  ['Delegation', 'Assignments & Roles', 'IAssignmentService, IRoleService'],
  ['Delegation', 'Metadata', 'IPackageService, IEntityService'],
  ['Client Admin', 'Delegation', 'writes Delegation*'],
  ['Client Admin', 'Assignments & Roles', 'reads/writes Assignment*'],
  ['Requests', 'Assignments & Roles', 'on approve: IAssignmentService'],
  ['Requests', 'Connections', 'on approve: IConnectionService'],
  ['Consent', 'Connections', 'ConsentDelegationCheck → IConnectionService'],
  ['Consent', 'Metadata', 'IAMPartyService'],
  ['Maskinporten Delegation', 'Connections', 'IConnectionService'],
  ['Maskinporten Delegation', 'Instance & Legacy Rights', 'ISingleRightsService, RAP'],
  ['Authorized Parties', 'Connections', 'ConnectionQuery (read model)'],
  ['Authorized Parties', 'Instance & Legacy Rights', 'IContextRetrievalService'],
  ['Instance & Legacy Rights', 'Metadata', 'IAMPartyService'],
];
const DEPS = ARROWS ? DEPS_ALL : [];

// ---------- layout ----------
const FX = 40, FY = 240, COL0 = 150, STEP = 160, CW = 140, NCOL = COLS.length;
const FW = COL0 + (NCOL - 1) * STEP + CW + 30 - FX;
const colX = i => COL0 + i * STEP;
const CY = 290, HEAD = 40, ITEM = 22, PITCH = 26;
const maxItems = k => Math.max(...COLS.map(c => (c[k] || []).length));
const LAYERS = [];
let y = 340;
const mk = (key, name, fill, stroke, band, h) => { const L = { key, name, y, h, fill, stroke, band }; LAYERS.push(L); y += h + 8; return L; };
mk('api', 'API layer\n(controllers per host)', '#dae8fc', '#6c8ebf', '#f3f7fd', maxItems('api') * PITCH + 10);
const SVC = mk('svc', 'Domain services\n(Core)', '#d5e8d4', '#82b366', '#f4faf3', maxItems('svc') * PITCH + 10);

// lane assignment for dependency arrows (greedy interval packing, shortest first)
const edges = DEPS.map(([f, t, label]) => ({ f: C[f], t: C[t], label }));
edges.forEach(e => { e.lo = Math.min(e.f, e.t); e.hi = Math.max(e.f, e.t); });
const lanes = [];
[...edges].sort((a, b) => (a.hi - a.lo) - (b.hi - b.lo) || a.lo - b.lo).forEach(e => {
  let k = lanes.findIndex(l => l.every(o => e.hi < o.lo || e.lo > o.hi));
  if (k < 0) { k = lanes.length; lanes.push([]); }
  lanes[k].push(e); e.lane = k;
});
const LANEH = 18;
const DEP = !ARROWS ? { key: 'deps', y: y - 8, h: 0 } : { key: 'deps', name: 'Module\ndependencies\n(calls / writes)', y: y - 8 + 2, h: lanes.length * LANEH + 12, band: '#ffffff' };
y = ARROWS ? DEP.y + DEP.h + 6 : y;
mk('evt', 'Outbox events\n(notifications)', '#fff2cc', '#d6b656', '#fffbef', maxItems('evt') * PITCH + 10);
mk('data', 'Persistence\n(tables / models)', '#e1d5e7', '#9673a6', '#f8f4fa', maxItems('data') * PITCH + 10);
const COLBOTTOM = y + 2;
y = COLBOTTOM + 15;
const BARS = [
  { key: 'int', name: 'Integration clients', fill: '#f8cecc', stroke: '#b85450', band: '#fdf5f5',
    items: [['PartiesClient → Register', 'PartiesClient.cs'], ['ResourceRegistryClient', 'ResourceRegistryClient.cs'], ['ProfileClient', 'ProfileClient.cs'], ['AuthenticationClient', 'AuthenticationClient.cs'], ['AltinnRolesClient → SBL (A2)', 'AltinnRolesClient.cs'], ['DelegationRequestProxy → A2', 'DelegationRequestProxy.cs'], ['AccessListAuthorizationClient', 'AccessListAuthorizationClient.cs'], ['IdPortenAuthorizationClient', 'IdPortenAuthorizationClient.cs']] },
  { key: 'jobs', name: 'Background jobs\n(HostedServices)', fill: '#ffe6cc', stroke: '#d79b00', band: '#fff8f0',
    items: [['PartySyncService ← Register', 'PartySyncService.cs'], ['ResourceSyncService ← Resource Registry', 'ResourceSyncService.cs'], ['RoleSyncService', 'RoleSyncService.cs'], ['OutboxHandlerJob / OutboxReaperJob', 'OutboxHandlerJob.cs'], ['Leases (Register, ResourceRegistry)', 'RegisterLease.cs'], ['RightImportProgress / ErrorQueue (A2 import)', 'RightImportProgressService.cs']] },
  { key: 'x', name: 'Cross-cutting', fill: '#f5f5f5', stroke: '#666666', band: '#fafafa',
    items: [['AuditMiddleware + Audit attributes', 'AuditMiddleware.cs'], ['Scope / PersonAccessManager authz handlers', 'ScopeConditionAuthorizationHandler.cs'], ['Validation', GHTREE + 'Altinn.AccessMgmt.Core/Validation'], ['Telemetry', GHTREE + 'Altinn.AccessMgmt.Core/Telemetry'], ['Feature flags', 'AccessMgmtFeatureFlags.cs'], ['Altinn.Authorization.Host', 'https://github.com/Altinn/altinn-auth/tree/main/src/libs/Altinn.Authorization.Host']] },
  { key: 'db', name: 'Datastores', fill: '#b1ddf0', stroke: '#10739e', band: '#f2f9fc', shape: 'cylinder', h: 54,
    items: [['PostgreSQL · dbo (AccessMgmt EF model)', 'AppDbContext.cs'], ['PostgreSQL · delegation (legacy delegation changes)', 'DelegationMetadataEF.cs'], ['PostgreSQL · consent', 'ConsentRepository.cs'], ['PostgreSQL · dbo.outboxmessage', 'OutboxMessage.cs'], ['Azure Blob Storage · XACML delegation policies', 'PolicyRepository.cs']] },
];
for (const B of BARS) { B.h = B.h || 44; B.y = y; y += B.h + 8; }
const FH = y + 8 - FY;

// ---------- cell builder ----------
const cells = [];
const svg = [];
let nextId = 100;
const st = o => Object.entries(o).map(([k, v]) => `${k}=${v}`).join(';') + ';';
function textLines(value, w, font) {
  let lines = value.split('\n');
  if (lines.length === 1 && value.length * font * 0.52 > w - 8) {
    const mid = value.length / 2;
    const closest = re => [...value.matchAll(re)].map(m => m.index + m[0].length).filter(k => k > 0 && k < value.length)
      .reduce((b, k) => Math.abs(k - mid) < Math.abs(b - mid) ? k : b, -1);
    let at = value.includes(' · ') ? value.indexOf(' · ') + 3 : closest(/ /g);
    if (at < 0) at = closest(/[._]/g);
    if (at < 0) at = closest(/(?=[A-Z])/g);
    if (at < 0) at = Math.round(mid);
    lines = [value.slice(0, at).trim(), value.slice(at).trim()];
    if (Math.max(...lines.map(l => l.length)) * font * 0.52 > w - 8) font = Math.max(7, font - 1);
  }
  return { lines, font };
}
function box({ id, value = '', x, y, w, h, style, fill = '#ffffff', stroke = '#000000', font = 11, bold = false, align = 'center', dashed = false, noFill = false, noStroke = false, rounded = false, shape, href }) {
  id = id ?? `am-${nextId++}`;
  const label = esc(esc(value).replace(/\n/g, '<br>'));
  const geo = `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>`;
  if (href) {
    cells.push(`<UserObject label="${label}" link="${esc(href)}" linkTarget="_blank" tooltip="${esc(href.replace(/^.*\/main\//, ''))}" id="${id}"><mxCell style="${esc(style)}" vertex="1" parent="1">${geo}</mxCell></UserObject>`);
  } else {
    cells.push(`<mxCell id="${id}" value="${label}" style="${esc(style)}" vertex="1" parent="1">${geo}</mxCell>`);
  }
  const g = [];
  const f = noFill ? 'none' : fill, s = noStroke ? 'none' : stroke;
  if (shape === 'cylinder') {
    const e = 6;
    g.push(`<path d="M${x},${y + e} A${w / 2},${e} 0 0 1 ${x + w},${y + e} L${x + w},${y + h - e} A${w / 2},${e} 0 0 1 ${x},${y + h - e} Z" fill="${f}" stroke="${s}"/>`);
    g.push(`<path d="M${x},${y + e} A${w / 2},${e} 0 0 0 ${x + w},${y + e}" fill="none" stroke="${s}"/>`);
  } else if (!(noFill && noStroke)) {
    g.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}"${rounded ? ' rx="4" ry="4"' : ''} fill="${f}" stroke="${s}"${dashed ? ' stroke-dasharray="4 3"' : ''}/>`);
  }
  if (value) {
    const r = textLines(value, w, font);
    const lh = r.font * 1.15;
    const ty = y + h / 2 - ((r.lines.length - 1) * lh) / 2 + r.font * 0.35;
    const tx = align === 'left' ? x + 6 : x + w / 2;
    r.lines.forEach((ln, i) => g.push(`<text x="${tx}" y="${ty + i * lh}" font-family="Helvetica" font-size="${r.font}px" text-anchor="${align === 'left' ? 'start' : 'middle'}"${bold ? ' font-weight="bold"' : ''}${href ? ' text-decoration="none"' : ''} fill="#000000">${esc(ln)}</text>`));
  }
  svg.push(href ? `<a xlink:href="${esc(href)}" href="${esc(href)}" target="_blank"><title>${esc(href.replace(/^.*\/main\//, ''))}</title>${g.join('')}</a>` : g.join(''));
  return id;
}
function edge({ src, tgt, pts, label, exit, entry, color = '#555555', labelPos }) {
  const id = `am-e${nextId++}`;
  const style = st({ endArrow: 'block', endFill: 1, html: 1, rounded: 0, fontSize: 8, labelBackgroundColor: '#ffffff', strokeColor: color, fontColor: '#333333',
    exitX: exit[0], exitY: exit[1], exitDx: 0, exitDy: 0, entryX: entry[0], entryY: entry[1], entryDx: 0, entryDy: 0 });
  const inner = pts.slice(1, -1).map(p => `<mxPoint x="${p[0]}" y="${p[1]}"/>`).join('');
  let L = 0; const seg = [];
  for (let i = 1; i < pts.length; i++) { const d = Math.abs(pts[i][0] - pts[i - 1][0]) + Math.abs(pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  const lx = labelPos ?? 0;
  cells.push(`<mxCell id="${id}" value="${esc(esc(label || ''))}" style="${esc(style)}" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry x="${lx.rel ?? 0}" relative="1" as="geometry"><Array as="points">${inner}</Array></mxGeometry></mxCell>`);
  const d = 'M' + pts.map(p => p.join(',')).join(' L');
  const [ax, ay] = pts[pts.length - 1], [bx, by] = pts[pts.length - 2];
  const ang = Math.atan2(ay - by, ax - bx), a = 7, sp = 0.4;
  svg.push(`<path d="${d}" fill="none" stroke="${color}"/>`);
  svg.push(`<path d="M${ax},${ay} L${ax - a * Math.cos(ang - sp)},${ay - a * Math.sin(ang - sp)} L${ax - a * Math.cos(ang + sp)},${ay - a * Math.sin(ang + sp)} Z" fill="${color}" stroke="${color}"/>`);
  if (label && lx.at) {
    const [tx, ty] = lx.at, w = label.length * 4.3 + 6;
    svg.push(`<rect x="${tx - w / 2}" y="${ty - 6}" width="${w}" height="11" fill="#ffffff"/><text x="${tx}" y="${ty + 3}" font-family="Helvetica" font-size="8px" text-anchor="middle" fill="#333333">${esc(label)}</text>`);
  }
}

// frame + title (user's id 2 kept)
box({ id: '2', x: FX, y: FY, w: FW, h: FH, style: 'rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;' });
box({ x: FX + 10, y: FY + 8, w: 900, h: 30, value: 'Access Management  ·  altinn-auth/src/apps/Altinn.AccessManagement', font: 16, bold: true, align: 'left',
  href: 'https://github.com/Altinn/altinn-auth/tree/main/src/apps/Altinn.AccessManagement',
  style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=16;fontStyle=1;', noFill: true, noStroke: true });
box({ x: FX + FW - 430, y: FY + 8, w: 420, h: 30, value: 'Every box links to its source file on GitHub', font: 10, align: 'left',
  style: 'text;whiteSpace=wrap;html=1;align=right;verticalAlign=middle;fontSize=10;fontColor=#666666;', noFill: true, noStroke: true });

// bands + gutter labels
const bandId = {};
for (const L of [...LAYERS, ...(ARROWS ? [DEP] : []), ...BARS]) {
  bandId[L.key] = box({ x: FX + 1, y: L.y, w: FW - 2, h: L.h, style: st({ rounded: 0, whiteSpace: 'wrap', html: 1, fillColor: L.band, strokeColor: 'none' }), fill: L.band, noStroke: true });
  box({ x: FX + 4, y: L.y, w: 102, h: L.h, value: L.name, font: 10, bold: true, align: 'left',
    style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=10;fontStyle=1;spacingLeft=4;', noFill: true, noStroke: true });
}

// columns (user's ids kept for the first three)
const keepCol = [['4', '7'], ['6', '8'], ['9', '10']];
const lastSvc = [];
COLS.forEach((c, i) => {
  const x = colX(i);
  const [rid, hid] = keepCol[i] || [];
  box({ id: rid, x, y: CY, w: CW, h: COLBOTTOM - CY, style: 'rounded=0;whiteSpace=wrap;html=1;fillColor=none;', noFill: true });
  const home = find(c.home, ['Altinn.AccessMgmt.Core/', 'Altinn.AccessManagement.Core/']);
  box({ id: hid, x, y: CY, w: CW, h: HEAD, value: c.name, font: 12, bold: true, href: home && GH + home,
    style: 'text;whiteSpace=wrap;html=1;align=center;verticalAlign=middle;fontSize=12;fontStyle=1;', noFill: true, noStroke: true });
  for (const L of LAYERS) {
    (c[L.key] || []).forEach((t, j) => {
      const note = /^[(=]/.test(t);
      const by = L.y + 6 + j * PITCH;
      const id = box({ x: x + 5, y: by, w: CW - 10, h: ITEM, value: t, font: 9, rounded: true,
        fill: note ? '#ffffff' : L.fill, stroke: L.stroke, dashed: note, href: note ? null : link(L.key, t),
        style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 9, fillColor: note ? '#ffffff' : L.fill, strokeColor: L.stroke, dashed: note ? 1 : 0 }) });
      if (L.key === 'svc') { lastSvc[i] = { id, y: by + ITEM, x: x + 5, w: CW - 10 }; if (t === 'ContextRetrievalService') c.ctx = { id, y: by, x: x + 5, w: CW - 10 }; }
    });
  }
});

// bars
const barBox = {};
for (const B of BARS) {
  const n = B.items.length, gap = 8;
  const w = (NCOL * STEP - 20 - gap * (n - 1)) / n;
  B.items.forEach(([t, file], j) => {
    const x = Math.round(COL0 + j * (w + gap)), yy = B.y + 6, h = B.h - 12;
    const href = file.startsWith('http') ? file : (find(file) ? GH + find(file) : (unresolved.push('bar: ' + t), null));
    const id = box({ x, y: yy, w: Math.round(w), h, value: t, font: 9, rounded: B.shape !== 'cylinder', fill: B.fill, stroke: B.stroke, shape: B.shape, href,
      style: B.shape === 'cylinder'
        ? st({ shape: 'cylinder3', whiteSpace: 'wrap', html: 1, boundedLbl: 1, backgroundOutline: 1, size: 6, fontSize: 9, fillColor: B.fill, strokeColor: B.stroke })
        : st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 9, fillColor: B.fill, strokeColor: B.stroke }) });
    (barBox[B.key] ||= []).push({ id, x, y: yy, w: Math.round(w), h });
  });
}

// dependency arrows: exit bottom of source column's service stack, run in a lane, enter bottom of target stack
const ports = {}; // column -> endpoints
edges.forEach(e => { (ports[e.f] ||= []).push({ e, end: 'f', other: e.t }); (ports[e.t] ||= []).push({ e, end: 't', other: e.f }); });
for (const [col, list] of Object.entries(ports)) {
  const s = lastSvc[col];
  list.sort((a, b) => a.other - b.other || (a.end === 'f' ? -1 : 1));
  list.forEach((p, k) => { p.e[p.end + 'x'] = Math.round(s.x + (s.w * (k + 1)) / (list.length + 1)); });
}
const PALETTE = ['#1f5f99', '#2e7d32', '#8e44ad', '#c0392b', '#d35400', '#16a085', '#7f8c8d', '#b7950b'];
edges.forEach((e, n) => {
  const s = lastSvc[e.f], t = lastSvc[e.t];
  const ly = DEP.y + 12 + e.lane * LANEH;
  const pts = [[e.fx, s.y], [e.fx, ly], [e.tx, ly], [e.tx, t.y]];
  const v1 = ly - s.y, h = Math.abs(e.tx - e.fx), L = v1 + h + (ly - t.y);
  edge({ src: s.id, tgt: t.id, pts, label: e.label, color: PALETTE[n % PALETTE.length],
    exit: [((e.fx - s.x) / s.w).toFixed(3), 1], entry: [((e.tx - t.x) / t.w).toFixed(3), 1],
    labelPos: { rel: (2 * (v1 + h / 2) / L - 1).toFixed(3), at: [(e.fx + e.tx) / 2, ly] } });
});

// ContextRetrievalService -> integration clients (via gutter right of its column)
if (ARROWS) {
  const ci = C['Instance & Legacy Rights'], c = COLS[ci].ctx, gx = colX(ci) + CW + 10;
  const int = BARS.find(b => b.key === 'int');
  const pts = [[c.x + c.w, c.y + ITEM / 2], [gx, c.y + ITEM / 2], [gx, int.y]];
  edge({ src: c.id, tgt: bandId.int, pts, label: 'Register, Profile, Authentication, RR, SBL', color: '#b85450',
    exit: [1, 0.5], entry: [((gx - FX - 1) / (FW - 2)).toFixed(4), 0],
    labelPos: { rel: 0.6, at: null } });
  svg.push(`<g transform="translate(${gx + 4},${COLBOTTOM - 60}) rotate(90)"><text font-family="Helvetica" font-size="8px" fill="#b85450">external lookups</text></g>`);
}
// Outbox events -> OutboxHandlerJob (via frame's right gutter, outside the columns)
if (ARROWS) {
  const evt = LAYERS.find(l => l.key === 'evt'), job = barBox.jobs[3];
  const gx = colX(NCOL - 1) + CW + 12;
  const jobsBar = BARS.find(b => b.key === 'jobs');
  const ly = jobsBar.y - 4; // run in the gap between integration and jobs bars
  const pts = [[gx, evt.y + evt.h / 2], [gx, ly], [job.x + job.w / 2, ly], [job.x + job.w / 2, job.y]];
  // exit from the band edge at the right gutter
  edge({ src: bandId.evt, tgt: job.id, pts, label: 'SaveChangesWithOutboxRetry → dbo.outboxmessage', color: '#d6b656',
    exit: [((gx - FX - 1) / (FW - 2)).toFixed(4), 0.5], entry: [0.5, 0],
    labelPos: { rel: 0.2, at: [(gx + job.x + job.w / 2) / 2, ly] } });
}

// ================= Authorization (user's frame id 3) =================
const right = FX + FW;
const GHS = 'https://github.com/Altinn/altinn-auth/blob/main/src/';
const GHST = 'https://github.com/Altinn/altinn-auth/tree/main/src/';
const AZ = 'apps/Altinn.Authorization/src/Altinn.Authorization/';
const ABAC = 'pkgs/Altinn.Authorization.ABAC/src/Altinn.Authorization.ABAC/';
const PEP = 'pkgs/Altinn.Authorization.PEP/src/Altinn.Authorization.PEP/';
const azLink = p => {
  if (!p) return null;
  const kind = inTree('altinn-auth', 'src/' + p);
  if (!kind) { unresolved.push('authz: ' + p); return null; }
  return (kind === 'tree' ? GHST : GHS) + p;
};
const S = AZ + 'Services/Implementation/';
const AZCOLS = [
  { name: 'Decision (PDP)', home: AZ + 'Controllers/DecisionController.cs',
    api: [['Decision · authorize (internal)', AZ + 'Controllers/DecisionController.cs'], ['Decision · decision (external)', AZ + 'Controllers/DecisionController.cs']],
    svc: [['PolicyDecisionPoint (ABAC)', ABAC + 'PolicyDecisionPoint.cs'], ['RuleCombiner / RuleDecision', ABAC + 'RuleCombiner.cs'], ['XACML 3.0 model + JSON profile', ABAC + 'Xacml'], ['PdpCallerHelper', AZ + 'Helpers/PdpCallerHelper.cs']],
    cli: [], data: [] },
  { name: 'Context (PIP)', home: S + 'ContextHandler.cs',
    api: [],
    svc: [['ContextHandler', S + 'ContextHandler.cs'], ['DelegationContextHandler', S + 'DelegationContextHandler.cs'], ['PolicyInformationPoint', S + 'PolicyInformationPoint.cs'], ['ProfileWrapper', S + 'ProfileWrapper.cs'], ['OedRoleAssignmentWrapper', S + 'OedRoleAssignmentWrapper.cs']],
    cli: [['RolesClient → SBL Bridge (A2 roles)', AZ + 'Clients/RolesClient.cs'], ['RegisterService → Register', S + 'RegisterService.cs'], ['ProfileClient → Profile', AZ + 'Clients/ProfileClient.cs'], ['OedAuthzClient → OED (dødsbo)', AZ + 'Clients/OedAuthzClient.cs'], ['InstanceMetadataRepository → Storage', AZ + 'Repositories/InstanceMetadataRepository.cs']],
    data: [] },
  { name: 'Delegations & Access Packages', home: S + 'AccessManagementWrapper.cs',
    api: [],
    svc: [['AccessManagementWrapper', S + 'AccessManagementWrapper.cs'], ['DelegationHelper', AZ + 'Helpers/DelegationHelper.cs']],
    cli: [['AccessManagementClient → AM policyinformation/*', AZ + 'Clients/AccessManagementClient.cs']],
    data: [['DelegationMetadataRepository', AZ + 'Repositories/DelegationMetadataRepository.cs'], ['delegation.get_all_current_changes_*', AZ + 'Repositories/DelegationMetadataRepository.cs'], ['delegation.insert_delegationchange', AZ + 'Repositories/DelegationMetadataRepository.cs']] },
  { name: 'Policies (PRP / PAP)', home: S + 'PolicyRetrievalPoint.cs',
    api: [['Policy · GetPolicies', AZ + 'Controllers/PolicyController.cs'], ['Policy · WritePolicy', AZ + 'Controllers/PolicyController.cs']],
    svc: [['PolicyRetrievalPoint', S + 'PolicyRetrievalPoint.cs'], ['PolicyAdministrationPoint', S + 'PolicyAdministrationPoint.cs'], ['PolicyHelper', AZ + 'Helpers/PolicyHelper.cs'], ['ServiceResourceHelper', AZ + 'Helpers/ServiceResourceHelper.cs']],
    cli: [['ResourceRegistryClient → Resource Registry', AZ + 'Clients/ResourceRegistryClient.cs']],
    data: [['PolicyRepository', AZ + 'Repositories/PolicyRepository.cs'], ['Blob · metadata (app / resource policies)', AZ + 'Repositories/PolicyRepository.cs'], ['Blob · delegations (XACML)', AZ + 'Repositories/PolicyRepository.cs']] },
  { name: 'Parties & Roles', home: AZ + 'Controllers/PartiesController.cs',
    api: [['Parties · party list', AZ + 'Controllers/PartiesController.cs'], ['Parties · validate selected party', AZ + 'Controllers/PartiesController.cs'], ['Roles · roleswithaccess', AZ + 'Controllers/RolesController.cs']],
    svc: [['RolesWrapper', S + 'RolesWrapper.cs'], ['(uses AccessManagementWrapper)', null]],
    cli: [], data: [] },
  { name: 'Access Lists', home: S + 'AccessListAuthorization.cs',
    api: [['AccessList · authorize', AZ + 'Controllers/AccessListAuthorizationController.cs']],
    svc: [['AccessListAuthorization', S + 'AccessListAuthorization.cs'], ['ResourceRegistryWrapper', S + 'ResourceRegistryWrapper.cs']],
    cli: [], data: [] },
  { name: 'Audit / Event log', home: S + 'EventLogService.cs',
    api: [],
    svc: [['EventLogService', S + 'EventLogService.cs'], ['AuthorizationEventDuplicateTracker', S + 'AuthorizationEventDuplicateTracker.cs'], ['EventLogHelper', AZ + 'Helpers/EventLogHelper.cs']],
    cli: [['EventsQueueClient', AZ + 'Clients/EventsQueueClient.cs']],
    data: [['Azure Queue · authorization events', AZ + 'Clients/EventsQueueClient.cs'], ['(→ consumed by Audit Log)', null]] },
];

// Shared NuGet package, drawn as its own frame (not part of the Authorization app)
const GHR = (repo, p) => `https://github.com/Altinn/${repo}/blob/main/${p}`;
const PEPCOLS = [
  { name: 'Authorization handlers', home: PEP + 'Authorization',
    svc: [['ResourceAccessHandler', PEP + 'Authorization/ResourceAccessHandler.cs'], ['AppAccessHandler', PEP + 'Authorization/AppAccessHandler.cs'], ['ClaimAccessHandler', PEP + 'Authorization/ClaimAccessHandler.cs'], ['ScopeAccessHandler', PEP + 'Authorization/ScopeAccessHandler.cs']] },
  { name: 'Decision client', home: PEP + 'Implementation/PDPAppSI.cs',
    svc: [['PDPAppSI', PEP + 'Implementation/PDPAppSI.cs'], ['DecisionHelper', PEP + 'Helpers/DecisionHelper.cs']],
    cli: [['AuthorizationApiClient → Authorization Decision API', PEP + 'Clients/AuthorizationApiClient.cs']] },
  { name: 'Used by', home: null, fill: '#f5f5f5', stroke: '#666666',
    svc: [['Access Management (Enduser, Enterprise, Internal)', 'apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Api.Enduser/Altinn.AccessManagement.Api.Enduser.csproj'],
      ['Authorization', 'apps/Altinn.Authorization/src/Altinn.Authorization/Altinn.Authorization.csproj'],
      ['Storage', GHR('altinn-storage', 'src/Storage/Altinn.Platform.Storage.csproj')],
      ['App lib (Altinn.App.Api / Core)', GHR('altinn-studio', 'src/App/backend/src/Altinn.App.Core/Altinn.App.Core.csproj')],
      ['Register', GHR('altinn-register', 'src/apps/Altinn.Register/src/Altinn.Register/Altinn.Register.csproj')],
      ['Resource Registry', GHR('altinn-resource-registry', 'src/apps/Altinn.ResourceRegistry/src/Altinn.ResourceRegistry/Altinn.ResourceRegistry.csproj')],
      ['Authentication', GHR('altinn-authentication', 'src/Authentication/Altinn.Platform.Authentication.csproj')]] },
];

const LBY = Object.fromEntries(LAYERS.map(l => [l.key, l]));
const BBY = Object.fromEntries(BARS.map(b => [b.key, b]));
const COLEND = COLBOTTOM; // same column height as Access Management, so all bars line up
const LAYER_STYLE = {
  api: { fill: '#dae8fc', stroke: '#6c8ebf', band: '#f3f7fd', y: LBY.api.y, h: LBY.api.h },
  svc: { fill: '#d5e8d4', stroke: '#82b366', band: '#f4faf3', y: LBY.svc.y, h: LBY.svc.h },
  data: { fill: '#e1d5e7', stroke: '#9673a6', band: '#f8f4fa', y: LBY.evt.y, h: COLEND - 2 - LBY.evt.y },
};
const refLink = p => !p ? null : p.startsWith('http') ? p : azLink(p);

const BAR_STYLE = {
  int: { name: 'Integration clients', fill: '#f8cecc', stroke: '#b85450', band: '#fdf5f5' },
  jobs: { name: 'Background jobs\n(HostedServices)', fill: '#ffe6cc', stroke: '#d79b00', band: '#fff8f0' },
};
// Same bar structure as Access Management: integration clients and background jobs sit in bars under the columns
function renderFrame({ id, x: FXX, title, href, cols, layerNames, bars = [], jobs }) {
  const clients = cols.flatMap(c => (c.cli || []).filter(([, p]) => p));
  bars = [
    { key: 'int', ...BAR_STYLE.int, items: clients.length ? clients : [['(none)', null]] },
    { key: 'jobs', ...BAR_STYLE.jobs, items: jobs && jobs.length ? jobs : [['(no background jobs)', null]] },
    ...bars,
  ];
  layerNames = Object.fromEntries(Object.entries(layerNames).filter(([k]) => k !== 'cli'));
  const C0 = FXX + 110, N = cols.length, W = 110 + N * STEP + 20;
  box({ id, x: FXX, y: FY, w: W, h: FH, style: 'rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;' });
  box({ x: FXX + 10, y: FY + 8, w: W - 20, h: 30, value: title, font: 16, bold: true, align: 'left', href,
    style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=16;fontStyle=1;', noFill: true, noStroke: true });
  const layers = Object.entries(layerNames).map(([key, name]) => ({ key, name, ...LAYER_STYLE[key] }));
  const barDefs = bars.map(b => ({ ...b, y: BBY[b.key].y, h: BBY[b.key].h }));
  for (const B of [...layers, ...barDefs]) {
    box({ x: FXX + 1, y: B.y, w: W - 2, h: B.h, style: st({ rounded: 0, whiteSpace: 'wrap', html: 1, fillColor: B.band, strokeColor: 'none' }), fill: B.band, noStroke: true });
    box({ x: FXX + 4, y: B.y, w: 102, h: B.h, value: B.name, font: 10, bold: true, align: 'left',
      style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=10;fontStyle=1;spacingLeft=4;', noFill: true, noStroke: true });
  }
  cols.forEach((c, i) => {
    const x = C0 + i * STEP;
    box({ x, y: CY, w: CW, h: COLEND - CY, style: 'rounded=0;whiteSpace=wrap;html=1;fillColor=none;', noFill: true });
    box({ x, y: CY, w: CW, h: HEAD, value: c.name, font: 12, bold: true, href: refLink(c.home),
      style: 'text;whiteSpace=wrap;html=1;align=center;verticalAlign=middle;fontSize=12;fontStyle=1;', noFill: true, noStroke: true });
    for (const B of layers) {
      (c[B.key] || []).forEach(([t, p, ov], j) => {
        const note = !p, fill = note ? '#ffffff' : ov || (c.fill ?? B.fill), stroke = c.stroke ?? B.stroke;
        box({ x: x + 5, y: B.y + 6 + j * PITCH, w: CW - 10, h: ITEM, value: t, font: 9, rounded: true,
          fill, stroke, dashed: note, href: refLink(p),
          style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 9, fillColor: fill, strokeColor: stroke, dashed: note ? 1 : 0 }) });
      });
    }
  });
  for (const B of barDefs) {
    const n = B.items.length, gap = 8, w = (N * STEP - 20 - gap * (n - 1)) / n;
    B.items.forEach(([t, p], j) => {
      const note = !p, fill = note ? '#ffffff' : B.fill;
      box({ x: Math.round(C0 + j * (w + gap)), y: B.y + 6, w: Math.round(w), h: B.h - 12, value: t, font: 9, rounded: B.shape !== 'cylinder', fill, stroke: B.stroke, shape: B.shape, href: refLink(p), dashed: note,
        style: B.shape === 'cylinder'
          ? st({ shape: 'cylinder3', whiteSpace: 'wrap', html: 1, boundedLbl: 1, backgroundOutline: 1, size: 6, fontSize: 9, fillColor: fill, strokeColor: B.stroke })
          : st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 9, fillColor: fill, strokeColor: B.stroke, dashed: note ? 1 : 0 }) });
    });
  }
  return FXX + W;
}

const AZ_END = renderFrame({
  id: '3', x: right + 80,
  title: 'Authorization  ·  altinn-auth/src/apps/Altinn.Authorization  (+ ABAC package for the PDP)',
  href: 'https://github.com/Altinn/altinn-auth/tree/main/src/apps/Altinn.Authorization',
  cols: AZCOLS,
  layerNames: { api: 'API layer\n(controllers)', svc: 'Services /\nhandlers', cli: 'Integration\nclients', data: 'Persistence' },
  bars: [
    { key: 'x', name: 'Cross-cutting', fill: '#f5f5f5', stroke: '#666666', band: '#fafafa',
      items: [['IdentityTelemetryFilter', AZ + 'Filters/IdentityTelemetryFilter.cs'], ['HealthCheck', AZ + 'Health/HealthCheck.cs'], ['FeatureFlags', AZ + 'Configuration/FeatureFlags.cs'], ['AuditLogDeduplicationSettings', AZ + 'Configuration/AuditLogDeduplicationSettings.cs'], ['AuthorizationDbContext', AZ + 'Persistence/AuthorizationDbContext.cs']] },
    { key: 'db', name: 'Datastores', fill: '#b1ddf0', stroke: '#10739e', band: '#f2f9fc', shape: 'cylinder',
      items: [['Azure Blob · metadata container (policies)', AZ + 'Repositories/PolicyRepository.cs'], ['Azure Blob · delegations container', AZ + 'Repositories/PolicyRepository.cs'], ['PostgreSQL · delegation schema', AZ + 'Repositories/DelegationMetadataRepository.cs'], ['Azure Queue · authorization events', AZ + 'Clients/EventsQueueClient.cs']] },
  ],
});

const PEP_END = renderFrame({
  id: 'pep-frame', x: AZ_END + 80,
  title: 'PEP  ·  NuGet Altinn.Common.PEP',
  href: 'https://github.com/Altinn/altinn-auth/tree/main/src/pkgs/Altinn.Authorization.PEP',
  cols: PEPCOLS,
  layerNames: { api: 'API layer\n(none: library)', svc: 'Handlers /\nconsumers', cli: 'Integration\nclients' },
});

// ================= Resource Registry (user's frame id 5) =================
const RR = 'apps/Altinn.ResourceRegistry/src/';
const RRA = RR + 'Altinn.ResourceRegistry/', RRC = RR + 'Altinn.ResourceRegistry.Core/', RRI = RR + 'Altinn.ResourceRegistry.Integration/', RRP = RR + 'Altinn.ResourceRegistry.Persistence/';
const RRM = RRP + 'Migration/';
const RRCOLS = [
  { name: 'Resources', home: RRC + 'Services/ResourceRegistryService.cs',
    api: [['Resource · CRUD (POST/PUT/DELETE)', RRA + 'Controllers/ResourceController.cs'], ['Resource · Search / resourcelist', RRA + 'Controllers/ResourceController.cs'], ['Resource · export', RRA + 'Controllers/ResourceController.cs']],
    svc: [['ResourceRegistryService', RRC + 'Services/ResourceRegistryService.cs'], ['ResourceRegistryRepository', RRP + 'ResourceRegistryRepository.cs']],
    cli: [['ApplicationsClient → Storage (apps)', RRI + 'Clients/ApplicationsClient.cs']],
    data: [['resourceregistry.resources', RRM + 'v0.09-split-resourcetable/01-split-resourcetable.sql'], ['resourceregistry.resource_identifier', RRM + 'v0.09-split-resourcetable/01-split-resourcetable.sql'], ['current_resources (view)', RRM + 'v0.09-split-resourcetable/01-split-resourcetable.sql']] },
  { name: 'Policies', home: RRP + 'PolicyRepository.cs',
    api: [['Resource · {id}/policy (GET/POST/PUT)', RRA + 'Controllers/ResourceController.cs'], ['Resource · policy/rights | rules | subjects', RRA + 'Controllers/ResourceController.cs'], ['ResourceV2 · policy/rights', RRA + 'Controllers/ResourceV2Controller.cs']],
    svc: [['StorePolicy / GetPolicyRights', RRC + 'Services/ResourceRegistryService.cs'], ['PolicyRepository', RRP + 'PolicyRepository.cs']],
    cli: [['PRPClient', RRI + 'Clients/PRPClient.cs']],
    data: [['Blob · resource policies', RRP + 'PolicyRepository.cs'], ['Blob · metadata (app policies)', RRP + 'PolicyRepository.cs']] },
  { name: 'Resource subjects & change feed', home: RRC + 'Models/ResourceSubjects.cs',
    api: [['Resource · bysubjects', RRA + 'Controllers/ResourceController.cs'], ['Resource · updated (change feed)', RRA + 'Controllers/ResourceController.cs']],
    svc: [['FindResourcesForSubjects', RRC + 'Services/ResourceRegistryService.cs'], ['FindUpdatedResourceSubjects', RRC + 'Services/ResourceRegistryService.cs'], ['UpdateResourceSubjectsFrom*Policy', RRC + 'Services/ResourceRegistryService.cs']],
    cli: [],
    data: [['resourceregistry.resourcesubjects', RRM + 'v0.06-resourcesubjects'], ['resource change feed (seq + fns)', RRM + 'v0.10-resource-change-feed/01-functions.sql']] },
  { name: 'Access Lists', home: RRC + 'AccessLists/AccessListService.cs',
    api: [['AccessLists · lists, members, resource-connections', RRA + 'Controllers/AccessListsController.cs'], ['AccessListMemberships · get-by-member', RRA + 'Controllers/AccessListMembershipsController.cs']],
    svc: [['AccessListService', RRC + 'AccessLists/AccessListService.cs'], ['AccessListAggregate (event-sourced)', RRP + 'Aggregates/AccessListAggregate.cs'], ['AccessListsRepository', RRP + 'AccessListsRepository.cs']],
    cli: [['RegisterClient → Register', RRI + 'Clients/RegisterClient.cs']],
    data: [['access_list_events', RRM + 'v0.03-access-lists'], ['access_list_state', RRM + 'v0.03-access-lists'], ['access_list_members_state', RRM + 'v0.03-access-lists'], ['access_list_resource_connections_state', RRM + 'v0.03-access-lists']] },
  { name: 'Service owners', home: RRC + 'ServiceOwners/ServiceOwnerService.cs',
    api: [['ResourceOwner · orgs', RRA + 'Controllers/ResourceOwnerController.cs']],
    svc: [['ServiceOwnerService', RRC + 'ServiceOwners/ServiceOwnerService.cs'], ['ServiceOwnerLookup', RRC + 'ServiceOwners/ServiceOwnerLookup.cs']],
    cli: [['OrgListClient → orgs list (CDN)', RRI + 'Clients/OrgListClient.cs']],
    data: [] },
];
const RR_END = renderFrame({
  id: '5', x: PEP_END + 80,
  title: 'Resource Registry  ·  altinn-auth/src/apps/Altinn.ResourceRegistry',
  href: 'https://github.com/Altinn/altinn-auth/tree/main/src/apps/Altinn.ResourceRegistry',
  cols: RRCOLS,
  layerNames: { api: 'API layer\n(controllers)', svc: 'Services /\nrepositories', cli: 'Integration\nclients', data: 'Persistence' },
  bars: [
    { key: 'x', name: 'Cross-cutting', fill: '#f5f5f5', stroke: '#666666', band: '#fafafa',
      items: [['OwnedResourceAuthorizationHandler', RRA + 'Auth/OwnedResourceAuthorizationHandler.cs'], ['InternalScopeOrAccessToken', RRA + 'Auth/InternalScopeOrAccessTokenRequirement.cs'], ['PlatformAccessTokenHandler', RRI + 'PlatformAccessTokenHandler.cs'], ['RequestForwarderLogMiddleware', RRA + 'RequestForwarderLogMiddleware.cs']] },
    { key: 'db', name: 'Datastores', fill: '#b1ddf0', stroke: '#10739e', band: '#f2f9fc', shape: 'cylinder',
      items: [['PostgreSQL · resourceregistry', RRP + 'ResourceRegistryRepository.cs'], ['Azure Blob · resource policies', RRP + 'PolicyRepository.cs'], ['Azure Blob · metadata (app policies)', RRP + 'PolicyRepository.cs']] },
  ],
});




// ================= Authentication (altinn-authentication, right of Resource Registry) =================
// Returns a function that turns a repo path into a GitHub link, or records it as unresolved
const treeLinker = (repo, label = repo, prefix = '') => p => {
  if (!p) return null;
  const full = prefix + p, kind = inTree(repo, full);
  if (!kind) { unresolved.push(label + ': ' + full); return null; }
  return `https://github.com/Altinn/${repo}/${kind}/main/${full}`;
};
const auLink = treeLinker('altinn-authentication', 'authentication');
const AUC = n => auLink('src/Authentication/Controllers/' + n + 'Controller.cs');
const AUS = n => auLink('src/Authentication/Services/' + n + '.cs');
const AUR = n => auLink('src/Persistance/RepositoryImplementations/' + n + '.cs');
const AUI = p => auLink('src/Integration/' + p + '.cs');
const AUCOLS = [
  { name: 'Token exchange & session', home: AUC('Authentication'),
    api: [['Authentication · refresh, exchange/{tokenProvider}', AUC('Authentication')], ['Introspection', AUC('Introspection')], ['Logout · logout, frontchannel_logout', AUC('Logout')]],
    svc: [['AuthenticationCore', AUS('AuthenticationCore')], ['JwtSigningCertificateProvider', AUS('JwtSigningCertificateProvider')], ['SigningKeysRetriever', AUS('SigningKeysRetriever')], ['OrganisationsService', AUS('OrganisationsService')]],
    cli: [], data: [] },
  { name: 'OIDC server (Altinn as OP)', home: AUS('OidcServerService'),
    api: [['OidcFrontChannel · authorize, upstream/callback', AUC('OidcFrontChannel')], ['OidcToken · token', AUC('OidcToken')], ['OpenId · .well-known, jwks', AUC('OpenId')]],
    svc: [['OidcServerService', AUS('OidcServerService')], ['TokenService', AUS('TokenService')], ['TokenIssuerService', AUS('TokenIssuerService')], ['UpstreamTokenValidator', AUS('UpstreamTokenValidator')], ['OidcProviderService', AUS('OidcProviderService')], ['DpopNonceStore', AUS('DpopNonceStore')]],
    cli: [['OidcDownstreamLogoutClient', auLink('src/Authentication/Clients/OidcDownstreamLogoutClient.cs')], ['(upstream IdPs: ID-porten, …)', null]],
    data: [['oidcserver.client', AUR('OidcServer/OidcServerClientRepository')], ['oidcserver.authorization_code', AUR('OidcServer/AuthorizationCodeRepository')], ['oidcserver.login_transaction (+_upstream)', AUR('OidcServer/LoginTransactionRepository')], ['oidcserver.oidc_session', AUR('OidcServer/OidcSessionRepository')], ['oidcserver.refresh_token (+_family)', AUR('OidcServer/RefreshTokenRepository')], ['oidcserver.unregistered_client_request', AUR('OidcServer/UnregisteredClientRequestRepository')]] },
  { name: 'Self-identified users', home: AUS('SelfIdentifiedLinkService'),
    api: [['SelfIdentified · link, link-request, redeem-link', AUC('SelfIdentifiedAuthentication')]],
    svc: [['SelfIdentifiedLinkService', AUS('SelfIdentifiedLinkService')], ['SelfIdentifiedLinkTokenService', AUS('SelfIdentifiedLinkTokenService')], ['UserProfileService', AUS('UserProfileService')], ['ProfileService', AUS('ProfileService')]],
    cli: [['RegisterUserProvisioningClient → Register', AUI('Clients/RegisterUserProvisioningClient')]],
    data: [['oidcserver.selfidentified_user_credential', AUR('OidcServer/SelfIdentifiedUserCredentialRepository')]] },
  { name: 'System register', home: AUS('SystemRegisterService'),
    api: [['SystemRegister · vendor, {systemId}, rights', AUC('SystemRegister')]],
    svc: [['SystemRegisterService', AUS('SystemRegisterService')], ['SystemRegisterRepository', AUR('SystemRegisterRepository')], ['SystemChangeLogRepository', AUR('SystemChangeLogRepository')]],
    cli: [['ResourceRegistryClient → Resource Registry', AUI('ResourceRegister/ResourceRegistryClient')]],
    data: [['business_application.system_register', AUR('SystemRegisterRepository')], ['business_application.maskinporten_client', AUR('SystemRegisterRepository')], ['business_application.system_change_log', AUR('SystemChangeLogRepository')]] },
  { name: 'System users', home: AUS('SystemUserService'),
    api: [['SystemUser · {party}, byExternalId', AUC('SystemUser')], ['SystemUser · agent/{party}/…/delegations', AUC('SystemUser')]],
    svc: [['SystemUserService', AUS('SystemUserService')], ['SystemUserRepository', AUR('SystemUserRepository')]],
    cli: [['AccessManagementClient → Access Management', AUI('AccessManagement/AccessManagementClient')], ['PartiesClient → Register', AUI('Clients/PartiesClient')]],
    data: [['business_application.system_user_profile', AUR('SystemUserRepository')]] },
  { name: 'System user requests', home: AUS('RequestSystemUserService'),
    api: [['RequestSystemUser · vendor, vendor/agent', AUC('RequestSystemUser')], ['ChangeRequestSystemUser · vendor, {party}', AUC('ChangeRequestSystemUser')]],
    svc: [['RequestSystemUserService', AUS('RequestSystemUserService')], ['ChangeRequestSystemUserService', AUS('ChangeRequestSystemUserService')], ['Archiver', AUS('Archiver')], ['RequestRepository', AUR('RequestRepository')], ['ChangeRequestRepository', AUR('ChangeRequestRepository')]],
    cli: [['AltinnNotificationClient → Notifications', AUI('Clients/AltinnNotificationClient')]],
    data: [['business_application.request', AUR('RequestRepository')], ['business_application.request_archive', AUR('RequestRepository')], ['business_application.change_request', AUR('ChangeRequestRepository')]] },
  { name: 'Client delegation (agent)', home: AUC('SystemUserClientDelegation'),
    api: [['enduser/systemuser · clients, agents', AUC('SystemUserClientDelegation')]],
    svc: [['DelegationHelper', auLink('src/Authentication/Helpers/DelegationHelper.cs')]],
    cli: [['(via AccessManagementClient)', null]],
    data: [] },
];
const AU_END = renderFrame({
  id: 'au-frame', x: RR_END + 80,
  title: 'Authentication  ·  altinn-authentication',
  href: 'https://github.com/Altinn/altinn-authentication/tree/main',
  cols: AUCOLS,
  layerNames: { api: 'API layer\n(controllers)', svc: 'Services /\nrepositories', cli: 'Integration\nclients', data: 'Persistence' },
  bars: [
    { key: 'x', name: 'Cross-cutting', fill: '#f5f5f5', stroke: '#666666', band: '#fafafa',
      items: [['EventLogService → audit events', AUS('EventLogService')], ['EFormidlingAccessValidator', AUS('EFormidlingAccessValidator')], ['DataProtectionConfiguration', auLink('src/Authentication/Extensions/DataProtectionConfiguration.cs')], ['FeatureFlags', auLink('src/Authentication/Configuration/FeatureFlags.cs')], ['HealthCheck', auLink('src/Authentication/Health/HealthCheck.cs')], ['NuGet Altinn.Common.Authentication (jwtcookie)', auLink('src/jwtcookie/Authentication/Altinn.Common.Authentication.csproj')]] },
    { key: 'db', name: 'Datastores', fill: '#b1ddf0', stroke: '#10739e', band: '#f2f9fc', shape: 'cylinder',
      items: [['PostgreSQL · business_application', AUR('SystemUserRepository')], ['PostgreSQL · oidcserver', AUR('OidcServer/OidcServerClientRepository')], ['Azure Key Vault · signing certificates', AUS('JwtSigningCertificateProvider')], ['Azure Queue · authentication events', auLink('src/Authentication/Clients/EventsQueueClient.cs')], ['Azure Blob · data protection keys', auLink('src/Authentication/Extensions/DataProtectionConfiguration.cs')]] },
  ],
});


// ================= Register (altinn-register, right of Authentication) + external sources below =================
const rgLink = treeLinker('altinn-register', 'register');
const RGS = 'src/apps/Altinn.Register/src/';
const RG = p => rgLink(RGS + p);
const RGA = p => RG('Altinn.Register/' + p);
const RGCOLS = [
  { name: 'Parties', home: RG('Altinn.Register.Persistence/PostgreSqlPartyPersistence.cs'),
    api: [['Parties (v1) · Organizations · Persons', RGA('Controllers/PartiesController.cs')], ['V2 · Party (query, lookup, stream)', RGA('Controllers/V2/PartyController.cs')], ['V2 · SelfIdentifiedUsers', RGA('Controllers/V2/SelfIdentifiedUsersController.cs')]],
    svc: [['PostgreSqlPartyPersistence', RG('Altinn.Register.Persistence/PostgreSqlPartyPersistence.cs')], ['PersonLookupService', RGA('Services/PersonLookupService.cs')]],
    cli: [],
    data: [['register.party', RG('Altinn.Register.Persistence/Migration')], ['register.person / organization', RG('Altinn.Register.Persistence/Migration')], ['register.user / username', RG('Altinn.Register.Persistence/Migration')], ['register.self_identified_user', RG('Altinn.Register.Persistence/Migration')], ['register.party_source_ref', RG('Altinn.Register.Persistence/Migration')]] },
  { name: 'External roles', home: RG('Altinn.Register.Persistence/PostgreSqlExternalRoleDefinitionPersistence.cs'),
    api: [['V2 · Metadata (role definitions)', RGA('Controllers/V2/MetadataController.cs')], ['AccessManagement (for AM)', RGA('Controllers/AccessManagementController.cs')]],
    svc: [['PostgreSqlExternalRoleDefinitionPersistence', RG('Altinn.Register.Persistence/PostgreSqlExternalRoleDefinitionPersistence.cs')], ['PartyRoleQuery', RG('Altinn.Register.Persistence/PostgreSqlPartyPersistence.PartyRoleQuery.cs')]],
    cli: [],
    data: [['register.external_role_definition', RG('Altinn.Register.Persistence/Migration')], ['register.external_role', RG('Altinn.Register.Persistence/Migration')], ['register.external_role_assignment_event', RG('Altinn.Register.Persistence/Migration')], ['register.external_main_unit_role', RG('Altinn.Register.Persistence/Migration')]] },
  { name: 'Enhetsregisteret import (CCR)', home: RGA('Ccr/CcrUpdateFederator.cs'), ext: 'ccr',
    api: [['Ccr · SOAP push from Brreg', RGA('Controllers/CcrController.cs')]],
    svc: [['CcrUpdateFederator', RGA('Ccr/CcrUpdateFederator.cs')], ['CcrXmlProcessor', RG('Altinn.Register.Integrations.Ccr.Xml/CcrXmlProcessor.cs')], ['CcrFlatFileProcessor', RG('Altinn.Register.Integrations.Ccr.FileImport/CcrFlatFileProcessor.cs')], ['CcrImportJob', RGA('PartyImport/Ccr/CcrImportJob.cs')], ['ImportCcrPartyConsumer', RGA('PartyImport/Ccr/ImportCcrPartyConsumer.cs')]],
    cli: [['SftpNetworkFileSystemClient (flat files)', RG('Altinn.Register.Integrations.Ccr.FileImport/SftpNetworkFileSystemClient.cs')]],
    data: [['register.ccr_soap_log', RG('Altinn.Register.Persistence/Migration')]] },
  { name: 'Folkeregisteret import (NPR)', home: RGA('PartyImport/Npr/NprImportJob.cs'), ext: 'npr',
    api: [],
    svc: [['NprImportJob', RGA('PartyImport/Npr/NprImportJob.cs')], ['GuardianshipRoleMapper', RG('Altinn.Register.Integrations.Npr/GuardianshipRoleMapper.cs')]],
    cli: [['NprClient (person + hendelsesfeed)', RG('Altinn.Register.Integrations.Npr/NprClient.cs')]],
    data: [] },
  { name: 'SIRE import', home: RGA('PartyImport/Sire/SireImportJob.cs'), ext: 'sire',
    api: [],
    svc: [['SireImportJob', RGA('PartyImport/Sire/SireImportJob.cs')]],
    cli: [['SireClient (lookup)', RG('Altinn.Register.Integrations.Sire/SireClient.cs')], ['SireEventClient (hendelser)', RG('Altinn.Register.Integrations.Sire/SireEventClient.cs')]],
    data: [] },
  { name: 'Altinn 2 import', home: RGA('PartyImport/A2/A2PartyImportJob.cs'), ext: 'a2',
    api: [],
    svc: [['A2PartyImportJob', RGA('PartyImport/A2/A2PartyImportJob.cs')], ['A2PartyImportSaga', RGA('PartyImport/A2/A2PartyImportSaga.cs')], ['A2ProfileImportJob', RGA('PartyImport/A2/A2ProfileImportJob.cs')], ['SagaManager', RGA('PartyImport/A2/SagaManager.cs')]],
    cli: [['PartiesClient → SBL Bridge', RGA('Clients/PartiesClient.cs')], ['SblProfileBridgeClient → SBL Bridge', RGA('Clients/SblProfileBridgeClient.cs')]],
    data: [['register.saga_state', RG('Altinn.Register.Persistence/Migration')], ['register.import_job (+_state)', RG('Altinn.Register.Persistence/Migration')]] },
  { name: 'Import pipeline & system users', home: RGA('PartyImport/PartyImportBatchConsumer.cs'),
    api: [],
    svc: [['PartyImportBatchConsumer', RGA('PartyImport/PartyImportBatchConsumer.cs')], ['UpsertUserRecordConsumer', RGA('PartyImport/UpsertUserRecordConsumer.cs')], ['SystemUserImportJob', RGA('PartyImport/SystemUser/SystemUserImportJob.cs')], ['ImportSystemUserConsumer', RGA('PartyImport/SystemUser/ImportSystemUserConsumer.cs')]],
    cli: [],
    data: [['register.system_user', RG('Altinn.Register.Persistence/Migration')], ['register.import_job_party_state', RG('Altinn.Register.Persistence/Migration')]] },
  { name: 'Consumer facades', home: RGA('Controllers'),
    api: [['AltinnApps · Correspondence · DialogPorten', RGA('Controllers/AltinnAppsController.cs')], ['OrgContactPoint', RGA('Controllers/OrgContactPointController.cs')], ['SupportDashboard', RGA('Controllers/SupportDashboardController.cs')]],
    svc: [['BridgeOrgContactPointLookup', RGA('Clients/BridgeOrgContactPointLookup.cs')]],
    cli: [['AuthorizationClient → Authorization', RGA('Clients/AuthorizationClient.cs')]],
    data: [] },
];
const RG_X = AU_END + 80;
const RG_END = renderFrame({
  id: 'rg-frame', x: RG_X,
  title: 'Register  ·  altinn-register  (altinn-auth/src/apps/Altinn.Register is only a placeholder so far)',
  href: 'https://github.com/Altinn/altinn-register/tree/main',
  cols: RGCOLS,
  layerNames: { api: 'API layer\n(controllers)', svc: 'Services / jobs /\nconsumers', data: 'Persistence' },
  jobs: [['RecurringJobHostedService', RG('ServiceDefaults.Jobs/RecurringJobHostedService.cs')], ['Leases', RG('ServiceDefaults.Leases/LeaseManager.cs')], ['Storage queue polling', RG('ServiceDefaults.StorageQueues/StorageQueuePollJob.cs')], ['SagaStateCleanupJob', RGA('Cleanup/SagaStateCleanupJob.cs')], ['PostgreSqlVacuumService', RG('Altinn.Register.Persistence/PostgreSqlVacuumService.cs')]],
  bars: [
    { key: 'x', name: 'Cross-cutting', fill: '#f5f5f5', stroke: '#666666', band: '#fafafa',
      items: [['MassTransit (commands, events, sagas)', RG('ServiceDefaults.MassTransit/AltinnMassTransitOptions.cs')], ['Rate limiting', RG('Altinn.Register.Core/RateLimiting')], ['RegisterTelemetry', RG('Altinn.Register.Core/RegisterTelemetry.cs')], ['Authorization', RGA('Authorization')]] },
    { key: 'db', name: 'Datastores', fill: '#b1ddf0', stroke: '#10739e', band: '#f2f9fc', shape: 'cylinder',
      items: [['PostgreSQL · register', RG('Altinn.Register.Persistence/PostgreSqlPartyPersistence.cs')], ['Azure Service Bus (MassTransit)', RG('ServiceDefaults.MassTransit/AltinnMassTransitOptions.cs')], ['Azure Storage Queues', RG('ServiceDefaults.StorageQueues/StorageQueuePollJob.cs')]] },
  ],
});

// external sources, each directly under the column that imports from it
const EXT = {
  ccr: ['Enhetsregisteret', 'Brønnøysundregistrene', 'SOAP push + SFTP flat files'],
  npr: ['Folkeregisteret', 'Skatteetaten', 'person API + hendelsesfeed'],
  sire: ['SIRE', 'Skatteetaten', 'selskap: lookup + hendelser'],
  a2: ['Altinn 2', 'SBL Bridge', 'parties + profiles'],
};
const EXT_Y = FY + FH + 50, EXT_H = 64;
box({ x: RG_X, y: EXT_Y - 30, w: 300, h: 22, value: 'External sources (outside Altinn 3)', font: 11, bold: true, align: 'left',
  style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=11;fontStyle=1;', noFill: true, noStroke: true });
RGCOLS.forEach((c, i) => {
  if (!c.ext) return;
  const [name, owner, how] = EXT[c.ext];
  const x = RG_X + 110 + i * STEP, cx = x + CW / 2;
  box({ x, y: EXT_Y, w: CW, h: EXT_H, value: `${name}\n${owner}\n${how}`, font: 10, bold: false, rounded: true, fill: '#e0e0e0', stroke: '#4d4d4d', dashed: true,
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 10, fillColor: '#e0e0e0', strokeColor: '#4d4d4d', dashed: 1 }) });
  // data flows into Register
  svg.push(`<path d="M${cx},${EXT_Y} L${cx},${FY + FH + 7}" stroke="#4d4d4d" stroke-width="2" fill="none"/><path d="M${cx},${FY + FH} L${cx - 5},${FY + FH + 8} L${cx + 5},${FY + FH + 8} Z" fill="#4d4d4d"/>`);
  cells.push(`<mxCell id="am-e${nextId++}" value="" style="endArrow=block;endFill=1;html=1;strokeWidth=2;strokeColor=#4d4d4d;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${cx}" y="${EXT_Y}" as="sourcePoint"/><mxPoint x="${cx}" y="${FY + FH}" as="targetPoint"/></mxGeometry></mxCell>`);
});
const EXT_BOTTOM = EXT_Y + EXT_H + 10;

// ================= Access Management frontend (above Access Management, APIM in between) =================
const FEGH = 'https://github.com/Altinn/altinn-access-management-frontend/';
const feLink = treeLinker('altinn-access-management-frontend', 'frontend');
const FB = 'backend/src/Altinn.AccessManagement.UI/';
const Fe = n => 'src/features/amUI/' + n, Rt = n => 'src/rtk/features/' + n + '.ts';
const Ct = n => FB + 'Altinn.AccessManagement.UI/Controllers/' + n + 'Controller.cs';
const Sv = n => FB + 'Altinn.AccessManagement.UI.Core/Services/' + n + 'Service.cs';
const Kl = n => FB + 'Altinn.AccessManagement.UI.Integration/Clients/' + n + 'Client.cs';

// Columns line up with the Access Management columns below; "System user" is extra (backed by Authentication)
const FECOLS = [
  { name: 'Users & rightholders', ui: [['users', Fe('users')], ['userRightsPage', Fe('userRightsPage')], ['poaOverview', Fe('poaOverview')]],
    rtk: [['connectionApi', Rt('connectionApi')], ['userInfoApi', Rt('userInfoApi')]],
    ctl: [['ConnectionController', Ct('Connection')], ['UserController', Ct('User')]],
    svc: [['ConnectionService', Sv('Connection')], ['UserService', Sv('User')]],
    cli: [['ConnectionClient', Kl('Connection')], ['AccessManagementClient', Kl('AccessManagement')]] },
  { name: 'Roles', ui: [['(roles in rights pages)', null]],
    rtk: [['roleApi', Rt('roleApi')]], ctl: [['RoleController', Ct('Role')]], svc: [['RoleService', Sv('Role')]], cli: [['RoleClient', Kl('Role')]] },
  { name: 'Access packages', ui: [['packagePoaDetailsPage', Fe('packagePoaDetailsPage')]],
    rtk: [['accessPackageApi', Rt('accessPackageApi')]], ctl: [['AccessPackageController', Ct('AccessPackage')]], svc: [['AccessPackageService', Sv('AccessPackage')]], cli: [['AccessPackageClient', Kl('AccessPackage')]] },
  { name: 'Client admin', ui: [['clientAdministration', Fe('clientAdministration')], ['clientDetails', Fe('clientDetails')], ['myClients', Fe('myClients')], ['agentDetails', Fe('agentDetails')]],
    rtk: [['clientApi', Rt('clientApi')]], ctl: [['ClientController', Ct('Client')]], svc: [['ClientService', Sv('Client')]],
    cli: [['ClientDelegationClientV1', Kl('ClientDelegation') .replace('Client.cs', 'ClientV1.cs')], ['ClientDelegationClientV2', Kl('ClientDelegation').replace('Client.cs', 'ClientV2.cs')], ['ClientDelegationClientResolver', FB + 'Altinn.AccessManagement.UI.Integration/Clients/ClientDelegationClientResolver.cs']] },
  { name: 'Requests', ui: [['requestPage', Fe('requestPage')]],
    rtk: [['requestApi', Rt('requestApi')]], ctl: [['RequestController', Ct('Request')]], svc: [['RequestService', Sv('Request')]], cli: [['RequestClient', Kl('Request')]] },
  { name: 'Consent', ui: [['consent', Fe('consent')]],
    rtk: [['consentApi', Rt('consentApi')]], ctl: [['ConsentController', Ct('Consent')]], svc: [['ConsentService', Sv('Consent')]], cli: [['ConsentClient', Kl('Consent')]] },
  { name: 'Maskinporten', ui: [['maskinporten', Fe('maskinporten')]],
    rtk: [['maskinportenApi', Rt('maskinportenApi')]], ctl: [['MaskinportenController', Ct('Maskinporten')]], svc: [['MaskinportenService', Sv('Maskinporten')]], cli: [['MaskinportenClient', Kl('Maskinporten')]] },
  { name: 'Reportees & lookup', ui: [['reportees', Fe('reportees')], ['reporteeRightsPage', Fe('reporteeRightsPage')]],
    rtk: [['lookupApi', Rt('lookupApi')]], ctl: [['ReporteeController', Ct('Reportee')], ['LookupController', Ct('Lookup')]], svc: [['LookupService', Sv('Lookup')]],
    cli: [['RegisterClient', Kl('Register')], ['ProfileClient', Kl('Profile')]] },
  { name: 'Single rights & instances', ui: [['servicePoaDetailsPage', Fe('servicePoaDetailsPage')], ['InstanceDetailPage', Fe('InstanceDetailPage')]],
    rtk: [['singleRightsApi', 'src/rtk/features/singleRights/singleRightsApi.ts'], ['instanceApi', Rt('instanceApi')], ['resourceApi', Rt('resourceApi')], ['idPortenAuthorizationApi', Rt('idPortenAuthorizationApi')]],
    ctl: [['SingleRightController', Ct('SingleRight')], ['InstanceController', Ct('Instance')], ['ResourceController', Ct('Resource')], ['IdPortenAuthorizationController', Ct('IdPortenAuthorization')]],
    svc: [['SingleRightService', Sv('SingleRight')], ['InstanceService', Sv('Instance')], ['ResourceService', Sv('Resource')], ['IdPortenAuthorizationService', Sv('IdPortenAuthorization')]],
    cli: [['SingleRightClient', Kl('SingleRight')], ['InstanceClient', Kl('Instance')], ['ResourceRegistryClient', Kl('ResourceRegistry')], ['IdPortenAuthorizationClient', Kl('IdPortenAuthorization')]] },
  { name: 'Settings & metadata', ui: [['settings', Fe('settings')], ['landingPage', Fe('landingPage')], ['altinn2Account', Fe('altinn2Account')]],
    rtk: [['settingsApi', Rt('settingsApi')], ['altinnCdnApi', Rt('altinnCdnApi')], ['selfIdentifiedUserApi', Rt('selfIdentifiedUserApi')]],
    ctl: [['SettingsController', Ct('Settings')], ['AltinnCdnController', Ct('AltinnCdn')], ['SelfIdentifiedUserController', Ct('SelfIdentifiedUser')]],
    svc: [['SettingsService', Sv('Settings')], ['AltinnCdnService', Sv('AltinnCdn')], ['SelfIdentifiedUserService', Sv('SelfIdentifiedUser')]],
    cli: [['AltinnCdnClient', Kl('AltinnCdn')], ['SelfIdentifiedUserClient', Kl('SelfIdentifiedUser')]] },
  { name: 'System user (→ Authentication)', ui: [['systemUser', Fe('systemUser')]],
    rtk: [['systemUserApi', Rt('systemUserApi')]],
    ctl: [['SystemUserController', Ct('SystemUser')], ['SystemUserRequestController', Ct('SystemUserRequest')], ['SystemUserChangeRequestController', Ct('SystemUserChangeRequest')], ['SystemUserAgentRequestController', Ct('SystemUserAgentRequest')], ['SystemUserAgentDelegationController', Ct('SystemUserAgentDelegation')], ['SystemRegisterController', Ct('SystemRegister')]],
    svc: [['SystemUserService', Sv('SystemUser')], ['SystemUserRequestService', Sv('SystemUserRequest')], ['SystemUserChangeRequestService', Sv('SystemUserChangeRequest')], ['SystemUserAgentRequestService', Sv('SystemUserAgentRequest')], ['SystemUserAgentDelegationService', Sv('SystemUserAgentDelegation')], ['SystemRegisterService', Sv('SystemRegister')]],
    cli: [['SystemUserClient', Kl('SystemUser')], ['SystemUserRequestClient', Kl('SystemUserRequest')], ['SystemUserChangeRequestClient', Kl('SystemUserChangeRequest')], ['SystemUserAgentRequestClient', Kl('SystemUserAgentRequest')], ['SystemUserAgentDelegationClient', Kl('SystemUserAgentDelegation')], ['SystemRegisterClient', Kl('SystemRegister')]] },
];
const FE_LAYERS = [
  { key: 'ui', name: 'React SPA\n(features/amUI)', fill: '#fff2cc', stroke: '#d6b656', band: '#fffbef' },
  { key: 'rtk', name: 'RTK Query\n(API slices)', fill: '#ffe6cc', stroke: '#d79b00', band: '#fff8f0' },
  { key: 'ctl', name: 'BFF controllers\n(.NET)', fill: '#dae8fc', stroke: '#6c8ebf', band: '#f3f7fd' },
  { key: 'svc', name: 'BFF services\n(UI.Core)', fill: '#d5e8d4', stroke: '#82b366', band: '#f4faf3' },
  { key: 'cli', name: 'BFF clients\n(UI.Integration)', fill: '#f8cecc', stroke: '#b85450', band: '#fdf5f5' },
];
const FE_BARS = [
  { name: 'Hosting', fill: '#e1d5e7', stroke: '#9673a6', band: '#f8f4fa',
    items: [['Azure Container App · one container', 'Dockerfile'], ['Vite build → wwwroot/accessmanagement', 'vite.config.ts'], ['HomeController serves the SPA', Ct('Home')], ['Program.cs (ASP.NET Core host)', FB + 'Altinn.AccessManagement.UI/Program.cs']] },
  { name: 'Cross-cutting', fill: '#f5f5f5', stroke: '#666666', band: '#fafafa',
    items: [['Authentication / Logout', Ct('Authentication')], ['Antiforgery + Referer filters', FB + 'Altinn.AccessManagement.UI/Filters/ValidateAntiforgeryTokenIfAuthCookieAuthorizationFilter.cs'], ['SecurityHeadersMiddleware', FB + 'Altinn.AccessManagement.UI/Middleware/SecurityHeadersMiddleware.cs'], ['EndUserResourceAccessHandler', FB + 'Altinn.AccessManagement.UI/Authorization/EndUserResourceAccessHandler.cs'], ['AccessTokenProvider / KeyVault', Sv('KeyVault')], ['DelegationExport', Ct('DelegationExport')], ['DialogportClient → Dialogporten', Kl('Dialogport')]] },
];
let FE_BOTTOM, FE_TOP;
{
  const APIM_H = 44, GAP = 24;
  // measure
  const lay = FE_LAYERS.map(l => ({ ...l, h: Math.max(...FECOLS.map(c => (c[l.key] || []).length)) * PITCH + 10 }));
  const inner = 50 + HEAD + 4 + lay.reduce((s, l) => s + l.h + 8, 0) + 8 + FE_BARS.length * 52 + 8;
  FE_BOTTOM = FY - GAP - APIM_H - GAP;
  FE_TOP = FE_BOTTOM - inner;
  const N = FECOLS.length, W = 110 + N * STEP + 20;
  box({ id: 'fe-frame', x: FX, y: FE_TOP, w: W, h: inner, style: 'rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;' });
  box({ x: FX + 10, y: FE_TOP + 8, w: W - 20, h: 30, value: 'Access Management frontend  ·  altinn-access-management-frontend  (React SPA hosted by .NET BFF in an Azure Container App)', font: 16, bold: true, align: 'left',
    href: FEGH + 'tree/main', style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=16;fontStyle=1;', noFill: true, noStroke: true });
  let y = FE_TOP + 50 + HEAD + 4;
  const colTop = FE_TOP + 50;
  for (const L of lay) { L.y = y; y += L.h + 8; }
  const colBottom = y;
  y += 8;
  const bars = FE_BARS.map(b => { const r = { ...b, y, h: 44 }; y += 52; return r; });
  for (const B of [...lay, ...bars]) {
    box({ x: FX + 1, y: B.y, w: W - 2, h: B.h, style: st({ rounded: 0, whiteSpace: 'wrap', html: 1, fillColor: B.band, strokeColor: 'none' }), fill: B.band, noStroke: true });
    box({ x: FX + 4, y: B.y, w: 102, h: B.h, value: B.name, font: 10, bold: true, align: 'left',
      style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=10;fontStyle=1;spacingLeft=4;', noFill: true, noStroke: true });
  }
  FECOLS.forEach((c, i) => {
    const x = COL0 + i * STEP; // same x as the Access Management columns below
    box({ x, y: colTop, w: CW, h: colBottom - colTop, style: 'rounded=0;whiteSpace=wrap;html=1;fillColor=none;', noFill: true });
    box({ x, y: colTop, w: CW, h: HEAD, value: c.name, font: 12, bold: true,
      style: 'text;whiteSpace=wrap;html=1;align=center;verticalAlign=middle;fontSize=12;fontStyle=1;', noFill: true, noStroke: true });
    for (const L of lay) {
      (c[L.key] || []).forEach(([t, p], j) => {
        const note = !p;
        box({ x: x + 5, y: L.y + 6 + j * PITCH, w: CW - 10, h: ITEM, value: t, font: 9, rounded: true,
          fill: note ? '#ffffff' : L.fill, stroke: L.stroke, dashed: note, href: feLink(p),
          style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 9, fillColor: note ? '#ffffff' : L.fill, strokeColor: L.stroke, dashed: note ? 1 : 0 }) });
      });
    }
  });
  for (const B of bars) {
    const n = B.items.length, gap = 8, w = (N * STEP - 20 - gap * (n - 1)) / n;
    B.items.forEach(([t, p], j) => {
      box({ x: Math.round(COL0 + j * (w + gap)), y: B.y + 6, w: Math.round(w), h: B.h - 12, value: t, font: 9, rounded: true, fill: B.fill, stroke: B.stroke, href: feLink(p),
        style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 9, fillColor: B.fill, strokeColor: B.stroke }) });
    });
  }
  // API Management between the BFF and the platform APIs
  const ay = FE_BOTTOM + GAP, aw = RG_END - FX;
  box({ x: FX, y: ay, w: aw, h: APIM_H, font: 12, bold: true, rounded: true, fill: '#e6d0de', stroke: '#996185',
    value: 'Azure API Management (APIM)  ·  BFF → platform APIs with Ocp-Apim-Subscription-Key  ·  /accessmanagement/api · /authentication/api · /authorization/api · /register/api · /resourceregistry/api · /profile/api',
    href: feLink(FB + 'Altinn.AccessManagement.UI/appsettings.json'),
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 12, fontStyle: 1, fillColor: '#e6d0de', strokeColor: '#996185' }) });
  // flow markers: BFF -> APIM -> backends
  const arrow = (x, y1, y2) => {
    svg.push(`<path d="M${x},${y1} L${x},${y2 - 7}" stroke="#996185" stroke-width="2" fill="none"/><path d="M${x},${y2} L${x - 5},${y2 - 8} L${x + 5},${y2 - 8} Z" fill="#996185"/>`);
    cells.push(`<mxCell id="am-e${nextId++}" value="" style="endArrow=block;endFill=1;html=1;strokeWidth=2;strokeColor=#996185;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x}" y="${y1}" as="sourcePoint"/><mxPoint x="${x}" y="${y2}" as="targetPoint"/></mxGeometry></mxCell>`);
  };
  arrow(FX + W / 2, FE_BOTTOM, ay);
  arrow(FX + FW / 2, ay + APIM_H, FY);                 // → Access Management
  arrow((right + 80 + AZ_END) / 2, ay + APIM_H, FY);   // → Authorization
  arrow((PEP_END + 80 + RR_END) / 2, ay + APIM_H, FY); // → Resource Registry
  arrow((RR_END + 80 + AU_END) / 2, ay + APIM_H, FY);  // → Authentication
  arrow((AU_END + 80 + RG_END) / 2, ay + APIM_H, FY);  // → Register
}

const LAST_RIGHT = RG_END;

// ================= Product: Dialogporten (below the authorization product) =================
// Generic grid renderer with free y and shared layer heights, so frames in one product row line up.
function renderGrid({ id, x: GX, y: GY, title, href, cols, layers, bars, heights, colW = STEP }) {
  const C0 = GX + 110, N = cols.length, W = 110 + N * colW + 20;
  let y = GY + 50;
  const colTop = y;
  y += HEAD + 4;
  const lay = layers.map(l => { const r = { ...l, y, h: heights[l.key] }; y += r.h + 8; return r; });
  const colBottom = y;
  y += 8;
  const bar = bars.map(b => { const r = { ...b, y, h: b.shape === 'cylinder' ? 54 : 44 }; y += r.h + 8; return r; });
  const H = y + 8 - GY;
  box({ id, x: GX, y: GY, w: W, h: H, style: 'rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;' });
  box({ x: GX + 10, y: GY + 8, w: W - 20, h: 30, value: title, font: 16, bold: true, align: 'left', href,
    style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=16;fontStyle=1;', noFill: true, noStroke: true });
  for (const B of [...lay, ...bar]) {
    box({ x: GX + 1, y: B.y, w: W - 2, h: B.h, style: st({ rounded: 0, whiteSpace: 'wrap', html: 1, fillColor: B.band, strokeColor: 'none' }), fill: B.band, noStroke: true });
    box({ x: GX + 4, y: B.y, w: 102, h: B.h, value: B.name, font: 10, bold: true, align: 'left',
      style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=10;fontStyle=1;spacingLeft=4;', noFill: true, noStroke: true });
  }
  cols.forEach((c, i) => {
    const x = C0 + i * colW;
    box({ x, y: colTop, w: CW, h: colBottom - colTop, style: 'rounded=0;whiteSpace=wrap;html=1;fillColor=none;', noFill: true });
    box({ x, y: colTop, w: CW, h: HEAD, value: c.name, font: 12, bold: true, href: c.home || null,
      style: 'text;whiteSpace=wrap;html=1;align=center;verticalAlign=middle;fontSize=12;fontStyle=1;', noFill: true, noStroke: true });
    for (const L of lay) {
      (c[L.key] || []).forEach(([t, p], j) => {
        const note = !p, fill = note ? '#ffffff' : L.fill;
        box({ x: x + 5, y: L.y + 6 + j * PITCH, w: CW - 10, h: ITEM, value: t, font: 9, rounded: true, fill, stroke: L.stroke, dashed: note, href: p || null,
          style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 9, fillColor: fill, strokeColor: L.stroke, dashed: note ? 1 : 0 }) });
      });
    }
  });
  for (const B of bar) {
    const items = B.items.length ? B.items : [['(none)', null]];
    const n = items.length, gap = 8, w = (N * colW - 20 - gap * (n - 1)) / n;
    items.forEach(([t, p], j) => {
      const note = !p, fill = note ? '#ffffff' : B.fill;
      box({ x: Math.round(C0 + j * (w + gap)), y: B.y + 6, w: Math.round(w), h: B.h - 12, value: t, font: 9, rounded: B.shape !== 'cylinder', fill, stroke: B.stroke, shape: B.shape, href: p || null, dashed: note,
        style: B.shape === 'cylinder'
          ? st({ shape: 'cylinder3', whiteSpace: 'wrap', html: 1, boundedLbl: 1, backgroundOutline: 1, size: 6, fontSize: 9, fillColor: fill, strokeColor: B.stroke })
          : st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 9, fillColor: fill, strokeColor: B.stroke, dashed: note ? 1 : 0 }) });
    });
  }
  return { right: GX + W, bottom: GY + H };
}
const measure = (colsList, keys) => Object.fromEntries(keys.map(k => [k, Math.max(1, ...colsList.flat().map(c => (c[k] || []).length)) * PITCH + 10]));
const LSTY = {
  ui: { fill: '#fff2cc', stroke: '#d6b656', band: '#fffbef' },
  rtk: { fill: '#ffe6cc', stroke: '#d79b00', band: '#fff8f0' },
  api: { fill: '#dae8fc', stroke: '#6c8ebf', band: '#f3f7fd' },
  app: { fill: '#d5e8d4', stroke: '#82b366', band: '#f4faf3' },
  dom: { fill: '#e6f2e6', stroke: '#6d9c6d', band: '#f7fbf7' },
  data: { fill: '#e1d5e7', stroke: '#9673a6', band: '#f8f4fa' },
};
const BSTY = {
  int: { name: 'Integration clients', fill: '#f8cecc', stroke: '#b85450', band: '#fdf5f5' },
  jobs: { name: 'Background jobs /\nhosts', fill: '#ffe6cc', stroke: '#d79b00', band: '#fff8f0' },
  host: { name: 'Hosting', fill: '#e1d5e7', stroke: '#9673a6', band: '#f8f4fa' },
  x: { name: 'Cross-cutting', fill: '#f5f5f5', stroke: '#666666', band: '#fafafa' },
  db: { name: 'Datastores', fill: '#b1ddf0', stroke: '#10739e', band: '#f2f9fc', shape: 'cylinder' },
};

// ---- links ----
const dpL = treeLinker('dialogporten', 'dialogporten');
const dfL = treeLinker('dialogporten-frontend', 'dialogporten-frontend');
const daL = treeLinker('altinn-dialogporten-adapter', 'dialogporten-adapter');
const DPS = 'src/Digdir.Domain.Dialogporten.';
const EP = (p) => dpL(DPS + 'WebApi/Endpoints/V1/' + p);
const AP = (p) => dpL(DPS + 'Application/Features/V1/' + p);
const DO = (p) => dpL(DPS + 'Domain/' + p);
const IN = (p) => dpL(DPS + 'Infrastructure/' + p);
const GQ = (p) => dpL(DPS + 'GraphQL/' + p);
const DPM = IN('Persistence/Configurations');

// ---- Arbeidsflate (dialogporten-frontend) ----
const FEP = p => dfL('packages/frontend/src/' + p), BFP = p => dfL('packages/bff/src/' + p);
const AFCOLS = [
  { name: 'Inbox & dialogs', home: FEP('pages/Inbox'),
    ui: [['Inbox', FEP('pages/Inbox')], ['DialogDetailsPage', FEP('pages/DialogDetailsPage')], ['ActivityLog / SeenByModal', FEP('components/ActivityLog')]],
    rtk: [['queries.ts (GraphQL)', FEP('api/queries.ts')], ['subscription.ts (dialog events)', FEP('api/subscription.ts')]],
    api: [['graphql/api.ts → Dialogporten GraphQL', BFP('graphql/api.ts')], ['shared/dialogAccess', BFP('graphql/shared/dialogAccess.ts')]],
    data: [] },
  { name: 'Saved searches', home: FEP('pages/SavedSearches'),
    ui: [['SavedSearches', FEP('pages/SavedSearches')], ['SavedSearchButton', FEP('components/SavedSearchButton')]],
    rtk: [['(via queries.ts)', null]],
    api: [['savedSearches · queries / mutations', BFP('graphql/savedSearches/queries.ts')], ['savedSearches/service', BFP('graphql/savedSearches/service.ts')]],
    data: [['saved_search', BFP('entities.ts')]] },
  { name: 'Profile & notifications', home: FEP('pages/Profile'),
    ui: [['Profile', FEP('pages/Profile')]],
    rtk: [['(via queries.ts)', null]],
    api: [['profile · queries / mutations', BFP('graphql/profile/queries.ts')], ['notifications · settings, logs', BFP('graphql/notifications/service.ts')], ['username', BFP('graphql/username/service.ts')]],
    data: [['profile', BFP('entities.ts')]] },
  { name: 'Parties & groups', home: BFP('entities.ts'),
    ui: [['(party picker, favourites)', null]],
    rtk: [['(via queries.ts)', null]],
    api: [['party · person URN cipher', BFP('party/personUrnCipher.ts')]],
    data: [['party', BFP('entities.ts')], ['group', BFP('entities.ts')]] },
  { name: 'Organizations & service resources', home: BFP('graphql/serviceResources/service.ts'),
    ui: [['(org logos, service names)', null]],
    rtk: [['(via queries.ts)', null]],
    api: [['organizations → altinncdn orgs', BFP('graphql/organizations/service.ts')], ['serviceResources → Dialogporten', BFP('graphql/serviceResources/dpService.ts')]],
    data: [] },
  { name: 'Login & session', home: BFP('auth/oidc.ts'),
    ui: [['Login / LogoutPage', FEP('pages/LogoutPage')], ['RedirectPage', FEP('pages/RedirectPage')]],
    rtk: [['auth', FEP('auth')]],
    api: [['auth/oidc → ID-porten', BFP('auth/oidc.ts')], ['auth/exchangeToken → Altinn token', BFP('auth/exchangeToken.ts')], ['auth/maskinporten', BFP('auth/maskinporten.ts')]],
    data: [] },
  { name: 'Features & banners', home: BFP('features/featureApi.ts'),
    ui: [['featureFlags', FEP('featureFlags')], ['Notice / SINotice', FEP('components/Notice')]],
    rtk: [['(fetch)', null]],
    api: [['featureApi', BFP('features/featureApi.ts')], ['alertBannerApi', BFP('features/alertBannerApi.ts')]],
    data: [] },
];
const AF_LAYERS = [
  { key: 'ui', name: 'React SPA\n(pages, components)', ...LSTY.ui },
  { key: 'rtk', name: 'SPA API\n(GraphQL client)', ...LSTY.rtk },
  { key: 'api', name: 'BFF GraphQL\n(Fastify + Nexus)', ...LSTY.api },
  { key: 'data', name: 'BFF persistence\n(TypeORM)', ...LSTY.data },
];
const AF_BARS = [
  { ...BSTY.int, items: [['Dialogporten GraphQL (via APIM)', BFP('graphql/api.ts')], ['Profile API', BFP('graphql/profile/service.ts')], ['Authentication · exchange token', BFP('auth/exchangeToken.ts')], ['ID-porten (OIDC)', BFP('auth/oidc.ts')], ['altinncdn · orgs', BFP('graphql/organizations/service.ts')]] },
  { ...BSTY.host, items: [['frontend container (Vite build + nginx)', dfL('packages/frontend/Dockerfile')], ['bff container (Node / Fastify)', dfL('packages/bff/Dockerfile')], ['docs (Astro)', dfL('packages/docs/Dockerfile')]] },
  { ...BSTY.x, items: [['OpenTelemetry instrumentation', BFP('instrumentation.ts')], ['Health probes', BFP('azure/HealthProbes.ts')], ['node-logger', dfL('packages/node-logger')], ['bff-types-generated (GraphQL codegen)', dfL('packages/bff-types-generated')]] },
  { ...BSTY.db, items: [['PostgreSQL · bff (TypeORM)', BFP('data-source.ts')], ['Redis · sessions', BFP('redisClient.ts')]] },
];

// ---- Dialogporten backend ----
const DPCOLS = [
  { name: 'Dialogs · service owner', home: AP('ServiceOwner/Dialogs/Commands'),
    api: [['SO · Create / Update / Patch', EP('ServiceOwner/Dialogs/Commands/Create')], ['SO · Delete / Purge / Restore / Freeze', EP('ServiceOwner/Dialogs/Commands/Delete')], ['SO · Get / Search / NotificationCondition', EP('ServiceOwner/Dialogs/Queries/Search')]],
    app: [['CreateDialogCommand', AP('ServiceOwner/Dialogs/Commands/Create/CreateDialogCommand.cs')], ['Update / Delete / Purge / Restore / Freeze', AP('ServiceOwner/Dialogs/Commands')], ['SO queries (Get, Search, …)', AP('ServiceOwner/Dialogs/Queries')]],
    dom: [['DialogEntity', DO('Dialogs/Entities/DialogEntity.cs')], ['DialogStatus', DO('Dialogs/Entities/DialogStatus.cs')], ['Contents', DO('Dialogs/Entities/Contents')]],
    data: [['Dialog', DPM], ['DialogContent', DPM], ['DialogSearchTag', DPM]] },
  { name: 'Dialogs · end user', home: AP('EndUser/Dialogs/Queries'),
    api: [['EU · Get / Search (REST)', EP('EndUser/Dialogs/Queries')], ['GraphQL · DialogById / SearchDialogs', GQ('EndUser/DialogById')], ['DialogLookup (EU / SO)', EP('EndUser/DialogLookup')]],
    app: [['EU queries (Get, Search)', AP('EndUser/Dialogs/Queries')], ['DialogLookup', AP('EndUser/DialogLookup')]],
    dom: [['DialogUserType', DO('Dialogs/Entities/DialogUserType.cs')]],
    data: [['DialogSearchRepository', IN('Persistence/Repositories/DialogSearchRepository.cs')], ['dialog search index (SQL)', IN('Persistence/Sql/Dialog')]] },
  { name: 'Transmissions', home: DO('Dialogs/Entities/Transmissions'),
    api: [['SO · Create / UpdateTransmission', EP('ServiceOwner/Dialogs/Commands/CreateTransmission')], ['EU / SO · Get / SearchTransmissions', EP('EndUser/Dialogs/Queries/SearchTransmissions')]],
    app: [['CreateTransmission / UpdateTransmission', AP('ServiceOwner/Dialogs/Commands/CreateTransmission')]],
    dom: [['Transmissions', DO('Dialogs/Entities/Transmissions')]],
    data: [['DialogTransmission (+Content, Types)', DPM], ['TransmissionHierarchyRepository', IN('Persistence/Repositories/TransmissionHierarchyRepository.cs')]] },
  { name: 'Activities & seen log', home: DO('Dialogs/Entities/Activities'),
    api: [['SO · CreateActivity, FormSavedTime', EP('ServiceOwner/Dialogs/Commands/CreateActivity')], ['EU / SO · Activities, SeenLogs', EP('EndUser/Dialogs/Queries/SearchActivities')]],
    app: [['CreateActivity', AP('ServiceOwner/Dialogs/Commands/CreateActivity')], ['Get / Search Activities, SeenLogs', AP('EndUser/Dialogs/Queries')]],
    dom: [['Activities', DO('Dialogs/Entities/Activities')], ['DialogSeenLog', DO('Dialogs/Entities/DialogSeenLog.cs')]],
    data: [['DialogActivity', DPM], ['DialogSeenLog', DPM], ['DialogSeenLogWriter', IN('Persistence/Repositories/DialogSeenLogWriter.cs')]] },
  { name: 'Actions & attachments', home: DO('Dialogs/Entities/Actions'),
    api: [['(part of dialog / transmission)', null]],
    app: [['(mapped in dialog commands)', null]],
    dom: [['DialogGuiAction / ApiAction', DO('Dialogs/Entities/Actions')], ['Attachment / AttachmentUrl', DO('Attachments')]],
    data: [['DialogGuiAction, DialogApiAction', DPM], ['DialogApiActionEndpoint', DPM], ['Attachment, AttachmentUrl', DPM]] },
  { name: 'Labels & contexts', home: DO('DialogEndUserContexts'),
    api: [['EU · SetSystemLabel / BulkSet', EP('EndUser/EndUserContext/Commands')], ['SO · EndUserContext, ServiceOwnerContext', EP('ServiceOwner/ServiceOwnerContext')], ['GraphQL · LabelAssignmentLog', GQ('EndUser/LabelAssignmentLog')]],
    app: [['EndUserContext commands / queries', AP('EndUser/EndUserContext')], ['ServiceOwnerContext', AP('ServiceOwner/ServiceOwnerContext')], ['SystemLabelAdder', AP('ServiceOwner/Common/SystemLabelAdder')]],
    dom: [['DialogEndUserContexts', DO('DialogEndUserContexts')], ['DialogServiceOwnerContexts', DO('DialogServiceOwnerContexts')]],
    data: [['DialogEndUserContext, SystemLabel', DPM], ['LabelAssignmentLog', DPM], ['DialogServiceOwnerContext / Label', DPM]] },
  { name: 'Authorization & parties', home: AP('Common/Authorization'),
    api: [['EU · AccessManagement / GetParties', EP('EndUser/AccessManagement/Queries/GetParties')], ['GraphQL · Parties', GQ('EndUser/Parties')]],
    app: [['Common/Authorization', AP('Common/Authorization')], ['AuthorizationContexts', AP('Common/AuthorizationContexts')], ['GetParties', AP('AccessManagement/Queries/GetParties')]],
    dom: [['SubjectResources', DO('SubjectResources')], ['ResourcePolicyInformation', DO('ResourcePolicyInformation')], ['Parties', DO('Parties')]],
    data: [['SubjectResource', IN('Persistence/Repositories/SubjectResourceRepository.cs')], ['ResourcePolicyInformation', IN('Persistence/Repositories/ResourcePolicyInformationRepository.cs')], ['party resource refs (SQL)', IN('Persistence/Repositories/PartyResourceRepository.cs')]] },
  { name: 'Service resources & metadata', home: AP('Metadata'),
    api: [['Metadata · Limits, ServiceResources', EP('Metadata')], ['EU · ServiceResources/Search', EP('EndUser/ServiceResources/Search')]],
    app: [['Metadata queries', AP('Metadata')], ['ResourceRegistry · SyncPolicy, SyncSubjectMap', AP('ResourceRegistry/Commands')], ['ServiceResourceMetadata', AP('Common/ServiceResourceMetadata')]],
    dom: [['Localizations', DO('Localizations')]],
    data: [['ServiceResourceMetadataCatalogue', IN('ServiceResourceMetadata/ServiceResourceMetadataCatalogue.cs')]] },
  { name: 'Events & indexing', home: AP('Common/Events'),
    api: [['GraphQL · dialog subscriptions', GQ('EndUser/DialogById/Subscriptions.cs')]],
    app: [['DialogEventToAltinnForwarder', AP('Common/Events/AltinnForwarders/DialogEventToAltinnForwarder.cs')], ['DialogActivityEventToAltinnForwarder', AP('Common/Events/AltinnForwarders/DialogActivityEventToAltinnForwarder.cs')], ['DialogSearchIndexer', AP('Common/Events/DialogSearch/DialogSearchIndexer.cs')], ['PartyResourceReferenceCacheInvalidator', AP('Common/Events/PartyResourceReferences/PartyResourceReferenceCacheInvalidator.cs')], ['ReindexDialogSearch', AP('Search/Commands/ReindexDialogSearch')]],
    dom: [['Outboxes (domain events)', DO('Outboxes')]],
    data: [['NotificationAcknowledgement', IN('Persistence/IdempotentNotifications/NotificationAcknowledgement.cs')], ['MassTransit EF outbox', IN('InfrastructureExtensions.cs')]] },
  { name: 'Well-known / dialog token', home: AP('WellKnown'),
    api: [['WellKnown · Jwks', EP('WellKnown/Jwks')], ['WellKnown · OAuth authorization server', EP('WellKnown/OauthAuthorizationServer')]],
    app: [['Jwks / OauthAuthorizationServer', AP('WellKnown')]],
    dom: [], data: [] },
];
const DP_LAYERS = [
  { key: 'api', name: 'API layer\n(WebApi + GraphQL)', ...LSTY.api },
  { key: 'app', name: 'Application\n(features)', ...LSTY.app },
  { key: 'dom', name: 'Domain', ...LSTY.dom },
  { key: 'data', name: 'Persistence\n(EF / SQL)', ...LSTY.data },
];
const DP_BARS = [
  { ...BSTY.int, items: [['AltinnAuthorizationClient → Authorization', IN('Altinn/Authorization/AltinnAuthorizationClient.cs')], ['ResourceRegistryClient', IN('Altinn/ResourceRegistry/ResourceRegistryClient.cs')], ['AltinnEventsClient → Events', IN('Altinn/Events/AltinnEventsClient.cs')], ['PartyNameRegistryClient → Register', IN('Altinn/NameRegistry/PartyNameRegistryClient.cs')], ['ServiceOwnerNameRegistryClient', IN('Altinn/OrganizationRegistry/ServiceOwnerNameRegistryClient.cs')], ['AccessManagementMetadataClient', IN('Altinn/AccessManagement/AccessManagementMetadataClient.cs')]] },
  { ...BSTY.jobs, items: [['WebApi (REST)', dpL(DPS + 'WebApi/Program.cs')], ['GraphQL (+ subscriptions)', dpL(DPS + 'GraphQL/Program.cs')], ['Service · DomainEventConsumer', dpL(DPS + 'Service/Consumers/DomainEventConsumer.cs')], ['Janitor · sync-subject-resource-mappings, sync-resource-policy-information, reindex', dpL(DPS + 'Janitor/Commands.cs')], ['Janitor · cost metrics', dpL(DPS + 'Janitor/CostManagementAggregation')], ['FusionCacheWarmupHostedService', IN('Persistence/FusionCache/FusionCacheWarmupHostedService.cs')]] },
  { ...BSTY.x, items: [['IdempotentNotificationHandler', IN('Persistence/IdempotentNotifications/IdempotentNotificationHandler.cs')], ['EF interceptors', IN('Persistence/Interceptors')], ['MaintenanceModeMiddleware', dpL('src/Digdir.Library.Utils.AspNet/MaintenanceModeMiddleware.cs')], ['OpenTelemetry', dpL('src/Digdir.Library.Utils.AspNet/OpenTelemetryExtensions.cs')], ['WebApiClient (NuGet)', dpL('src/WebApiClient')]] },
  { ...BSTY.db, items: [['PostgreSQL · dialogporten', IN('Persistence/DialogDbContext.cs')], ['Redis · FusionCache', IN('Persistence/FusionCache')], ['Azure Service Bus (MassTransit)', IN('InfrastructureExtensions.cs')], ['Azure App Configuration', dpL('src/Digdir.Library.Utils.AspNet/AzureAppConfigurationExtensions.cs')]] },
];

// ---- Storage → Dialogporten adapter ----
const ADW = p => daL('src/Altinn.DialogportenAdapter.WebApi/' + p), ADE = p => daL('src/Altinn.DialogportenAdapter.EventSimulator/' + p);
const ADCOLS = [
  { name: 'Sync instance → dialog', home: ADW('Features/Command/Sync'),
    api: [['POST syncDialog', ADW('Common/Extensions/WebApplicationExtensions.cs')], ['POST syncDialog/simple', ADW('Common/Extensions/WebApplicationExtensions.cs')]],
    app: [['SyncDialogOnInstanceUpdatedHandler', ADW('Features/Command/Sync/SyncDialogOnInstanceUpdatedHandler.cs')], ['StorageDialogportenDataMerger', ADW('Features/Command/Sync/StorageDialogportenDataMerger.cs')], ['ActivityDtoTransformer', ADW('Features/Command/Sync/ActivityDtoTransformer.cs')], ['ApplicationTextParser', ADW('Features/Command/Sync/ApplicationTextParser.cs')]],
    dom: [['SyncInstanceCommand (contract)', daL('src/Altinn.DialogportenAdapter.Contracts/SyncInstanceCommand.cs')]], data: [] },
  { name: 'Delete & receipt', home: ADW('Features/Command/Delete/InstanceService.cs'),
    api: [['DELETE instance/{owner}/{guid}', ADW('Common/Extensions/WebApplicationExtensions.cs')], ['GET receipt/{dialogId}/{txId}', ADW('Common/Extensions/WebApplicationExtensions.cs')]],
    app: [['InstanceService (delete / purge)', ADW('Features/Command/Delete/InstanceService.cs')], ['InstanceReceipt', ADW('Features/Command/Sync/InstanceReceipt.cs')]],
    dom: [], data: [] },
  { name: 'Event simulator', home: ADE('Features'),
    api: [],
    app: [['InstanceUpdateStreamBackgroundService', ADE('Features/UpdateStream/InstanceUpdateStreamBackgroundService.cs')], ['MigrationPartitionService (history)', ADE('Features/HistoryStream/MigrationPartitionService.cs')], ['MigrationInstance / PartitionCommandHandler', ADE('Features/HistoryStream')]],
    dom: [], data: [['MigrationPartitionRepository (Azure Table)', ADE('Infrastructure/Persistance/MigrationPartitionRepository.cs')]] },
];
const AD_BARS = [
  { ...BSTY.int, items: [['IStorageApi → Storage', ADW('Infrastructure/Storage/IStorageApi.cs')], ['IDialogportenApi → Dialogporten', ADW('Infrastructure/Dialogporten/IDialogportenApi.cs')], ['IRegisterApi → Register', ADW('Infrastructure/Register/IRegisterApi.cs')], ['IAltinnCdnApi', ADW('Infrastructure/AltinnCdn/IAltinnCdnApi.cs')]] },
  { ...BSTY.jobs, items: [['WebApi (Wolverine handlers)', ADW('Program.cs')], ['EventSimulator', ADE('Program.cs')]] },
  { ...BSTY.x, items: [['AuthorizationValidator', ADW('Common/AuthorizationValidator.cs')], ['LogRedactor', ADW('Common/LogRedactor.cs')]] },
  { ...BSTY.db, items: [['Azure Service Bus (Wolverine)', daL('src/Altinn.DialogportenAdapter.Contracts/WolverineOptionsExtentions.cs')], ['Azure Table Storage', ADE('Infrastructure/Persistance/MigrationPartitionRepository.cs')]] },
];

// ---- place the product row ----
const PRODUCT_GAP = 160;
const productLabel = (x, y, text) => box({ x, y, w: 1200, h: 40, value: text, font: 26, bold: true, align: 'left',
  style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=26;fontStyle=1;', noFill: true, noStroke: true });
productLabel(FX, FE_TOP - 70, 'Produkt: Autorisasjon');
MARKS.dp = [cells.length, svg.length];
const DP_TOP = EXT_BOTTOM + PRODUCT_GAP;
productLabel(FX, DP_TOP, 'Produkt: Dialogporten');
const afH = measure([AFCOLS], ['ui', 'rtk', 'api', 'data']);
const af = renderGrid({ id: 'af-frame', x: FX, y: DP_TOP + 60, title: 'Arbeidsflate  ·  dialogporten-frontend  (React SPA + Node BFF)', href: 'https://github.com/Altinn/dialogporten-frontend/tree/main',
  cols: AFCOLS, layers: AF_LAYERS, bars: AF_BARS, heights: afH });
const DP_APIM_Y = af.bottom + 24;
const dpH = measure([DPCOLS, ADCOLS], ['api', 'app', 'dom', 'data']);
const DP_ROW_Y = DP_APIM_Y + 44 + 24;
const dp = renderGrid({ id: 'dp-frame', x: FX, y: DP_ROW_Y, title: 'Dialogporten  ·  altinn/dialogporten', href: 'https://github.com/Altinn/dialogporten/tree/main',
  cols: DPCOLS, layers: DP_LAYERS, bars: DP_BARS, heights: dpH });
const ad = renderGrid({ id: 'dpad-frame', x: dp.right + 80, y: DP_ROW_Y, title: 'Storage → Dialogporten adapter  ·  altinn-dialogporten-adapter', href: 'https://github.com/Altinn/altinn-dialogporten-adapter/tree/main',
  cols: ADCOLS, layers: DP_LAYERS, bars: AD_BARS, heights: dpH });
{
  const aw = ad.right - FX;
  box({ x: FX, y: DP_APIM_Y, w: aw, h: 44, font: 12, bold: true, rounded: true, fill: '#e6d0de', stroke: '#996185',
    value: 'Azure API Management (APIM)  ·  /dialogporten/api (REST) · /dialogporten/graphql (+ /graphql/stream subscriptions)',
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 12, fontStyle: 1, fillColor: '#e6d0de', strokeColor: '#996185' }) });
  const arr = (x, y1, y2) => {
    svg.push(`<path d="M${x},${y1} L${x},${y2 - 7}" stroke="#996185" stroke-width="2" fill="none"/><path d="M${x},${y2} L${x - 5},${y2 - 8} L${x + 5},${y2 - 8} Z" fill="#996185"/>`);
    cells.push(`<mxCell id="am-e${nextId++}" value="" style="endArrow=block;endFill=1;html=1;strokeWidth=2;strokeColor=#996185;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x}" y="${y1}" as="sourcePoint"/><mxPoint x="${x}" y="${y2}" as="targetPoint"/></mxGeometry></mxCell>`);
  };
  arr((FX + af.right) / 2, af.bottom, DP_APIM_Y);
  arr((FX + dp.right) / 2, DP_APIM_Y + 44, DP_ROW_Y);
}
const DP_BOTTOM = Math.max(dp.bottom, ad.bottom) + 10;
const DP_RIGHT = ad.right;


// ================= Product: Apps (below Dialogporten) =================
const alL = treeLinker('altinn-studio', 'app backend', 'src/App/backend/');
const stL = treeLinker('altinn-storage', 'altinn-storage');
const afrL = treeLinker('app-frontend-react', 'app-frontend-react');
const AC = p => alL('src/Altinn.App.Core/' + p), AA = p => alL('src/Altinn.App.Api/Controllers/' + p);
const ST = p => stL('src/Storage/' + p);
const FR = p => afrL('src/' + p);
const Q = FR('queries/queries.ts');

// ---- app-frontend-react ----
const APF_COLS = [
  { name: 'Form layout & components', home: FR('layout'),
    ui: [['GenericComponent', FR('layout/GenericComponent.tsx')], ['Form', FR('components/form/Form.tsx')], ['layout/* (component types)', FR('layout')]],
    rtk: [['LayoutsContext', FR('features/form/layout/LayoutsContext.tsx')], ['LayoutSetsProvider', FR('features/form/layoutSets/LayoutSetsProvider.tsx')], ['NodesContext', FR('utils/layout/NodesContext.tsx')]],
    api: [['fetchLayouts / LayoutSets / Settings', Q]] },
  { name: 'Form data & saving', home: FR('features/formData'),
    ui: [['Subform', FR('layout/Subform')], ['RepeatingGroup', FR('layout/RepeatingGroup')]],
    rtk: [['FormDataWrite (+ state machine)', FR('features/formData/FormDataWrite.tsx')], ['DataModelsProvider', FR('features/datamodel/DataModelsProvider.tsx')]],
    api: [['useFormDataQuery', FR('features/formData/useFormDataQuery.tsx')], ['doPatchMultipleFormData', Q]] },
  { name: 'Process & navigation', home: FR('features/process'),
    ui: [['AppNavigation', FR('features/navigation/AppNavigation.tsx')], ['ConfirmPage', FR('features/process/confirm/containers/ConfirmPage.tsx')], ['NavigationButtons', FR('layout/NavigationButtons')]],
    rtk: [['InstanceContext', FR('features/instance/InstanceContext.tsx')], ['useProcessNext', FR('features/instance/useProcessNext.tsx')], ['PageNavigationContext', FR('features/form/layout/PageNavigationContext.tsx')]],
    api: [['useProcessQuery', FR('features/instance/useProcessQuery.ts')], ['doProcessNext', Q]] },
  { name: 'Validation', home: FR('features/validation'),
    ui: [['ComponentValidations', FR('features/validation/ComponentValidations.tsx')], ['ValidationMessage', FR('app-components/ValidationMessage')]],
    rtk: [['validationContext', FR('features/validation/validationContext.tsx')], ['schemaValidation', FR('features/validation/schemaValidation')], ['expressionValidation', FR('features/validation/expressionValidation')]],
    api: [['backendValidationQuery', FR('features/validation/backendValidation/backendValidationQuery.ts')]] },
  { name: 'Expressions & dynamics', home: FR('features/expressions'),
    ui: [['(drives hidden / required)', null]],
    rtk: [['expressions', FR('features/expressions/index.ts')], ['expression-functions', FR('features/expressions/expression-functions.ts')], ['hidden', FR('utils/layout/hidden.ts')]],
    api: [['fetchDynamics / fetchRuleHandler', Q]] },
  { name: 'Options & code lists', home: FR('features/options'),
    ui: [['Dropdown / Checkboxes / List', FR('layout/Dropdown')]],
    rtk: [['useGetOptions', FR('features/options/useGetOptions.ts')], ['CodeListsProvider', FR('features/options/CodeListsProvider.tsx')]],
    api: [['useGetOptionsQuery', FR('features/options/useGetOptionsQuery.ts')], ['dataLists', FR('features/dataLists')]] },
  { name: 'Attachments', home: FR('features/attachments'),
    ui: [['FileUpload (+WithTag)', FR('layout/FileUpload')], ['AttachmentList', FR('layout/AttachmentList')]],
    rtk: [['AttachmentsStorePlugin', FR('features/attachments/AttachmentsStorePlugin.tsx')], ['attachments hooks', FR('features/attachments/hooks.ts')]],
    api: [['doAttachmentUpload / Remove / Tags', Q]] },
  { name: 'Signing, payment & PDF', home: FR('layout/SigningActions'),
    ui: [['SigningActions / SigneeList', FR('layout/SigningActions')], ['Payment', FR('layout/Payment')]],
    rtk: [['PaymentProvider', FR('features/payment/PaymentProvider.tsx')], ['PdfWrapper / PdfFromLayout', FR('features/pdf/PdfWrapper.tsx')]],
    api: [['signing api', FR('layout/SigningActions/api.ts')], ['usePerformPaymentMutation', FR('features/payment/usePerformPaymentMutation.ts')]] },
  { name: 'Party & instantiation', home: FR('features/instantiate'),
    ui: [['PartySelection', FR('features/instantiate/containers/PartySelection.tsx')], ['InstanceSelection', FR('features/instantiate/selection/InstanceSelection.tsx')], ['InstantiationButton', FR('layout/InstantiationButton')]],
    rtk: [['PartiesProvider', FR('features/party/PartiesProvider.tsx')], ['useInstantiation', FR('features/instantiate/useInstantiation.tsx')], ['ProfileProvider', FR('features/profile/ProfileProvider.tsx')]],
    api: [['useInstantiateWithPrefillMutation', FR('features/instantiate/useInstantiateWithPrefillMutation.ts')], ['doInstantiate / fetchActiveInstances', Q]] },
  { name: 'Receipt & texts', home: FR('features/receipt'),
    ui: [['ReceiptContainer', FR('features/receipt/ReceiptContainer.tsx')], ['Lang', FR('features/language/Lang.tsx')]],
    rtk: [['LanguageProvider', FR('features/language/LanguageProvider.tsx')], ['TextResourcesProvider', FR('features/language/textResources/TextResourcesProvider.tsx')]],
    api: [['useGetAppLanguagesQuery', FR('features/language/textResources/useGetAppLanguagesQuery.ts')], ['fetchTextResources', Q]] },
];
const APF_LAYERS = [
  { key: 'ui', name: 'UI\n(layout, pages)', ...LSTY.ui },
  { key: 'rtk', name: 'State\n(contexts, zustand)', ...LSTY.rtk },
  { key: 'api', name: 'Queries\n(react-query)', ...LSTY.api },
];
const APF_BARS = [
  { ...BSTY.int, items: [['App backend · /{org}/{app}/… (queries.ts)', Q], ['URL helpers (appUrlHelper)', FR('utils/urls/appUrlHelper.ts')], ['Authentication · login / step-up', FR('utils/urls/appUrlHelper.ts')], ['altinncdn · postcodes, orgs', FR('utils/urls/appUrlHelper.ts')]] },
  { ...BSTY.host, items: [['webpack build → altinn-app-frontend.js', afrL('webpack.common.js')], ['Published to altinncdn.no/toolkits (Front Door)', afrL('.github/workflows/release.yml')], ['Loaded by every app\'s HTML', FR('utils/urls/appUrlHelper.ts')]] },
  { ...BSTY.x, items: [['AppQueriesProvider', FR('core/contexts/AppQueriesProvider.tsx')], ['KeepAliveProvider', FR('core/auth/KeepAliveProvider.tsx')], ['errorHandling', FR('core/errorHandling')], ['devtools', FR('features/devtools')], ['codegen (component schemas)', FR('codegen')]] },
];

// ---- the app backend: altinn-studio/src/App/backend (formerly app-lib-dotnet) ----
const SC = p => AC('Infrastructure/Clients/Storage/' + p);
const APP_COLS = [
  { name: 'Instances & parties', home: AA('InstancesController.cs'),
    api: [['InstancesController', AA('InstancesController.cs')], ['PartiesController', AA('PartiesController.cs')], ['UserDefinedMetadataController', AA('UserDefinedMetadataController.cs')]],
    app: [['IInstantiationProcessor / Validator', AC('Features/IInstantiationProcessor.cs')], ['PrefillSI', AC('Implementation/PrefillSI.cs')]],
    data: [['InstanceClient', SC('InstanceClient.cs')], ['InstanceEventClient', SC('InstanceEventClient.cs')]] },
  { name: 'Data & form data', home: AC('Internal/Data'),
    api: [['DataController', AA('DataController.cs')], ['StatelessDataController', AA('StatelessDataController.cs')], ['DataTagsController', AA('DataTagsController.cs')]],
    app: [['DataService', AC('Internal/Data/DataService.cs')], ['InstanceDataUnitOfWork', AC('Internal/Data/InstanceDataUnitOfWork.cs')], ['DataProcessing (IDataProcessor)', AC('Features/DataProcessing')], ['DefaultAppModel', AC('Internal/AppModel/DefaultAppModel.cs')], ['FileAnalysisService', AC('Features/FileAnalysis/FileAnalysisService.cs')]],
    data: [['DataClient', SC('DataClient.cs')]] },
  { name: 'Process engine', home: AC('Internal/Process'),
    api: [['ProcessController', AA('ProcessController.cs')], ['ActionsController', AA('ActionsController.cs')], ['WorkflowEngineCallbackController', AA('WorkflowEngineCallbackController.cs')]],
    app: [['ProcessEngine', AC('Internal/Process/ProcessEngine.cs')], ['WorkflowEngineService → workflow engine', AC('Internal/WorkflowEngine/WorkflowEngineService.cs')], ['ProcessNavigator / Reader', AC('Internal/Process/ProcessNavigator.cs')], ['ProcessTasks (data, confirm, feedback)', AC('Internal/Process/ProcessTasks')], ['UserActionService', AC('Features/Action/UserActionService.cs')]],
    data: [['ProcessClient', SC('ProcessClient.cs')]] },
  { name: 'Signing', home: AC('Features/Signing'),
    api: [['SigningController', AA('SigningController.cs')]],
    app: [['SigningService', AC('Features/Signing/Services/SigningService.cs')], ['SigneeContextsManager', AC('Features/Signing/Services/SigneeContextsManager.cs')], ['SigningDelegationService', AC('Features/Signing/Services/SigningDelegationService.cs')], ['SigningReceiptService', AC('Features/Signing/Services/SigningReceiptService.cs')], ['SigningProcessTask', AC('Internal/Process/ProcessTasks/SigningProcessTask.cs')]],
    data: [['SignClient', SC('SignClient.cs')]] },
  { name: 'Payment', home: AC('Features/Payment'),
    api: [['PaymentController', AA('PaymentController.cs')]],
    app: [['PaymentService', AC('Features/Payment/Services/PaymentService.cs')], ['NetsPaymentProcessor', AC('Features/Payment/Processors/Nets/NetsPaymentProcessor.cs')], ['PaymentProcessTask', AC('Internal/Process/ProcessTasks/PaymentProcessTask.cs')], ['IOrderDetailsCalculator', AC('Features/Payment/IOrderDetailsCalculator.cs')]],
    data: [] },
  { name: 'PDF', home: AC('Internal/Pdf/PdfService.cs'),
    api: [['PdfController', AA('PdfController.cs')]],
    app: [['PdfService', AC('Internal/Pdf/PdfService.cs')], ['PdfServiceTask', AC('Internal/Process/ProcessTasks/ServiceTasks/PdfServiceTask.cs')], ['SubformPdfServiceTask', AC('Internal/Process/ProcessTasks/ServiceTasks/SubformPdfServiceTask.cs')], ['IPdfFormatter', AC('Features/IPdfFormatter.cs')]],
    data: [] },
  { name: 'Validation', home: AC('Internal/Validation'),
    api: [['ValidateController', AA('ValidateController.cs')], ['FileScanController', AA('FileScanController.cs')]],
    app: [['ValidationService', AC('Internal/Validation/ValidationService.cs')], ['FileValidationService', AC('Internal/Validation/FileValidationService.cs')], ['Default validators (XSD, expr, …)', AC('Features/Validation/Default')]],
    data: [] },
  { name: 'Options & code lists', home: AC('Features/Options'),
    api: [['OptionsController', AA('OptionsController.cs')], ['DataListsController', AA('DataListsController.cs')]],
    app: [['AppOptionsService / Factory', AC('Features/Options/AppOptionsService.cs')], ['Altinn3LibraryCodeListService', AC('Features/Options/Altinn3LibraryCodeList/Altinn3LibraryCodeListService.cs')], ['Altinn2CodeListProvider', AC('Features/Options/Altinn2Provider/Altinn2CodeListProvider.cs')], ['DataListsService', AC('Features/DataLists/DataListsService.cs')]],
    data: [] },
  { name: 'App config, texts & profile', home: AC('Implementation/AppResourcesSI.cs'),
    api: [['Texts / ApplicationMetadata', AA('TextsController.cs')], ['ProfileController', AA('ProfileController.cs')], ['Settings, Language, Lookup*', AA('ApplicationSettingsController.cs')]],
    app: [['AppResourcesSI', AC('Implementation/AppResourcesSI.cs')], ['AppMetadata', AC('Internal/App/AppMetadata.cs')], ['TranslationService', AC('Internal/Texts/TranslationService.cs')], ['FrontendFeatures', AC('Internal/App/FrontendFeatures.cs')]],
    data: [['ApplicationClient', SC('ApplicationClient.cs')]] },
  { name: 'Notifications & events', home: AC('Features/Notifications'),
    api: [['NotificationCallbackController', AA('NotificationCallbackController.cs')]],
    app: [['DefaultAppEvents (publish)', AC('Implementation/DefaultAppEvents.cs')], ['NotificationService', AC('Features/Notifications/NotificationService.cs')], ['CancelOnProcessEnd', AC('Features/Notifications/Cancellation/CancelOnProcessEnd.cs')]],
    data: [] },
  { name: 'Expressions, eFormidling, Fiks', home: AC('Internal/Expressions'),
    api: [['ExternalApiController', AA('ExternalApiController.cs')]],
    app: [['ExpressionEvaluator / LayoutEvaluator', AC('Internal/Expressions/ExpressionEvaluator.cs')], ['ExpressionsExclusiveGateway', AC('Internal/Process/ExpressionsExclusiveGateway.cs')], ['EFormidlingService / ServiceTask', AC('EFormidling/Implementation/DefaultEFormidlingService.cs')], ['FiksArkivServiceTask', alL('src/Altinn.App.Clients.Fiks/FiksArkiv/FiksArkivServiceTask.cs')], ['ExternalApiService', AC('Features/ExternalApi/ExternalApiService.cs')]],
    data: [] },
];
const APP_LAYERS = [
  { key: 'api', name: 'API layer\n(controllers)', ...LSTY.api },
  { key: 'app', name: 'Core\n(features, internal)', ...LSTY.app },
  { key: 'data', name: 'Persistence\n(Storage clients)', ...LSTY.data },
];
const APP_BARS = [
  { ...BSTY.int, items: [['AuthorizationClient', AC('Infrastructure/Clients/Authorization/AuthorizationClient.cs')], ['AuthenticationClient', AC('Infrastructure/Clients/Authentication/AuthenticationClient.cs')], ['Register (Party, Person, ER)', AC('Infrastructure/Clients/Register/AltinnPartyClient.cs')], ['ProfileClient', AC('Infrastructure/Clients/Profile/ProfileClient.cs')], ['EventsClient', AC('Infrastructure/Clients/Events/EventsClient.cs')], ['Notifications (email, SMS, order)', AC('Features/Notifications/Future/NotificationOrderClient.cs')], ['CorrespondenceClient', AC('Features/Correspondence/CorrespondenceClient.cs')], ['AccessManagementClient', AC('Infrastructure/Clients/AccessManagement/AccessManagementClient.cs')], ['PdfGeneratorClient', AC('Infrastructure/Clients/Pdf/PdfGeneratorClient.cs')], ['MaskinportenClient', AC('Features/Maskinporten/MaskinportenClient.cs')], ['Fiks IO / Arkiv', alL('src/Altinn.App.Clients.Fiks/FiksIO/FiksIOClient.cs')], ['NetsClient (payment)', AC('Features/Payment/Processors/Nets/NetsClient.cs')]] },
  { ...BSTY.jobs, items: [['Workflow engine callbacks (engine runs in the Studio runtime)', AA('WorkflowEngineCallbackController.cs')], ['EFormidlingStatusReader (delivery confirmation)', AC('EFormidling/Implementation/EFormidlingStatusReader.cs')], ['FiksArkivSubscriber', alL('src/Altinn.App.Clients.Fiks/FiksArkiv/FiksArkivSubscriber.cs')], ['LocaltestValidation', AC('Internal/LocaltestValidation.cs')]] },
  { ...BSTY.x, items: [['AuthorizationService / ProcessEngineAuthorizer', AC('Internal/Auth/AuthorizationService.cs')], ['AuthenticationContext', AC('Features/Auth/AuthenticationContext.cs')], ['ScopeAuthorizationMiddleware', alL('src/Altinn.App.Api/Infrastructure/Middleware/ScopeAuthorizationMiddleware.cs')], ['SecurityHeadersMiddleware', alL('src/Altinn.App.Api/Infrastructure/Middleware/SecurityHeadersMiddleware.cs')], ['Telemetry', AC('Features/Telemetry/Telemetry.cs')], ['FeatureFlags', AC('Features/FeatureFlags.cs')], ['Analyzers / source generators', alL('src/Altinn.App.Analyzers')]] },
  { ...BSTY.db, items: [['(no database: all state in Storage)', null], ['App files (config, layouts, texts)', AC('Implementation/AppResourcesSI.cs')], ['Azure Key Vault · app secrets', AC('Infrastructure/Clients/KeyVault/SecretsClient.cs')]] },
];

// ---- Storage ----
const STORAGE_COLS = [
  { name: 'Instances', home: ST('Controllers/InstancesController.cs'),
    api: [['InstancesController', ST('Controllers/InstancesController.cs')], ['StudioInstancesController', ST('Controllers/StudioInstancesController.cs')], ['InstanceLockController', ST('Controllers/InstanceLockController.cs')]],
    app: [['InstanceEventService', ST('Services/InstanceEventService.cs')], ['RegisterService', ST('Services/RegisterService.cs')]],
    data: [['PgInstanceRepository', ST('Repository/PgInstanceRepository.cs')], ['PgInstanceLockRepository', ST('Repository/PgInstanceLockRepository.cs')], ['storage.instances', ST('Migration/v0.00/01-setup-tables.sql')], ['storage.instancelocks', ST('Migration/v0.28/01-create-tables.sql')]] },
  { name: 'Data elements', home: ST('Controllers/DataController.cs'),
    api: [['DataController', ST('Controllers/DataController.cs')], ['DataLockController', ST('Controllers/DataLockController.cs')], ['InstanceMutationsController', ST('Controllers/InstanceMutationsController.cs')]],
    app: [['DataService', ST('Services/DataService.cs')]],
    data: [['PgDataRepository', ST('Repository/PgDataRepository.cs')], ['PgInstanceMutationRepository', ST('Repository/PgInstanceMutationRepository.cs')], ['BlobRepository', ST('Repository/BlobRepository.cs')], ['storage.dataElements', ST('Migration/v0.00/01-setup-tables.sql')], ['dataelementblobversions', ST('Migration/v0.34/00-create-blob-versioning.sql')], ['instance_mutation_idempotency', ST('Migration/v0.34/00-create-instance-mutation-idempotency.sql')]] },
  { name: 'Applications', home: ST('Controllers/ApplicationsController.cs'),
    api: [['ApplicationsController', ST('Controllers/ApplicationsController.cs')]],
    app: [['ApplicationService', ST('Services/ApplicationService.cs')], ['OrganisationService', ST('Services/OrganisationService.cs')]],
    data: [['PgApplicationRepository', ST('Repository/PgApplicationRepository.cs')], ['storage.applications', ST('Migration/v0.00/01-setup-tables.sql')]] },
  { name: 'Instance events', home: ST('Controllers/InstanceEventsController.cs'),
    api: [['InstanceEventsController', ST('Controllers/InstanceEventsController.cs')]],
    app: [['InstanceEventService', ST('Services/InstanceEventService.cs')]],
    data: [['PgInstanceEventRepository', ST('Repository/PgInstanceEventRepository.cs')], ['storage.instanceEvents', ST('Migration/v0.00/01-setup-tables.sql')]] },
  { name: 'Process', home: ST('Controllers/ProcessController.cs'),
    api: [['ProcessController', ST('Controllers/ProcessController.cs')]],
    app: [['ProcessDataCleanupService', ST('Services/ProcessDataCleanupService.cs')], ['ProcessAuthorizer', ST('Authorization/ProcessAuthorizer.cs')]],
    data: [['(process state on storage.instances)', null]] },
  { name: 'Messagebox & search', home: ST('Controllers/MessageboxInstancesController.cs'),
    api: [['MessageboxInstancesController', ST('Controllers/MessageboxInstancesController.cs')]],
    app: [['(ApplicationService, texts)', null]],
    data: [['(instances, events, texts, applications)', null]] },
  { name: 'Texts', home: ST('Controllers/TextsController.cs'),
    api: [['TextsController', ST('Controllers/TextsController.cs')]],
    app: [],
    data: [['PgTextRepository', ST('Repository/PgTextRepository.cs')], ['storage.texts', ST('Migration/v0.00/01-setup-tables.sql')]] },
  { name: 'Signing', home: ST('Controllers/SignController.cs'),
    api: [['SignController', ST('Controllers/SignController.cs')]],
    app: [['SigningService', ST('Services/SigningService.cs')]],
    data: [['(blob + dataElements)', null]] },
  { name: 'Cleanup & metrics', home: ST('Controllers/CleanupController.cs'),
    api: [['CleanupController', ST('Controllers/CleanupController.cs')], ['MetricsController', ST('Controllers/MetricsController.cs')]],
    app: [['MetricsService', ST('Services/MetricsService.cs')], ['StorageCleanupSettings', ST('Configuration/StorageCleanupSettings.cs')]],
    data: [['PgMetricsRepository', ST('Repository/PgMetricsRepository.cs')], ['cleanup SQL functions', ST('Migration/FunctionsAndProcedures')]] },
  { name: 'Altinn 1/2 migration & SBL', home: ST('Controllers/MigrationController.cs'),
    api: [['MigrationController', ST('Controllers/MigrationController.cs')], ['ContentOnDemandController', ST('Controllers/ContentOnDemandController.cs')], ['SblBridgeController', ST('Controllers/SblBridgeController.cs')]],
    app: [['A2OndemandFormattingService', ST('Services/A2OndemandFormattingService.cs')]],
    data: [['PgA2Repository', ST('Repository/PgA2Repository.cs')], ['a2xsls / a2codelists / a2images', ST('Migration/v0.10/01-setup-tables.sql')], ['a2migrationstate / a1migrationstate', ST('Migration/v0.14/01-setup-tables.sql')]] },
  { name: 'Sync to Dialogporten', home: ST('Services/OutboxService.cs'),
    api: [],
    app: [['OutboxService (lease + poll)', ST('Services/OutboxService.cs')], ['SyncInstanceToDialogportenCommand', ST('Messages/SyncInstanceToDialogportenCommand.cs')]],
    data: [['PgOutboxRepository', ST('Repository/PgOutboxRepository.cs')], ['storage.outbox / storage.leases', ST('Migration/v0.25/01-create-tables.sql')]] },
];
const STORAGE_LAYERS = [
  { key: 'api', name: 'API layer\n(controllers)', ...LSTY.api },
  { key: 'app', name: 'Services', ...LSTY.app },
  { key: 'data', name: 'Repositories /\ntables', ...LSTY.data },
];
const STORAGE_BARS = [
  { ...BSTY.int, items: [['RegisterService → Register', ST('Services/RegisterService.cs')], ['PEP (Altinn.Common.PEP) → Authorization', ST('Authorization/AuthorizationService.cs')], ['PartiesWithInstancesClient → SBL Bridge', ST('Clients/PartiesWithInstancesClient.cs')], ['CorrespondenceClient → SBL Bridge', ST('Clients/CorrespondenceClient.cs')], ['PdfGeneratorClient', ST('Clients/PdfGeneratorClient.cs')], ['AltinnCdnOrganisationRepository', ST('Repository/AltinnCdnOrganisationRepository.cs')], ['FileScanQueueClient', ST('Clients/FileScanQueueClient.cs')]] },
  { ...BSTY.jobs, items: [['OutboxService → Wolverine → Service Bus', ST('Services/OutboxService.cs')], ['(no consumers: Storage only sends)', null]] },
  { ...BSTY.x, items: [['StorageAccessHandler', ST('Authorization/StorageAccessHandler.cs')], ['ClaimsPrincipalProvider', ST('Authorization/ClaimsPrincipalProvider.cs')], ['ClientIpCheckActionFilter', ST('Filters/ClientIpCheckActionFilterAttribute.cs')], ['Telemetry', ST('Telemetry/Metrics.cs')], ['HealthCheck', ST('Health/HealthCheck.cs')], ['Storage.Interface (NuGet models)', stL('src/Storage.Interface')]] },
  { ...BSTY.db, items: [['PostgreSQL · storage', ST('Migration/v0.00/01-setup-tables.sql')], ['Azure Blob · one container per service owner', ST('Repository/BlobRepository.cs')], ['Azure Service Bus · altinn.dialogportenadapter.webapi', ST('Program.cs')], ['Azure Queue · file-scan-inbound', ST('Clients/FileScanQueueClient.cs')], ['Azure Key Vault', ST('Wrappers/KeyVaultClientWrapper.cs')]] },
];

// ---- place the Apps row ----
MARKS.apps = [cells.length, svg.length];
const APPS_TOP = DP_BOTTOM + PRODUCT_GAP;
productLabel(FX, APPS_TOP, 'Produkt: Apps');
const apfH = measure([APF_COLS], ['ui', 'rtk', 'api']);
const apf = renderGrid({ id: 'appfe-frame', x: FX, y: APPS_TOP + 60, title: 'App frontend  ·  app-frontend-react  (served from altinncdn.no, loaded by every app)', href: 'https://github.com/Altinn/app-frontend-react/tree/main',
  cols: APF_COLS, layers: APF_LAYERS, bars: APF_BARS, heights: apfH });
const appH = measure([APP_COLS], ['api', 'app', 'data']);
const APP_Y = apf.bottom + 60;
const app = renderGrid({ id: 'applib-frame', x: FX, y: APP_Y, title: 'App (backend)  ·  altinn-studio/src/App/backend  (Altinn.App.Api + Altinn.App.Core, one deployment per app)', href: 'https://github.com/Altinn/altinn-studio/tree/main/src/App/backend',
  cols: APP_COLS, layers: APP_LAYERS, bars: APP_BARS, heights: appH });
const APPS_APIM_Y = app.bottom + 24;
const STORAGE_Y = APPS_APIM_Y + 44 + 24;
const stH = measure([STORAGE_COLS], ['api', 'app', 'data']);
const sto = renderGrid({ id: 'storage-frame', x: FX, y: STORAGE_Y, title: 'Storage  ·  altinn-storage', href: 'https://github.com/Altinn/altinn-storage/tree/main',
  cols: STORAGE_COLS, layers: STORAGE_LAYERS, bars: STORAGE_BARS, heights: stH });
{
  const arrC = (x, y1, y2, color, label) => {
    svg.push(`<path d="M${x},${y1} L${x},${y2 - 7}" stroke="${color}" stroke-width="2" fill="none"/><path d="M${x},${y2} L${x - 5},${y2 - 8} L${x + 5},${y2 - 8} Z" fill="${color}"/>`);
    cells.push(`<mxCell id="am-e${nextId++}" value="${esc(esc(label || ''))}" style="endArrow=block;endFill=1;html=1;strokeWidth=2;strokeColor=${color};fontSize=10;labelBackgroundColor=#ffffff;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x}" y="${y1}" as="sourcePoint"/><mxPoint x="${x}" y="${y2}" as="targetPoint"/></mxGeometry></mxCell>`);
    if (label) svg.push(`<text x="${x + 8}" y="${(y1 + y2) / 2 + 4}" font-family="Helvetica" font-size="10px" fill="#333333">${esc(label)}</text>`);
  };
  arrC((FX + apf.right) / 2, apf.bottom, APP_Y, '#6c8ebf', 'same origin: https://{org}.apps.altinn.no/{org}/{app}/…');
  const aw = Math.max(app.right, sto.right) - FX;
  box({ x: FX, y: APPS_APIM_Y, w: aw, h: 44, font: 12, bold: true, rounded: true, fill: '#e6d0de', stroke: '#996185',
    value: 'Azure API Management (APIM)  ·  app → platform APIs with Ocp-Apim-Subscription-Key  ·  /storage/api · /authorization · /register · /profile · /events · /notifications · /correspondence',
    href: AC('Configuration/PlatformSettings.cs'),
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 12, fontStyle: 1, fillColor: '#e6d0de', strokeColor: '#996185' }) });
  arrC((FX + app.right) / 2, app.bottom, APPS_APIM_Y, '#996185');
  arrC((FX + sto.right) / 2, APPS_APIM_Y + 44, STORAGE_Y, '#996185');
}
const APPS_BOTTOM = sto.bottom + 10;
const APPS_RIGHT = Math.max(apf.right, app.right, sto.right);


// ================= Product: Events og Notifications (below Apps) =================
const evL = treeLinker('altinn-events', 'altinn-events');
const noL = treeLinker('altinn-notifications', 'altinn-notifications');
const E = p => evL('src/Events/' + p), EF = p => evL('src/Events.Functions/' + p), EM = p => E('Migration/' + p);

const EV_COLS = [
  { name: 'Publish events', home: E('Services/EventsService.cs'),
    api: [['EventsController · POST', E('Controllers/EventsController.cs')], ['AppController · POST', E('Controllers/AppController.cs')], ['StorageController · storage/events', E('Controllers/StorageController.cs')]],
    app: [['EventsService', E('Services/EventsService.cs')], ['RegistrationEventPublisher (ASB)', E('Wolverine/Publishers/RegistrationEventPublisher.cs')], ['StorageQueueRegistrationEventPublisher', E('Wolverine/Publishers/StorageQueueRegistrationEventPublisher.cs')], ['RegistrationEventHandler', E('Wolverine/Handlers/RegistrationEventHandler.cs')]],
    data: [['CloudEventRepository', E('Repository/CloudEventRepository.cs')], ['events.events (+ idempotencykey)', EM('v0.21/01-setup-table.sql')]] },
  { name: 'Retrieve / poll', home: E('Controllers/EventsController.cs'),
    api: [['EventsController · GET', E('Controllers/EventsController.cs')], ['AppController · GET {org}/{app}, party', E('Controllers/AppController.cs')]],
    app: [['EventsService', E('Services/EventsService.cs')], ['CachingRegisterService', E('Services/CachingRegisterService.cs')]],
    data: [['getevents / getappevents (SQL)', EM('FunctionsAndProcedures/getevents.sql')]] },
  { name: 'Subscriptions', home: E('Services/SubscriptionService.cs'),
    api: [['SubscriptionController (CRUD, validate)', E('Controllers/SubscriptionController.cs')]],
    app: [['SubscriptionService', E('Services/SubscriptionService.cs')], ['AppSubscriptionService', E('Services/AppSubscriptionService.cs')], ['GenericSubscriptionService', E('Services/GenericSubscriptionService.cs')], ['SubscriptionValidationPublisher', E('Wolverine/Publishers/SubscriptionValidationPublisher.cs')]],
    data: [['SubscriptionRepository (+ cache)', E('Repository/SubscriptionRepository.cs')], ['events.subscription', EM('v0.03/01-setup-tables.sql')]] },
  { name: 'Inbound / outbound fan-out', home: E('Services/OutboundService.cs'),
    api: [['InboundController', E('Controllers/InboundController.cs')], ['OutboundController', E('Controllers/OutboundController.cs')]],
    app: [['OutboundService (match + PDP)', E('Services/OutboundService.cs')], ['InboundEventHandler', E('Wolverine/Handlers/InboundEventHandler.cs')]],
    data: [['(events.subscription)', null]] },
  { name: 'Webhook delivery', home: EF('Services/WebhookService.cs'),
    api: [['WebhookReceiverController (test)', E('Controllers/WebhookReceiverController.cs')]],
    app: [['OutboundEventHandler (API)', E('Wolverine/Handlers/OutboundEventHandler.cs')], ['WebhookService (Functions)', EF('Services/WebhookService.cs')], ['AsbWebhookService', EF('Services/AsbWebhookService.cs')]],
    data: [] },
  { name: 'Authorization (PDP)', home: E('Services/AuthorizationService.cs'),
    api: [],
    app: [['AuthorizationService', E('Services/AuthorizationService.cs')], ['App / Generic CloudEvent XACML mappers', E('Authorization/AppCloudEventXacmlMapper.cs')], ['SubscriptionXacmlMapper', E('Authorization/SubscriptionXacmlMapper.cs')]],
    data: [] },
  { name: 'Trace logs', home: E('Services/TraceLogService.cs'),
    api: [['LogsController · storage/events/logs', E('Controllers/LogsController.cs')]],
    app: [['TraceLogService', E('Services/TraceLogService.cs')]],
    data: [['TraceLogRepository', E('Repository/TraceLogRepository.cs')], ['events.trace_log (partitioned)', EM('v0.46/01-setup-tables.sql')]] },
  { name: 'Retry & poison', home: EF('Services/RetryBackoffService.cs'),
    api: [],
    app: [['RetryBackoffService', EF('Services/RetryBackoffService.cs')], ['QueueRegistration (outbound, poison)', EF('Configuration/QueueRegistration.cs')], ['RetryableEventWrapper', evL('src/Events.Common/Models/RetryableEventWrapper.cs')]],
    data: [] },
];
const EV_BARS = [
  { ...BSTY.int, items: [['RegisterApiClient → Register', E('Services/RegisterApiClient.cs')], ['PEP (PDPAppSI) → Authorization', E('Services/AuthorizationService.cs')], ['Webhooks / Slack (subscribers)', EF('Services/WebhookService.cs')], ['EventsClient (Functions → Events API)', EF('Clients/EventsClient.cs')], ['EventsQueueClient', E('Clients/EventsQueueClient.cs')]] },
  { ...BSTY.jobs, items: [['Fn EventsRegistration (events-registration)', EF('EventsRegistration.cs')], ['Fn EventsInbound (events-inbound)', EF('EventsInbound.cs')], ['Fn EventsOutbound (events-outbound)', EF('EventsOutbound.cs')], ['Fn SubscriptionValidation', EF('SubscriptionValidation.cs')], ['Wolverine handlers on ASB (flagged)', E('Configuration/WolverineSettings.cs')]] },
  { ...BSTY.x, items: [['PublishScopeOrAccessToken / ScopeAccess', E('Authorization/PublishScopeOrAccessTokenRequirement.cs')], ['CloudEvent formatters', E('Formatters/CloudEventJsonInputFormatter.cs')], ['Telemetry', E('Telemetry/TelemetryClient.cs')], ['HealthCheck', E('Health/HealthCheck.cs')]] },
  { ...BSTY.db, items: [['PostgreSQL · events (90-day purge)', EM('v0.21/03-setup-cron-job.sql')], ['Azure Storage Queues · registration, inbound, outbound(+poison), validation', E('Configuration/QueueStorageSettings.cs')], ['Azure Service Bus · altinn.events.*', E('Configuration/WolverineSettings.cs')], ['Key Vault · access token cert', EF('Services/KeyVaultService.cs')]] },
];

// ---- Notifications ----
const NA = 'components/api/src/';
const NC = p => noL(NA + 'Altinn.Notifications.Core/Services/' + p), NR = p => noL(NA + 'Altinn.Notifications.Persistence/Repository/' + p);
const NK = p => noL(NA + 'Altinn.Notifications/Controllers/' + p), NM = p => noL(NA + 'Altinn.Notifications.Persistence/Migration/' + p);
const NI = p => noL(NA + 'Altinn.Notifications.Integrations/' + p);
const NO_COLS = [
  { name: 'Orders', home: NC('OrderRequestService.cs'),
    api: [['OrdersController', NK('OrdersController.cs')], ['FutureOrdersController', NK('FutureOrdersController.cs')], ['ComposedEmailOrdersController', NK('ComposedEmailOrdersController.cs')]],
    app: [['OrderRequestService', NC('OrderRequestService.cs')], ['ComposedEmailOrderRequestService', NC('ComposedEmailOrderRequestService.cs')], ['GetOrderService', NC('GetOrderService.cs')], ['KeywordsService', NC('KeywordsService.cs')]],
    data: [['OrderRepository', NR('OrderRepository.cs')], ['orders / emailtexts', NM('v0.01/03-setup-tables.sql')], ['smstexts', NM('v0.15/01-setup-tables.sql')], ['orderschain', NM('v0.37/02-new-table.sql')]] },
  { name: 'Instant orders', home: NC('InstantOrderRequestService.cs'),
    api: [['InstantOrdersController', NK('InstantOrdersController.cs')]],
    app: [['InstantOrderRequestService', NC('InstantOrderRequestService.cs')]],
    data: [['(orderschain, orders, *notifications)', null]] },
  { name: 'Processing & scheduling', home: NC('OrderProcessingService.cs'),
    api: [['TriggerController', NK('TriggerController.cs')]],
    app: [['OrderProcessingService', NC('OrderProcessingService.cs')], ['Email / Sms / EmailAndSms processing', NC('EmailAndSmsOrderProcessingService.cs')], ['PreferredChannelProcessingService', NC('PreferredChannelProcessingService.cs')], ['NotificationScheduleService', NC('NotificationScheduleService.cs')], ['TerminateExpiredService', NC('TerminateExpiredService.cs')]],
    data: [['getorderspastsendtime… (SQL)', NM('FunctionsAndProcedures')]] },
  { name: 'Email notifications', home: NC('EmailNotificationService.cs'),
    api: [['EmailNotificationsController', NK('EmailNotificationsController.cs')]],
    app: [['EmailNotificationService', NC('EmailNotificationService.cs')], ['EmailNotificationSummaryService', NC('EmailNotificationSummaryService.cs')], ['NotificationsEmailServiceUpdateService', NC('NotificationsEmailServiceUpdateService.cs')]],
    data: [['EmailNotificationRepository', NR('EmailNotificationRepository.cs')], ['emailnotifications', NM('v0.02/02-setup-table.sql')], ['resourcelimitlog', NM('v0.13/01-setup-table.sql')]] },
  { name: 'SMS notifications', home: NC('SmsNotificationService.cs'),
    api: [['SmsNotificationsController', NK('SmsNotificationsController.cs')]],
    app: [['SmsNotificationService', NC('SmsNotificationService.cs')], ['SmsNotificationSummaryService', NC('SmsNotificationSummaryService.cs')]],
    data: [['SmsNotificationRepository', NR('SmsNotificationRepository.cs')], ['smsnotifications', NM('v0.16/02-setup-table.sql')]] },
  { name: 'Recipient lookup', home: NC('ContactPointService.cs'),
    api: [],
    app: [['ContactPointService', NC('ContactPointService.cs')]],
    data: [['(Profile + Register, no table)', null]] },
  { name: 'Delivery reports & status feed', home: NC('StatusFeedService.cs'),
    api: [['StatusFeedController', NK('StatusFeedController.cs')], ['ShipmentController', NK('ShipmentController.cs')]],
    app: [['StatusFeedService', NC('StatusFeedService.cs')], ['NotificationDeliveryManifestService', NC('NotificationDeliveryManifestService.cs')], ['DeadDeliveryReportService', NC('DeadDeliveryReportService.cs')], ['AltinnServiceUpdateService', NC('AltinnServiceUpdateService.cs')]],
    data: [['StatusFeedRepository', NR('StatusFeedRepository.cs')], ['statusfeed', NM('v0.44/01-new-table.sql')], ['deaddeliveryreports', NM('v0.57/01-setup-table.sql')]] },
  { name: 'Cancellation', home: NC('CancelOrderService.cs'),
    api: [['OrdersController · {id}/cancel', NK('OrdersController.cs')]],
    app: [['CancelOrderService', NC('CancelOrderService.cs')]],
    data: [['cancelorder (SQL)', NM('FunctionsAndProcedures/cancelorder.sql')]] },
  { name: 'Metrics & dashboard', home: NC('MetricsService.cs'),
    api: [['MetricsController', NK('MetricsController.cs')], ['DashboardController', NK('DashboardController.cs')]],
    app: [['MetricsService', NC('MetricsService.cs')], ['DashboardService', NC('DashboardService.cs')]],
    data: [['Metrics / DashboardRepository', NR('MetricsRepository.cs')], ['email_metrics_recent (view)', NM('v0.88/01-setup-views.sql')]] },
  { name: 'Notification log', home: NC('NotificationLogService.cs'),
    api: [['NotificationLogController', NK('NotificationLogController.cs')]],
    app: [['NotificationLogService', NC('NotificationLogService.cs')]],
    data: [['NotificationLogRepository', NR('NotificationLogRepository.cs')], ['notificationlog', NM('v0.92/01-create-table.sql')]] },
];
const NO_BARS = [
  { ...BSTY.int, items: [['ProfileClient → Profile (incl. KRR)', NI('Profile/ProfileClient.cs')], ['RegisterClient → Register', NI('Register/RegisterClient.cs')], ['AuthorizationService → Authorization', NI('Authorization/AuthorizationService.cs')], ['DialogportenClient → Dialogporten', NI('Dialogporten/DialogportenClient.cs')], ['SendConditionClient → service owner (Maskinporten)', NI('SendCondition/SendConditionClient.cs')], ['InstantEmail / ShortMessageService clients', NI('InstantEmailService/InstantEmailServiceClient.cs')]] },
  { ...BSTY.jobs, items: [['EmailPublishBackgroundService', NC('EmailPublishBackgroundService.cs')], ['ComposedEmailPublishBackgroundService', NC('ComposedEmailPublishBackgroundService.cs')], ['SmsPublishBackgroundService', NC('SmsPublishBackgroundService.cs')], ['PastDueOrdersBackgroundService', NC('PastDueOrdersBackgroundService.cs')], ['Wolverine publishers → email/sms send', NI('Wolverine/Publishers/EmailCommandPublisher.cs')], ['Wolverine handlers ← results, delivery reports, rate limit', NI('Wolverine/Handlers/EmailSendResultHandler.cs')]] },
  { ...BSTY.x, items: [['AuthenticationContext / scope requirements', noL(NA + 'Altinn.Notifications/Authorization/AuthenticationContext.cs')], ['OrgExtractorMiddleware', noL(NA + 'Altinn.Notifications/Middleware/OrgExtractorMiddleware.cs')], ['DeliveryReportMetrics', NI('Telemetry/DeliveryReportMetrics.cs')], ['QueueRetryPolicy (shared)', noL('components/shared/src/Altinn.Notifications.Shared/Configuration/QueueRetryPolicy.cs')]] },
  { ...BSTY.db, items: [['PostgreSQL · notifications', NM('v0.00/01-setup-schema.sql')], ['Azure Service Bus · altinn.notifications.*', noL(NA + 'Altinn.Notifications/appsettings.json')], ['Key Vault', noL(NA + 'Altinn.Notifications/Configuration/KeyVaultSettings.cs')]] },
];

const ES = 'components/email-service/src/', SS = 'components/sms-service/src/';
const EMAIL_COLS = [
  { name: 'Send email', home: noL(ES + 'Altinn.Notifications.Email.Core/Sending/SendingService.cs'),
    api: [['InstantEmailController', noL(ES + 'Altinn.Notifications.Email/Controllers/InstantEmailController.cs')]],
    app: [['SendEmailCommandHandler', noL(ES + 'Altinn.Notifications.Email.Integrations/Wolverine/Handlers/SendEmailCommandHandler.cs')], ['SendComposedEmailCommandHandler', noL(ES + 'Altinn.Notifications.Email.Integrations/Wolverine/Handlers/SendComposedEmailCommandHandler.cs')], ['SendingService', noL(ES + 'Altinn.Notifications.Email.Core/Sending/SendingService.cs')]],
    data: [['SAS attachment references (Blob)', noL(ES + 'Altinn.Notifications.Email.Core/Sending/SasFileAttachmentReference.cs')]] },
  { name: 'Status & rate limit', home: noL(ES + 'Altinn.Notifications.Email.Integrations/Publishers/EmailSendResultPublisher.cs'),
    api: [],
    app: [['CheckEmailSendStatusHandler (self-loop)', noL(ES + 'Altinn.Notifications.Email.Integrations/Wolverine/Handlers/CheckEmailSendStatusHandler.cs')], ['EmailSendResultPublisher', noL(ES + 'Altinn.Notifications.Email.Integrations/Publishers/EmailSendResultPublisher.cs')], ['EmailServiceRateLimitPublisher', noL(ES + 'Altinn.Notifications.Email.Integrations/Publishers/EmailServiceRateLimitPublisher.cs')]],
    data: [] },
];
const EMAIL_BARS = [
  { ...BSTY.int, items: [['EmailServiceClient → Azure Communication Services', noL(ES + 'Altinn.Notifications.Email.Integrations/Clients/EmailServiceClient.cs')]] },
  { ...BSTY.jobs, items: [['Wolverine on ASB', noL(ES + 'Altinn.Notifications.Email/appsettings.json')]] },
  { ...BSTY.x, items: [] },
  { ...BSTY.db, items: [['ACS Email + Event Grid (delivery reports)', noL(ES + 'Altinn.Notifications.Email.Integrations/Clients/EmailServiceClient.cs')]] },
];
const SMS_COLS = [
  { name: 'Send SMS', home: noL(SS + 'Altinn.Notifications.Sms.Core/Sending/SendingService.cs'),
    api: [['InstantMessageController', noL(SS + 'Altinn.Notifications.Sms/Controllers/InstantMessageController.cs')]],
    app: [['SendSmsCommandHandler', noL(SS + 'Altinn.Notifications.Sms.Integrations/Wolverine/Handlers/SendSmsCommandHandler.cs')], ['SendingService', noL(SS + 'Altinn.Notifications.Sms.Core/Sending/SendingService.cs')], ['SmsSendResultPublisher', noL(SS + 'Altinn.Notifications.Sms.Integrations/Publishers/SmsSendResultPublisher.cs')]],
    data: [] },
  { name: 'Delivery reports', home: noL(SS + 'Altinn.Notifications.Sms.Core/Status/StatusService.cs'),
    api: [['DeliveryReportController (basic auth)', noL(SS + 'Altinn.Notifications.Sms/Controllers/DeliveryReportController.cs')]],
    app: [['StatusService', noL(SS + 'Altinn.Notifications.Sms.Core/Status/StatusService.cs')], ['SmsDeliveryReportPublisher', noL(SS + 'Altinn.Notifications.Sms.Integrations/Publishers/SmsDeliveryReportPublisher.cs')]],
    data: [] },
];
const SMS_BARS = [
  { ...BSTY.int, items: [['SmsClient / AltinnGatewayClient → Link Mobility', noL(SS + 'Altinn.Notifications.Sms.Integrations/LinkMobility/SmsClient.cs')]] },
  { ...BSTY.jobs, items: [['Wolverine on ASB', noL(SS + 'Altinn.Notifications.Sms/appsettings.json')]] },
  { ...BSTY.x, items: [['BasicAuthenticationHandler', noL(SS + 'Altinn.Notifications.Sms/Configuration/BasicAuthenticationHandler.cs')]] },
  { ...BSTY.db, items: [['(none: stateless)', null]] },
];

// ---- place the row ----
MARKS.evn = [cells.length, svg.length];
const EVN_TOP = APPS_BOTTOM + PRODUCT_GAP;
productLabel(FX, EVN_TOP, 'Produkt: Events og Notifications');
const EVN_APIM_Y = EVN_TOP + 60;
const EVN_ROW_Y = EVN_APIM_Y + 44 + 24;
const L3 = [
  { key: 'api', name: 'API layer\n(controllers)', ...LSTY.api },
  { key: 'app', name: 'Services /\nhandlers', ...LSTY.app },
  { key: 'data', name: 'Repositories /\ntables', ...LSTY.data },
];
const evnH = measure([EV_COLS, NO_COLS, EMAIL_COLS, SMS_COLS], ['api', 'app', 'data']);
const evF = renderGrid({ id: 'events-frame', x: FX, y: EVN_ROW_Y, title: 'Events  ·  altinn-events  (API + Azure Functions)', href: 'https://github.com/Altinn/altinn-events/tree/main', cols: EV_COLS, layers: L3, bars: EV_BARS, heights: evnH });
const noF = renderGrid({ id: 'notif-frame', x: evF.right + 80, y: EVN_ROW_Y, title: 'Notifications API  ·  altinn-notifications/components/api', href: 'https://github.com/Altinn/altinn-notifications/tree/main/components/api', cols: NO_COLS, layers: L3, bars: NO_BARS, heights: evnH });
const emF = renderGrid({ id: 'email-frame', x: noF.right + 80, y: EVN_ROW_Y, title: 'Email service  ·  components/email-service', href: 'https://github.com/Altinn/altinn-notifications/tree/main/components/email-service', cols: EMAIL_COLS, layers: L3, bars: EMAIL_BARS, heights: evnH });
const smF = renderGrid({ id: 'sms-frame', x: emF.right + 80, y: EVN_ROW_Y, title: 'SMS service  ·  components/sms-service', href: 'https://github.com/Altinn/altinn-notifications/tree/main/components/sms-service', cols: SMS_COLS, layers: L3, bars: SMS_BARS, heights: evnH });
{
  box({ x: FX, y: EVN_APIM_Y, w: noF.right - FX, h: 44, font: 12, bold: true, rounded: true, fill: '#e6d0de', stroke: '#996185',
    value: 'Azure API Management (APIM)  ·  callers: apps, Dialogporten, Storage, service owners, end-user systems  ·  /events/api · /notifications/api',
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 12, fontStyle: 1, fillColor: '#e6d0de', strokeColor: '#996185' }) });
  const arr = (x, y1, y2) => {
    svg.push(`<path d="M${x},${y1} L${x},${y2 - 7}" stroke="#996185" stroke-width="2" fill="none"/><path d="M${x},${y2} L${x - 5},${y2 - 8} L${x + 5},${y2 - 8} Z" fill="#996185"/>`);
    cells.push(`<mxCell id="am-e${nextId++}" value="" style="endArrow=block;endFill=1;html=1;strokeWidth=2;strokeColor=#996185;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x}" y="${y1}" as="sourcePoint"/><mxPoint x="${x}" y="${y2}" as="targetPoint"/></mxGeometry></mxCell>`);
  };
  arr((FX + evF.right) / 2, EVN_APIM_Y + 44, EVN_ROW_Y);
  arr((evF.right + 80 + noF.right) / 2, EVN_APIM_Y + 44, EVN_ROW_Y);
  // Service Bus link between Notifications API and the Email/SMS services
  const sbY = EVN_ROW_Y - 40;
  box({ x: emF.right - (emF.right - (noF.right + 80)) , y: sbY - 4, w: smF.right - (noF.right + 80), h: 30, font: 10, rounded: true, fill: '#b1ddf0', stroke: '#10739e',
    value: 'Azure Service Bus  ·  email.send / composedemail.send / sms.send  →  ← send.result, deliveryreports, ratelimit',
    href: noL('components/shared/src/Altinn.Notifications.Shared/Extensions/WolverineOptionsExtensions.cs'),
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 10, fillColor: '#b1ddf0', strokeColor: '#10739e' }) });
}
// external providers under the Email and SMS services
const EVN_EXT_Y = Math.max(evF.bottom, noF.bottom, emF.bottom, smF.bottom) + 50;
[[emF, 'Azure Communication Services', 'e-post + Event Grid'], [smF, 'Link Mobility', 'SMS-gateway (PSWin)']].forEach(([f, n, how]) => {
  const w = 220, x = (f.right + (f === emF ? noF.right + 80 : emF.right + 80)) / 2 - w / 2, cx = x + w / 2;
  box({ x, y: EVN_EXT_Y, w, h: 50, value: `${n}\n${how}`, font: 10, rounded: true, fill: '#e0e0e0', stroke: '#4d4d4d', dashed: true,
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 10, fillColor: '#e0e0e0', strokeColor: '#4d4d4d', dashed: 1 }) });
  svg.push(`<path d="M${cx},${f.bottom} L${cx},${EVN_EXT_Y - 7}" stroke="#4d4d4d" stroke-width="2" fill="none"/><path d="M${cx},${EVN_EXT_Y} L${cx - 5},${EVN_EXT_Y - 8} L${cx + 5},${EVN_EXT_Y - 8} Z" fill="#4d4d4d"/>`);
  cells.push(`<mxCell id="am-e${nextId++}" value="" style="endArrow=block;endFill=1;html=1;strokeWidth=2;strokeColor=#4d4d4d;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${cx}" y="${f.bottom}" as="sourcePoint"/><mxPoint x="${cx}" y="${EVN_EXT_Y}" as="targetPoint"/></mxGeometry></mxCell>`);
});
const EVN_BOTTOM = EVN_EXT_Y + 60;
const EVN_RIGHT = smF.right;


// ================= Product: Melding og formidling (below Events og Notifications) =================
const coL = treeLinker('altinn-correspondence', 'altinn-correspondence');
const brL = treeLinker('altinn-broker', 'altinn-broker');
const CA = p => coL('src/Altinn.Correspondence.API/' + p), CAp = p => coL('src/Altinn.Correspondence.Application/' + p);
const CI = p => coL('src/Altinn.Correspondence.Integrations/' + p), CP = p => coL('src/Altinn.Correspondence.Persistence/' + p);
const CENT = coL('src/Altinn.Correspondence.Core/Models/Entities');
const CC = CA('Controllers/CorrespondenceController.cs');
const CO_COLS = [
  { name: 'Initialize & publish', home: CAp('InitializeCorrespondences/InitializeCorrespondencesHandler.cs'),
    api: [['Correspondence · POST, /upload', CC]],
    app: [['InitializeCorrespondencesHandler', CAp('InitializeCorrespondences/InitializeCorrespondencesHandler.cs')], ['InitializeCorrespondenceHelper', CAp('Helpers/InitializeCorrespondenceHelper.cs')], ['PublishCorrespondenceHandler', CAp('PublishCorrespondence/PublishCorrespondenceHandler.cs')], ['ManualRetryNotPublished…', CAp('ManualRetryNotPublishedCorrespondences/ManualRetryNotPublishedCorrespondencesHandler.cs')]],
    data: [['CorrespondenceRepository', CP('Repositories/CorrespondenceRepository.cs')], ['IdempotencyKeyRepository', CP('Repositories/IdempotencyKeyRepository.cs')], ['Correspondences, Contents, ReplyOptions', CENT], ['ExternalReferences, IdempotencyKeys', CENT]] },
  { name: 'Attachments & malware scan', home: CAp('UploadAttachment/UploadAttachmentHandler.cs'),
    api: [['AttachmentController', CA('Controllers/AttachmentController.cs')], ['MalwareScanController (Event Grid webhook)', CA('Controllers/MalwareScanController.cs')]],
    app: [['InitializeAttachmentHandler', CAp('InitializeAttachment/InitializeAttachmentHandler.cs')], ['UploadAttachmentHandler', CAp('UploadAttachment/UploadAttachmentHandler.cs')], ['MalwareScanResultHandler', CAp('MalwareScanResult/MalwareScanResultHandler.cs')], ['Purge / ExpireAttachmentHandler', CAp('PurgeAttachment/PurgeAttachmentHandler.cs')]],
    data: [['AttachmentRepository', CP('Repositories/AttachmentRepository.cs')], ['StorageRepository (Blob)', CP('Repositories/StorageRepository.cs')], ['Attachments, AttachmentStatuses', CENT]] },
  { name: 'Retrieve & download', home: CAp('GetCorrespondenceOverview/GetCorrespondenceOverviewHandler.cs'),
    api: [['Correspondence · GET list, {id}, details, content', CC], ['… attachment download / downloadall', CC]],
    app: [['GetCorrespondencesHandler', CAp('GetCorespondences/GetCorrespondencesHandler.cs')], ['GetCorrespondenceOverview / Details', CAp('GetCorrespondenceOverview/GetCorrespondenceOverviewHandler.cs')], ['DownloadCorrespondenceAttachment', CAp('DownloadCorrespondenceAttachment/DownloadCorrespondenceAttachmentHandler.cs')], ['DownloadAllCorrespondenceAttachments', CAp('DownloadAllCorrespondenceAttachments/DownloadAllCorrespondenceAttachmentsHandler.cs')]],
    data: [['CorrespondenceFetches', CENT]] },
  { name: 'Status changes', home: CAp('ConfirmCorrespondence/ConfirmCorrespondenceHandler.cs'),
    api: [['Correspondence · markasread, confirm, purge', CC]],
    app: [['MarkCorrespondenceAsReadHandler', CAp('MarkCorrespondenceAsRead/MarkCorrespondenceAsReadHandler.cs')], ['ConfirmCorrespondenceHandler', CAp('ConfirmCorrespondence/ConfirmCorrespondenceHandler.cs')], ['PurgeCorrespondenceHandler', CAp('PurgeCorrespondence/PurgeCorrespondenceHandler.cs')], ['CorrespondenceDueDateHandler', CAp('CorrespondenceDueDate/CorrespondenceDueDateHandler.cs')]],
    data: [['CorrespondenceStatusRepository', CP('Repositories/CorrespondenceStatusRepository.cs')], ['CorrespondenceStatuses, DeleteEvents', CENT]] },
  { name: 'Forwarding', home: CAp('ForwardCorrespondence/ForwardCorrespondenceHandler.cs'),
    api: [['Correspondence · {id}/forward (+ check)', CC]],
    app: [['ForwardCorrespondenceHandler', CAp('ForwardCorrespondence/ForwardCorrespondenceHandler.cs')], ['CanCorrespondenceBeForwarded', CAp('ForwardCorrespondence/CanCorrespondenceBeForwardedHandler.cs')], ['CheckForwardedCorrespondenceDelivery', CAp('CheckForwardedCorrespondenceDelivery/CheckForwardedCorrespondenceDeliveryHandler.cs')]],
    data: [['CorrespondenceForwardingEventRepository', CP('Repositories/CorrespondenceForwardingEventRepository.cs')]] },
  { name: 'Notifications & reminders', home: CAp('CreateNotificationOrder/CreateNotificationOrderHandler.cs'),
    api: [['Correspondence · notification/check', CC], ['ConfidentialReminderController', CA('Controllers/ConfidentialReminderController.cs')]],
    app: [['CreateNotificationOrderHandler', CAp('CreateNotificationOrder/CreateNotificationOrderHandler.cs')], ['SendNotificationOrderHandler', CAp('SendNotificationOrder/SendNotificationOrderHandler.cs')], ['CheckNotificationDeliveryHandler', CAp('CheckNotificationDelivery/CheckNotificationDeliveryHandler.cs')], ['UnreadConfidentialReminderHandler', CAp('UnreadConfidentialCorrespondenceReminder/UnreadConfidentialCorrespondenceReminderHandler.cs')]],
    data: [['CorrespondenceNotificationRepository', CP('Repositories/CorrespondenceNotificationRepository.cs')], ['NotificationTemplates, ConfidentialReminders', CENT]] },
  { name: 'Dialogporten sync & maintenance', home: CI('Dialogporten/DialogportenService.cs'),
    api: [['MaintenanceController', CA('Controllers/MaintenanceController.cs')]],
    app: [['DialogportenService (enqueued)', CI('Dialogporten/DialogportenService.cs')], ['CleanupOrphaned / PerishingDialogs', CAp('CleanupOrphanedDialogs/CleanupOrphanedDialogsHandler.cs')], ['RestoreSoftDeletedDialogs', CAp('RestoreSoftDeletedDialogs/RestoreSoftDeletedDialogsHandler.cs')]],
    data: [] },
  { name: 'Service owner onboarding', home: CAp('InitializeServiceOwner/InitializeServiceOwnerHandler.cs'),
    api: [['Maintenance · initialize-service-owner', CA('Controllers/MaintenanceController.cs')]],
    app: [['InitializeServiceOwnerHandler', CAp('InitializeServiceOwner/InitializeServiceOwnerHandler.cs')], ['AzureResourceManagerService', CI('Azure/AzureResourceManagerService.cs')]],
    data: [['ServiceOwnerRepository', CP('Repositories/ServiceOwnerRepository.cs')], ['ServiceOwners, StorageProviders', CENT]] },
  { name: 'Statistics & ops', home: CA('Controllers/StatisticsController.cs'),
    api: [['StatisticsController', CA('Controllers/StatisticsController.cs')]],
    app: [['GenerateDailySummaryReport', CAp('GenerateReport/GenerateDailySummaryReportHandler.cs')], ['Cleanup (bruksmønster, bulk fetch, migrated)', CAp('CleanupBruksmonster/CleanupBruksmonsterHandler.cs')]],
    data: [] },
];
const CO_BARS = [
  { ...BSTY.int, items: [['Authorization (PDP/XACML)', CI('Altinn/Authorization/AltinnAuthorizationService.cs')], ['Access Management', CI('Altinn/AccessManagement/AltinnAccessManagementService.cs')], ['Resource Registry', CI('Altinn/ResourceRegistry/ResourceRegistryService.cs')], ['Register', CI('Altinn/Register/AltinnRegisterService.cs')], ['Profile', CI('Altinn/Profile/AltinnProfileService.cs')], ['Notifications', CI('Altinn/Notifications/AltinnNotificationService.cs')], ['Dialogporten', CI('Dialogporten/DialogportenService.cs')], ['Events', CI('Altinn/Events/AltinnEventBus.cs')], ['Altinn 2 storage sync', CI('Altinn/Storage/AltinnStorageService.cs')], ['KRR', CI('Altinn/ContactReservationRegistry/ContactReservationRegistryService.cs')], ['Maskinporten', CI('Maskinporten/MaskinportenTokenService.cs')]] },
  { ...BSTY.jobs, items: [['Hangfire (default, live-migration, migration)', CI('Hangfire/HangfireQueues.cs')], ['Recurring jobs (IP rules, reports, JWK rotation)', CA('Helpers/RecurringJobRegistration.cs')], ['ChainedBatchJobOrchestrator', CAp('BatchJobs/ChainedBatchJobOrchestrator.cs')], ['Enqueued: publish, notify, Dialogporten, events', CAp('Helpers/HangfireScheduleHelper.cs')]] },
  { ...BSTY.x, items: [['Auth schemes (Altinn, Maskinporten, Dialogporten, ID-porten)', CA('Auth/DependencyInjection.cs')], ['XACML mappers', CI('Idporten/IdPortenXacmlMapper.cs')], ['HybridCacheWrapper', coL('src/Altinn.Correspondence.Common/Caching/HybridCacheWrapper.cs')], ['OpenTelemetry', CI('OpenTelemetry/DependencyInjection.cs')], ['PostgresAdvisoryLock', CP('Helpers/PostgresAdvisoryLock.cs')]] },
  { ...BSTY.db, items: [['PostgreSQL · correspondence (+ Hangfire)', CP('Data/ApplicationDbContext.cs')], ['Azure Blob · account per service owner', CP('Repositories/StorageRepository.cs')], ['Defender for Storage + Event Grid', coL('.azure/modules/virusScan/create.bicep')], ['Redis', coL('.azure/modules/redis/main.bicep')], ['Key Vault', coL('.azure/modules/keyvault/create.bicep')]] },
];

// ---- Broker ----
const BA = p => brL('src/Altinn.Broker.API/' + p), BAp = p => brL('src/Altinn.Broker.Application/' + p);
const BI = p => brL('src/Altinn.Broker.Integrations/' + p), BP = p => brL('src/Altinn.Broker.Persistence/' + p);
const BMIG = BP('Migrations');
const BFT = BA('Controllers/FileTransferController.cs');
const BR_COLS = [
  { name: 'Initialize & upload (TUS)', home: BAp('InitializeFileTransfer/InitializeFileTransferHandler.cs'),
    api: [['FileTransfer · POST, upload', BFT], ['TUS endpoints (resumable)', BA('Tus/TusEndpointExtensions.cs')]],
    app: [['InitializeFileTransferHandler', BAp('InitializeFileTransfer/InitializeFileTransferHandler.cs')], ['UploadFileHandler', BAp('UploadFile/UploadFileHandler.cs')], ['CompleteFileUploadHandler', BAp('UploadFile/CompleteFileUploadHandler.cs')], ['TUS concatenate / publish', BAp('UploadFile/Tus/TusPublishUploadHandler.cs')]],
    data: [['FileTransferRepository', BP('Repositories/FileTransferRepository.cs')], ['file_transfer (+ property, status)', BMIG], ['actor', BMIG]] },
  { name: 'Download & confirm', home: BAp('DownloadFile/DownloadFileHandler.cs'),
    api: [['FileTransfer · download, confirmdownload', BFT]],
    app: [['DownloadFileHandler', BAp('DownloadFile/DownloadFileHandler.cs')], ['ConfirmDownloadHandler', BAp('ConfirmDownload/ConfirmDownloadHandler.cs')], ['ManifestDownloadStream', brL('src/Altinn.Broker.Core/Helpers/ManifestDownloadStream.cs')]],
    data: [['ActorFileTransferStatusRepository', BP('Repositories/ActorFileTransferStatusRepository.cs')], ['actor_file_transfer_status (+ latest)', BMIG]] },
  { name: 'Status, overview & search', home: BAp('GetFileTransferOverview/GetFileTransferOverviewHandler.cs'),
    api: [['FileTransfer · GET {id}, details, search', BFT], ['FrontendController', BA('Controllers/FrontendController.cs')], ['PartyController', BA('Controllers/PartyController.cs')]],
    app: [['GetFileTransferOverview / Details', BAp('GetFileTransferOverview/GetFileTransferOverviewHandler.cs')], ['GetFileTransfers / Summaries', BAp('GetFileTransfers/GetFileTransfersHandler.cs')], ['GetAuthorizedPartiesHandler', BAp('GetAuthorizedParties/GetAuthorizedPartiesHandler.cs')]],
    data: [['PartyRepository', BP('Repositories/PartyRepository.cs')], ['party', BMIG]] },
  { name: 'Resource & service owner setup', home: BAp('ConfigureResource/ConfigureResourceHandler.cs'),
    api: [['ResourceController', BA('Controllers/ResourceController.cs')], ['ServiceOwnerController', BA('Controllers/ServiceOwnerController.cs')]],
    app: [['ConfigureResourceHandler', BAp('ConfigureResource/ConfigureResourceHandler.cs')], ['GetAuthorizedResources / AllowedRecipients', BAp('GetAuthorizedResources/GetAuthorizedResourcesHandler.cs')], ['AzureResourceManagerService (Deploy)', BI('Azure/AzureResourceManagerService.cs')]],
    data: [['ResourceRepository / ServiceOwnerRepository', BP('Repositories/ResourceRepository.cs')], ['altinn_resource, service_owner, storage_provider', BMIG]] },
  { name: 'Malware scan', home: BAp('MalwareScanResults/MalwareScanResultHandler.cs'),
    api: [['MalwareScanResultsController (Event Grid)', BA('Controllers/MalwareScanResultsController.cs')]],
    app: [['MalwareScanResultHandler', BAp('MalwareScanResults/MalwareScanResultHandler.cs')], ['TusChecksumProcessingHandler', BAp('UploadFile/Tus/TusChecksumProcessingHandler.cs')], ['FileTransferPublishService', BAp('UploadFile/FileTransferPublishService.cs')]],
    data: [['IdempotencyEventRepository', BP('Repositories/IdempotencyEventRepository.cs')], ['idempotency_event', BMIG]] },
  { name: 'Events publishing', home: BI('Altinn/Events/AltinnEventBus.cs'),
    api: [],
    app: [['IEventBus', brL('src/Altinn.Broker.Core/Services/IEventBus.cs')], ['AltinnEventBus', BI('Altinn/Events/AltinnEventBus.cs')], ['EventBusMiddleware', BAp('Middlewares/EventBusMiddleware.cs')]],
    data: [] },
  { name: 'Expiry, purge & cleanup', home: BAp('PurgeFileTransfer/PurgeFileTransferHandler.cs'),
    api: [['MaintenanceController', BA('Controllers/MaintenanceController.cs')]],
    app: [['PurgeFileTransferHandler (TTL)', BAp('PurgeFileTransfer/PurgeFileTransferHandler.cs')], ['StuckFileTransferHandler', BAp('StuckFileTransfer/StuckFileTransferHandler.cs')], ['CleanupUseCaseTestsHandler', BAp('CleanupUseCaseTests/CleanupUseCaseTestsHandler.cs')]],
    data: [] },
  { name: 'Statistics', home: BA('Controllers/StatisticsController.cs'),
    api: [['StatisticsController', BA('Controllers/StatisticsController.cs')], ['ServiceOwnerStatisticsController', BA('Controllers/ServiceOwnerStatisticsController.cs')]],
    app: [['GenerateDailySummaryReport', BAp('GenerateReport/GenerateDailySummaryReportHandler.cs')], ['Monthly statistics (CSV, rollup)', BAp('MonthlyStatistics/GenerateMonthlyStatisticsCsvHandler.cs')]],
    data: [['MonthlyStatisticsRepository', BP('Repositories/MonthlyStatisticsRepository.cs')], ['monthly_statistics_rollup', BMIG]] },
  { name: 'End-user frontend', home: brL('frontend'),
    api: [['frontend/ (React + Vite)', brL('frontend')]],
    app: [['static website hosting', brL('.azure/modules/staticWebsite/create.bicep')]],
    data: [] },
];
const BR_BARS = [
  { ...BSTY.int, items: [['Authorization (PDP/XACML)', BI('Altinn/Authorization/AltinnAuthorizationService.cs')], ['Resource Registry (+ access lists)', BI('Altinn/ResourceRegistry/AltinnResourceRegistryRepository.cs')], ['Register', BI('Altinn/Register/AltinnRegisterService.cs')], ['Access Management', BI('Altinn/AccessManagement/AltinnAccessManagementService.cs')], ['Events', BI('Altinn/Events/AltinnEventBus.cs')], ['Token exchange', BI('Altinn/AltinnTokenExchangeService.cs')], ['Azure Resource Manager', BI('Azure/AzureResourceManagerService.cs')], ['Maskinporten', BI('Maskinporten/MaskinportenTokenService.cs')], ['Slack', BI('Slack/SlackDevClient.cs')]] },
  { ...BSTY.jobs, items: [['Hangfire on PostgreSQL', BI('Hangfire/DependencyInjection.cs')], ['Recurring (IP rules, stuck transfers, stats, JWK)', BA('Helpers/RecurringJobRegistration.cs')], ['Scheduled purge on TTL', BAp('PurgeFileTransfer/PurgeFileTransferHandler.cs')], ['Storage account provisioning', BI('Azure/AzureResourceManagerService.cs')]] },
  { ...BSTY.x, items: [['JWT / Maskinporten / ID-porten auth', BA('Configuration/AuthorizationConstants.cs')], ['CsrfProtection / SecurityHeaders', BA('Helpers/CsrfProtectionMiddleware.cs')], ['BrokerTusStore (Blob + Redis)', BI('Tus/BrokerTusStore.cs')], ['OpenTelemetry', BI('Azure/OpenTelemetryConfiguration.cs')]] },
  { ...BSTY.db, items: [['PostgreSQL · broker (+ Hangfire)', brL('.azure/modules/postgreSql/create.bicep')], ['Azure Blob · account per service owner', BI('Azure/AzureStorageService.cs')], ['Defender for Storage + Event Grid', brL('.azure/modules/virusscan/create.bicep')], ['Redis', brL('.azure/modules/redis/create.bicep')], ['Key Vault', brL('.azure/modules/keyvault/create.bicep')]] },
];

// ---- place the row ----
MARKS.msg = [cells.length, svg.length];
const MSG_TOP = EVN_BOTTOM + PRODUCT_GAP;
productLabel(FX, MSG_TOP, 'Produkt: Melding og formidling');
const MSG_APIM_Y = MSG_TOP + 60;
const MSG_ROW_Y = MSG_APIM_Y + 44 + 24;
const msgH = measure([CO_COLS, BR_COLS], ['api', 'app', 'data']);
const coF = renderGrid({ id: 'corr-frame', x: FX, y: MSG_ROW_Y, title: 'Correspondence (Melding)  ·  altinn-correspondence', href: 'https://github.com/Altinn/altinn-correspondence/tree/main', cols: CO_COLS, layers: L3, bars: CO_BARS, heights: msgH });
const brF = renderGrid({ id: 'broker-frame', x: coF.right + 80, y: MSG_ROW_Y, title: 'Broker (Formidling)  ·  altinn-broker', href: 'https://github.com/Altinn/altinn-broker/tree/main', cols: BR_COLS, layers: L3, bars: BR_BARS, heights: msgH });
{
  box({ x: FX, y: MSG_APIM_Y, w: brF.right - FX, h: 44, font: 12, bold: true, rounded: true, fill: '#e6d0de', stroke: '#996185',
    value: 'Azure API Management (APIM)  ·  service owners, end-user systems, apps, Arbeidsflate  ·  /correspondence/api · /broker/api',
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 12, fontStyle: 1, fillColor: '#e6d0de', strokeColor: '#996185' }) });
  const arr = (x, y1, y2) => {
    svg.push(`<path d="M${x},${y1} L${x},${y2 - 7}" stroke="#996185" stroke-width="2" fill="none"/><path d="M${x},${y2} L${x - 5},${y2 - 8} L${x + 5},${y2 - 8} Z" fill="#996185"/>`);
    cells.push(`<mxCell id="am-e${nextId++}" value="" style="endArrow=block;endFill=1;html=1;strokeWidth=2;strokeColor=#996185;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x}" y="${y1}" as="sourcePoint"/><mxPoint x="${x}" y="${y2}" as="targetPoint"/></mxGeometry></mxCell>`);
  };
  arr((FX + coF.right) / 2, MSG_APIM_Y + 44, MSG_ROW_Y);
  arr((coF.right + 80 + brF.right) / 2, MSG_APIM_Y + 44, MSG_ROW_Y);
}
const MSG_BOTTOM = Math.max(coF.bottom, brF.bottom) + 10;
const MSG_RIGHT = brF.right;


// ================= Product: Profile (below Melding og formidling) =================
const prL = treeLinker('altinn-profile', 'altinn-profile');
const PC = p => prL('src/Altinn.Profile/Controllers/' + p), PCo = p => prL('src/Altinn.Profile.Core/' + p), PI = p => prL('src/Altinn.Profile.Integrations/' + p);
const PSNAP = PI('Migrations/ProfileDbContextModelSnapshot.cs');
const PR_COLS = [
  { name: 'User profile', home: PCo('User/UserProfileService.cs'),
    api: [['UsersController', PC('UsersController.cs')], ['UserProfileInternalController', PC('UserProfileInternalController.cs')]],
    app: [['UserProfileService', PCo('User/UserProfileService.cs')], ['UserProfileMapper', PCo('User/UserProfileMapper.cs')]],
    data: [['ProfileSettingsRepository', PI('Repositories/ProfileSettingsRepository.cs')], ['user_preferences.profile_settings', PSNAP], ['user_preferences.receipt_settings', PSNAP]] },
  { name: 'User contact points (KRR)', home: PCo('User.ContactPoints/UserContactPointService.cs'),
    api: [['UserContactPointController', PC('UserContactPointController.cs')]],
    app: [['UserContactPointService', PCo('User.ContactPoints/UserContactPointService.cs')], ['UserContactInfoService (SI users)', PCo('User.ContactInfo/UserContactInfoService.cs')]],
    data: [['PersonRepository', PI('Repositories/PersonRepository.cs')], ['contact_and_reservation.person', PSNAP], ['user_preferences.self_identified_users', PSNAP]] },
  { name: 'Unit contact points', home: PCo('Unit.ContactPoints/UnitContactPointService.cs'),
    api: [['UnitContactPointController', PC('UnitContactPointController.cs')]],
    app: [['UnitContactPointService', PCo('Unit.ContactPoints/UnitContactPointService.cs')]],
    data: [['(professional notification settings)', null]] },
  { name: 'Organization notification addresses', home: PCo('OrganizationNotificationAddresses/OrganizationNotificationAddressesService.cs'),
    api: [['OrgNotificationAddressController', PC('OrgNotificationAddressController.cs')], ['OrganizationsController', PC('OrganizationsController.cs')]],
    app: [['OrganizationNotificationAddressesService', PCo('OrganizationNotificationAddresses/OrganizationNotificationAddressesService.cs')], ['OrganizationNotificationAddressUpdateJob', PI('OrganizationNotificationAddressRegistry/OrganizationNotificationAddressUpdateJob.cs')]],
    data: [['OrganizationNotificationAddressRepository', PI('Repositories/OrganizationNotificationAddressRepository.cs')], ['…organizations / notifications_address', PSNAP], ['…registry_sync_metadata', PSNAP], ['…unit_profile_status', PSNAP]] },
  { name: 'Professional notification settings', home: PCo('ProfessionalNotificationAddresses/ProfessionalNotificationsService.cs'),
    api: [['ProfessionalNotificationSettingsController', PC('ProfessionalNotificationSettingsController.cs')]],
    app: [['ProfessionalNotificationsService', PCo('ProfessionalNotificationAddresses/ProfessionalNotificationsService.cs')]],
    data: [['ProfessionalNotificationsRepository', PI('Repositories/ProfessionalNotificationsRepository.cs')], ['user_party_contact_info (+ resources)', PSNAP]] },
  { name: 'Address verification', home: PCo('AddressVerifications/AddressVerificationService.cs'),
    api: [['AddressVerificationController', PC('AddressVerificationController.cs')]],
    app: [['AddressVerificationService', PCo('AddressVerifications/AddressVerificationService.cs')], ['VerificationCodeService', PI('AddressVerification/VerificationCodeService.cs')], ['UserNotifier (e-post / SMS)', PI('Notifications/UserNotifier.cs')]],
    data: [['AddressVerificationRepository', PI('Repositories/AddressVerificationRepository.cs')], ['address_verifications.verification_codes', PSNAP], ['address_verifications.verified_addresses', PSNAP]] },
  { name: 'Favorites & party groups', home: PCo('User.PartyGroups/PartyGroupService.cs'),
    api: [['FavoritesController', PC('FavoritesController.cs')], ['PartyGroupsController', PC('PartyGroupsController.cs')]],
    app: [['PartyGroupService', PCo('User.PartyGroups/PartyGroupService.cs')]],
    data: [['PartyGroupRepository', PI('Repositories/PartyGroupRepository.cs')], ['user_preferences.groups', PSNAP], ['user_preferences.party_group_association', PSNAP]] },
  { name: 'Correspondence & dashboard', home: PC('DashboardController.cs'),
    api: [['CorrespondenceController', PC('CorrespondenceController.cs')], ['DashboardController', PC('DashboardController.cs')]],
    app: [['(contact point lookups for support)', null]],
    data: [] },
];
const PR_BARS = [
  { ...BSTY.int, items: [['ContactRegisterHttpClient → KRR', PI('ContactRegister/ContactRegisterHttpClient.cs')], ['OrganizationNotificationAddressHttpClient → Brreg', PI('OrganizationNotificationAddressRegistry/OrganizationNotificationAddressHttpClient.cs')], ['RegisterClient → Register (cached)', PI('Register/RegisterClient.cs')], ['AuthorizationClient → Authorization', PI('Authorization/AuthorizationClient.cs')], ['NotificationsClient → Notifications', PI('Notifications/NotificationsClient.cs')]] },
  { ...BSTY.jobs, items: [['KrrSyncJob → ContactRegisterUpdateJob', prL('src/Altinn.Profile/Jobs/KrrSyncJob.cs')], ['OrgSyncJob → OrganizationNotificationAddressUpdateJob', prL('src/Altinn.Profile/Jobs/OrgSyncJob.cs')], ['Leases (PostgreSQL)', PI('Leases/PostgresqlLeaseProvider.cs')], ['ServiceDefaults.Jobs', prL('src/ServiceDefaults.Jobs')]] },
  { ...BSTY.x, items: [['PartyAccessHandler / OrgResourceAccessHandler', prL('src/Altinn.Profile/Authorization/PartyAccessHandler.cs')], ['FeatureToggledScopeAccessHandler', prL('src/Altinn.Profile/Authorization/FeatureToggledScopeAccessHandler.cs')], ['NationalIdentityNumberChecker', PI('Services/NationalIdentityNumberChecker.cs')], ['Telemetry', PCo('Telemetry/Telemetry.cs')], ['HealthCheck', prL('src/Altinn.Profile/Health/HealthCheck.cs')]] },
  { ...BSTY.db, items: [['PostgreSQL · user_preferences, contact_and_reservation', PI('Persistence/ProfiledbContext.cs')], ['PostgreSQL · organization_notification_address, professional_notification_settings', PSNAP], ['PostgreSQL · address_verifications, lease', PI('Migration/v0.23/01-create-schema-address-verifications.sql')]] },
];

MARKS.pr = [cells.length, svg.length];
const PR_TOP = MSG_BOTTOM + PRODUCT_GAP;
productLabel(FX, PR_TOP, 'Produkt: Profile');
const PR_APIM_Y = PR_TOP + 60;
const PR_ROW_Y = PR_APIM_Y + 44 + 24;
const prH = measure([PR_COLS], ['api', 'app', 'data']);
const prF = renderGrid({ id: 'profile-frame', x: FX, y: PR_ROW_Y, title: 'Profile  ·  altinn-profile', href: 'https://github.com/Altinn/altinn-profile/tree/main', cols: PR_COLS, layers: L3, bars: PR_BARS, heights: prH });
{
  box({ x: FX, y: PR_APIM_Y, w: prF.right - FX, h: 44, font: 12, bold: true, rounded: true, fill: '#e6d0de', stroke: '#996185',
    value: 'Azure API Management (APIM)  ·  apps, Notifications, Correspondence, Arbeidsflate, AM frontend  ·  /profile/api',
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 12, fontStyle: 1, fillColor: '#e6d0de', strokeColor: '#996185' }) });
  svg.push(`<path d="M${(FX + prF.right) / 2},${PR_APIM_Y + 44} L${(FX + prF.right) / 2},${PR_ROW_Y - 7}" stroke="#996185" stroke-width="2" fill="none"/><path d="M${(FX + prF.right) / 2},${PR_ROW_Y} L${(FX + prF.right) / 2 - 5},${PR_ROW_Y - 8} L${(FX + prF.right) / 2 + 5},${PR_ROW_Y - 8} Z" fill="#996185"/>`);
  cells.push(`<mxCell id="am-e${nextId++}" value="" style="endArrow=block;endFill=1;html=1;strokeWidth=2;strokeColor=#996185;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${(FX + prF.right) / 2}" y="${PR_APIM_Y + 44}" as="sourcePoint"/><mxPoint x="${(FX + prF.right) / 2}" y="${PR_ROW_Y}" as="targetPoint"/></mxGeometry></mxCell>`);
}
// external sources below the columns that sync from them
const PR_EXT_Y = prF.bottom + 50;
[[1, 'KRR · Kontakt- og reservasjonsregisteret', 'Digdir · endringslogg (hentEndringer)'], [3, 'Varslingsadresser for enheter', 'Brønnøysundregistrene · sync + oppdatering (KOF)']].forEach(([i, n, how]) => {
  const x = FX + 110 + i * STEP - 20, w = CW + 40, cx = x + w / 2;
  box({ x, y: PR_EXT_Y, w, h: 56, value: `${n}\n${how}`, font: 9, rounded: true, fill: '#e0e0e0', stroke: '#4d4d4d', dashed: true,
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 9, fillColor: '#e0e0e0', strokeColor: '#4d4d4d', dashed: 1 }) });
  svg.push(`<path d="M${cx},${PR_EXT_Y} L${cx},${prF.bottom + 7}" stroke="#4d4d4d" stroke-width="2" fill="none"/><path d="M${cx},${prF.bottom} L${cx - 5},${prF.bottom + 8} L${cx + 5},${prF.bottom + 8} Z" fill="#4d4d4d"/>`);
  cells.push(`<mxCell id="am-e${nextId++}" value="" style="endArrow=block;endFill=1;html=1;strokeWidth=2;strokeColor=#4d4d4d;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${cx}" y="${PR_EXT_Y}" as="sourcePoint"/><mxPoint x="${cx}" y="${prF.bottom}" as="targetPoint"/></mxGeometry></mxCell>`);
});
const PR_BOTTOM = PR_EXT_Y + 66;
const PR_RIGHT = prF.right;


// ================= Product: Altinn Studio (below Profile) =================
const STREE = gitTree('altinn-studio').files;
const sGH = treeLinker('altinn-studio');
// find a file by (partial) path suffix under a prefix; returns a GitHub link
const sF = (prefix, suffix) => {
  const hit = STREE.find(f => f.startsWith(prefix) && (f.endsWith('/' + suffix) || f.endsWith('/' + suffix + '.cs')));
  if (!hit) { unresolved.push('altinn-studio find: ' + prefix + ' … ' + suffix); return null; }
  return sGH(hit);
};
const DBE = 'src/Designer/backend/src/Designer/';
const DC = n => sF(DBE + 'Controllers', n), DS = n => sF(DBE + 'Services', n), DB = n => sF(DBE, n);
const DFE = 'src/Designer/frontend/';
const FEa = p => sGH(DFE + p);

// ---- Designer frontend ----
const SFE_COLS = [
  { name: 'Dashboard', home: FEa('dashboard'),
    ui: [['Dashboard / CreateService', FEa('dashboard/pages')], ['OrgContentLibraryPage', FEa('dashboard/pages')]],
    rtk: [['studio-content-library', FEa('libs/studio-content-library')]] },
  { name: 'App development', home: FEa('app-development'),
    ui: [['overview · appSettings', FEa('app-development/features')], ['uiEditor · textEditor', FEa('app-development/features')], ['dataModelling · processEditor', FEa('app-development/features')], ['appPublish (deploy)', FEa('app-development/features')], ['aiAssistant', FEa('app-development/features')]],
    rtk: [['ux-editor (v3, v4)', FEa('packages/ux-editor')], ['schema-editor / schema-model', FEa('packages/schema-editor')], ['text-editor', FEa('packages/text-editor')], ['process-editor (BPMN)', FEa('packages/process-editor')], ['studio-assistant', FEa('libs/studio-assistant')]] },
  { name: 'App preview', home: FEa('app-preview'),
    ui: [['app-preview', FEa('app-preview')]],
    rtk: [['websockets (/hubs/preview)', FEa('packages/shared')]] },
  { name: 'Resource admin', home: FEa('resourceadm'),
    ui: [['ResourceDashboard / ResourcePage', FEa('resourceadm')], ['PolicyEditorPage', FEa('resourceadm')], ['AccessListPage / ListAdminPage', FEa('resourceadm')], ['DeployResourcePage', FEa('resourceadm')]],
    rtk: [['policy-editor', FEa('packages/policy-editor')]] },
  { name: 'Settings', home: FEa('settings'),
    ui: [['user (API keys)', FEa('settings/features')], ['orgs (bots, contact points)', FEa('settings/features')]],
    rtk: [] },
  { name: 'Org admin', home: FEa('admin'),
    ui: [['apps / instances', FEa('admin/features')], ['alerts · metrics · audit', FEa('admin')]],
    rtk: [] },
  { name: 'Studio root & shared', home: FEa('studio-root'),
    ui: [['Contact / Flags / Guide', FEa('studio-root')], ['language (i18n)', FEa('language')]],
    rtk: [['shared (api paths, queries, mutations)', FEa('packages/shared')], ['studio-components / icons / hooks', FEa('libs/studio-components')], ['studio-guard / feature-flags', FEa('libs/studio-guard')]] },
];
const SFE_LAYERS = [
  { key: 'ui', name: 'SPA\n(pages, features)', ...LSTY.ui },
  { key: 'rtk', name: 'Packages / libs', ...LSTY.rtk },
];
const SFE_BARS = [
  { ...BSTY.host, items: [['Vite SPAs, served by the Designer image', sGH('src/Designer/Dockerfile')], ['nginx load balancer: one upstream per SPA', sGH('src/load-balancer/nginx.conf.template')]] },
];

// ---- Designer backend ----
const SBE_COLS = [
  { name: 'Repositories & Git', home: DS('RepositoryService.cs'),
    api: [['RepositoryController', DC('RepositoryController.cs')], ['User / OrganizationController', DC('UserController.cs')]],
    app: [['RepositoryService', DS('RepositoryService.cs')], ['SourceControlService', DS('SourceControlService.cs')], ['BranchService', DS('BranchService.cs')], ['GiteaUserProvisioningService', DS('GiteaUserProvisioningService.cs')]],
    data: [['AltinnGitRepository (+ App, Org)', DB('Infrastructure/GitRepository/AltinnGitRepository.cs')], ['repos on disk (/AltinnCore/Repos)', DB('Services/Implementation/RepositoryCleanupService.cs')]] },
  { name: 'App development', home: DS('AppDevelopmentService.cs'),
    api: [['AppDevelopmentController', DC('AppDevelopmentController.cs')], ['Layout / Text / Options', DC('LayoutController.cs')], ['ApplicationMetadataController', DC('ApplicationMetadataController.cs')]],
    app: [['AppDevelopmentService', DS('AppDevelopmentService.cs')], ['LayoutService', DS('LayoutService.cs')], ['TextsService', DS('TextsService.cs')], ['MediatR events / handlers', sGH(DBE + 'EventHandlers')]],
    data: [['(files in the app repo)', null]] },
  { name: 'Process & task navigation', home: DS('ProcessModelingService.cs'),
    api: [['ProcessModelingController', DC('ProcessModelingController.cs')], ['TaskNavigationController', DC('TaskNavigationController.cs')], ['ValidationController', DC('ValidationController.cs')]],
    app: [['ProcessModelingService (v7, v8 templates)', DS('ProcessModelingService.cs')], ['TaskNavigationService', DS('TaskNavigationService.cs')]],
    data: [] },
  { name: 'Data modelling', home: sGH('src/Designer/backend/src/DataModeling'),
    api: [['DatamodelsController', DC('DatamodelsController.cs')]],
    app: [['SchemaModelService', DS('SchemaModelService.cs')], ['DataModeling converters (XSD ↔ JSON ↔ C#)', sGH('src/Designer/backend/src/DataModeling/Converter')]],
    data: [] },
  { name: 'Deployment & releases', home: DS('DeploymentService.cs'),
    api: [['Deployments / Releases', DC('DeploymentsController.cs')], ['EnvironmentsController', DC('EnvironmentsController.cs')], ['DeploymentWebhooksController', DC('DeploymentWebhooksController.cs')]],
    app: [['DeploymentService / ReleaseService', DS('DeploymentService.cs')], ['KubernetesDeploymentsService', DS('KubernetesDeploymentsService.cs')], ['GitOpsManifestsRenderer', DS('GitOpsManifestsRenderer.cs')], ['AppInactivityUndeployService', DS('AppInactivityUndeployService.cs')]],
    data: [['Deployment / Release / DeployEvent repos', DB('Repository/ORMImplementation/DeploymentRepository.cs')]] },
  { name: 'Preview', home: DS('PreviewService.cs'),
    api: [['PreviewController (+ V3)', DC('PreviewController.cs')], ['Preview/Data, Instances', sGH(DBE + 'Controllers/Preview')]],
    app: [['PreviewService', DS('PreviewService.cs')], ['PreviewHub (SignalR)', DB('Hubs/Preview/PreviewHub.cs')]],
    data: [] },
  { name: 'Resource admin & policies', home: DS('ResourceRegistryService.cs'),
    api: [['ResourceAdminController', DC('ResourceAdminController.cs')], ['PolicyController', DC('PolicyController.cs')]],
    app: [['ResourceRegistryService', DS('ResourceRegistryService.cs')], ['AuthorizationPolicyService', DS('AuthorizationPolicyService.cs')], ['PolicyAdmin (XACML models)', sGH('src/Designer/backend/PolicyAdmin')]],
    data: [['ResourceRegistryRepository', DB('Repository/Implementation/ResourceRegistryRepository.cs')]] },
  { name: 'Org library', home: DS('OrgLibraryService.cs'),
    api: [['OrgCodeList / OrgText / OrgLibrary', sGH(DBE + 'Controllers/Organisation')]],
    app: [['OrgCodeList / OrgTexts / OrgLibrary services', DS('OrgLibraryService.cs')], ['GiteaContentLibraryService', DS('GiteaContentLibraryService.cs')]],
    data: [['AzureSharedContentClient (Blob)', DB('Clients/Implementations/AzureSharedContentClient.cs')]] },
  { name: 'Users, keys & settings', home: DS('ApiKeyService.cs'),
    api: [['ApiKeys / BotAccounts', DC('ApiKeysController.cs')], ['ContactPoints / AppScopes', DC('ContactPointsController.cs')], ['StudioOidc / StudioctlAuth', DC('StudioOidcController.cs')]],
    app: [['ApiKeyService / BotAccountService', DS('ApiKeyService.cs')], ['ContactPointsService', DS('ContactPointsService.cs')], ['AppScopesService', DS('AppScopesService.cs')]],
    data: [['ApiKeys, ContactPoints, AppScopes, AppSettings', DB('Repository/ORMImplementation/Data/DesignerdbContext.cs')]] },
  { name: 'AI assistant', home: DS('ChatService.cs'),
    api: [['ChatController', DC('ChatController.cs')], ['AssistantAttachmentController', DC('AssistantAttachmentController.cs')]],
    app: [['ChatService', DS('ChatService.cs')], ['AssistantServiceClient / WebSocket', DS('AssistantServiceClient.cs')], ['AssistantProxyHub', DB('Hubs/Assistant/AssistantProxyHub.cs')]],
    data: [['ChatThreads / ChatMessages', DB('Repository/ORMImplementation/ChatRepository.cs')]] },
  { name: 'Org admin (runtime ops)', home: sGH(DBE + 'Controllers/Admin'),
    api: [['Admin · Applications, Instances', sGH(DBE + 'Controllers/Admin')], ['Admin · Metrics, Alerts, AuditLogs', sGH(DBE + 'Controllers/Admin')]],
    app: [['ApplicationInformationService', DS('ApplicationInformationService.cs')], ['MetricsService / AlertsService', DS('AlertsService.cs')], ['AdminAuditLogger', DS('AdminAuditLogger.cs')]],
    data: [['AdminAuditLog', DB('Repository/ORMImplementation/AdminAuditLogRepository.cs')]] },
];
const TH = n => sF(DBE + 'TypedHttpClients', n);
const SBE_BARS = [
  { ...BSTY.int, items: [['GiteaClient → Gitea', DB('Clients/Implementations/GiteaClient.cs')], ['Azure DevOps builds', TH('AzureDevOpsBuildClient.cs')], ['Storage (metadata, texts, instances)', TH('AltinnStorageAppMetadataClient.cs')], ['Authorization policies', TH('AltinnAuthorizationPolicyClient.cs')], ['Authentication (token exchange)', TH('AltinnAuthenticationClient.cs')], ['Notifications', TH('AltinnNotificationClient.cs')], ['Maskinporten', TH('MaskinPortenHttpClient.cs')], ['KubernetesWrapperClient', TH('KubernetesWrapperClient.cs')], ['RuntimeGatewayClient', TH('RuntimeGatewayClient.cs')], ['Slack', TH('SlackClient.cs')]] },
  { ...BSTY.jobs, items: [['Quartz (Postgres store)', DB('Scheduling/SchedulingDependencyInjectionExtensions.cs')], ['AppInactivityUndeploy jobs', sF(DBE + 'Scheduling', 'AppInactivityUndeployJob.cs')], ['DeploymentPipelinePollingJob', sF(DBE + 'Scheduling', 'DeploymentPipelinePollingJob.cs')], ['Repository / Chat / Langfuse cleanup', sF(DBE + 'Scheduling', 'RepositoryCleanupJob.cs')], ['SignalR hubs (preview, sync, alerts, assistant)', DB('Hubs/HubsEndpointExtensions.cs')]] },
  { ...BSTY.x, items: [['Cookie + OIDC (Ansattporten) auth', DB('Infrastructure/AuthenticationConfiguration.cs')], ['API key auth', sGH(DBE + 'Infrastructure/ApiKeyAuth')], ['Gitea-permission policies', sGH(DBE + 'Infrastructure/Authorization')], ['UserRequestSynchronization (locks)', sGH(DBE + 'Middleware/UserRequestSynchronization')], ['OpenTelemetry', DB('Hosting/OpenTelemetryExtensions.cs')]] },
  { ...BSTY.db, items: [['PostgreSQL · designer (EF + Quartz)', DB('Repository/ORMImplementation/Data/DesignerdbContext.cs')], ['Redis · cache + SignalR backplane', DB('Configuration/RedisCacheSettings.cs')], ['Repos volume', sGH('charts/altinn-designer/values.yaml')], ['Azure Blob · shared content', DB('Clients/Implementations/AzureSharedContentClient.cs')], ['Key Vault', sGH('infra/studio/keyvault-secret-store')]] },
];

// ---- Gitea + AI ----
const GI_COLS = [
  { name: 'Gitea', home: sGH('src/gitea'),
    api: [['Gitea REST /api/v1 + git HTTP', sGH('src/gitea')]],
    app: [['custom templates / app.ini', sGH('src/gitea')], ['Gitea Actions runners', sGH('charts/gitea-org-runner')]],
    data: [['Gitea DB (read by Designer too)', DB('Configuration/GiteaDbSettings.cs')], ['git repositories', sGH('charts/altinn-repositories')]] },
  { name: 'gitea-proxy', home: sGH('src/gitea-proxy'),
    api: [['nginx + njs reverse-proxy auth', sGH('src/gitea-proxy/nginx.conf.template')]],
    app: [['auth.js (API keys: git + /api/v1)', sGH('src/gitea-proxy/auth.js')]],
    data: [] },
  { name: 'Studio Assistant (AI)', home: sGH('src/AI/agents'),
    api: [['FastAPI (agent, websocket, traces)', sGH('src/AI/agents/api/main.py')]],
    app: [['agentic loop + tools', sGH('src/AI/agents/agents/core/loop.py')], ['Altinn tools (layout, datamodel, …)', sGH('src/AI/agents/agents/altinn')], ['git / repo / preview services', sGH('src/AI/agents/agents/services')]],
    data: [['Azure OpenAI / Claude (AI Foundry)', null]] },
  { name: 'augmenter-agent', home: sGH('src/AI/augmenter-agent'),
    api: [['sync + callback endpoints', sGH('src/AI/augmenter-agent/src/Altinn.Augmenter.Agent/Program.cs')]],
    app: [['Typst PDF templates', sGH('src/AI/augmenter-agent/src/Altinn.Augmenter.Agent/pdf-templates')]],
    data: [] },
];
const GI_BARS = [
  { ...BSTY.host, items: [['charts/altinn-repositories (+ proxy)', sGH('charts/altinn-repositories')], ['Flux: infra/studio/syncroot', sGH('infra/studio/syncroot/base')]] },
];

// ---- Runtime (per service owner cluster) ----
const RT = 'src/Runtime/';
const RT_COLS = [
  { name: 'Operator', home: sGH(RT + 'operator/cmd/main.go'),
    api: [['MaskinportenClient CRD', sGH(RT + 'operator/api/v1alpha1/maskinportenclient_types.go')]],
    app: [['maskinporten controller (+ key rotation)', sGH(RT + 'operator/internal/controller/maskinporten')], ['azurekeyvaultsync / secretsync', sGH(RT + 'operator/internal/controller/azurekeyvaultsync')], ['cnpgsync (per-app databases)', sGH(RT + 'operator/internal/controller/cnpgsync')], ['appcodesync / grafanapolicysync', sGH(RT + 'operator/internal/controller/appcodesync')], ['inactivityscaler', sGH(RT + 'operator/internal/controller/inactivityscaler')]],
    data: [['CloudNativePG · pg-apps-cluster', sGH(RT + 'operator/internal/controller/cnpgsync')], ['Kubernetes Secrets', sGH(RT + 'operator/internal/controller/secretsync')]] },
  { name: 'Runtime gateway', home: sGH(RT + 'gateway/src/Altinn.Studio.Gateway.Api/Program.cs'),
    api: [['Public: Deploy, Alerts, Metrics', sGH(RT + 'gateway/src/Altinn.Studio.Gateway.Api/Endpoints/Public')], ['Internal: Flux webhook', sGH(RT + 'gateway/src/Altinn.Studio.Gateway.Api/Endpoints/Internal/FluxWebhookEndpoints.cs')]],
    app: [['Deploy / Alerts / Metrics handlers', sGH(RT + 'gateway/src/Altinn.Studio.Gateway.Api/Application')], ['K8s + Flux clients', sGH(RT + 'gateway/src/Altinn.Studio.Gateway.Api/Clients/K8s')], ['DesignerClient / Grafana / AzureMonitor', sGH(RT + 'gateway/src/Altinn.Studio.Gateway.Api/Clients/Designer/DesignerClient.cs')]],
    data: [] },
  { name: 'Workflow engine', home: sGH(RT + 'workflow-engine/src/WorkflowEngine.Core/Engine.cs'),
    api: [['/api/v1/{ns}/workflows (+ dashboard)', sGH(RT + 'workflow-engine/src/WorkflowEngine.Core/Endpoints/EngineEndpoints.cs')]],
    app: [['WorkflowProcessor (SKIP LOCKED polling)', sGH(RT + 'workflow-engine/src/WorkflowEngine.Core/WorkflowProcessor.cs')], ['WorkflowExecutor / Heartbeat', sGH(RT + 'workflow-engine/src/WorkflowEngine.Core/WorkflowExecutor.cs')], ['AppCommand → app callbacks', sGH(RT + 'workflow-engine-app/src/WorkflowEngine.App/Commands/AppCommand/AppCommand.cs')], ['WebhookCommand', sGH(RT + 'workflow-engine/src/WorkflowEngine.Commands/Webhook/WebhookCommand.cs')]],
    data: [['EngineDbContext (Workflow, Step, Mailbox…)', sGH(RT + 'workflow-engine/src/WorkflowEngine.Data/Context/EngineDbContext.cs')]] },
  { name: 'PDF (pdf3)', home: sGH(RT + 'pdf3'),
    api: [['proxy :5030', sGH(RT + 'pdf3/cmd/proxy/main.go')], ['worker :5031', sGH(RT + 'pdf3/cmd/worker/main.go')]],
    app: [['generator / browser session', sGH(RT + 'pdf3/internal/generator/generator.go')], ['headless Chrome over CDP', sGH(RT + 'pdf3/internal/cdp/transport.go')], ['PDF/A converter', sGH(RT + 'pdf3/internal/pdfa/converter.go')]],
    data: [] },
  { name: 'kubernetes-wrapper', home: sGH(RT + 'kubernetes-wrapper/src/Program.cs'),
    api: [['Deployments / DaemonSets', sGH(RT + 'kubernetes-wrapper/src/Controllers/DeploymentsController.cs')]],
    app: [['KubernetesApiWrapper (cached)', sGH(RT + 'kubernetes-wrapper/src/Services/Implementation/KubernetesApiWrapper.cs')]],
    data: [] },
];
const RT_BARS = [
  { ...BSTY.int, items: [['Maskinporten admin API', sGH(RT + 'operator/internal/maskinporten/http_api_client.go')], ['Azure Key Vault', sGH(RT + 'operator/internal/controller/azurekeyvaultsync/keyvault_client.go')], ['Grafana API', sGH(RT + 'operator/internal/grafanaapi/grafana.go')], ['Designer (deploy events, alerts)', sGH(RT + 'gateway/src/Altinn.Studio.Gateway.Api/Clients/Designer/DesignerClient.cs')], ['Apps (callbacks, PDF pages)', sGH(RT + 'workflow-engine-app/src/WorkflowEngine.App/Commands/AppCommand/AppCommand.cs')]] },
  { ...BSTY.jobs, items: [['Flux GitOps per service owner (syncroot)', sGH('infra/runtime/syncroot/base')], ['apps-syncroot from owner ACR', sGH('infra/runtime/syncroot/base')], ['workflow-engine-app (tt02, at23)', sGH('infra/runtime/syncroot/tt02/workflow-engine-app.yaml')]] },
  { ...BSTY.x, items: [['OpenTelemetry collector (router + gateway)', sGH('infra/observability/base/gateway.yaml')], ['Grafana alert rules / dashboards', sGH('infra/runtime/grafana-manifests')], ['Linkerd (runtime overlay)', sGH('infra/observability/runtime')]] },
  { ...BSTY.db, items: [['CloudNativePG (per-app DBs)', sGH(RT + 'operator/internal/controller/cnpgsync')], ['PostgreSQL · workflow engine', sGH('infra/admin/workflow-engine-db/base/database-server.yaml')], ['Azure Monitor / App Insights', sGH('infra/observability/runtime')]] },
];

// ---- Local dev tooling ----
const DEV_COLS = [
  { name: 'studioctl', home: sGH('src/cli/cmd/studioctl/main.go'),
    api: [['run · stop · env · app · auth · doctor', sGH('src/cli/internal/cmd')]],
    app: [['install / migrations / appsecrets', sGH('src/cli/internal/install')], ['env topology', sGH('src/cli/internal/envtopology/topology.yaml')]],
    data: [] },
  { name: 'studioctl-server', home: sGH('src/cli/studioctl-server/Program.cs'),
    api: [['local daemon', sGH('src/cli/studioctl-server/Program.cs')]],
    app: [['app discovery, HostBridge, v7 → v8 upgrades', sGH('src/cli/studioctl-server')]],
    data: [] },
  { name: 'localtest', home: sGH(RT + 'localtest/src/Program.cs'),
    api: [['emulated platform APIs', sGH(RT + 'localtest/src')]],
    app: [['Storage, Register, Profile, Auth, Events, RR mocks', sGH(RT + 'localtest/src')]],
    data: [['testdata', sGH(RT + 'localtest/testdata')]] },
  { name: 'devenv & tools', home: sGH(RT + 'devenv'),
    api: [['devenv (Kind + Flux fixture)', sGH(RT + 'devenv/cmd/fixture/main.go')]],
    app: [['releaser · deployer · health', sGH('src/tools')], ['altinn-fleet-stats', sGH('src/tools/altinn-fleet-stats')]],
    data: [] },
];

// ---- place the row ----
MARKS.stu = [cells.length, svg.length];
const STU_TOP = PR_BOTTOM + PRODUCT_GAP;
productLabel(FX, STU_TOP, 'Produkt: Altinn Studio');
const sfeH = measure([SFE_COLS], ['ui', 'rtk']);
const sfe = renderGrid({ id: 'studio-fe-frame', x: FX, y: STU_TOP + 60, title: 'Studio Designer frontend  ·  altinn-studio/src/Designer/frontend', href: 'https://github.com/Altinn/altinn-studio/tree/main/src/Designer/frontend', cols: SFE_COLS, layers: SFE_LAYERS, bars: SFE_BARS, heights: sfeH });
const LB_Y = sfe.bottom + 24;
const SBE_Y = LB_Y + 44 + 24;
const stuH = measure([SBE_COLS, GI_COLS], ['api', 'app', 'data']);
const sbe = renderGrid({ id: 'studio-be-frame', x: FX, y: SBE_Y, title: 'Studio Designer backend  ·  altinn-studio/src/Designer/backend', href: 'https://github.com/Altinn/altinn-studio/tree/main/src/Designer/backend', cols: SBE_COLS, layers: L3, bars: SBE_BARS, heights: stuH });
const gi = renderGrid({ id: 'studio-gitea-frame', x: sbe.right + 80, y: SBE_Y, title: 'Gitea & AI  ·  src/gitea, src/gitea-proxy, src/AI', href: 'https://github.com/Altinn/altinn-studio/tree/main/src', cols: GI_COLS, layers: L3, bars: GI_BARS, heights: stuH });
{
  box({ x: FX, y: LB_Y, w: gi.right - FX, h: 44, font: 12, bold: true, rounded: true, fill: '#e6d0de', stroke: '#996185',
    value: 'Studio load balancer (nginx)  ·  /designer, /designerapi, /login, /hubs → Designer  ·  /repos → gitea-proxy → Gitea  ·  one upstream per SPA',
    href: sGH('src/load-balancer/nginx.conf.template'),
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 12, fontStyle: 1, fillColor: '#e6d0de', strokeColor: '#996185' }) });
  const arr = (x, y1, y2) => {
    svg.push(`<path d="M${x},${y1} L${x},${y2 - 7}" stroke="#996185" stroke-width="2" fill="none"/><path d="M${x},${y2} L${x - 5},${y2 - 8} L${x + 5},${y2 - 8} Z" fill="#996185"/>`);
    cells.push(`<mxCell id="am-e${nextId++}" value="" style="endArrow=block;endFill=1;html=1;strokeWidth=2;strokeColor=#996185;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x}" y="${y1}" as="sourcePoint"/><mxPoint x="${x}" y="${y2}" as="targetPoint"/></mxGeometry></mxCell>`);
  };
  arr((FX + sfe.right) / 2, sfe.bottom, LB_Y);
  arr((FX + sbe.right) / 2, LB_Y + 44, SBE_Y);
  arr((sbe.right + 80 + gi.right) / 2, LB_Y + 44, SBE_Y);
}
// runtime + dev tooling below
const RT_Y = Math.max(sbe.bottom, gi.bottom) + 100;
box({ x: FX, y: RT_Y - 40, w: 1600, h: 30, value: 'Runtime: deployed by Flux into each service owner\'s cluster (Designer deploys via the runtime gateway)', font: 14, bold: true, align: 'left',
  style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=14;fontStyle=1;', noFill: true, noStroke: true });
const rtH = measure([RT_COLS, DEV_COLS], ['api', 'app', 'data']);
const rt = renderGrid({ id: 'studio-runtime-frame', x: FX, y: RT_Y, title: 'Runtime  ·  altinn-studio/src/Runtime + infra/runtime', href: 'https://github.com/Altinn/altinn-studio/tree/main/src/Runtime', cols: RT_COLS, layers: L3, bars: RT_BARS, heights: rtH });
const dev = renderGrid({ id: 'studio-dev-frame', x: rt.right + 80, y: RT_Y, title: 'Local development  ·  studioctl, localtest, tools', href: 'https://github.com/Altinn/altinn-studio/tree/main/src/cli', cols: DEV_COLS, layers: L3, bars: [], heights: rtH });
const STU_BOTTOM = Math.max(rt.bottom, dev.bottom) + 10;
const STU_RIGHT = Math.max(sfe.right, gi.right, dev.right);

MARKS.end = [cells.length, svg.length];
// ---------- write ----------
const model = `<mxGraphModel dx="1637" dy="867" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/>${cells.join('')}</root></mxGraphModel>`;
const mxfile = `<mxfile><diagram id="zxXl3ItjcJwmiivCR3Vl" name="Page-1">${model}</diagram></mxfile>`;
const TOP = FE_TOP - 80;
const W = Math.max(LAST_RIGHT, DP_RIGHT, APPS_RIGHT, EVN_RIGHT, MSG_RIGHT, PR_RIGHT, STU_RIGHT) - FX + 1, H = STU_BOTTOM - TOP + 1;
const out = `<svg host="65bd71144e" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${W}px" height="${H}px" viewBox="${FX - 0.5} ${TOP - 0.5} ${W} ${H}" style="background-color: #ffffff;" content="${esc(mxfile)}"><defs/><g>${svg.join('')}</g></svg>`;
fs.writeFileSync(OUT, out, 'utf8');
console.log('cells', cells.length, 'lanes', lanes.length, 'size', out.length, 'W', W, 'H', H);

// ---------- one file per product ----------
const DIR = path.dirname(OUT);
function writeProduct(file, pageName, from, to, x0, y0, x1, y1) {
  const cs = cells.slice(MARKS[from] ? MARKS[from][0] : 0, MARKS[to][0]);
  const ss = svg.slice(MARKS[from] ? MARKS[from][1] : 0, MARKS[to][1]);
  const m = '<mxGraphModel dx="1637" dy="867" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/>' + cs.join('') + '</root></mxGraphModel>';
  const mf = '<mxfile><diagram id="' + file.replace(/W/g, '') + '" name="' + pageName + '">' + m + '</diagram></mxfile>';
  const w = x1 - x0 + 21, h = y1 - y0 + 21;
  const o = '<svg host="65bd71144e" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="' + w + 'px" height="' + h + 'px" viewBox="' + (x0 - 10.5) + ' ' + (y0 - 10.5) + ' ' + w + ' ' + h + '" style="background-color: #ffffff;" content="' + esc(mf) + '"><defs/><g>' + ss.join('') + '</g></svg>';
  fs.writeFileSync(path.join(DIR, file), o, 'utf8');
  console.log(file, cs.length, 'cells', Math.round(o.length / 1024) + ' KB');
}
writeProduct('altinn_authorization_detailed.drawio.svg', 'Autorisasjon', null, 'dp', FX, TOP, LAST_RIGHT, EXT_BOTTOM);
writeProduct('altinn_dialogporten_detailed.drawio.svg', 'Dialogporten', 'dp', 'apps', FX, DP_TOP, DP_RIGHT, DP_BOTTOM);
writeProduct('altinn_apps_detailed.drawio.svg', 'Apps', 'apps', 'evn', FX, APPS_TOP, APPS_RIGHT, APPS_BOTTOM);
writeProduct('altinn_events_notifications_detailed.drawio.svg', 'Events og Notifications', 'evn', 'msg', FX, EVN_TOP, EVN_RIGHT, EVN_BOTTOM);
writeProduct('altinn_correspondence_broker_detailed.drawio.svg', 'Melding og formidling', 'msg', 'pr', FX, MSG_TOP, MSG_RIGHT, MSG_BOTTOM);
writeProduct('altinn_profile_detailed.drawio.svg', 'Profile', 'pr', 'stu', FX, PR_TOP, PR_RIGHT, PR_BOTTOM);
writeProduct('altinn_studio_detailed.drawio.svg', 'Altinn Studio', 'stu', 'end', FX, STU_TOP, STU_RIGHT, STU_BOTTOM);

{
// ================= Overview drawing: one box per application, grouped by product =================
cells.length = 0; svg.length = 0;
const OV = { x: 40, y: 40 };
const CBW = 230, CBG = 16, TITLE_H = 28, LINE = 12.5;
const GHR2 = (repo, p = '') => `https://github.com/Altinn/${repo}/tree/main${p ? '/' + p : ''}`;
const names = cols => cols.map(c => c.name);
const comp = (name, href, modules, stores, fill = '#ffffff', stroke = '#6c8ebf') => ({ name, href, modules, stores, fill, stroke });
const compH = c => TITLE_H + Math.max(1, c.modules.length) * LINE + 12 + (c.stores ? 22 : 0);

function drawComp(c, x, y, h) {
  box({ x, y, w: CBW, h, rounded: true, fill: c.fill, stroke: c.stroke,
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fillColor: c.fill, strokeColor: c.stroke, arcSize: 4 }) });
  box({ x: x + 6, y: y + 4, w: CBW - 12, h: TITLE_H - 6, value: c.name, font: 12, bold: true, align: 'left', href: c.href,
    style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=12;fontStyle=1;', noFill: true, noStroke: true });
  c.modules.forEach((m, i) => box({ x: x + 10, y: y + TITLE_H + i * LINE, w: CBW - 20, h: LINE, value: '• ' + m, font: 9, align: 'left',
    style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=9;', noFill: true, noStroke: true }));
  if (c.stores) box({ x: x + 6, y: y + h - 26, w: CBW - 12, h: 20, value: c.stores, font: 8, rounded: true, fill: '#b1ddf0', stroke: '#10739e',
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 8, fillColor: '#b1ddf0', strokeColor: '#10739e' }) });
}
// a product frame: title (links to its detailed drawing) + component boxes side by side
function drawProduct(p, x, y) {
  const h = Math.max(...p.comps.map(compH));
  const w = p.comps.length * (CBW + CBG) + CBG;
  const H = 44 + h + 14;
  box({ x, y, w, h: H, fill: p.band, stroke: '#666666',
    style: st({ rounded: 0, whiteSpace: 'wrap', html: 1, fillColor: p.band, strokeColor: '#666666' }) });
  box({ x: x + 10, y: y + 8, w: w - 20, h: 28, value: p.title + (p.detail ? '  ›' : ''), font: 15, bold: true, align: 'left', href: p.detail,
    style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=15;fontStyle=1;', noFill: true, noStroke: true });
  p.comps.forEach((c, i) => drawComp(c, x + CBG + i * (CBW + CBG), y + 44, h));
  return { w, h: H };
}

const AUTH_REPO = GHR2('altinn-auth', 'src/apps');
const PRODUCTS = [
  { title: 'Autorisasjon', detail: './altinn_authorization_detailed.drawio.svg', band: '#eef4fb', comps: [
    comp('Access Management', GHR2('altinn-auth', 'src/apps/Altinn.AccessManagement'), names(COLS), 'PostgreSQL · Blob (policies)'),
    comp('Authorization (PDP)', GHR2('altinn-auth', 'src/apps/Altinn.Authorization'), names(AZCOLS), 'Blob · PostgreSQL · Queue'),
    comp('Resource Registry', GHR2('altinn-auth', 'src/apps/Altinn.ResourceRegistry'), names(RRCOLS), 'PostgreSQL · Blob'),
    comp('Authentication', GHR2('altinn-authentication'), names(AUCOLS), 'PostgreSQL · Key Vault'),
    comp('Register', GHR2('altinn-register'), names(RGCOLS), 'PostgreSQL · Service Bus'),
    comp('PEP (NuGet)', GHR2('altinn-auth', 'src/pkgs/Altinn.Authorization.PEP'), ['Authorization handlers', 'Decision client', 'Used by most platform apps'], null, '#f5f5f5', '#666666'),
  ] },
  { title: 'Dialogporten', detail: './altinn_dialogporten_detailed.drawio.svg', band: '#f4faf3', comps: [
    comp('Dialogporten', GHR2('dialogporten'), names(DPCOLS), 'PostgreSQL · Redis · Service Bus'),
    comp('Storage → Dialogporten adapter', GHR2('altinn-dialogporten-adapter'), names(ADCOLS), 'Service Bus · Table Storage'),
  ] },
  { title: 'Apps', detail: './altinn_apps_detailed.drawio.svg', band: '#fffbef', comps: [
    comp('App backend (app-lib)', GHR2('altinn-studio', 'src/App/backend'), names(APP_COLS), 'no database: all state in Storage'),
    comp('Storage', GHR2('altinn-storage'), names(STORAGE_COLS), 'PostgreSQL · Blob per org · Service Bus'),
  ] },
  { title: 'Events og Notifications', detail: './altinn_events_notifications_detailed.drawio.svg', band: '#fdf5f5', comps: [
    comp('Events', GHR2('altinn-events'), names(EV_COLS), 'PostgreSQL · Queues · Service Bus'),
    comp('Notifications API', GHR2('altinn-notifications', 'components/api'), names(NO_COLS), 'PostgreSQL · Service Bus'),
    comp('Email service', GHR2('altinn-notifications', 'components/email-service'), names(EMAIL_COLS), 'Azure Communication Services'),
    comp('SMS service', GHR2('altinn-notifications', 'components/sms-service'), names(SMS_COLS), 'Link Mobility'),
  ] },
  { title: 'Melding og formidling', detail: './altinn_correspondence_broker_detailed.drawio.svg', band: '#f8f4fa', comps: [
    comp('Correspondence', GHR2('altinn-correspondence'), names(CO_COLS), 'PostgreSQL · Blob per org · Redis'),
    comp('Broker', GHR2('altinn-broker'), names(BR_COLS).filter(n => n !== 'End-user frontend'), 'PostgreSQL · Blob per org · Redis'),
  ] },
  { title: 'Profile', detail: './altinn_profile_detailed.drawio.svg', band: '#f2f9fc', comps: [
    comp('Profile', GHR2('altinn-profile'), names(PR_COLS), 'PostgreSQL'),
  ] },
  { title: 'Altinn Studio', detail: './altinn_studio_detailed.drawio.svg', band: '#f7f7f7', comps: [
    comp('Designer backend', GHR2('altinn-studio', 'src/Designer/backend'), names(SBE_COLS), 'PostgreSQL · Redis · repos volume'),
    comp('Gitea & AI', GHR2('altinn-studio', 'src/gitea'), names(GI_COLS), 'Gitea DB · git repos'),
    comp('Runtime (per service owner)', GHR2('altinn-studio', 'src/Runtime'), names(RT_COLS), 'CloudNativePG · PostgreSQL'),
    comp('Local development', GHR2('altinn-studio', 'src/cli'), names(DEV_COLS), null, '#f5f5f5', '#666666'),
  ] },
];
const CHANNELS = [
  comp('Arbeidsflate', GHR2('dialogporten-frontend'), names(AFCOLS), 'React SPA + Node BFF', '#fff2cc', '#d6b656'),
  comp('Access Management frontend', GHR2('altinn-access-management-frontend'), names(FECOLS), 'React SPA + .NET BFF', '#fff2cc', '#d6b656'),
  comp('App frontend', GHR2('app-frontend-react'), names(APF_COLS), 'altinncdn.no, loaded by every app', '#fff2cc', '#d6b656'),
  comp('Studio Designer frontend', GHR2('altinn-studio', 'src/Designer/frontend'), names(SFE_COLS), 'Vite SPAs', '#fff2cc', '#d6b656'),
  comp('Broker frontend', GHR2('altinn-broker', 'frontend'), ['File transfer overview for end users'], 'static website', '#fff2cc', '#d6b656'),
  comp('End-user and business systems', null, ['Service owner systems', 'System vendors (system users)', 'ERP and case handling systems'], 'Maskinporten / system user tokens', '#e0e0e0', '#4d4d4d'),
];
const EXTERNALS = [
  ['ID-porten', 'login for citizens'], ['Maskinporten', 'machine-to-machine tokens'], ['Ansattporten', 'Studio login'],
  ['Folkeregisteret', 'Skatteetaten'], ['Enhetsregisteret', 'Brønnøysundregistrene'], ['SIRE', 'Skatteetaten'],
  ['KRR', 'Digdir contact register'], ['Varslingsadresser', 'Brønnøysundregistrene'], ['Altinn 2', 'SBL Bridge'],
  ['Azure Communication Services', 'e-mail'], ['Link Mobility', 'SMS'], ['Nets', 'payment'], ['eFormidling / Fiks', 'archive and forwarding'],
];

// ---- layout ----
let y = OV.y;
box({ x: OV.x, y, w: 1400, h: 44, value: 'Altinn 3: oversikt', font: 28, bold: true, align: 'left',
  style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=28;fontStyle=1;', noFill: true, noStroke: true });
box({ x: OV.x, y: y + 42, w: 1800, h: 22, value: 'One box per application with its main modules. Click a product heading to open its detailed drawing; click an application to open its repository.', font: 11, align: 'left',
  style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=11;fontColor=#555555;', noFill: true, noStroke: true });
y += 84;

// rows of products (wrap at MAXW)
const MAXW = 2900;
const sectionLabel = (text, yy) => box({ x: OV.x, y: yy, w: 800, h: 26, value: text, font: 14, bold: true, align: 'left',
  style: 'text;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;fontSize=14;fontStyle=1;fontColor=#333333;', noFill: true, noStroke: true });

sectionLabel('Brukerflater og konsumenter', y); y += 30;
const chP = drawProduct({ title: 'Frontends og klientsystemer', detail: null, band: '#fffdf5', comps: CHANNELS }, OV.x, y);
let right = OV.x + chP.w;
y += chP.h + 20;
const apimY = y;
y += 44 + 20;

sectionLabel('Produkter', y); y += 30;
let x = OV.x, rowH = 0;
for (const p of PRODUCTS) {
  const w = p.comps.length * (CBW + CBG) + CBG;
  if (x > OV.x && x + w > OV.x + MAXW) { x = OV.x; y += rowH + 24; rowH = 0; }
  const r = drawProduct(p, x, y);
  x += r.w + 24; rowH = Math.max(rowH, r.h); right = Math.max(right, x - 24);
}
y += rowH + 30;
box({ x: OV.x, y: apimY, w: right - OV.x, h: 44, font: 13, bold: true, rounded: true, fill: '#e6d0de', stroke: '#996185',
  value: 'Azure API Management (APIM)  ·  all platform APIs are reached through APIM with Ocp-Apim-Subscription-Key',
  style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 13, fontStyle: 1, fillColor: '#e6d0de', strokeColor: '#996185' }) });

sectionLabel('Eksterne fellesløsninger og leverandører', y); y += 30;
const EW = 170, EG = 12;
EXTERNALS.forEach(([n, d], i) => {
  const ex = OV.x + i * (EW + EG);
  box({ x: ex, y, w: EW, h: 44, value: `${n}\n${d}`, font: 9, rounded: true, fill: '#e0e0e0', stroke: '#4d4d4d', dashed: true,
    style: st({ rounded: 1, whiteSpace: 'wrap', html: 1, fontSize: 9, fillColor: '#e0e0e0', strokeColor: '#4d4d4d', dashed: 1 }) });
  right = Math.max(right, ex + EW);
});
y += 44;

{
  const OVFILE = path.join(path.dirname(OUT), 'altinn_overview.drawio.svg');
  const m = '<mxGraphModel dx="1637" dy="867" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/>' + cells.join('') + '</root></mxGraphModel>';
  const mf = '<mxfile><diagram id="altinn-overview" name="Altinn 3 oversikt">' + m + '</diagram></mxfile>';
  const w = right - OV.x + 41, h = y - OV.y + 41;
  const o = `<svg host="65bd71144e" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${w}px" height="${h}px" viewBox="${OV.x - 20.5} ${OV.y - 20.5} ${w} ${h}" style="background-color: #ffffff;" content="${esc(mf)}"><defs/><g>${svg.join('')}</g></svg>`;
  fs.writeFileSync(OVFILE, o, 'utf8');
  console.log('altinn_overview.drawio.svg', cells.length, 'cells', Math.round(o.length / 1024) + ' KB', w + 'x' + h);
}
}

if (unresolved.length) {
  console.error('Unresolved paths (not on main any more?):\n  ' + unresolved.join('\n  '));
  process.exitCode = 1;
}
