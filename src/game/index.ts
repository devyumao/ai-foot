import {Game as PhaserGame, CANVAS} from 'phaser';

import BootState from './state/boot';
import PreloadState from './state/preload';
import PlayState from './state/play';

export default class Game extends PhaserGame {
    constructor() {
        super(1280, 800, CANVAS, '');

        this.state.add('boot', BootState);
        this.state.add('preload', PreloadState);
        this.state.add('play', PlayState);

        this.state.start('boot');
    }
};
