import { Component } from './Component'
import { Type } from './Type'
import { Drawn } from './Drawn'

export class Components {

    private _components: Array<Component>;
    private _entityMap: Map<number, Array<Component>>;
    private _typeMap: Map<Type, Array<Component>>;

    get entityIdMap(): Map<number, Array<Component>> {
        return this._entityMap;
    }

    get typeMap(): Map<Type, Array<Component>> {
        return this._typeMap;
    }

    constructor(components: Array<Component> = null) {
        if (components == null) {
            this._components = new Array<Component>();
            this._entityMap = new Map<number, Array<Component>>();
            this._typeMap = new Map<Type, Array<Component>>();
        } else {
            components.forEach(function (component) {
                this.add(component);
            }, this);
        }
    }

    byEntityId(id: number): Array<Component> {
        return this._entityMap.get(id);
    }

    byEntityAndType<T extends Component>(id: number, type: Type): T {
        return this.byEntityId(id)
            .filter(function (component) {
                return component.type == type
            }).map(function (component) {
                return component as T
            })[0];
    }

    byType(type: Type): Array<Component> {
        return this._typeMap.get(type);
    }

    add(component: Component) {
        this._components.push(component);
        if (!this._entityMap.has(component.entityId)) {
            this._entityMap.set(component.entityId, new Array<Component>());
        }
        this._entityMap.get(component.entityId).push(component);

        if (!this._typeMap.has(component.type)) {
            this._typeMap.set(component.type, new Array<Component>());
        }
        this._typeMap.get(component.type).push(component);
    }
}