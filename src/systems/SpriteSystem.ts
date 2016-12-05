import { System } from './System'
import { Components } from './../components/Components'
import { AxialCoord } from './../grid/AxialCoord'
import { PhaserSpriteFactory } from './../PhaserSpriteFactory'
import { Grid } from './../components/Grid'
import { Drawn } from './../components/Drawn'
import { Sprite } from './../components/Sprite'
import { Player } from './../components/Player'

export class SpriteSystem implements System {

    private _phaserSpriteFactory: PhaserSpriteFactory;

    constructor(phaserSpriteFactory: PhaserSpriteFactory) {
        this._phaserSpriteFactory = phaserSpriteFactory;
    }

    execute(components: Components) {
        components.entityIdMap.forEach(function (componentList, entityId) {
            let grid: Grid = null;
            let drawn: Drawn = null;
            let player: Player = null;
            for (let component of componentList) {
                if (component instanceof Grid) {
                    grid = component;
                } else if (component instanceof Drawn) {
                    drawn = component;
                } else if (component instanceof Player) {
                    player = component as Player;
                }
            }
            if (grid != null && drawn != null) {
                let phaserSprite: Phaser.Sprite = this._phaserSpriteFactory.addAndBuild(grid.coord, drawn.textureId, player != null);
                components.add(new Sprite(entityId, phaserSprite));
            }
        }, this);
    }
}