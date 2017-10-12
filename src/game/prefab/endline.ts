import {Game, Group} from 'phaser';

import Line from './line';
import Pitch from './pitch';

const GOAL_WIDTH = 200;

export default class Endline extends Group {
    constructor(game: Game) {
        super(game, undefined, null, null, true);

        this.init();
    }

    private init() {
        const game = this.game;

        this.game.add.existing(this);

        const length = (Pitch.HEIGHT - GOAL_WIDTH) * .5 - Line.WIDTH;
        const leftX = (game.width - Pitch.WIDTH) * .5;
        const topY = (game.height - Pitch.HEIGHT) * .5 + Line.WIDTH;
        const bottomY = game.height * .5 + GOAL_WIDTH * .5;
        const rightX = (game.width + Pitch.WIDTH) * .5 - Line.WIDTH;

        this.addMultiple([
            new Line(game, leftX, topY, 0, length),
            new Line(game, leftX, bottomY, 0, length),
            new Line(game, rightX, topY, 0, length),
            new Line(game, rightX, bottomY, 0, length)
        ]);
    }
};
