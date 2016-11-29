import { AxialCoord } from './AxialCoord';

export class CubeCoord {

    private static directions = [
        new CubeCoord(1, -1, 0),
        new CubeCoord(1, 0, -1),
        new CubeCoord(0, 1, -1),
        new CubeCoord(-1, 1, 0),
        new CubeCoord(-1, 0, +1),
        new CubeCoord(0, -1, +1)
    ];

    static round(cubeCoord: CubeCoord) {
        let roundedX = Math.round(cubeCoord.x)
        let roundedY = Math.round(cubeCoord.y)
        let roundedZ = Math.round(cubeCoord.z)

        let xDiff = Math.abs(roundedX - cubeCoord.x)
        let yDiff = Math.abs(roundedY - cubeCoord.y)
        let zDiff = Math.abs(roundedZ - cubeCoord.z)

        if (xDiff > yDiff && xDiff > zDiff) {
            roundedX = -roundedY - roundedZ
        } else if (yDiff > zDiff) {
            roundedY = -roundedX - roundedZ
        } else {
            roundedZ = -roundedX - roundedY
        }

        return new CubeCoord(roundedX, roundedY, roundedZ)
    }

    readonly directionRight = 0;
    readonly directionRightUp = 1;
    readonly directionLeftUp = 2;
    readonly directionLeft = 3;
    readonly directionLeftDown = 4;
    readonly directionRightDown = 5;

    private _x: number;
    private _y: number;
    private _z: number;

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get z() {
        return this._z;
    }

    constructor(x: number, y: number, z: number) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    asAxial() {
        return new AxialCoord(this._x, this._y);
    }

    neighbor(direction: number) {
        return this.add(CubeCoord.directions[direction]);
    }

    add(other: CubeCoord) {
        return new CubeCoord(this._x + other._x, this._y + other._y, this._z + other._z);
    }

    distance(other: CubeCoord) {
        return Math.max(Math.abs(this.x - other.x), Math.abs(this.y - other.y), Math.abs(this.z - other.z));
    }

    lineTo(other: CubeCoord) {
        let distance = this.distance(other);
        let cubeLine = [];
        for (let i = 0; i < distance; i++) {
            cubeLine.push(this.cubeLinearInterpolation(other, 1.0 / distance * i))
        }
    }

    private cubeLinearInterpolation(end: CubeCoord, t: number) {
        return new CubeCoord(
            this.oneDimensionLinearInterpolation(this.x, end.x, t),
            this.oneDimensionLinearInterpolation(this.y, end.y, t),
            this.oneDimensionLinearInterpolation(this.z, end.z, t)
        )
    }

    private oneDimensionLinearInterpolation(startDistance: number, endDistance: number, t: number) {
        return startDistance + (endDistance - startDistance) * t;
    }
}