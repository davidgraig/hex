import { Component } from './Component'
import { Type } from './Type'
import { AxialCoord } from './../grid/AxialCoord'
import { Hexagon } from './../grid/Hexagon'

export class Grid implements Component {

    readonly entityId: number;
    readonly type: Type = Type.Grid;
    
    private _coord: AxialCoord;

    get coord(): AxialCoord { return this._coord; }
    set coord(coord: AxialCoord) { this._coord = coord; }

    constructor(entityId: number, coord: AxialCoord) {
        this.entityId = entityId;
        this._coord = coord;
    }
}