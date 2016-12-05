import { AxialCoord } from './grid/AxialCoord'

export interface PhaserSpriteFactory {
    addAndBuild(coord: AxialCoord, textureId: string, enablePhysics: boolean);
}