import {State, ScaleManager} from 'phaser';

export default class BootState extends State {
    preload() {
    }

    create() {
        const {game, scale} = this;

        game.stage.backgroundColor = '#000';
        scale.pageAlignHorizontally = true;
        scale.pageAlignVertically = true;
        scale.scaleMode = ScaleManager.SHOW_ALL;

        game.state.start('preload');
    }
};
