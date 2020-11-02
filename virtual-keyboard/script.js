let input = document.querySelector(".use-keyboard-input");

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    lang: 'ru',
    start: 0,
    end: 0,
    sound: false,
    mic: false


  },

  init(e) {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys(e));

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // let text = document.querySelector(".use-keyboard-input");

    // text.addEventListener('click', () => {
    //   console.log(text.value);
    // });

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
          element.focus();
          // console.log(element.value)
          // console.log(currentValue)
        });
      });
      element.addEventListener('click', () => {
        //позиция курсора

        // this.properties.start = input.selectionStart;
        // this.properties.end = input.selectionEnd;
        console.log(input.selectionStart)

      });

      window.addEventListener("keydown", (e) => {
        // console.log(e);
        const button_id = e.code;
        document.getElementById(button_id).classList.add('keyboard__key_on')
        // this.properties.start++;
        // this.properties.end++;
      });
      window.addEventListener("keyup", (e) => {
        // console.log(e);
        const button_id = e.code;
        document.getElementById(button_id).classList.remove('keyboard__key_on');
      });
    });

    input.addEventListener('click', () => {
      //позиция курсора
      this.properties.start = input.selectionStart;
      this.properties.end = input.selectionEnd;
      // console.log(input.selectionStart)


    });
  },

  _createKeys(i) {
    const fragment = document.createDocumentFragment();
    //en
    if (i == 1 && this.properties.lang == 'en') keyLayout = [
      "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "Backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter",
      "Shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "done",
      "mic", "sound", " ", "en", "ArrowLeft", "ArrowRight"
    ];

    if (i == 0 && this.properties.lang == 'en') keyLayout = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter",
      "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "done",
      "mic", "sound", " ", "en", "ArrowLeft", "ArrowRight"
    ];
    //ru
    if (i == 1 && this.properties.lang == 'ru') keyLayout = [
      "!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "Backspace",
      "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з",
      "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "Enter",
      "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", "done",
      "mic", "sound", " ", "ru", "ArrowLeft", "ArrowRight"
    ];

    if (i == 0 && this.properties.lang == 'ru') keyLayout = [
      "1", '2', "3", "4", "5", "6", "7", "8", "9", "0", "Backspace",
      "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з",
      "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "Enter",
      "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "done",
      "mic", "sound", " ", "ru", "ArrowLeft", "ArrowRight"
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach((key, ind) => {

      const keys = [
        "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Backspace",
        "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",
        "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Enter",
        "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "done",
        "mic", "sound", "Space", "en", "ArrowLeft", "ArrowRight"
      ];

      // console.log(ind)
      const keyElement = document.createElement("button");
      const insertLineBreak = ["Backspace", "p", "Enter", "done", "з"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      keyElement.id = `${keys[ind]}`;
      // console.log(keyElement.id)

      switch (key) {
        case "Backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            const start = input.selectionStart;
            const inputValue = input.value;
            if (start === 0) return;
            input.value = inputValue.slice(0, start - 1) + inputValue.slice(start);
            this.properties.value = input.value;

            if (start > 0) {
              this.properties.start = start - 1;
              this.properties.end = start - 1;
              input.setSelectionRange(this.properties.start, this.properties.end);
            }

            // this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            if (this.properties.sound) {
              const audio = new Audio();
              audio.src = './sound/joystick-trigger-button.mp3';
              audio.autoplay = true;
            }
            this._triggerEvent("oninput");
            // console.log(this.properties.value)
          });

          break;

        case "CapsLock":
          // keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          if (this.properties.capsLock) {
            keyElement.classList.add("keyboard__key--active", this.properties.capsLock);
          }
          // if(this.properties.capsLock) keyElement.classList.add("keyboard__key--active", this.properties.capsLock);
          // else keyElement.classList.remove("keyboard__key--active", this.properties.capsLock);
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            if (this.properties.capsLock) {
              this.properties.capsLock = false;
              keyElement.classList.remove("keyboard__key--active", this.properties.capsLock);
            } else {
              keyElement.classList.add("keyboard__key--active", this.properties.capsLock);
              this.properties.capsLock = true;
            }
            if (this.properties.sound) {
              const audio = new Audio();
              audio.src = './sound/typewriter-press-single.mp3';
              audio.autoplay = true;
            }
            this._toggleCapsLock();
          });

          break;

        case "sound":
          if (this.properties.sound) {
            keyElement.classList.add("keyboard__key--active", this.properties.sound);
          }
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("volume_up");

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) {
              this.properties.sound = false;
              keyElement.classList.remove("keyboard__key--active", this.properties.sound);
            } else {
              keyElement.classList.add("keyboard__key--active", this.properties.sound);
              this.properties.sound = true;
            }
            this._soundOther();
          });

          break;

        case "mic":
          if (this.properties.mic) {
            keyElement.classList.add("keyboard__key--active", this.properties.mic);
          }
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("mic");

          keyElement.addEventListener("click", () => {
            if (this.properties.mic) {
              this.properties.mic = false;
              keyElement.classList.remove("keyboard__key--active", this.properties.mic);
            } else {
              keyElement.classList.add("keyboard__key--active", this.properties.mic);
              this.properties.mic = true;
            }
            this._soundOther();
            this.speechToggle();
          });

          break;

        case "Enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this.properties.start++;
            this.properties.end++;
            if (this.properties.sound) {
              const audio = new Audio();
              audio.src = './sound/jg-sfx.mp3';
              audio.autoplay = true;
            }
            this._triggerEvent("oninput");
          });

          break;

        case " ":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            const start = input.selectionStart;
            const end = input.selectionEnd;

            const inputValue = input.value;
            const before = inputValue.substring(0, start)
            const after = inputValue.substring(end, inputValue.length)
            input.value = before + " " + after;

            this.properties.value = input.value;
            this.properties.start = start + 1;
            this.properties.end = end + 1;
            // this.properties.value += " ";
            this._soundMain();
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this._soundOther();
            this.close();
            // this._triggerEvent("onclose");
          });

          break;

        case "en":
        case "ru":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = this.properties.lang;

          keyElement.addEventListener("click", () => {
            if (this.properties.lang === 'ru') this.properties.lang = "en";
            else this.properties.lang = "ru";

            this.elements.main.remove();

            if (this.properties.shift) Keyboard.init(1);
            else Keyboard.init(0);

            this._soundOther();
            this.open();
            document.querySelector(".use-keyboard-input").focus();
          });


          break;

        case "Shift":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = "⇧";
          // keyElement.innerHTML = "Shift";
          keyElement.classList.toggle('keyboard__key--dark', this.properties.shift);

          keyElement.addEventListener("click", () => {
            if (this.properties.shift) {
              this.properties.shift = false;
            } else {
              this.properties.shift = true;
            }
            if (this.properties.sound) {
              const audio = new Audio();
              audio.src = './sound/fax-machine.mp3';
              audio.autoplay = true;
            }
            this._toggleShift();
          });

          break;

        case "ArrowLeft":
          // keyElement.classList.add(key);
          keyElement.innerHTML = createIconHTML("keyboard_arrow_left");
          keyElement.addEventListener('click', () => {
            //стрелка влево работа шифта по выделению
            // if (!this.properties.shift) {
            if (this.properties.start > 0) {
              this.properties.start--;
              this.properties.end--;
              input.setSelectionRange(this.properties.start, this.properties.end);
            }
            this._soundOther();
            input.focus();

          });
          break;

        case "ArrowRight":
          keyElement.classList.add(key);
          keyElement.innerHTML = createIconHTML("keyboard_arrow_right");
          keyElement.addEventListener('click', () => {
            //стрелка вправо
            // if (!this.properties.shift) {
            if (this.properties.start < this.properties.value.length) {

              this.properties.start++;
              this.properties.end++;
              input.setSelectionRange(this.properties.start, this.properties.end);
            }
            this._soundOther();
            input.focus();
          });
          break;

        default:
          if (this.properties.capsLock && this.properties.shift) {
            keyElement.textContent = key.toLowerCase();

          } else if (this.properties.capsLock || this.properties.shift) {
            keyElement.textContent = key.toUpperCase();
          } else {

            keyElement.textContent = key.toLowerCase();
          }

          keyElement.addEventListener("click", () => {
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const inputValue = input.value
            const before = inputValue.substring(0, start)
            const after = inputValue.substring(end, inputValue.length);


            if (!this.properties.capsLock && this.properties.shift) {
              input.value = (before + (this.properties.capsLock ? key.toLowerCase() : key.toUpperCase()) + after);
              // this.properties.value += this.properties.capsLock ? key.toLowerCase() : key.toUpperCase();
            } else if (this.properties.capsLock && this.properties.shift) {
              input.value = (before + (this.properties.capsLock ? key.toLowerCase() : key.toUpperCase()) + after);

            } else {
              input.value = (before + (this.properties.capsLock ? key.toUpperCase() : key.toLowerCase()) + after);


            }
            this.properties.value = input.value;
            this.properties.start = start + 1;
            this.properties.end = end + 1;

            // this.properties.start = input.selectionStart;
            // this.properties.end = input.selectionEnd;
            // console.dir(keyElement)
            // console.log(this.properties.start, this.properties.end)
            this._soundMain();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  speechToggle() {
    if(this.properties.mic) {
      this.properties.lang === 'en' ? recognition.lang = 'en-US' : recognition.lang = 'ru-RU';
      recognition.addEventListener('result', e => {
        const before = this.properties.value.substring(0, this.properties.start)
        const after  = this.properties.value.substring(this.properties.end, this.properties.value.length)
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        if (e.results[0].isFinal) {
        this.properties.value = (before + transcript + after);
        }
        this.properties.start += transcript.length;
        this.properties.end += transcript.length;
        // console.log(transcript);
        this.eventHandlers['oninput'](this.properties.value);
      });
      recognition.addEventListener('end', recognition.start);
      recognition.start();
      this.eventHandlers['oninput'](this.properties.value);
    }
  },



  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
    input.selectionStart = this.properties.start;
    input.selectionEnd = this.properties.end;

    input.focus();
  },

  _soundMain() {
    const audio = new Audio();
    if (this.properties.lang === 'ru') audio.src = './sound/lo-fi-snare-dry_B_minor.wav';
    else audio.src = './sound/short-click-perc.wav';
    if (this.properties.sound) audio.autoplay = true;
  },

  _soundOther() {
    const audio = new Audio();
    if (this.properties.lang === 'ru') audio.src = './sound/dry-mixed-trap-snare.wav';
    else audio.src = './sound/ping-bing_E_major.wav';
    if (this.properties.sound) audio.autoplay = true;
  },

  _toggleCapsLock() {
    if (!this.properties.capsLock && this.properties.shift) {
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
        }
      }
    } else if (this.properties.capsLock && this.properties.shift) {
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
        }
      }
    } else {
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    }
    document.querySelector(".use-keyboard-input").focus();
  },


  _toggleShift() {
    this.elements.main.remove();
    if (this.properties.shift) {
      Keyboard.init(1);
    } else {
      Keyboard.init(0);
    }
    this.open();
    document.querySelector(".use-keyboard-input").focus();
    if (this.properties.capsLock) {
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.shift ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
        }
      }
    } else {
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init(0);
});