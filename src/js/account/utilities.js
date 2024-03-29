import { setCookie } from "../StackOverflow/cookie";
import { DELETED_WORDS_LOCALSTORAGE_KEY } from "./constants";
import { getTimestampInSeconds } from "../../helpers";

export function saveToken(token) {
  setCookie('token', token, 30);
}

export function saveDeletedWordsLocally(wordIds) {
  let storedDeletedWords = getLocalDeletedWords();
  wordIds.forEach(wordId => {
    if (storedDeletedWords.findIndex(stored => stored.id === wordId) < 0) {
      storedDeletedWords.push({
        id: wordId,
        deletedOn: getTimestampInSeconds(),
      });
    }
  });
  window.localStorage.setItem(DELETED_WORDS_LOCALSTORAGE_KEY, JSON.stringify(storedDeletedWords));
}

export function saveDeletedWordLocally(wordId) {
  saveDeletedWordsLocally([wordId]);
}

export function getLocalDeletedWords() {
  let storedDeletedWords = window.localStorage.getItem(DELETED_WORDS_LOCALSTORAGE_KEY);
  if (!storedDeletedWords) {
    storedDeletedWords = [];
  } else {
    storedDeletedWords = JSON.parse(storedDeletedWords);
  }
  return storedDeletedWords;
}

export function clearLocalDeletedWords() {
  window.localStorage.removeItem(DELETED_WORDS_LOCALSTORAGE_KEY);
}
