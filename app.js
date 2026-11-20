import {loadGame, saveGame, clearGame} from "./save.js";
import {renderMainMenu} from "./menus.js";
import {renderGame} from "./game.js";

export const screen = document.querySelector("#screen");
export let state = loadGame() || null;
export function setState(next){ state=next; saveGame(state); }
export function toast(message){
  const el=document.querySelector("#saveState");
  el.textContent=message;
  setTimeout(()=>el.textContent="● Автосохранение включено",1800);
}
export function newCharacter(data){
  state={
    player:{name:data.name,gender:data.gender,age:Number(data.age),hair:data.hair,clothes:data.clothes},
    money:10000, day:1, hour:8, hunger:90, thirst:90, energy:90, mood:90,
    house:false, car:false, food:0, relationship:0, pregnant:false, pregnancyMonth:0,
    child:null, location:"home"
  };
  saveGame(state); renderGame();
}
export function goMenu(){ renderMainMenu(); }
export function saveNow(){if(state)saveGame(state);toast("✓ Игра сохранена");}
export function reset(){if(confirm("Удалить сохранение и начать заново?")){clearGame();state=null;renderMainMenu();}}
window.addEventListener("beforeunload",()=>{if(state)saveGame(state)});
setInterval(()=>{if(state){saveGame(state);toast("✓ Автосохранено");}},30000);
if(state)renderGame(); else renderMainMenu();