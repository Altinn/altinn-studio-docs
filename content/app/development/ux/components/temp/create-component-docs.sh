
# Create component folders
for f in $(cat component-list.txt);do mkdir -p new-components-template/$f;done

# Copy template files
for d in $(ls new-components-template); do cp ../_component-template/_index.nb.md ../_component-template/_index.en.md new-components-template/$d/;done

# Replace fields in frontmatter with component name
for d in $(ls new-components-template);do sed -i '' 's/title: Komponent/title: '"$d"'/' new-components-template/$d/_index.nb.md;done
for d in $(ls new-components-template);do sed -i '' 's/linktitle: Komponent/linktitle: '"$d"'/' new-components-template/$d/_index.nb.md;done
for d in $(ls new-components-template);do sed -i '' 's/title: Component/title: '"$d"'/' new-components-template/$d/_index.en.md;done
for d in $(ls new-components-template);do sed -i '' 's/linktitle: Component/linktitle: '"$d"'/' new-components-template/$d/_index.en.md;done
for d in $(ls new-components-template);do sed -i '' 's/schemaname:/schemaname: '"$d"'/' new-components-template/$d/_index.*;done
