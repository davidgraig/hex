export class Hexagon {

    private static sqrt32 = 0.866025404;

    private _radius: number;
    private _height: number;
    private _width: number;

    constructor(radius: number) {
        this._radius = radius;
    }

    get radius() {
        return this._radius;
    }

    get height() {
        if (this._height == null) {
            this._height = this._radius * 2;
        }
        return this._height;
    }

    get width() {
        if (this.width == null) {
            this._width = Math.sqrt(3) / 2 * this._height
        }
        return this._width;
    }
}