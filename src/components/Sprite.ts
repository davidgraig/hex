import { Component } from './Component'
import { Type } from './Type'

export class Sprite implements Component {
    readonly entityId: number;
    readonly type: Type = Type.Sprite;

    private _phaserSprite: Phaser.Sprite;

    get phaserSprite(): Phaser.Sprite {
        return this._phaserSprite;
    }

    constructor(entityId: number, phaserSprite: Phaser.Sprite) {
        this._phaserSprite = phaserSprite;
        this.entityId = entityId;
    }
}