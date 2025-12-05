import {settings} from './settings';

const drumKit = {
    init() {
        document.documentElement.classList.add(settings.jsEnabledClass);
        this.keyElements = document.querySelectorAll(settings.keySelector);

        this.audioElements = {};

        document.querySelectorAll(settings.audioSelector).forEach((audioElement) => {
            this.audioElements[audioElement.dataset.key] = audioElement;
        });
        console.log(this.audioElements);

        this.keyElements.forEach((key) => {
            key.addEventListener('click', (evt) => {
                this.play(evt.currentTarget.dataset.key);
            });
        });

        window.addEventListener('keydown', (evt) => {
            this.play(evt.key);

        });

        document.body.addEventListener('transitionend', () => {
            document.body.className = '';
        });

    },

    play(key) {
        if (this.audioElements[key]) {
            this.audioElements[key].play();
            document.body.classList.add(key);
        }
    },
};

drumKit.init();