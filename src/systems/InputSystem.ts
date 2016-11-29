import { Components } from './../components/Components'
import { Type } from './../Components/Type'
import { Grid } from './../Components/Grid'
import { AxialCoord } from './../grid/AxialCoord'

export class InputSystem {

    execute(components: Components, keys: Phaser.CursorKeys) {
        components
            .byType(Type.Player)
            .map(function (component) { return component.entityId })
            .map(function (id) {
                return components
                    .byEntityId(id)
                    .filter(function (component) { return component.type == Type.Grid; })
                    .map(function (component) {
                        return component as Grid;
                    })[0];
            })
            .forEach(function (grid) {
                let vx = 0;
                let vy = 0;
                if (keys.up) {
                    vy -= 300;
                }
                if (keys.left) {
                    vx -= 300;
                }
                if (keys.right) {
                    vx += 300;
                }
                if (keys.down) {
                    vy += 300;
                }

                let newCoord = grid.coord.add(new AxialCoord(vx, vy));
                grid.coord = newCoord;
            });
    }
}