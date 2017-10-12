import {State, Physics} from 'phaser';

import {Match, Controller} from '../prefab'; // FIXME: alias

export default class PlayState extends State {
    match: Match;
    controller: Controller

    preload() {
        // this.time.advancedTiming = true;
    }

    create() {
        this.physics.startSystem(Number(Physics.Arcade));
        
        const game = this.game;
        this.match = new Match(game);

        this.controller = new Controller(game, this.match);
    }

    update() {
        this.match.update();
        this.controller.update();
    }

    render() {
        // this.match.render();
        // this.controller.render();
    }
};
