export class Loading extends Phaser.State {
    ready: boolean = false;

    loadingText: Phaser.Text;

    create() {
        let fontStyle = {
            font: '18px Walter Turncoat',
            fill: '#7edcfc'
        };

        let loadingBarBg = this.game.add.sprite(this.game.world.centerX,
                                                this.game.world.centerY,
                                                'loadingBarBg');
        loadingBarBg.tint = 0x7edcfc; // Same blue as text
        loadingBarBg.anchor.setTo(0.5);

        let loadingBar = this.game.add.sprite(this.game.world.centerX - 175,
                                              this.game.world.centerY - 16,
                                              'loadingBar');
        loadingBar.tint = 0xdcfc7e; // A contrasting green

        this.load.setPreloadSprite(loadingBar);

        this.loadingText = this.add.text(this.world.centerX,
                                         this.world.centerY - 30,
                                         'Loading...', fontStyle);
        this.loadingText.anchor.setTo(0.5);

        this.game.load.onFileComplete.add(this.fileComplete, this);

        // Load game assets here
        this.game.load.image('example', 'assets/images/loading-bar.png');
        this.game.load.image('loadingBarBg', 'assets/images/loading-bar-bg.png');

        this.game.load.json("components", "assets/components.json");
        this.game.load.atlasXML('hexAtlas', 
            'assets/images/hexagons/base/Spritesheet/complete.png', 
            'assets/images/hexagons/base/Spritesheet/complete.xml'
        );
        
        this.load.atlas("TEST", "assets/spriter/Atlas.png", "assets/spriter/Atlas.json");
        this.load.xml("TESTXml", "assets/spriter/TEST.xml");
        this.load.json("TESTJson", "assets/spriter/TEST.json");
        
        this.game.load.start();
    }

    update() {
        if (this.ready) {
            this.game.state.start('World');
        }
    }

    fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingText.setText('Loading... ' + progress + '%');

        if (progress === 100) {
            this.ready = true;
        }
    }
}
