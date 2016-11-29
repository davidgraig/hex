import { AxialCoord } from './grid/AxialCoord'

export interface Drawer {
    draw(coord: AxialCoord, textureId: string);
}