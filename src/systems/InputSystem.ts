import { Components } from './../components/Components'
import { Type } from './../Components/Type'
import { Grid } from './../Components/Grid'
import { AxialCoord } from './../grid/AxialCoord'
import { Sprite } from './../Components/Sprite'

export class InputSystem {

    private readonly movementSpeed: number = 300;

    execute(components: Components, keys: Phaser.CursorKeys) {
        components
            .byType(Type.Player)
            .map(function (component) { return component.entityId })
            .forEach(function (id) {
                let sprite: Sprite = components.byEntityAndType<Sprite>(id, Type.Sprite);
                let vx = 0;
                let vy = 0;
                if (keys.up.isDown) {
                    vy -= this.movementSpeed;
                }
                if (keys.left.isDown) {
                    vx -= this.movementSpeed;
                }
                if (keys.right.isDown) {
                    vx += this.movementSpeed;
                }
                if (keys.down.isDown) {
                    vy += this.movementSpeed;
                }   
                sprite.phaserSprite.body.setZeroVelocity();
                sprite.phaserSprite.body.setZeroRotation();
                sprite.phaserSprite.body.velocity.x += vx;
                sprite.phaserSprite.body.velocity.y += vy;
            }, this)
    }
}