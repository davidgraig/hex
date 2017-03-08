/// <reference path="spriter/Spriter.ts"/> //

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
import { Server } from './Server'

export class World extends Phaser.State implements PhaserSpriteFactory {

    private _tileWidth = 65;
    private _tileHeight = 51;
    private _halfTileWidth = this._tileWidth / 2;

    private _spriteSystem: SpriteSystem;
    private _inputSystem: InputSystem;
    private _cursors: Phaser.CursorKeys;
    private _components: Components;
    private _server: Server;

    private _spriterGroup: Spriter.SpriterGroup;

    create() {

        this.world.setBounds(0, 0, 500, 500);
        this.physics.startSystem(Phaser.Physics.P2JS);

        this._server = new Server("localhost", 8220, onconnect => {
            this._server.subject.next({requestType: 'SignIn', data: {email: 'test@test.com', password:'1234'}});
            this._server.subject.next({requestType: 'GetTerrain', data: {point: {x: 0, y: 0, z: 0}}})
        });

        this._server.subject.subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        )

        this._components = new Components();
        this._spriteSystem = new SpriteSystem(this);
        this._inputSystem = new InputSystem();
        this._cursors = this.game.input.keyboard.createCursorKeys();

        let factory = new ComponentFactory();
        let json = this.game.cache.getJSON("components");

        json.forEach(function (componentJson, index, groups) {
            this._components.add(factory.fromJson(componentJson));
        }, this);

        this._spriteSystem.execute(this._components);


        /* Spriter Tests */
        let spriterLoader = new Spriter.Loader();
        let spriterFile = new Spriter.SpriterJSON(this.cache.getJSON("TESTJson"), { 
            imageNameType: Spriter.eImageNameType.NAME_ONLY 
        });
        let spriterData = spriterLoader.load(spriterFile);
        this._spriterGroup = new Spriter.SpriterGroup(this.game, spriterData, "TEST", "Hero", 0, 100);
        this._spriterGroup.position.setTo(200, 200);
        this.world.add(this._spriterGroup);
        
        this._spriterGroup.onVariableSet.add((spriter: Spriter.SpriterGroup, variable: Spriter.Variable) => {
            console.log(variable.string);
        }, this);

    }

    update() {
        this._inputSystem.execute(this._components, this._cursors);
        this._spriterGroup.updateAnimation();
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