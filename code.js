let canvas = document.getElementById('canv');
let context = canvas.getContext('2d');

let map = [];
let ages = 1;
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
  console.log(ages);
  ages++;
}

function startLife() {
  let map2 = [];
  for(let i = 0; i < strings; i++) {
    map2[i] = [];
    for(let j = 0; j < columns; j++) {
      let blackNeighbors = 0;
      let redNeighbors = 0;
      let greenNeighbors = 0;

      if(map[fpm(i)-1][j] == 1) blackNeighbors++; // поиск соседей сверху
      if(map[i][fpp(j)+1] == 1) blackNeighbors++; // поиск соседей справа
      if(map[fpp(i)+1][j] == 1) blackNeighbors++; // поиск соседей снизу
      if(map[i][fpm(j)-1] == 1) blackNeighbors++; // поиск соседей слева
      if(map[fpm(i)-1][fpp(j)+1] == 1) blackNeighbors++;
      if(map[fpp(i)+1][fpp(j)+1] == 1) blackNeighbors++;
      if(map[fpp(i)+1][fpm(j)-1] == 1) blackNeighbors++;
      if(map[fpm(i)-1][fpm(j)-1] == 1) blackNeighbors++;

      if(map[fpm(i)-1][j] == 2) redNeighbors++; // поиск больных соседей сверху
      if(map[i][fpp(j)+1] == 2) redNeighbors++; // поиск больных соседей справа
      if(map[fpp(i)+1][j] == 2) redNeighbors++; // поиск больных соседей снизу
      if(map[i][fpm(j)-1] == 2) redNeighbors++; // поиск больных соседей слева
      if(map[fpm(i)-1][fpp(j)+1] == 2) redNeighbors++;
      if(map[fpp(i)+1][fpp(j)+1] == 2) redNeighbors++;
      if(map[fpp(i)+1][fpm(j)-1] == 2) redNeighbors++;
      if(map[fpm(i)-1][fpm(j)-1] == 2) redNeighbors++;

      if(map[fpm(i)-1][j] == 3) greenNeighbors++; // поиск соседей с иммунитетом сверху
      if(map[i][fpp(j)+1] == 3) greenNeighbors++; // поиск соседей с иммунитетом справа
      if(map[fpp(i)+1][j] == 3) greenNeighbors++; // поиск соседей с иммунитетом снизу
      if(map[i][fpm(j)-1] == 3) greenNeighbors++; // поиск соседей с иммунитетом слева
      if(map[fpm(i)-1][fpp(j)+1] == 3) greenNeighbors++;
      if(map[fpp(i)+1][fpp(j)+1] == 3) greenNeighbors++;
      if(map[fpp(i)+1][fpm(j)-1] == 3) greenNeighbors++;
      if(map[fpm(i)-1][fpm(j)-1] == 3) greenNeighbors++;

      // if(blackNeighbors == 3) {
      //   if(redNeighbors == 0) {
      //     if(greenNeighbors == 0) {
      //       map2[i][j] = 1; // в клетке зарождается жизнь
      //     } else {
      //       map2[i][j] = 3; // в клетке зарождается жизнь и она становится иммунной к вирусу
      //     }
      //   } else {
      //     if(map[i][j] == 3) {
      //       map2[i][j] == 1; // клетка теряет иммунитет и остается жива
      //     } else {
      //       map2[i][j] = 2; // клетка становится больной
      //     }
      //   }
      // } else if(blackNeighbors == 2 || blackNeighbors == 3) {
      //   if(redNeighbors == 0) {
      //     if(greenNeighbors == 0) {
      //       map2[i][j] = 1; // клетка остается жива и не больна
      //     } else {
      //       map2[i][j] = 3 // клетка приобретает иммунитет
      //     }
      //   } else {
      //     map2[i][j] = 2; // клетка остается жива и заражается
      //   }
      // } else if(blackNeighbors < 2 || blackNeighbors > 3) {
      //   map2[i][j] = 0;
      // }




      if(blackNeighbors == 3) {
        //если данный компонент подмешивать вне этого ифа, то получается дичайше интересный эффект
        // если подмешивать вне ифа то вместо пустоты тут нужно родить черную клетку
        if(redNeighbors > 0) {
          map2[i][j] = 2;
        } else if(greenNeighbors > 0) {
          map2[i][j] = 3;
        } else {
          map2[i][j] = 1;
        }
      } else if(blackNeighbors == 2 || blackNeighbors == 3) {
        map2[i][j] = map[i][j];
      } else if(blackNeighbors < 2 || blackNeighbors > 3) {
        map2[i][j] = 0;
      }

      if(redNeighbors == 3 && ages > 3) {
        map2[i][j] = 2;
      } else if((redNeighbors == 2 || redNeighbors == 3) && ages > 3 && map[i][j] == 2) {
        map2[i][j] = map[i][j];
      } else if((redNeighbors < 2 || redNeighbors > 3) && ages > 3 && map[i][j] == 2) {
        map2[i][j] = 0;
      }

      if(greenNeighbors == 3 && ages > 3) {
        map2[i][j] = 3;
      } else if((greenNeighbors == 2 || greenNeighbors == 3) && ages > 3 && map[i][j] == 3) {
        map2[i][j] = map[i][j];
      } else if((greenNeighbors < 2 || greenNeighbors > 3) && ages > 3 && map[i][j] == 3) {
        map2[i][j] = 0;
      }
    }
  }
  map = map2;
  drawField();
  timer = setTimeout(startLife, 100);
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
  ages = 1;
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

  let svirusStr = Math.round(Math.random(0, 1) * map.length);
  let svirusCol = Math.round(Math.random(0, 1) * map.length);
  map[svirusStr][svirusCol] = 2;
  let simmunedStr = Math.round(Math.random(0, 1) * map.length);
  let simmunedCol = Math.round(Math.random(0, 1) * map.length);
  map[simmunedStr][simmunedCol] = 3;

  let tvirusStr = Math.round(Math.random(0, 1) * map.length);
  let tvirusCol = Math.round(Math.random(0, 1) * map.length);
  map[tvirusStr][tvirusCol] = 2;
  let timmunedStr = Math.round(Math.random(0, 1) * map.length);
  let timmunedCol = Math.round(Math.random(0, 1) * map.length);
  map[timmunedStr][timmunedCol] = 3;

  drawField();
}

document.getElementById('start').onclick = startLife;
document.getElementById('place').onclick = placeLife;
