
// LIVE FAMILY graphics.js
(function(){

const G={

draw(c,g,w,h){

const sx=w/560;
const sy=h/900;

c.save();
c.scale(sx,sy);

const W=560,H=900;

// Земля
c.fillStyle='#d9d2ca';
c.fillRect(0,0,W,H);

// Дороги
c.fillStyle='#414653';
c.fillRect(265,0,150,H);
c.fillRect(0,345,W,300);

// Разметка
c.strokeStyle='#f7e6a0';
c.lineWidth=4;
c.setLineDash([24,22]);

c.beginPath();
c.moveTo(340,0);
c.lineTo(340,H);
c.moveTo(0,495);
c.lineTo(W,495);
c.stroke();

c.setLineDash([]);

// Деревья
this.tree(c,42,160);
this.tree(c,515,160);
this.tree(c,48,765);
this.tree(c,514,770);

// Здания
this.building(c,82,100,'#e9b87d','#9d4d58','ДОМ');
this.building(c,430,115,'#d9dced','#625a9b','МАГАЗИН');
this.building(c,78,700,'#e7d5aa','#a45d45','КАФЕ');
this.building(c,430,700,'#d5c8e8','#765ca5','ДОМ');

// Машины
this.car(c,165,395,'#e64d70');
this.car(c,445,560,'#4a9bd5');

// Жители
this.person(c,210,300,'#df8849',false);
this.person(c,470,300,'#4c9c7d',false);

// Игрок
this.person(
 c,
 g.player.x*560/w,
 g.player.y*900/h,
 '#7556c8',
 true,
 g.anim
);

c.restore();
},

building(c,x,y,wall,roof,label){

c.fillStyle='rgba(0,0,0,.17)';
c.fillRect(x+8,y+25,118,150);

c.fillStyle=wall;
c.fillRect(x,y+35,112,130);

c.fillStyle=roof;
c.beginPath();
c.moveTo(x-12,y+40);
c.lineTo(x+56,y-10);
c.lineTo(x+124,y+40);
c.closePath();
c.fill();

c.fillStyle='#a9e0ec';
c.fillRect(x+13,y+72,25,38);
c.fillRect(x+75,y+72,25,38);

c.fillStyle='#704a3c';
c.fillRect(x+44,y+110,25,55);

c.fillStyle='#fff';
c.font='bold 12px Arial';
c.textAlign='center';
c.fillText(label,x+56,y+30);
},

tree(c,x,y){

c.fillStyle='#76513a';
c.fillRect(x-4,y+14,8,30);

c.fillStyle='#348b55';
c.beginPath();
c.ellipse(x,y,19,29,0,0,7);
c.fill();

c.fillStyle='#65b56d';
c.beginPath();
c.ellipse(x-7,y-8,8,13,0,0,7);
c.fill();
},

car(c,x,y,col){

c.fillStyle='#222';
c.beginPath();
c.ellipse(x+8,y+30,7,10,0,0,7);
c.ellipse(x+51,y+30,7,10,0,0,7);
c.fill();

c.fillStyle=col;
c.beginPath();
c.roundRect(x,y,62,29,5);
c.fill();

c.fillStyle='#b9e8f3';
c.fillRect(x+11,y+5,17,12);
c.fillRect(x+34,y+5,17,12);
},

person(c,x,y,col,active,anim){

c.fillStyle='rgba(0,0,0,.2)';
c.beginPath();
c.ellipse(x,y+16,12,5,0,0,7);
c.fill();

c.fillStyle='#303044';
c.fillRect(x-7,y+5,5,15);
c.fillRect(x+2,y+5,5,15);

c.fillStyle=col;
c.fillRect(x-10,y-12,20,20);

c.fillStyle='#f0c39d';
c.beginPath();
c.arc(x,y-20,9,0,7);
c.fill();

c.fillStyle='#50392e';
c.fillRect(x-8,y-28,16,6);

if(active){
 c.strokeStyle='#fff';
 c.lineWidth=2;
 c.strokeRect(x-14,y-34,28,57);
}

}

};

window.LIVE_FAMILY_GRAPHICS=G;

})();
