import {Game, Sprite} from 'phaser';

import Player from './player';

export default class Ball extends Sprite {
    radius: number = 10; // FIXME: remove
    // controlled: boolean = false;

    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'ball');

        this.init();
    }

    init() {
        // this.width = this.radius * 2;
        // this.height = this.width;
        this.anchor.set(.5);

        const game = this.game;
        game.add.existing(this);
        game.physics.arcade.enable(this);

        const body = this.body;
        body.setCircle(this.radius);
        body.collideWorldBounds = true;
        // body.bounce.set(0.8);
        // body.moves = false;
    }

    // disableBody() {
    //     this.body.enable = false;
    // }

    moveToPlayerFront(player: Player) {
        const front = player.getFrontPosition(this);
        this.rotation = this.game.physics.arcade.moveToXY(this, front.x, front.y, null, 80);
    }

    onKick(rotation: number, speed: number) {
        this.game.physics.arcade.velocityFromRotation(rotation, speed, this.body.velocity);
    }

    onColideWithPlayer() {
        // this.controlled = true;
    }

    update() {
        const {game, body} = this;
        const velocity = body.velocity;
        const dragX = 100;
        const dragY = dragX * Math.abs(velocity.y) / Math.abs(velocity.x)
        body.drag.set(dragX, dragY);
    }

    render() {
        this.game.debug.body(this);
    }
};
