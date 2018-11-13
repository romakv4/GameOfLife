let canvas = document.getElementById('canv');
let context = canvas.getContext('2d');

let map = [];
let strings = 0;
let columns = 0;

let timer;

canvas.onclick = function(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  x = Math.floor(x/5);
  y = Math.floor(y/5);
  map[y][x] = 1;
  drawField();
}

function getPlace() {
  strings = 120;
  columns = 120;
  for(let i = 0; i < strings; i++) {
    map[i] = [];
    for(let j = 0; j < columns; j++) {
      map[i][j] = 0;
    }
  }
}

getPlace();

function drawField() {
  context.clearRect(0,0,strings*5,columns*5);
  for(let i = 0; i < strings; i++) {
    for(let j = 0; j < columns; j++) {
      if(map[i][j] == 1) {
        context.fillRect(j*5, i*5, 5, 5);
      }
    }
  }
}

function startLife() {
  let map2 = [];
  for(let i = 0; i < strings; i++) {
    map2[i] = [];
    for(let j = 0; j < columns; j++) {
      let neighbors = 0;
      if(map[fpm(i)-1][j] == 1) neighbors++; // поиск соседей сверху
      if(map[i][fpp(j)+1] == 1) neighbors++; // поиск соседей справа
      if(map[fpp(i)+1][j] == 1) neighbors++; // поиск соседей снизу
      if(map[i][fpm(j)-1] == 1) neighbors++; // поиск соседей слева
      if(map[fpm(i)-1][fpp(j)+1] == 1) neighbors++;
      if(map[fpp(i)+1][fpp(j)+1] == 1) neighbors++;
      if(map[fpp(i)+1][fpm(j)-1] == 1) neighbors++;
      if(map[fpm(i)-1][fpm(j)-1] == 1) neighbors++;

      if(neighbors == 3) {
        map2[i][j] = 1;
      } else if(neighbors == 2 || neighbors == 3) {
        map2[i][j] = map[i][j];
      } else if(neighbors < 2 || neighbors > 3) {
        map2[i][j] = 0;
      }
    }
  }
  map = map2;
  drawField();
  timer = setTimeout(startLife, 150);
}

function fpm(i) {
  if(i == 0) return strings;
  else return i;
}

function fpp(i) {
  if(i == strings-1) return -1;
  else return i;
}

function placeLife() {
  for(let i = 0; i < strings; i++) {
    for(let j = 0; j < columns; j++) {
      map[i][j] = Math.round(Math.random());
    }
  }
  drawField();
}

document.getElementById('start').onclick = startLife;
document.getElementById('place').onclick = placeLife;
