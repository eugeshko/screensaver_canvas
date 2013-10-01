function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPos(current_pos) {
  var poses = ['left', 'right', 'up', 'down'];
  do {
    var pos = poses[getRandomInt(0,3)];
  } while (pos == current_pos);
  return pos;
}

function $(id) {
  return document.getElementById(id);
}
    
function addGirl(name) {
  //Добавляем девчушку
  childs[name] = {
    'at'  : getRandomPos(),   //Стартовая анимация
    'w'   : 48,       //Ширина объекта
    'h'   : 48,       //Высота объекта
    'fh'  : 48,       //Высота кадра анимации
    'x'   : getRandomInt(0, ctxW-48),      //Положение по горизонтали
    'y'   : getRandomInt(0, ctxH-48)       //Положение по вертикали
  }
                
  //Добавляем в массив анимации для девочки
  animate[name] = {
    'right': {
      'el'    : null,              //Ключ есть имя анимации
      'src'   : 'assets/ada_right.png', //Объект Image
      'type'  : 0,                 //Путь к изображению
      'step'  : 0,                 //Текущий шаг анимации
      'speed' : 1,                 //Скорость анимации
      'curr'  : 0,                 //Счетчик кадров
      'steps' : 3,                 //Количество кадров анимации, считам от 0
    },
    'left': {
      'el'    : null,              //Ключ есть имя анимации
      'src'   : 'assets/ada_left.png', //Объект Image
      'type'  : 0,                 //Путь к изображению
      'step'  : 0,                 //Текущий шаг анимации
      'speed' : 3,                 //Скорость анимации
      'curr'  : 0,                 //Счетчик кадров
      'steps' : 3,                 //Количество кадров анимации, считам от 0
    },
    'up': {
      'el'    : null,              //Ключ есть имя анимации
      'src'   : 'assets/ada_down.png', //Объект Image
      'type'  : 0,                 //Путь к изображению
      'step'  : 0,                 //Текущий шаг анимации
      'speed' : 3,                 //Скорость анимации
      'curr'  : 0,                 //Счетчик кадров
      'steps' : 3,                 //Количество кадров анимации, считам от 0
    },
    'down': {
      'el'    : null,              //Ключ есть имя анимации
      'src'   : 'assets/ada_up.png', //Объект Image
      'type'  : 0,                 //Путь к изображению
      'step'  : 0,                 //Текущий шаг анимации
      'speed' : 3,                 //Скорость анимации
      'curr'  : 0,                 //Счетчик кадров
      'steps' : 3,                 //Количество кадров анимации, считам от 0
    }
  }  
} 

function initAnimation() {               
  var max = getRandomInt (10, 100);
  for (var i = 0; i < max; i++) {
    addGirl(i);
  }                  
  
  //Идем по всем объектам
  for (var o in childs) {    
                    
    //И по все их анимациям
    for (var a in animate[o]) {  
                            
      //Подгружаем изображения
      var img = new Image();                        
      img.src = animate[o][a].src;
      //Помещаем объект изобраения в анимацию
      animate[o][a].el = img;
    }
  }
}

function startAnimation() {

//Запускаем единый таймер
  setInterval(function() {                    
    var img = new Image();                        
    img.src = 'http://img806.imageshack.us/img806/8718/bigbrothertileinteracti.png';
    //Чистим сцену
    ctx.save();
    ctx.drawImage(img,0,0,ctxW,ctxH);
    ctx.restore();    

    //Проходим по всем объектам и отрисовываем
    for (var o in childs) {
                        
      //Смотрим текущую анимацию
      if (animate[o]) {

        //Берем текущий шаг
        var step = animate[o][childs[o].at].step;
        if (childs[o].at == 'left') {
          childs[o].x -= childs[o].w/4;  
        }
        if (childs[o].at == 'right') {
          childs[o].x += childs[o].w/4;  
        }
        if (childs[o].at == 'up') {
          childs[o].y += childs[o].w/4;  
        }
        if (childs[o].at == 'down') {
          childs[o].y -= childs[o].w/4;  
        }
        if (childs[o].x <= 0) {
          childs[o].at = getRandomPos('left');
        }     
        if (childs[o].x >= ctxW-48) {
          childs[o].at = getRandomPos('right');
        }
        if (childs[o].y <= 0) {
          childs[o].at = getRandomPos('down');
        }
        if (childs[o].y >= ctxH-48) {
          childs[o].at = getRandomPos('up');
        }                                          
        //Рисуем его
        ctx.drawImage(
          animate[o][childs[o].at].el,     //Объект Image анимации 
          0,                               //Кадры идут один за другим, тут 0
          Math.round(childs[o].fh * step), //Берем текущий кадр, высота кадра * шаг 
          childs[o].w,                     //Вырез в ширину объекта
          childs[o].h,                     //И в высоту
          childs[o].x,                     //Размещаем по горизонтали на холсте
          childs[o].y,                     //И по вертикали
          childs[o].w,                     //Ширина как у кадра
          childs[o].h                      //Ну и высота
        );
                                
        //Проверяем счетчик и если достигли speed, переходим к следующему кадру
        if (animate[o][childs[o].at].curr >=animate[o][childs[o].at].speed) {                                
                                
          //Проверяем, если кадр последний переходим к первому
          if (animate[o][childs[o].at].step >= animate[o][childs[o].at].steps) {
                                    
            animate[o][childs[o].at].step = 0; 
            childs[o].at = getRandomPos();                                   
                        
          }
          else animate[o][childs[o].at].step++;
          
          //Сбрасываем счетчик
          animate[o][childs[o].at].curr = 0;
        }
                            
        //Увеличиваем счетчик
        animate[o][childs[o].at].curr++;             
      }
    }
  }, 1000/16);
}
//window.onload = function(){
  var ctx  = $('cnv').getContext('2d');   
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;     
  var childs  = {};                     //Массив объектов сцены
  var animate = {};                     //Массив анимаций для объектов 
  var ctxH = window.innerHeight;
  var ctxW = window.innerWidth;         
  initAnimation();
  startAnimation();
//}
