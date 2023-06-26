let monitorear = true;

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

function preload() {

  miPaleta1 = new Paleta("data/forma1.png");
  miPaleta2 = new Paleta("data/forma2.png");
  miPaleta3 = new Paleta("data/forma3.png");
  miPaleta4 = new Paleta("data/forma4.png");

  for (let i = 0; i < cantidad; i++) {

    let nombre = "data/" + i + ".png";
    pinceladas[i] = loadImage(nombre);

  }

}

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

function setup() {
  createCanvas(700, 700);
  background(243, 226, 200);

  frameRate(10);

  imageMode(CENTER);

  //inicializo la escucha de sonido
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  //acá le pido que llame a startPitch
  mic.start(startPitch);

  gestorAmp = new GestorSenial(0.01, 0.4);
  gestorPitch = new GestorSenial(40, 150);

  //hay que agregar esto
  userStartAudio();

  c = new Caminante();
  antesHabiaSonido = false;
}

function draw() {

  let vol = mic.getLevel();
  gestorAmp.actualizar(vol);

  haySonido = gestorAmp.filtrada > 0.1;
  let inicioElSonido = haySonido && !antesHabiaSonido;
  let finDelSonido = !haySonido && antesHabiaSonido;

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

      console.log(cPosX);
      console.log(cPosY);

      let cual = int(random(cantidad));

      let esteColor1 = miPaleta1.darColor();
      let esteColor2 = miPaleta2.darColor();
      let esteColor3 = miPaleta3.darColor();
      let esteColor4 = miPaleta4.darColor();

      tint(red(esteColor1), green(esteColor1), blue(esteColor1), 500);
      escalaTrazo = scale(1);

      if (colorTrazo == 1) {

        tint(red(esteColor1), green(esteColor1), blue(esteColor1), 500);

      }

      if (colorTrazo == 2) {

        tint(red(esteColor2), green(esteColor2), blue(esteColor2), 500);

      }



      if (colorTrazo == 3) {

        tint(red(esteColor3), green(esteColor3), blue(esteColor3), 500);

      }



      if (colorTrazo == 4) {

        tint(red(esteColor4), green(esteColor4), blue(esteColor4), 500);

      }

      push();

      image(pinceladas[cual], cPosX, cPosY);
      translate(cPosX, cPosY);

      pop();

    }

  }

  antesHabiaSonido = haySonido;

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
