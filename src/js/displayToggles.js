import md from 'snarkdown';

export function showSection(sectionName) {
  switch (sectionName) {
    case 'description': showDescription(); break;
    case 'details': showDetails(); break;
    case 'stats': showStats(); break;
  }
}

function showDescription() {
  const detailsPanel = document.getElementById('detailsPanel');
  detailsPanel.style.display = 'block';
  const {description} = window.currentDictionary;
  const descriptionHTML = md(description);

  detailsPanel.innerHTML = descriptionHTML;
}

function showDetails() {
  const detailsPanel = document.getElementById('detailsPanel');
  detailsPanel.style.display = 'block';
  const {partsOfSpeech, alphabeticalOrder} = window.currentDictionary;
  const {phonology, orthography, grammar} = window.currentDictionary.details;
  const partsOfSpeechHTML = `<p><strong>Parts of Speech:</strong> ${partsOfSpeech.map(partOfSpeech => '<span class="tag">' + partOfSpeech + '</span>').join(' ')}</p>`;
  const alphabeticalOrderHTML = `<p><strong>Alphabetical Order:</strong> ${
    (alphabeticalOrder.length > 0 ? alphabeticalOrder : ['English Alphabet']).map(letter => `<span class="tag">${letter}</span>`).join(' ')
  }</p>`;
  

  detailsPanel.innerHTML = partsOfSpeechHTML + alphabeticalOrderHTML;
}

function showStats() {
  const detailsPanel = document.getElementById('detailsPanel');
  detailsPanel.style.display = 'block';
  const wordStats = getWordsStats();
  const numberOfWordsHTML = `<p><strong>Number of Words</strong><br>${wordStats.numberOfWords.map(stat => `<span><span class="tag">${stat.name}</span><span class="tag">${stat.value}</span></span>`).join(' ')}</p>`;

  detailsPanel.innerHTML = numberOfWordsHTML;
}

function getWordsStats() {
  const {words, partsOfSpeech} = window.currentDictionary;
  const {caseSensitive} = window.currentDictionary.settings;
  
  const wordStats = {
    numberOfWords: [
      {
        name: 'Total',
        value: words.length,
      },
    ],
    wordLength: {
      shortest: 0,
      longest: 0,
      average: 0,
    },
    letterDistribution: [
      /* {
        letter: '',
        number: 0,
        percentage: 0.00,
      } */
    ],
    totalLetters: 0,
  };

  partsOfSpeech.forEach(partOfSpeech => {
    const wordsWithPartOfSpeech = words.filter(word => word.partOfSpeech === partOfSpeech);
    wordStats.numberOfWords.push({
      name: partOfSpeech,
      value: wordsWithPartOfSpeech.length,
    });
  });

  wordStats.numberOfWords.push({
    name: 'Unclassified',
    value: words.filter(word => !partsOfSpeech.includes(word.partOfSpeech)).length,
  });

  let totalLetters = 0;
  const numberOfLetters = {};

  words.forEach(word => {
    const shortestWord = wordStats.wordLength.shortest;
    const longestWord = wordStats.wordLength.longest;
    const wordLetters = word.name.split('');
    const lettersInWord = wordLetters.length;

    totalLetters += lettersInWord;

    if (shortestWord === 0 || lettersInWord < shortestWord) {
      wordStats.wordLength.shortest = lettersInWord;
    }

    if (longestWord === 0 || lettersInWord > longestWord) {
      wordStats.wordLength.longest = lettersInWord;
    }

    wordLetters.forEach(letter => {
      const letterToUse = caseSensitive ? letter : letter.toLowerCase();
      if (!numberOfLetters.hasOwnProperty(letterToUse)) {
        numberOfLetters[letterToUse] = 1;
      } else {
        numberOfLetters[letterToUse]++;
      }
    });
  });

  wordStats.totalLetters = totalLetters;
  wordStats.wordLength.average = totalLetters / words.length;

  for (const letter in numberOfLetters) {
    if (numberOfLetters.hasOwnProperty(letter)) {
      const number = numberOfLetters[letter];
      wordStats.letterDistribution.push({
        letter,
        number,
        percentage: number / totalLetters,
      });
    }
  }

  wordStats.letterDistribution.sort((a, b) => {
    if (a.percentage === b.percentage) return 0;
    return (a.percentage > b.percentage) ? -1 : 1;
  });

  return wordStats;
}