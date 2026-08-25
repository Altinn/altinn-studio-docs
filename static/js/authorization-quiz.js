(() => {
  const shuffle = (items) => {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapWith = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapWith]] = [copy[swapWith], copy[index]];
    }
    return copy;
  };

  const translations = {
    nb: {
      questionCount: (current, total) => `Spørsmål ${current} av ${total}`,
      score: (value) => `${value} riktige`,
      correctLabel: 'Riktig svar',
      incorrectLabel: 'Ikke helt riktig',
      correctTitle: 'Godt jobbet!',
      correctAnswer: (answer) => `Riktig svar er: ${answer}`,
      readMore: (label) => `Les mer: ${label} →`,
      showResult: 'Se resultatet →',
      nextQuestion: 'Neste spørsmål →',
      resultFraction: (value, total) => `${value} av ${total} riktige`,
      categoryResult: (category, value, total) => `${category}: ${value} av ${total} riktige`,
      yourAnswer: (answer) => `Ditt svar: ${answer}`,
      rightAnswer: (answer) => `Riktig svar: ${answer}`,
      resultBands: {
        low: ['Bygg videre på grunnlaget', 'Bruk temaoversikten og forklaringene under til å velge hva du bør lese først.'],
        foundation: ['Du har grunnlaget', 'Du kjenner de viktigste prinsippene. En målrettet gjennomgang av temaene under vil gi deg et tryggere helhetsbilde.'],
        good: ['God forståelse', 'Du har et solid grep om autorisasjon. Se gjennom temaene med lavest score for å tette de siste hullene.'],
        excellent: ['Svært god forståelse', 'Du behersker både de overordnede prinsippene og mange av detaljene i Altinn Autorisasjon.'],
      },
    },
    en: {
      questionCount: (current, total) => `Question ${current} of ${total}`,
      score: (value) => `${value} correct`,
      correctLabel: 'Correct answer',
      incorrectLabel: 'Not quite right',
      correctTitle: 'Well done!',
      correctAnswer: (answer) => `The correct answer is: ${answer}`,
      readMore: (label) => `Read more: ${label} →`,
      showResult: 'View result →',
      nextQuestion: 'Next question →',
      resultFraction: (value, total) => `${value} of ${total} correct`,
      categoryResult: (category, value, total) => `${category}: ${value} of ${total} correct`,
      yourAnswer: (answer) => `Your answer: ${answer}`,
      rightAnswer: (answer) => `Correct answer: ${answer}`,
      resultBands: {
        low: ['Build on the basics', 'Use the subject overview and explanations below to decide what to read first.'],
        foundation: ['You have the foundation', 'You know the most important principles. A focused review of the subjects below will give you a more confident overall understanding.'],
        good: ['Good understanding', 'You have a solid grasp of authorization. Review the subjects with the lowest scores to close the remaining gaps.'],
        excellent: ['Very good understanding', 'You have mastered both the high-level principles and many of the details of Altinn Authorization.'],
      },
    },
  };

  const balancedSample = (questions, count) => {
    const groups = new Map();
    questions.forEach((question) => {
      if (!groups.has(question.category)) groups.set(question.category, [[], [], [], []]);
      groups.get(question.category)[question.correct].push(question);
    });

    const categories = shuffle([...groups.keys()]).sort((first, second) => {
      const firstPositions = groups.get(first).filter((items) => items.length).length;
      const secondPositions = groups.get(second).filter((items) => items.length).length;
      return firstPositions - secondPositions;
    });
    const baseCategoryQuota = Math.floor(count / categories.length);
    const categoryQuotas = new Map(categories.map((category) => [category, baseCategoryQuota]));
    shuffle(categories).slice(0, count % categories.length).forEach((category) => {
      categoryQuotas.set(category, categoryQuotas.get(category) + 1);
    });

    const answerQuotas = Array(4).fill(Math.floor(count / 4));
    shuffle([0, 1, 2, 3]).slice(0, count % 4).forEach((position) => {
      answerQuotas[position] += 1;
    });

    const allocations = new Map();
    const allocateCategory = (categoryIndex, remainingAnswers) => {
      if (categoryIndex === categories.length) return remainingAnswers.every((remaining) => remaining === 0);

      const category = categories[categoryIndex];
      const available = groups.get(category).map((items) => items.length);
      const candidates = [];
      const buildCandidates = (position, remainingCategory, allocation) => {
        if (position === 3) {
          if (remainingCategory <= available[position] && remainingCategory <= remainingAnswers[position]) {
            candidates.push([...allocation, remainingCategory]);
          }
          return;
        }
        const maximum = Math.min(remainingCategory, available[position], remainingAnswers[position]);
        for (let amount = 0; amount <= maximum; amount += 1) {
          buildCandidates(position + 1, remainingCategory - amount, [...allocation, amount]);
        }
      };
      buildCandidates(0, categoryQuotas.get(category), []);

      for (const allocation of shuffle(candidates)) {
        allocations.set(category, allocation);
        const nextRemaining = remainingAnswers.map((remaining, position) => remaining - allocation[position]);
        if (allocateCategory(categoryIndex + 1, nextRemaining)) return true;
      }
      allocations.delete(category);
      return false;
    };

    if (!allocateCategory(0, answerQuotas)) throw new Error('Unable to create a balanced question set.');

    const selected = [];
    categories.forEach((category) => {
      allocations.get(category).forEach((amount, position) => {
        selected.push(...shuffle(groups.get(category)[position]).slice(0, amount));
      });
    });
    return shuffle(selected);
  };

  const createElement = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  const setDocumentationLink = (link, value, language) => {
    const authorizationRoot = `/${language}/authorization/`;
    link.href = authorizationRoot;
    const sourceUrl = new URL(value, window.location.origin);
    if (sourceUrl.origin !== window.location.origin || !sourceUrl.pathname.startsWith(authorizationRoot)) return;
    link.pathname = sourceUrl.pathname;
    link.hash = sourceUrl.hash;
  };

  const initializeQuiz = (root) => {
    if (root.dataset.quizReady === 'true') return;
    const language = root.dataset.quizLanguage === 'en' ? 'en' : 'nb';
    const labels = translations[language];
    const scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    root.dataset.quizReady = 'true';

    const dataElement = root.querySelector('[data-quiz-data]');
    const questionBank = JSON.parse(dataElement.textContent);
    const screens = {
      start: root.querySelector('[data-quiz-screen="start"]'),
      question: root.querySelector('[data-quiz-screen="question"]'),
      results: root.querySelector('[data-quiz-screen="results"]'),
    };
    const form = root.querySelector('[data-question-form]');
    const answerButton = root.querySelector('[data-answer-button]');
    const nextButton = root.querySelector('[data-next-button]');
    const feedback = root.querySelector('[data-feedback]');
    const optionsContainer = root.querySelector('[data-question-options]');
    const progress = root.querySelector('.authorization-quiz__progress');
    const progressBar = root.querySelector('[data-progress-bar]');
    const questionCount = root.querySelector('[data-question-count]');
    const liveScore = root.querySelector('[data-live-score]');
    const questionText = root.querySelector('[data-question-text]');
    const questionCategory = root.querySelector('[data-question-category]');
    const questionLevel = root.querySelector('[data-question-level]');
    let activeQuestions = [];
    let answers = [];
    let currentIndex = 0;
    let score = 0;

    root.querySelectorAll('[data-question-bank-count], [data-full-test-count]').forEach((element) => {
      element.textContent = questionBank.length;
    });

    const showScreen = (name) => {
      Object.entries(screens).forEach(([screenName, element]) => {
        element.hidden = screenName !== name;
      });
    };

    const startQuiz = (requestedCount, reuseQuestions = false) => {
      if (!reuseQuestions) {
        const count = requestedCount === 'all' ? questionBank.length : Math.min(Number(requestedCount), questionBank.length);
        activeQuestions = count === questionBank.length ? shuffle(questionBank) : balancedSample(questionBank, count);
      } else {
        activeQuestions = shuffle(activeQuestions);
      }
      answers = [];
      currentIndex = 0;
      score = 0;
      showScreen('question');
      renderQuestion();
      screens.question.focus({ preventScroll: true });
      window.scrollTo({ top: root.offsetTop, behavior: scrollBehavior });
    };

    const renderQuestion = () => {
      const question = activeQuestions[currentIndex];
      const position = currentIndex + 1;
      questionCount.textContent = labels.questionCount(position, activeQuestions.length);
      liveScore.textContent = labels.score(score);
      questionCategory.textContent = question.category;
      questionLevel.textContent = question.level;
      questionText.textContent = question.question;
      progress.setAttribute('aria-valuemax', String(activeQuestions.length));
      progress.setAttribute('aria-valuenow', String(position));
      progressBar.style.width = `${(position / activeQuestions.length) * 100}%`;
      form.reset();
      optionsContainer.replaceChildren();

      question.options.forEach((option, optionIndex) => {
        const label = createElement('label', 'authorization-quiz__option');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'quiz-answer';
        input.value = String(optionIndex);
        input.addEventListener('change', () => {
          answerButton.disabled = false;
        });
        const letter = createElement('span', 'authorization-quiz__letter', String.fromCharCode(65 + optionIndex));
        letter.setAttribute('aria-hidden', 'true');
        label.append(input, letter, createElement('span', '', option));
        optionsContainer.append(label);
      });

      answerButton.disabled = true;
      answerButton.hidden = false;
      nextButton.hidden = true;
      feedback.hidden = true;
      feedback.classList.remove('authorization-quiz__feedback--correct', 'authorization-quiz__feedback--wrong');
    };

    const submitAnswer = () => {
      const question = activeQuestions[currentIndex];
      const selectedInput = form.querySelector('input[name="quiz-answer"]:checked');
      if (!selectedInput) return;

      const selected = Number(selectedInput.value);
      const isCorrect = selected === question.correct;
      if (isCorrect) score += 1;
      answers.push({ question, selected, isCorrect });
      liveScore.textContent = labels.score(score);

      optionsContainer.querySelectorAll('.authorization-quiz__option').forEach((label, optionIndex) => {
        const input = label.querySelector('input');
        input.disabled = true;
        if (optionIndex === question.correct) label.classList.add('authorization-quiz__option--correct');
        if (optionIndex === selected && !isCorrect) label.classList.add('authorization-quiz__option--wrong');
      });

      feedback.classList.add(isCorrect ? 'authorization-quiz__feedback--correct' : 'authorization-quiz__feedback--wrong');
      root.querySelector('[data-feedback-label]').textContent = isCorrect ? labels.correctLabel : labels.incorrectLabel;
      root.querySelector('[data-feedback-title]').textContent = isCorrect
        ? labels.correctTitle
        : labels.correctAnswer(question.options[question.correct]);
      root.querySelector('[data-feedback-text]').textContent = question.explanation;
      const sourceLink = root.querySelector('[data-feedback-source]');
      sourceLink.textContent = labels.readMore(question.source.label);
      setDocumentationLink(sourceLink, question.source.url, language);
      feedback.hidden = false;
      answerButton.hidden = true;
      nextButton.textContent = currentIndex === activeQuestions.length - 1 ? labels.showResult : labels.nextQuestion;
      nextButton.hidden = false;
      feedback.focus();
    };

    const showResults = () => {
      showScreen('results');
      const percent = Math.round((score / activeQuestions.length) * 100);
      root.querySelector('[data-result-percent]').textContent = `${percent} %`;
      root.querySelector('[data-result-fraction]').textContent = labels.resultFraction(score, activeQuestions.length);

      let resultBand = labels.resultBands.low;
      if (percent >= 90) resultBand = labels.resultBands.excellent;
      else if (percent >= 75) resultBand = labels.resultBands.good;
      else if (percent >= 50) resultBand = labels.resultBands.foundation;
      const [title, text] = resultBand;
      root.querySelector('[data-result-title]').textContent = title;
      root.querySelector('[data-result-text]').textContent = text;

      const categoryResults = root.querySelector('[data-category-results]');
      categoryResults.replaceChildren();
      const categories = new Map();
      answers.forEach((answer) => {
        const current = categories.get(answer.question.category) || { correct: 0, total: 0 };
        current.total += 1;
        if (answer.isCorrect) current.correct += 1;
        categories.set(answer.question.category, current);
      });
      [...categories.entries()].sort(([a], [b]) => a.localeCompare(b, language)).forEach(([category, result]) => {
        const row = createElement('div', 'authorization-quiz__category-row');
        const label = createElement('span', '', category);
        const track = createElement('span', 'authorization-quiz__category-track');
        const fill = document.createElement('span');
        const categoryPercent = Math.round((result.correct / result.total) * 100);
        fill.style.width = `${categoryPercent}%`;
        track.append(fill);
        track.setAttribute('aria-label', labels.categoryResult(category, result.correct, result.total));
        track.setAttribute('role', 'progressbar');
        track.setAttribute('aria-valuemin', '0');
        track.setAttribute('aria-valuemax', '100');
        track.setAttribute('aria-valuenow', String(categoryPercent));
        const value = createElement('strong', 'authorization-quiz__category-score', `${result.correct}/${result.total}`);
        row.append(label, track, value);
        categoryResults.append(row);
      });

      const incorrect = answers.filter((answer) => !answer.isCorrect);
      const reviewSection = root.querySelector('[data-review-section]');
      const review = root.querySelector('[data-incorrect-review]');
      review.replaceChildren();
      reviewSection.hidden = incorrect.length === 0;
      incorrect.forEach((answer) => {
        const item = createElement('article', 'authorization-quiz__review-item');
        item.append(
          createElement('h4', '', answer.question.question),
          createElement('p', '', labels.yourAnswer(answer.question.options[answer.selected])),
          createElement('p', '', labels.rightAnswer(answer.question.options[answer.question.correct])),
          createElement('p', '', answer.question.explanation),
        );
        const link = createElement('a', '', `${answer.question.source.label} →`);
        setDocumentationLink(link, answer.question.source.url, language);
        item.append(link);
        review.append(item);
      });

      screens.results.focus();
      window.scrollTo({ top: root.offsetTop, behavior: scrollBehavior });
    };

    root.querySelectorAll('[data-start-quiz]').forEach((button) => {
      button.addEventListener('click', () => startQuiz(button.dataset.startQuiz));
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitAnswer();
    });
    nextButton.addEventListener('click', () => {
      if (currentIndex === activeQuestions.length - 1) {
        showResults();
        return;
      }
      currentIndex += 1;
      renderQuestion();
      screens.question.focus({ preventScroll: true });
      window.scrollTo({ top: root.offsetTop, behavior: scrollBehavior });
    });
    root.querySelector('[data-retry-button]').addEventListener('click', () => startQuiz(activeQuestions.length, true));
    root.querySelector('[data-reset-button]').addEventListener('click', () => {
      showScreen('start');
      screens.start.focus({ preventScroll: true });
      window.scrollTo({ top: root.offsetTop, behavior: scrollBehavior });
    });
  };

  document.querySelectorAll('[data-authorization-quiz]').forEach(initializeQuiz);
})();
