import {State} from 'phaser';

export default class PreloadState extends State {
    preload() {
        const game = this.game;

        game.load.image('ball', 'ball.png');
        game.load.image('home-kit', 'home-kit.png');
        game.load.image('away-kit', 'away-kit.png');
    }

    create() {
        this.game.state.start('play');
    }
};
