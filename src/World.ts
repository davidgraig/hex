import { DrawSystem } from './systems/DrawSystem'
import { Component } from './components/Component'
import { Components } from './components/Components'
import { Drawer } from './Drawer'
import { AxialCoord } from './grid/AxialCoord'
import { Type } from './components/Type'
import { Drawn } from './components/Drawn'
import { Grid } from './components/Grid'
import { Player } from './components/Player'
import { ComponentFactory } from './components/ComponentFactory'
import { InputSystem } from './systems/InputSystem'

export class World extends Phaser.State implements Drawer {

    private _tileWidth = 65;
    private _tileHeight = 51;
    private _halfTileWidth = this._tileWidth / 2;
    
    private _drawSystem: DrawSystem;
    private _inputSystem: InputSystem;
    private _cursors: Phaser.CursorKeys;
    private _components: Components;

    create() {

        this._components = new Components();
        this._drawSystem = new DrawSystem(this);
        this._inputSystem = new InputSystem();
        this._cursors = this.game.input.keyboard.createCursorKeys();

        let json = this.game.cache.getJSON("components");
        let factory = new ComponentFactory();

        json.forEach(function (componentJson, index, groups) {
            this._components.add(factory.fromJson(componentJson));
        }, this);

        this._drawSystem.execute(this._components);
    }

    update() {
        this._inputSystem.execute(this._components, this._cursors);
    }

    draw(coord: AxialCoord, textureId: string) {
        let x = (coord.x * this._tileWidth) + (coord.y * this._halfTileWidth);
        let y = coord.y * this._tileHeight;
        this.add.sprite(x, y, 'hexAtlas', textureId)
    }
}