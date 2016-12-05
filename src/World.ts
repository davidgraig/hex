import { SpriteSystem } from './systems/SpriteSystem'
import { Component } from './components/Component'
import { Components } from './components/Components'
import { PhaserSpriteFactory } from './PhaserSpriteFactory'
import { AxialCoord } from './grid/AxialCoord'
import { Type } from './components/Type'
import { Drawn } from './components/Drawn'
import { Grid } from './components/Grid'
import { Player } from './components/Player'
import { ComponentFactory } from './components/ComponentFactory'
import { InputSystem } from './systems/InputSystem'
import { Sprite } from './components/Sprite'

export class World extends Phaser.State implements PhaserSpriteFactory {

    private _tileWidth = 65;
    private _tileHeight = 51;
    private _halfTileWidth = this._tileWidth / 2;

    private _spriteSystem: SpriteSystem;
    private _inputSystem: InputSystem;
    private _cursors: Phaser.CursorKeys;
    private _components: Components;

    private _sprites: Sprite[];

    create() {

        this.physics.startSystem(Phaser.Physics.P2JS);

        this._components = new Components();
        this._spriteSystem = new SpriteSystem(this);
        this._inputSystem = new InputSystem();
        this._cursors = this.game.input.keyboard.createCursorKeys();

        let json = this.game.cache.getJSON("components");
        let factory = new ComponentFactory();

        json.forEach(function (componentJson, index, groups) {
            this._components.add(factory.fromJson(componentJson));
        }, this);

        this._spriteSystem.execute(this._components);
    }

    update() {
        this._inputSystem.execute(this._components, this._cursors);
    }

    addAndBuild(coord: AxialCoord, textureId: string, enablePhysics: boolean) {
        let x = (coord.x * this._tileWidth) + (coord.y * this._halfTileWidth);
        let y = coord.y * this._tileHeight;
        let sprite = this.add.sprite(x, y, 'hexAtlas', textureId);
        if (enablePhysics) {
            this.physics.p2.enable(sprite);
            // TODO: move camera follow to separate systems
            this.camera.follow(sprite);
        } 
        return sprite; 
    }
}