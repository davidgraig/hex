import { Component } from './Component'
import { Type } from './Type'

export class Player implements Component {
    readonly entityId: number;
    readonly type: Type = Type.Player;

    constructor(entityId: number) {
        this.entityId = entityId;
    }
}