import {screen,state,newCharacter,reset} from "./app.js";
import {renderGame} from "./game.js";
export function renderMainMenu(){
 screen.innerHTML=`
 <div class="logo"><h1>LIVE FAMILY</h1><p>2D PIXEL LIFE SIMULATOR</p></div>
 <div class="pixel-scene"><div class="pixel-house"><div class="pixel-door"></div></div></div>
 <button class="btn primary" id="new">▶ НОВАЯ ИГРА</button>
 <button class="btn" id="continue" ${state?"":"disabled"}>Продолжить игру</button>
 <button class="btn secondary" id="settings">⚙ Настройки</button>
 <p class="muted">Создай персонажа, исследуй город, покупай жильё и машины, работай и строй семейную жизнь. Прогресс сохраняется автоматически на этом устройстве.</p>`;
 screen.querySelector("#new").onclick=renderCreator;
 screen.querySelector("#continue").onclick=()=>renderGame();
 screen.querySelector("#settings").onclick=()=>renderSettings();
}
export function renderCreator(){
 screen.innerHTML=`
 <h2>✨ Создание персонажа</h2><div class="avatar"><div class="hair"></div><div class="head"></div><div class="body"></div><div class="legs"></div></div>
 <div class="field"><label>Имя персонажа</label><input id="name" maxlength="18" value="Алекс"></div>
 <div class="grid">
 <div class="field"><label>Персонаж</label><select id="gender"><option>Мужчина</option><option>Женщина</option></select></div>
 <div class="field"><label>Возраст</label><select id="age"><option>18</option><option>19</option><option>20</option><option>21</option><option>25</option><option>30</option></select></div>
 <div class="field"><label>Причёска</label><select id="hair"><option>Короткая</option><option>Длинная</option><option>Кудрявая</option></select></div>
 <div class="field"><label>Одежда</label><select id="clothes"><option>Повседневная</option><option>Спортивная</option><option>Классическая</option></select></div>
 </div>
 <button class="btn primary" id="create">Создать персонажа и начать</button>
 <button class="btn secondary" id="back">← Назад</button>`;
 screen.querySelector("#create").onclick=()=>{
  const name=screen.querySelector("#name").value.trim()||"Игрок";
  newCharacter({name,gender:screen.querySelector("#gender").value,age:screen.querySelector("#age").value,hair:screen.querySelector("#hair").value,clothes:screen.querySelector("#clothes").value});
 };
 screen.querySelector("#back").onclick=renderMainMenu;
}
function renderSettings(){
 screen.innerHTML=`<h2>⚙ Настройки</h2><div class="notice">Автосохранение включено. Игра хранится в памяти браузера на этом устройстве.</div><button class="btn" id="back">← Назад</button>`;
 screen.querySelector("#back").onclick=renderMainMenu;
}