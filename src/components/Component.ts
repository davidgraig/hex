import { Type } from './Type'

export interface Component {
    readonly entityId: number;
    readonly type: Type;
}