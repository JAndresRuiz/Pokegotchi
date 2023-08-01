const BASE_URL_POKEMON_SPRITE =
  "https://img.pokemondb.net/sprites/black-white/anim/normal/";
const BASE_URL_POKEMON_DEAD =
  "https://img.pokemondb.net/sprites/black-white/normal/";

const deadSound = document.querySelector(".deadSound");
const powerSound = document.querySelector(".powerSound");
const happySound = document.querySelector(".happySound");

function iniciarSonido() {
  happySound.play();
}

function detenerSonido() {
  happySound.pause();
  happySound.currentTime = 0;
}

function pokeDead () {
  deadSound.play();
};

function buttonAction() {
  powerSound.play();
};

const pokemonAPI = [
  {
    name: "Charmander",
    firstForm: `${BASE_URL_POKEMON_SPRITE}charmander.gif`,
    secondForm: `${BASE_URL_POKEMON_SPRITE}charmeleon.gif`,
    thirdForm: `${BASE_URL_POKEMON_SPRITE}charizard.gif`,
    dead: `/assets/tumba.png`,
  },
  {
    name: "Squirtle",
    firstForm: `${BASE_URL_POKEMON_SPRITE}squirtle.gif`,
    secondForm: `${BASE_URL_POKEMON_SPRITE}wartortle.gif`,
    thirdForm: `${BASE_URL_POKEMON_SPRITE}blastoise.gif`,
    dead: `/assets/tumba.png`,
  },
  {
    name: "Bulbasaur",
    firstForm: `${BASE_URL_POKEMON_SPRITE}bulbasaur.gif`,
    secondForm: `${BASE_URL_POKEMON_SPRITE}ivysaur.gif`,
    thirdForm: `${BASE_URL_POKEMON_SPRITE}venusaur.gif`,
    dead: `/assets/tumba.png`,
  },
  {
    name: "Pichu",
    firstForm: `${BASE_URL_POKEMON_SPRITE}pichu.gif`,
    secondForm: `${BASE_URL_POKEMON_SPRITE}pikachu.gif`,
    thirdForm: `${BASE_URL_POKEMON_SPRITE}raichu.gif`,
    dead: `/assets/tumba.png`,
  },
];

class Tamagotchi {
  constructor(selectedPokemon) {
    this.pokemon = selectedPokemon;
    this.energy = 100;
    this.age = 0;
    this.alive = true;
    this.actualEvo = 1;
  }

  getData() {
    return pokemonAPI.find((element) => element.name === this.pokemon);
  }

  newEvol() {
    const newEvol = document.querySelector(".selecGotchi img");
    if (this.age > 15 && this.actualEvo === 1) {
      const image = pokemonAPI.find((element) => element.name === this.pokemon);
      this.actualEvo = 2;
      return (newEvol.src = image.secondForm);
    }
    if (this.age > 35 && this.actualEvo === 2) {
      const image = pokemonAPI.find((element) => element.name === this.pokemon);
      this.actualEvo = 3;
      return (newEvol.src = image.thirdForm);
    }
    if (!this.alive){
      const image = pokemonAPI.find((element) => element.name === this.pokemon);
      this.actualEvo = 4;
      return (newEvol.src = image.dead);
    }
    return;
  }

  play() {
    if (this.alive) {
      this.energy -= 10;
      showUserMessages("¡Entrenando! <br> Energia disminuyo en 10", 3000);
      this.age += 1;
      syncHtmlAttributes({ energy: this.energy, age: this.age });
      this.checkStatus();
      this.newEvol();
    }
  }

  eat() {
    if (this.alive) {
      if (this.energy > 95) {
        showUserMessages("No tengo hambre!", 3000);
        syncHtmlAttributes({ energy: this.energy, age: this.age });
        this.checkStatus();
        this.energy = this.energy;
      } else {
        showUserMessages("Comiendo! <br> Energia aumentada en 5.", 3000);
        syncHtmlAttributes({ energy: this.energy, age: this.age });
        this.energy += 5;
        this.checkStatus();
      }
    }
  }

  poop() {
    if (this.alive) {
      this.energy -= 5;
      showUserMessages("Cag@#$%. Energia disminuyo en 5.", 3000);
      syncHtmlAttributes({ energy: this.energy, age: this.age });
      this.checkStatus();
    }
  }

  sleep() {
    if (this.alive) {
      if (this.energy > 80) {
        showUserMessages("No estoy cansado", 3000);
        syncHtmlAttributes({ energy: this.energy, age: this.age });
        this.checkStatus();
        this.energy = this.energy;
      } else {
        showUserMessages("Durmiendo! <br> Energia aumentada en 20.", 3000);
        syncHtmlAttributes({ energy: this.energy, age: this.age });
        this.energy += 20;
        this.age += 1;
        this.checkStatus();
        this.newEvol();
      }
    }
  }

