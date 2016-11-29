import { Components } from './../components/Components'

export interface System {
    execute(entities: Components);
}