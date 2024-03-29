import { getTimestampInSeconds } from "./helpers";

export const MIGRATE_VERSION = '2.0.0';
export const DEFAULT_DICTIONARY = {
  name: 'New',
  specification: 'Dictionary',
  description: 'A new dictionary.',
  partsOfSpeech: ['Noun', 'Adjective', 'Verb'],
  alphabeticalOrder: [],
  details: {
    phonology: {
      consonants: [],
      vowels: [],
      blends: [],
      phonotactics: {
        onset: [],
        nucleus: [],
        coda: [],
        exceptions: '',
      },
    },
    orthography: {
      notes: '',
    },
    grammar: {
      notes: '',
    },
    // custom: [
    //   // {
    //   //   name: 'Example Tab',
    //   //   content: `This is an _example_ tab to show how **tabs** work with [Markdown](${ MARKDOWN_LINK })!`,
    //   // }
    // ],
  },
  words: [
    /* {
      name: '',
      pronunciation: '',
      partOfSpeech: '',
      definition: '',
      details: '',
      wordId: 0
    }, */
  ],
  settings: {
    allowDuplicates: false,
    caseSensitive: false,
    sortByDefinition: false,
    isComplete: false,
    isPublic: false,
  },
  lastUpdated: getTimestampInSeconds(),
  createdOn: getTimestampInSeconds(),
  version: MIGRATE_VERSION,
};

export const DEFAULT_SETTINGS = {
  useIPAPronunciationField: true,
  useHotkeys: true,
};

export const DEFAULT_PAGE_SIZE = 50;

export const LOCAL_STORAGE_KEY = 'dictionary';
export const SETTINGS_KEY = 'settings';
