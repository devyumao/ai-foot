import {Game, Group} from 'phaser';

import Line from './line';
import Pitch from './pitch';

export default class Sideline extends Group {
    constructor(game: Game) {
        super(game, undefined, null, null, true);

        this.init();
    }

    private init() {
        const game = this.game;

        this.game.add.existing(this);

        this.addMultiple([
            new Line(
                game,
                (game.width - Pitch.WIDTH) * .5,
                (game.height - Pitch.HEIGHT) * .5,
                Pitch.WIDTH,
                0
            ),
            new Line(
                game,
                (game.width - Pitch.WIDTH) * .5,
                (game.height + Pitch.HEIGHT) * .5  - Line.WIDTH,
                Pitch.WIDTH,
                0
            )
        ]);
    }
};
