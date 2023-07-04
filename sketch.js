let monitorear = true;
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let mic;
let pitch;
let audioContext;

let c;
let gestorAmp;
let gestorPitch;
let haySonido;
let antesHabiaSonido;

let pinceladas = [];
let cantidad = 6;
let miPaleta1;
let miPaleta2;
let miPaleta3;
let miPaleta4;

let colorTrazo = 1;
let escalaTrazo;

//Variable para cambio de escena
let escena;

let mostrarFormas = false;



//Valores X, Width, Height para las 3 portadas
let foto1X = 300;
let foto1Y = 300;
let foto2X = 300;
let foto2Y = 300;
let foto3X = 300;
let foto3Y = 300;
let foto4X = 300;
let foto4Y = 300;

//Variables boolean para detectar el hover en cada revista
let imgObra1Fx, imgObra2Fx, imgObra3Fx;

let rgb1 = 75;
let rgb2 = 75;
let rgb3 = 75;
let rgb4 = 75;

let opacidad = 100;

let fondoBarra = 600;
let tiempoBarra = 0;

let fondoBarraEstado = 600;
let tiempoBarraEstado = 0;





function preload() {

  imgObra1 = loadImage("data/forma1.png");
  imgObra2 = loadImage("data/forma2.png");
  imgObra3 = loadImage("data/forma3.png");
  imgObra4 = loadImage("data/forma4.png");

  for (let i = 0; i < cantidad; i++) {

    let nombre = "data/" + i + ".png";
    pinceladas[i] = loadImage(nombre);

  }

}





function setup() {

  createCanvas(800, 800);
  background(243, 226, 200);



  imageMode(CENTER);

  //inicializo la escucha de sonido
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  //acá le pido que llame a startPitch
  mic.start(startPitch);

  gestorAmp = new GestorSenial(0.01, 0.4);
  gestorPitch = new GestorSenial(40, 100);

  //hay que agregar esto
  userStartAudio();

  c = new Caminante();
  antesHabiaSonido = false;


  escena = 0;

}



