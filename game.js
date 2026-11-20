import {screen,state,setState,saveNow,goMenu,reset,toast} from "./app.js";
function update(mutator){mutator(state);setState(state);renderGame()}
function bar(label,value){return `<div class="stat">${label} ${Math.round(value)}%<div class="bar"><i style="width:${Math.max(0,Math.min(100,value))}%"></i></div></div>`}
export function renderGame(){
 if(!state)return goMenu();
 screen.innerHTML=`
 <h2>🏙 Город · День ${state.day} · ${String(state.hour).padStart(2,"0")}:00</h2>
 <div class="game-map"><div class="building" style="left:5%;top:8%">🏪<br>МАГАЗИН</div><div class="building" style="right:5%;top:8%;background:#dce5ed">🏥<br>БОЛЬНИЦА</div><div class="building" style="left:5%;bottom:8%;background:#d9a16b">🏠<br>ДОМ</div><div class="building" style="right:5%;bottom:8%;background:#8ba9ce">💼<br>РАБОТА</div><div class="player-dot">🧍</div></div>
 <h3>Привет, ${state.player.name}!</h3>
 <div class="status">${bar("🍔 Голод",state.hunger)}${bar("💧 Жажда",state.thirst)}${bar("⚡ Энергия",state.energy)}${bar("❤️ Настроение",state.mood)}</div>
 <div class="notice">💰 ${state.money} ₸ · ${state.house?"🏠 Дом есть":"🏠 Дома нет"} · ${state.car?"🚗 Машина есть":"🚗 Машины нет"} · 🍎 Продукты: ${state.food}</div>
 <div class="grid">
 <button class="btn" id="food">🍎 Купить еду · 300 ₸</button><button class="btn" id="eat">🍽 Поесть</button>
 <button class="btn" id="water">💧 Выпить воды</button><button class="btn" id="sleep">🛏 Спать</button>
 <button class="btn" id="work">💼 Работать +500 ₸</button><button class="btn" id="house">🏠 Купить дом · 5000 ₸</button>
 <button class="btn" id="car">🚗 Купить машину · 3000 ₸</button><button class="btn" id="family">❤️ Семья и отношения</button>
 <button class="btn" id="pregnancy">🤰 Семейный план</button><button class="btn" id="doctor">🏥 Посетить врача</button>
 </div>
 <div class="row"><button class="btn secondary" id="save">💾 Сохранить</button><button class="btn secondary" id="menu">Главное меню</button></div>
 <p class="muted">Действия расходуют игровое время. Автосохранение каждые 30 секунд.</p>`;
 const on=(id,fn)=>screen.querySelector("#"+id).onclick=fn;
 on("food",()=>update(s=>{if(s.money>=300){s.money-=300;s.food++;s.hour=(s.hour+1)%24;toast("Продукты куплены")}else toast("Недостаточно денег")}));
 on("eat",()=>update(s=>{if(s.food>0){s.food--;s.hunger=Math.min(100,s.hunger+35)}else toast("Сначала купи продукты")}));
 on("water",()=>update(s=>s.thirst=Math.min(100,s.thirst+30)));
 on("sleep",()=>update(s=>{s.energy=100;s.day++;s.hour=8;s.hunger=Math.max(0,s.hunger-8);s.thirst=Math.max(0,s.thirst-10)}));
 on("work",()=>update(s=>{if(s.energy>=20){s.money+=500;s.energy-=20;s.hunger=Math.max(0,s.hunger-10);s.hour=(s.hour+2)%24}else toast("Нужно отдохнуть")}));
 on("house",()=>update(s=>{if(s.house)toast("Дом уже куплен");else if(s.money>=5000){s.money-=5000;s.house=true}else toast("Не хватает денег")}));
 on("car",()=>update(s=>{if(s.car)toast("Машина уже куплена");else if(s.money>=3000){s.money-=3000;s.car=true}else toast("Не хватает денег")}));
 on("family",()=>update(s=>{s.relationship=Math.min(100,s.relationship+10);s.mood=Math.min(100,s.mood+8);toast("Отношения улучшились: "+s.relationship+"%")}));
 on("pregnancy",()=>familyPlan());
 on("doctor",()=>toast(state.pregnant?"Врач провёл игровой осмотр.":"Врач: профилактический осмотр завершён."));
 on("save",saveNow);on("menu",goMenu);
}
function familyPlan(){
 if(!state.pregnant){
  if(confirm("Начать семейную сюжетную линию беременности? Это условное игровое событие.")){
   update(s=>{s.pregnant=true;s.pregnancyMonth=1});
  }
 }else{
  const m=state.pregnancyMonth;
  if(m<9){update(s=>{s.pregnancyMonth++;s.hour=(s.hour+1)%24});toast("Игровой месяц беременности: "+state.pregnancyMonth)}
  else if(confirm("Завершить сюжетную линию и добавить ребёнка?")){
   update(s=>{s.pregnant=false;s.child={name:"Малыш",age:0}});
  }
 }
 if(state.pregnant)toast("Беременность: месяц "+state.pregnancyMonth+" из 9");
}