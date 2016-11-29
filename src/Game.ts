/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

import { Boot } from "./Boot";
import { Loading } from "./Loading";
import { World } from "./World";

export class Game extends Phaser.Game {
	game: Phaser.Game;

	constructor() {
		super (400, 400);
		this.state.add('Boot', Boot);
		this.state.add('Loading', Loading);
		this.state.add('World', World);

		this.state.start('Boot');
	}
}

new Game();