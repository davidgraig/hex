import { System } from './System'
import { Components } from './../components/Components'
import { AxialCoord } from './../grid/AxialCoord'
import { Drawer } from './../Drawer'
import { Grid } from './../components/Grid'
import { Drawn } from './../components/Drawn'

export class DrawSystem implements System {

    private _drawer: Drawer;

    constructor(drawer: Drawer) {
        this._drawer = drawer;
    }

    execute(components: Components) {
        components.entityIdMap.forEach(function (components, entityId) {
            let grid: Grid = null;
            let drawn: Drawn = null;
            for (let component of components) {
                if (component instanceof Grid) {
                    grid = component;
                } else if (component instanceof Drawn) {
                    drawn = component;
                }
            }
            if (grid != null && drawn != null) {
                this._drawer.draw(grid.coord, drawn.textureId);
            }
        }, this);
    }
}