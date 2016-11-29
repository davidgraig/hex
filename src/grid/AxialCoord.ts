import { CubeCoord } from './CubeCoord'

export class AxialCoord {

    readonly directionRight = 0;
    readonly directionRightUp = 1;
    readonly directionLeftUp = 2;
    readonly directionLeft = 3;
    readonly directionLeftDown = 4;
    readonly directionRightDown = 5;

    private _x: number;
    private _y: number;

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    private static directions = [
        new AxialCoord(1,  0),
        new AxialCoord(1, -1),
        new AxialCoord(0, -1),
        new AxialCoord(-1,  0),
        new AxialCoord(-1, 1),
        new AxialCoord( 0, +1)
    ];

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    asCube() {
        return new CubeCoord(this.x, this.y, -this.x - this.y); 
    }

    neighbor(direction: number) {
        return this.add(AxialCoord.directions[direction])
    }

    add(other: AxialCoord) {
        return new AxialCoord(this.x + other.x, this.y + other.y);
    }

    distance(other: AxialCoord) {
        let thisCube = this.asCube().distance(other.asCube());
    }
}