function draw() {

  let vol = mic.getLevel();
  gestorAmp.actualizar(vol);

  haySonido = gestorAmp.filtrada > 0.1;
  let inicioElSonido = haySonido && !antesHabiaSonido;
  let finDelSonido = !haySonido && antesHabiaSonido;
  antesHabiaSonido = haySonido;

  if (escena == 0) {

    if (mostrarFormas == true) {
      imageMode(CORNER);

      tint(rgb1, opacidad)
      image(imgObra1, 80, 100, foto1X, foto1Y);

      tint(rgb2, opacidad)
      image(imgObra2, 410, 100, foto2X, foto2Y);

      tint(rgb3, opacidad)
      image(imgObra3, 80, 430, foto3X, foto3Y);

      tint(rgb4, opacidad)
      image(imgObra4, 410, 430, foto4X, foto4Y);
    }

    mostrarFormas = true;

    tiempoBarra += 1;

    fill(0, 0, 0, 0);
    
    rect(95, 40, fondoBarra, 10);
    fill(0, 0, 0, 0);
    rect(95, 40, tiempoBarra, 10);

    if (tiempoBarra == 600) {
      opacidad = 0;
      fill(243, 226, 200);
      rect(0, 0, 800, 800);
      tiempoBarra = 600;
      escena = 1;

    }

    if (tiempoBarra == 600 && imgObra1Fx == true) {
      
      opacidad = 0;
      fill(243, 226, 200);
      rect(0, 0, 800, 800);
      tiempoBarra = 600;
      escena = 1;

    }
    if (tiempoBarra == 600 && imgObra2Fx == true) {
      opacidad = 0;
      fill(243, 226, 200);
      rect(0, 0, 800, 800);
      escena = 2;
      tiempoBarra = 600;
    }
    if (tiempoBarra == 600 && imgObra3Fx == true) {
      opacidad = 0;
      fill(243, 226, 200);
      rect(0, 0, 800, 800);
      escena = 3;
      tiempoBarra = 600;
    }
    if (tiempoBarra == 600 && imgObra4Fx == true) {
      opacidad = 0;
      fill(243, 226, 200);
      rect(0, 0, 800, 800);
      escena = 4;
      tiempoBarra = 600;
    }


    //Hover Revista 1
    if (gestorPitch.filtrada > 0.0 && gestorPitch.filtrada < 0.3) {
      imgObra1Fx = true;
    } else {
      imgObra1Fx = false;
    }
    if (imgObra1Fx == true) {
      rgb1 = 255;
    } else {
      rgb1 = 75;
    }
    //Hover Revista 2
    if (gestorPitch.filtrada > 0.3 && gestorPitch.filtrada < 0.5) {
      imgObra2Fx = true;
    } else {
      imgObra2Fx = false;
    }
    if (imgObra2Fx == true) {
      rgb2 = 255;
    } else {
      rgb2 = 75;
    }
    //Hover Revista 3
    if (gestorPitch.filtrada > 0.5 && gestorPitch.filtrada < 0.7) {
      imgObra3Fx = true;
    } else {
      imgObra3Fx = false;
    }
    if (imgObra3Fx == true) {
      rgb3 = 255;
    } else {
      rgb3 = 75;
    }

    if (gestorPitch.filtrada > 0.7 && gestorPitch.filtrada < 1) {
      imgObra4Fx = true;
    } else {
      imgObra4Fx = false;
    }
    if (imgObra4Fx == true) {
      rgb4 = 255;
    } else {
      rgb4 = 75;
    }

  }


  if (escena == 1) {

    frameRate(20);
    tiempoBarraEstado += 1;


    fill(0, 0, 0);
    rect(100, 770, fondoBarraEstado, 10);
    fill(243, 226, 200);
    rect(100, 770, tiempoBarraEstado, 10);

    if (tiempoBarraEstado == 600) {
      opacidad = 0;

      
      saveCanvas('obra1', 'jpg');

      setTimeout(window.location.reload(), 2000);
        
    }

    if (inicioElSonido) {

      c = new Caminante();

    }

    if (finDelSonido) {

      colorTrazo += 1;

      if (colorTrazo == 5) {

        colorTrazo = 0;
        colorTrazo += 1;

      }


    }

    if (haySonido) {

      c.actualizar(gestorAmp.filtrada, gestorPitch.filtrada,
        gestorPitch.derivada);

      c.mover();
      c.dibujar();

      for (let i = 0; i < 1; i++) {

        let cual = int(random(cantidad));
        escalaTrazo = scale(1, 1);

        push();

        image(pinceladas[cual], cPosX, cPosY);
        translate(cPosX, cPosY);

        pop();

      }

    }

    if (colorTrazo == 1) {

      tint(red(25), green(25), blue(25), 500);

    }

    if (colorTrazo == 2) {

      tint(red(155), green(43), blue(47), 500);

    }

    if (colorTrazo == 3) {

      tint(red(25), green(25), blue(25), 500);

    }

    if (colorTrazo == 4) {

      tint(red(155), green(43), blue(47), 500);

    }

  }

  if (escena == 2) {

    frameRate(20);

    tiempoBarraEstado += 1;


    fill(0, 0, 0);
    rect(100, 770, fondoBarraEstado, 10);
    fill(243, 226, 200);
    rect(100, 770, tiempoBarraEstado, 10);

    if (tiempoBarraEstado == 600) {
      opacidad = 0;
      saveCanvas('obra2', 'jpg');

      setTimeout(window.location.reload(), 1000);
    }

    if (inicioElSonido) {

      c = new Caminante();

    }

    if (finDelSonido) {

      colorTrazo += 1;

      if (colorTrazo == 5) {

        colorTrazo = 0;
        colorTrazo += 1;

      }

      console.log(colorTrazo);

    }

    if (haySonido) {

      c.actualizar(gestorAmp.filtrada, gestorPitch.filtrada,
        gestorPitch.derivada);

      c.mover();
      c.dibujar();

      for (let i = 0; i < 1; i++) {

        let cual = int(random(cantidad));
        escalaTrazo = scale(1, 1);

        push();

        image(pinceladas[cual], cPosX, cPosY);
        translate(cPosX, cPosY);

        pop();

      }

    }

    if (colorTrazo == 1) {

      tint(red(255), green(200), blue(0), 500);

    }

    if (colorTrazo == 2) {

      tint(red(253), green(250), blue(246), 500);

    }

    if (colorTrazo == 3) {

      tint(red(25), green(25), blue(25), 500);

    }

    if (colorTrazo == 4) {

      tint(red(88), green(14), blue(22), 500);

    }

  }

  if (escena == 3) {

    frameRate(20);
    tiempoBarraEstado += 1;


    fill(0, 0, 0);
    rect(100, 770, fondoBarraEstado, 10);
    fill(243, 226, 200);
    rect(100, 770, tiempoBarraEstado, 10);

    if (tiempoBarraEstado == 600) {
      opacidad = 0;
      saveCanvas('obra3', 'jpg');

      setTimeout(window.location.reload(), 1000);
    }

    if (inicioElSonido) {

      c = new Caminante();

    }

    if (finDelSonido) {

      colorTrazo += 1;

      if (colorTrazo == 5) {

        colorTrazo = 0;
        colorTrazo += 1;

      }

      console.log(colorTrazo);

    }

    if (haySonido) {

      c.actualizar(gestorAmp.filtrada, gestorPitch.filtrada,
        gestorPitch.derivada);

      c.mover();
      c.dibujar();

      for (let i = 0; i < 1; i++) {

        let cual = int(random(cantidad));
        escalaTrazo = scale(1, 1);

        push();

        image(pinceladas[cual], cPosX, cPosY);
        translate(cPosX, cPosY);

        pop();

      }

    }

    if (colorTrazo == 1) {

      tint(red(47), green(44), blue(48), 500);

    }

    if (colorTrazo == 2) {

      tint(red(6), green(50), blue(80), 500);

    }

    if (colorTrazo == 3) {

      tint(red(248), green(227), blue(100), 500);

    }

    if (colorTrazo == 4) {

      tint(red(249), green(237), blue(226), 500);

    }

  }


  if (escena == 4) {

    frameRate(20);

    tiempoBarraEstado += 1;


    fill(0, 0, 0);
    rect(100, 770, fondoBarraEstado, 10);
    fill(243, 226, 200);
    rect(100, 770, tiempoBarraEstado, 10);

    if (tiempoBarraEstado == 600) {
      opacidad = 0;
      saveCanvas('obra4', 'jpg');

      setTimeout(window.location.reload(), 1000);

    }

    if (inicioElSonido) {

      c = new Caminante();

    }

    if (finDelSonido) {

      colorTrazo += 1;

      if (colorTrazo == 6) {

        colorTrazo = 0;
        colorTrazo += 1;

      }

      console.log(colorTrazo);

    }

    if (haySonido) {

      c.actualizar(gestorAmp.filtrada, gestorPitch.filtrada,
        gestorPitch.derivada);

      c.mover();
      c.dibujar();

      for (let i = 0; i < 1; i++) {

        let cual = int(random(cantidad));
        escalaTrazo = scale(1, 1);

        push();

        image(pinceladas[cual], cPosX, cPosY);
        translate(cPosX, cPosY);

        pop();

      }

    }

    if (colorTrazo == 1) {

      tint(red(160), green(23), blue(25), 500);

    }

    if (colorTrazo == 2) {

      tint(red(25), green(25), blue(25), 500);

    }

    if (colorTrazo == 3) {

      tint(red(255), green(2201), blue(0), 500);

    }

    if (colorTrazo == 4) {

      tint(red(0), green(51), blue(133), 500);

    }
    if (colorTrazo == 5) {

      tint(red(238), green(227), blue(215), 500);

    }

  }




}
//--------------------------------------------------------------------

//--------------------------------------------------------------------
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}
//--------------------------------------------------------------------
function modelLoaded() {
  //select('#status').html('Model Loaded');
  getPitch();
  //console.log( "entro aca !" );

}
//--------------------------------------------------------------------
function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      let midiNum = freqToMidi(frequency);
      //console.log( midiNum );

      gestorPitch.actualizar(midiNum);

    }
    getPitch();
  })
}
