const KEY="live-family-2d-save-v1";
export function loadGame(){try{return JSON.parse(localStorage.getItem(KEY)||"null")}catch{return null}}
export function saveGame(data){try{localStorage.setItem(KEY,JSON.stringify(data))}catch(e){console.warn("Не удалось сохранить игру",e)}}
export function clearGame(){localStorage.removeItem(KEY)}