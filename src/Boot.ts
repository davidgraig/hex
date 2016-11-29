export class Boot extends Phaser.State {

    fontLoaded: boolean = false;

    init() {
        window['WebFontConfig'] = {
            active: () => this.fontLoaded = true,
            google: { families: ['Walter Turncoat'] }
        };
    }

    preload() {
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
        this.load.image('loadingBarBg', 'assets/images/loading-bar-bg.png');
        this.load.image('loadingBar', 'assets/images/loading-bar.png');
    }

    update() {
        if (this.fontLoaded) {
            this.game.state.start('Loading');
        }
    }
}