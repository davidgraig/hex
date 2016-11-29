import { Component } from './Component'
import { Drawn } from './Drawn'
import { Grid } from './Grid'
import { Player } from './Player'
import { Type } from './Type'
import { AxialCoord } from './../grid/AxialCoord'

export class ComponentFactory {

    fromJson(json: Object) {
        let component: Component = json as Component;
        let type = component.type;
        if (type == Type.Drawn) {
            let drawn = component as Drawn;
            return new Drawn(drawn.entityId, drawn.textureId);
        } else if (type == Type.Grid) {
            let grid: Grid = component as Grid;
            return new Grid(grid.entityId, new AxialCoord(grid.coord.x, grid.coord.y))
        } else if (type == Type.Player) {
            let player: Player = component as Player;
            return new Player(player.entityId)
        }
        throw new TypeError(`Unrecognized Component Type from JSON input: ${type}`);
    }
}