  checkStatus(interval) {
    if (this.energy <= 0 || this.age >= 100) {
      this.alive = false;
      clearInterval(interval);
      showUserMessages("Tu Pokegotchi murio.");
      pokeDead();
      detenerSonido();
    } else if (this.age === 16) {
      showUserMessages("Tu Pokegotchi evolucionó.", 3000);
    } else if (this.age === 36) {
      showUserMessages("Tu Pokegotchi evolucionó.", 3000);
    }
  }
}

const App = {
  init: function () {
    App.animate();
  },

  animate: function () {
    // From Modernizr
    function whichTransitionEvent() {
      let t;
      const el = document.createElement("fake");
      const transitions = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd",
      };

      for (t in transitions) {
        if (el.style[t] !== undefined) {
          return transitions[t];
        }
      }
    }

    // Play Sound
    function playSound() {
      audio.currentTime = 0;
      audio.play();
    }

    const audio = document.querySelector(".GameSound");
    const btnON = document.querySelector(".btn-on");
    const btnOFF = document.querySelector(".btn-off");
    const power = document.querySelector(".power");
    const text = document.querySelector(".animated-text");
    const main = document.querySelector(".main");

    // Turn ON
    btnON.onclick = function () {
      // Button
      btnON.classList.add("btn-hide");
      btnOFF.classList.remove("btn-hide");

      // Power Led
      power.classList.add("power-on");

      // Animate text & play sound
      const transitionEvent = whichTransitionEvent();
      text.classList.add("end");
      text.addEventListener(transitionEvent, playSound);

      setTimeout(() => {
        text.classList.remove("end");
        main.classList.remove("main");
      }, 4000);

      setTimeout(() => {
        iniciarSonido();
      }, 4000);
    };

    btnOFF.onclick = function () {
      // Button
      btnON.classList.remove("btn-hide");
      btnOFF.classList.add("btn-hide");
      detenerSonido();

      // Power Led
      power.classList.remove("power-on");

      // Text
      text.classList.remove("end");
      main.classList.add("main");
    };
  },
};

App.init();

function creator() {
  const array = ["j", "S", "T", "g"];
  const arrayClass = [
    "playingButton",
    "eatingButton",
    "poopingButton",
    "sleepingButton",
  ];
  let counter = 0;

  const mainDiv = document.querySelector(".selecGotchi");
  const container = document.createElement("div");
  container.classList.add("displayNone");
  arrayClass.forEach((e) => {
    const button = document.createElement("button");
    button.classList.add("pixelButtons");
    button.setAttribute("id", e);
    button.textContent = array[counter];
    counter++;
    container.appendChild(button);
  });
  mainDiv.appendChild(container);
}

function boxDialogue() {
  const mainDiv = document.querySelector(".selecGotchi");
  const container = document.createElement("div");
  container.classList.add("textContainer");
}

const initGame = (pokemon) => {
  const actualPokemon = new Tamagotchi(pokemon);
  const data = actualPokemon.getData();
  const div = document.querySelectorAll("div.selecGotchi");
  document.querySelector(".status-poke").style.display = "flex";
  showUserMessages(`Elegiste a ${data.name}`, 5000);
  for (const iterator of div) {
    if (iterator.id != pokemon) {
      iterator.remove();
    }
    iterator.children[0].src = data.firstForm;
    iterator.children[1].remove();
    iterator.children[1].remove();
    iterator.classList.add("selectedGotchi");
    if (data.name === "Charmander" || data.name === "Squirtle") {
      document.querySelector(".options-section-1").style.width = "100%";
      document.querySelector(".options-section-2").style.display = "none";
    } else {
      document.querySelector(".options-section-2").style.width = "100%";
      document.querySelector(".options-section-1").style.display = "none";
    }
  }
  creator();

  const playingButton = document.getElementById("playingButton");
  playingButton.addEventListener("click", function () {
    actualPokemon.play();
    buttonAction()
  });

  const eatingButton = document.getElementById("eatingButton");
  eatingButton.addEventListener("click", function () {
    actualPokemon.eat();
    buttonAction()
  });

  const poopingButton = document.getElementById("poopingButton");
  poopingButton.addEventListener("click", function () {
    actualPokemon.poop();
    buttonAction()
  });

  const sleepingButton = document.getElementById("sleepingButton");
  sleepingButton.addEventListener("click", function () {
    actualPokemon.sleep();
    buttonAction()
  });
};

const showUserMessages = (text, timer = 3000) => {
  const divText = document.querySelector(".user-messages > p");
  divText.innerHTML = text;
  const timeout = setTimeout(() => {
    divText.innerHTML = "";
    clearTimeout(timeout);
  }, timer);
};

const syncHtmlAttributes = ({ energy, age }) => {
  const energyP = document.querySelector("p#energy");
  const ageP = document.querySelector("p#age");
  energyP.innerHTML = `Energia: ${energy}`;
  ageP.innerHTML = `Nivel: ${age}`;
};
