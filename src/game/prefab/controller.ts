import {Game, CursorKeys, Keyboard} from 'phaser';

import Match from './match';

export default class Controller {
    private game: Game;
    private match: Match;
    private cursors: CursorKeys;

    constructor(game: Game, match: Match) {
        this.game = game;
        this.match = match;

        this.init();
    }

    init() {
        const keyboard = this.game.input.keyboard;
        const player = this.match.home.getFirstAlive();
        const ball = this.match.ball;
        
        this.cursors = keyboard.createCursorKeys();
        keyboard.addKey(Keyboard.S)
            .onDown.add(
                () => player.kick(ball)
            );
    }

    update() {
        const cursors = this.cursors;
        const keyboard = this.game.input.keyboard;
        const player = this.match.home.getFirstAlive();
        const ball = this.match.ball;

        if (cursors.up.isDown) {
            player.run();
        }
        else {
            player.stopRun();
        }

        if (cursors.left.isDown) {
            player.turnLeft();
        }
        else if (cursors.right.isDown) {
            player.turnRight();
        }
        else {
            player.stopTurn();
        }
    }
};
