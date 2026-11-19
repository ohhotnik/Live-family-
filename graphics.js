// LIVE FAMILY — графическая система (graphics.js)
(function () {
  const G = {
    draw(ctx, game) {
      const w = ctx.canvas.width, h = ctx.canvas.height;
      ctx.clearRect(0, 0, w, h);
      // Небо и земля
      ctx.fillStyle = "#a9c7a0"; ctx.fillRect(0, 0, w, h);
      // кварталы и тротуары
      ctx.fillStyle = "#d7d0c8";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#424653";
      ctx.fillRect(0, 205, w, 185);
      ctx.fillRect(265, 0, 155, h);
      // разметка дорог
      ctx.strokeStyle = "#f7e7a3"; ctx.lineWidth = 4; ctx.setLineDash([22, 18]);
      ctx.beginPath(); ctx.moveTo(0, 297); ctx.lineTo(w, 297); ctx.moveTo(342, 0); ctx.lineTo(342, h); ctx.stroke();
      ctx.setLineDash([]);
      // газоны
      this.tree(ctx, 45, 70); this.tree(ctx, 510, 75); this.tree(ctx, 65, 440); this.tree(ctx, 520, 440);
      this.house(ctx, 90, 45, "#e9b77c", "#9b4e57", "ДОМ");
      this.house(ctx, 430, 48, "#d8d9e8", "#625b9b", "МАГАЗИН");
      this.house(ctx, 70, 405, "#e8d4aa", "#a45d42", "КАФЕ");
      this.car(ctx, 170, 245, "#e34f68");
      this.car(ctx, 445, 320, "#4d9bd7");
      this.person(ctx, game.player.x, game.player.y, "#6c55b8", true);
      this.person(ctx, 215, 160, "#e08b4d", false);
      this.person(ctx, 475, 165, "#4b9a79", false);
      this.hud(ctx, game);
    },
    house(c,x,y,wall,roof,label) {
      c.fillStyle="rgba(0,0,0,.18)"; c.fillRect(x+7,y+9,112,94);
      c.fillStyle=wall; c.fillRect(x,y+20,112,78);
      c.fillStyle=roof; c.beginPath(); c.moveTo(x-9,y+24); c.lineTo(x+56,y-12); c.lineTo(x+121,y+24); c.closePath(); c.fill();
      c.fillStyle="#704b3d"; c.fillRect(x+43,y+55,25,43);
      c.fillStyle="#aee0ed"; c.fillRect(x+12,y+42,23,20); c.fillRect(x+78,y+42,22,20);
      c.fillStyle="#fff"; c.font="bold 10px Arial"; c.textAlign="center"; c.fillText(label,x+56,y+14);
    },
    tree(c,x,y) {
      c.fillStyle="#76513a"; c.fillRect(x-4,y+12,8,24);
      c.fillStyle="#3f8d55"; c.beginPath(); c.arc(x,y,19,0,Math.PI*2); c.fill();
      c.fillStyle="#64ad68"; c.beginPath(); c.arc(x-8,y-7,10,0,Math.PI*2); c.fill();
    },
    car(c,x,y,color) {
      c.fillStyle="rgba(0,0,0,.25)"; c.fillRect(x+3,y+5,62,29);
      c.fillStyle=color; c.fillRoundRect ? c.fillRoundRect(x,y,62,27,7) : c.fillRect(x,y,62,27);
      c.fillStyle="#bde7f2"; c.fillRect(x+13,y+4,17,10); c.fillRect(x+34,y+4,15,10);
      c.fillStyle="#222"; c.beginPath(); c.arc(x+13,y+27,6,0,7); c.arc(x+49,y+27,6,0,7); c.fill();
    },
    person(c,x,y,color,player) {
      c.fillStyle="rgba(0,0,0,.2)"; c.beginPath(); c.ellipse(x,y+14,11,5,0,0,7); c.fill();
      c.fillStyle="#303044"; c.fillRect(x-7,y+5,5,13); c.fillRect(x+2,y+5,5,13);
      c.fillStyle=color; c.fillRect(x-10,y-9,20,17);
      c.fillStyle="#f1c39c"; c.beginPath(); c.arc(x,y-16,8,0,7); c.fill();
      c.fillStyle="#51382f"; c.fillRect(x-8,y-23,16,5);
      if(player){c.strokeStyle="#fff";c.lineWidth=2;c.strokeRect(x-12,y-27,24,48);}
    },
    hud(c,g) {
      c.fillStyle="rgba(31,24,57,.92)"; c.fillRect(10,10,205,49);
      c.fillStyle="#fff"; c.font="bold 15px Arial"; c.textAlign="left";
      c.fillText("LIVE FAMILY",20,30);
      c.font="12px Arial"; c.fillStyle="#d8c8ff";
      c.fillText("День "+g.day+"  •  $"+g.money,20,48);
      c.fillStyle="rgba(31,24,57,.9)"; c.fillRect(c.canvas.width-116,10,106,36);
      c.fillStyle="#fff"; c.textAlign="center"; c.font="12px Arial"; c.fillText("КАРТА  •  МЕНЮ",c.canvas.width-63,33);
    }
  };
  window.LIVE_FAMILY_GRAPHICS = G;
})();
