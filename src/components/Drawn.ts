import { Component } from './Component'
import { Type } from './Type'

export class Drawn implements Component {

    private _textureId: string

    readonly entityId: number;
    readonly type: Type = Type.Drawn;

    constructor(entityId: number, textureId: string) {
        this.entityId = entityId;
        this._textureId = textureId;
    }

    get textureId(): string {
        return this._textureId;
    }
}