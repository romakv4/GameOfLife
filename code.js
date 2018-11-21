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
        context.fillStyle = "black";
        context.fillRect(j*5, i*5, 5, 5);
      } else if(map[i][j] == 2) {
        context.fillStyle = "red";
        context.fillRect(j*5, i*5, 5, 5);
      } else if(map[i][j] == 3) {
        context.fillStyle = "green";
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
      let aliveNeighbors = 0;
      let infectedNeighbors = 0;
      let immunedNeighbors = 0;

      if(map[fpm(i)-1][j] == 1) aliveNeighbors++; // поиск соседей сверху
      if(map[i][fpp(j)+1] == 1) aliveNeighbors++; // поиск соседей справа
      if(map[fpp(i)+1][j] == 1) aliveNeighbors++; // поиск соседей снизу
      if(map[i][fpm(j)-1] == 1) aliveNeighbors++; // поиск соседей слева
      if(map[fpm(i)-1][fpp(j)+1] == 1) aliveNeighbors++;
      if(map[fpp(i)+1][fpp(j)+1] == 1) aliveNeighbors++;
      if(map[fpp(i)+1][fpm(j)-1] == 1) aliveNeighbors++;
      if(map[fpm(i)-1][fpm(j)-1] == 1) aliveNeighbors++;

      if(map[fpm(i)-1][j] == 2) infectedNeighbors++; // поиск больных соседей сверху
      if(map[i][fpp(j)+1] == 2) infectedNeighbors++; // поиск больных соседей справа
      if(map[fpp(i)+1][j] == 2) infectedNeighbors++; // поиск больных соседей снизу
      if(map[i][fpm(j)-1] == 2) infectedNeighbors++; // поиск больных соседей слева
      if(map[fpm(i)-1][fpp(j)+1] == 2) infectedNeighbors++;
      if(map[fpp(i)+1][fpp(j)+1] == 2) infectedNeighbors++;
      if(map[fpp(i)+1][fpm(j)-1] == 2) infectedNeighbors++;
      if(map[fpm(i)-1][fpm(j)-1] == 2) infectedNeighbors++;

      if(map[fpm(i)-1][j] == 3) immunedNeighbors++; // поиск соседей с иммунитетом сверху
      if(map[i][fpp(j)+1] == 3) immunedNeighbors++; // поиск соседей с иммунитетом справа
      if(map[fpp(i)+1][j] == 3) immunedNeighbors++; // поиск соседей с иммунитетом снизу
      if(map[i][fpm(j)-1] == 3) immunedNeighbors++; // поиск соседей с иммунитетом слева
      if(map[fpm(i)-1][fpp(j)+1] == 3) immunedNeighbors++;
      if(map[fpp(i)+1][fpp(j)+1] == 3) immunedNeighbors++;
      if(map[fpp(i)+1][fpm(j)-1] == 3) immunedNeighbors++;
      if(map[fpm(i)-1][fpm(j)-1] == 3) immunedNeighbors++;

      if(aliveNeighbors == 3) {
        if(infectedNeighbors == 0) {
          if(immunedNeighbors == 0) {
            map2[i][j] = 1; // в клетке зарождается жизнь
          } else {
            map2[i][j] = 3; // в клетке зарождается жизнь и она становится иммунной к вирусу
          }
        } else {
          if(map[i][j] == 3) {
            map2[i][j] == 1; // клетка теряет иммунитет и остается жива
          } else {
            map2[i][j] = 2; // клетка становится больной
          }
        }
      } else if(aliveNeighbors == 2 || aliveNeighbors == 3) {
        if(infectedNeighbors == 0) {
          if(immunedNeighbors == 0) {
            map2[i][j] = 1; // клетка остается жива и не больна
          } else {
            map2[i][j] = 3 // клетка приобретает иммунитет
          }
        } else {
          map2[i][j] = 2; // клетка остается жива и заражается
        }
      } else if(aliveNeighbors < 2 || aliveNeighbors > 3) {
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
      map[i][j] = Math.round(Math.random(0,1));
    }
  }
  let virusStr = Math.round(Math.random(0, 1) * map.length);
  let virusCol = Math.round(Math.random(0, 1) * map.length);
  map[virusStr][virusCol] = 2;
  let immunedStr = Math.round(Math.random(0, 1) * map.length);
  let immunedCol = Math.round(Math.random(0, 1) * map.length);
  map[immunedStr][immunedCol] = 3;

  drawField();
}

document.getElementById('start').onclick = startLife;
document.getElementById('place').onclick = placeLife;
