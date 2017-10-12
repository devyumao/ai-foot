import {Game, Group} from 'phaser';

import Line from './line';

const GOALLINE_LENGTH = 200;

export default class Goal extends Group {
    flip: boolean;

    constructor(game: Game, x: number, y: number, flip: boolean = false) {
        super(game, undefined, null, null, true);

        this.x = x;
        this.y = y;
        this.flip = flip;

        this.init();
    }

    private init() {
        const game = this.game;

        this.addMultiple([
            new Line(game, 0, 0, 50, 0),
            new Line(game, 0, Line.WIDTH, 0, GOALLINE_LENGTH),
            new Line(game, 0, GOALLINE_LENGTH + Line.WIDTH, 50, 0),
        ]);
        
        this.pivot.y = this.height / 2;
        if (this.flip) {
            this.pivot.x = this.width / 2;
            this.angle = 180;
        }
        this.pivot.x = 50;

        this.game.add.existing(this);
    }
};
