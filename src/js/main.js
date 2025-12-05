(function () {
    const DrumpKit = {
        cacheDom() {
            this.body = document.querySelector('body');
            this.html = window.document.documentElement;
            this.eAudios = new Map();
            this.eKeys = new Map();

            document.querySelectorAll('.key').forEach((eKey) => {
                this.eKeys.set(eKey.dataset.key, eKey);
            });

            document.querySelectorAll('audio').forEach((eAudio) => {
                this.eAudios.set(eAudio.dataset.key, eAudio);
            });
        },

        init() {
            this.cacheDom();
            this.html.classList.add('js-enabled');
            this.addEventListener();
        },
        addEventListener() {
            window.addEventListener('keydown', (evt) => {
                this.keySymbol = evt.key;
                this.playSound();
                this.animateKey();

            });

            this.eKeys.forEach(function (eKey) {
                eKey.addEventListener('transitionend', (elem) => {
                    elem.currentTarget.classList.remove('playing');
                });
            });

            this.body.addEventListener('transitionend', () => {
                this.removeColorFromBody();
            });
        },

        removeColorFromBody() {
            this.body.className = '';
        },

        playSound() {
            // Pour remettre à 0 la lecture
            if (this.eAudios.has(this.keySymbol)) {
                this.eAudios.get(this.keySymbol).pause();
                this.eAudios.get(this.keySymbol).currentTime = 0;
                this.eAudios.get(this.keySymbol).play();
            }
        },

        animateKey() {
            if (this.eAudios.has(this.keySymbol)) {
                this.eKeys.get(this.keySymbol).classList.add('playing');
                this.body.classList.add(this.keySymbol);
            }
        }
    };
    DrumpKit.init();
})();