#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const quizDirectory = path.join(
  repoRoot,
  "content",
  "authorization",
  "getting-started",
  "quiz",
);
const configurations = [
  {
    language: "nb",
    file: path.join(quizDirectory, "questions.json"),
    sourcePrefix: "/nb/authorization/",
  },
  {
    language: "en",
    file: path.join(quizDirectory, "questions.en.json"),
    sourcePrefix: "/en/authorization/",
  },
];
const shortcodeFile = path.join(
  repoRoot,
  "layouts",
  "shortcodes",
  "authorization-quiz.html",
);
const hubFile = path.join(
  repoRoot,
  "layouts",
  "shortcodes",
  "authorization-hub.html",
);
const errors = [];

const readText = (file) => {
  if (!fs.existsSync(file)) {
    errors.push("Mangler fil: " + path.relative(repoRoot, file));
    return "";
  }
  return fs.readFileSync(file, "utf8");
};

const readBank = (configuration) => {
  const text = readText(configuration.file);
  if (!text) return [];

  try {
    const bank = JSON.parse(text);
    if (!Array.isArray(bank)) {
      errors.push(configuration.language + ": Spørsmålsbanken må være en liste.");
      return [];
    }
    return bank;
  } catch (error) {
    errors.push(configuration.language + ": Ugyldig JSON: " + error.message);
    return [];
  }
};

const validateQuestion = (question, configuration, seenIds) => {
  const prefix = configuration.language + " spørsmål ";
  if (!question || typeof question !== "object" || Array.isArray(question)) {
    errors.push(prefix + "har ugyldig format.");
    return;
  }

  const id = question.id;
  if (!Number.isInteger(id) || id < 1) {
    errors.push(prefix + "har ugyldig id.");
  } else if (seenIds.has(id)) {
    errors.push(configuration.language + ": Duplikat id " + id + ".");
  } else {
    seenIds.add(id);
  }

  for (const field of ["category", "level", "question", "explanation"]) {
    if (typeof question[field] !== "string" || !question[field].trim()) {
      errors.push(prefix + String(id) + " mangler " + field + ".");
    }
  }

  if (!Array.isArray(question.options) || question.options.length !== 4) {
    errors.push(prefix + String(id) + " må ha nøyaktig fire svaralternativer.");
  } else if (question.options.some((option) => typeof option !== "string" || !option.trim())) {
    errors.push(prefix + String(id) + " har et tomt svaralternativ.");
  }

  if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct > 3) {
    errors.push(prefix + String(id) + " har ugyldig fasitposisjon.");
  }

  if (!question.source || typeof question.source !== "object") {
    errors.push(prefix + String(id) + " mangler kilde.");
    return;
  }

  if (typeof question.source.label !== "string" || !question.source.label.trim()) {
    errors.push(prefix + String(id) + " mangler kildetekst.");
  }
  if (
    typeof question.source.url !== "string"
    || !question.source.url.startsWith(configuration.sourcePrefix)
  ) {
    errors.push(
      prefix
      + String(id)
      + " må lenke til "
      + configuration.sourcePrefix
      + ".",
    );
  }
};

const banks = configurations.map((configuration) => {
  const questions = readBank(configuration);
  const seenIds = new Set();
  questions.forEach((question) => validateQuestion(question, configuration, seenIds));

  const distribution = [0, 0, 0, 0];
  questions.forEach((question) => {
    if (Number.isInteger(question.correct) && question.correct >= 0 && question.correct <= 3) {
      distribution[question.correct] += 1;
    }
  });
  if (Math.max(...distribution) - Math.min(...distribution) > 1) {
    errors.push(
      configuration.language
      + ": Fasitposisjonene er ubalanserte: "
      + distribution.join(", ")
      + ".",
    );
  }

  return { configuration, questions, distribution };
});

if (banks.every((bank) => bank.questions.length)) {
  const [norwegian, english] = banks;
  if (norwegian.questions.length !== english.questions.length) {
    errors.push(
      "Språkbankene har ulikt antall spørsmål: "
      + norwegian.questions.length
      + " og "
      + english.questions.length
      + ".",
    );
  }

  const englishById = new Map(english.questions.map((question) => [question.id, question]));
  for (const question of norwegian.questions) {
    const translation = englishById.get(question.id);
    if (!translation) {
      errors.push("Engelsk spørsmålsbank mangler id " + question.id + ".");
    } else if (translation.correct !== question.correct) {
      errors.push("Språkbankene har ulik fasit for id " + question.id + ".");
    }
  }

  const norwegianIds = new Set(norwegian.questions.map((question) => question.id));
  for (const question of english.questions) {
    if (!norwegianIds.has(question.id)) {
      errors.push("Norsk spørsmålsbank mangler id " + question.id + ".");
    }
  }

  const expectedCount = norwegian.questions.length;
  const shortcode = readText(shortcodeFile);
  for (const attribute of ["data-question-bank-count", "data-full-test-count"]) {
    const match = shortcode.match(new RegExp(attribute + ">([0-9]+)<"));
    if (!match) {
      errors.push("Fant ikke reservetall for " + attribute + " i shortcoden.");
    } else if (Number(match[1]) !== expectedCount) {
      errors.push(
        attribute
        + " viser "
        + match[1]
        + ", men spørsmålsbanken har "
        + expectedCount
        + ".",
      );
    }
  }

  const hub = readText(hubFile);
  const norwegianPromo = hub.match(/alle ([0-9]+) spørsmålene/);
  const englishPromo = hub.match(/all ([0-9]+) questions/);
  for (const [label, match] of [
    ["norsk promo", norwegianPromo],
    ["engelsk promo", englishPromo],
  ]) {
    if (match && Number(match[1]) !== expectedCount) {
      errors.push(
        label
        + " viser "
        + match[1]
        + ", men spørsmålsbanken har "
        + expectedCount
        + ".",
      );
    }
  }
}

if (errors.length) {
  console.error("Quiz-valideringen fant " + errors.length + " feil:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

for (const bank of banks) {
  const categoryCounts = new Map();
  bank.questions.forEach((question) => {
    categoryCounts.set(question.category, (categoryCounts.get(question.category) || 0) + 1);
  });
  console.log(
    bank.configuration.language
    + ": "
    + bank.questions.length
    + " spørsmål, fasit "
    + bank.distribution.join("/")
    + ", "
    + categoryCounts.size
    + " kategorier",
  );
}
console.log("Quiz-valideringen er godkjent.");
