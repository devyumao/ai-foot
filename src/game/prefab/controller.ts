import {Game, CursorKeys, Keyboard} from 'phaser';

import Match from './match';
import Player from './player';

export default class Controller {
    private game: Game;
    private match: Match;
    private hoa: string;
    private cursors: CursorKeys;
    hero: Player;

    constructor(game: Game, match: Match, hoa:string = 'home') {
        this.game = game;
        this.match = match;
        this.hoa = hoa;
        this.hero = match[hoa].getFirstExists();

        this.init();
    }

    init() {
        const keyboard = this.game.input.keyboard;

        this.cursors = keyboard.createCursorKeys();

        keyboard.addKey(Keyboard.S)
            .onDown.add(
                () => this.hero.kick(this.match.ball)
            );
    }

    update() {
        const {cursors, match, hoa} = this;
        const ballBy = this.match.ballBy;

        if (ballBy && ballBy.team === match[hoa]) {
            this.hero = ballBy;
        }

        const hero = this.hero;

        if (cursors.up.isDown) {
            hero.run();
        }
        else {
            hero.stopRun();
        }

        if (cursors.left.isDown) {
            hero.turnLeft();
        }
        else if (cursors.right.isDown) {
            hero.turnRight();
        }
        else {
            hero.stopTurn();
        }
    }

    render() {
        this.game.debug.bodyInfo(this.hero, 20, 20, '#fff');
    }
};
