import {Game, Sprite, Timer} from 'phaser';

import Ball from './Ball';
import Team from './Team';

export default class Player extends Sprite {
    static ANG_VEL: number = 200;
    static SPEED: number = 160;
    static STATES: any = {
        OFF_BALL: Symbol(),
        CONTROLLING: Symbol(),
        KICKING: Symbol()
    };
    radius: number = 20;
    team: Team;
    state: symbol = Player.STATES.OFF_BALL;

    constructor(game: Game, x: number, y: number, texture: string, team?: Team) {
        super(game, x, y, texture);
        
        this.team = team;

        this.init();
    }

    private init() {
        this.anchor.set(.5);
        // this.angle = 90;

        const game = this.game;
        game.add.existing(this);
        game.physics.arcade.enable(this);

        const body = this.body;
        body.setCircle(this.radius);
        body.collideWorldBounds = true;
        body.immovable = true;
        // body.allowGravity = false;
        // body.allowRotation = false;
        // body.maxVelocity.set(200);
    }

    run() {
        const STATES = Player.STATES;
        const SPEED = Player.SPEED;
        const speed = {
            [STATES.OFF_BALL]: SPEED,
            [STATES.CONTROLLING]: SPEED * .8,
            [STATES.KICKING]: SPEED * .4
        }[this.state];

        this.game.physics.arcade.velocityFromRotation(
            this.rotation, speed, this.body.velocity
        );
    }

    stopRun() {
        this.body.velocity.set(0);
    }

    turnLeft() {
        this.body.angularVelocity = -Player.ANG_VEL;
    }

    turnRight() {
        this.body.angularVelocity = Player.ANG_VEL;
    }

    stopTurn() {
        this.body.angularVelocity = 0;
    }

    kick(ball) {
        const STATES = Player.STATES;
        if (this.state !== STATES.CONTROLLING) {
            return;
        }

        console.log('Player KICK');

        this.state = STATES.KICKING;

        ball.onKick(this.rotation, 300);
        this.game.time.events.add(
            Timer.SECOND * .2,
            () => {
                this.state = STATES.OFF_BALL;
            },
            this
        );
    }

    isOffBall(): boolean {
        return this.state === Player.STATES.OFF_BALL;
    }

    isKicking(): boolean {
        return this.state === Player.STATES.KICKING;
    }

    isControlling(): boolean {
        return this.state === Player.STATES.CONTROLLING;
    }

    beOffBall() {
        this.state = Player.STATES.OFF_BALL;
    }

    beControlling() {
        this.state = Player.STATES.CONTROLLING;
    }

    getFrontPosition(ball): {x: number, y: number} {
        const {game, rotation, body, x, y} = this;
        const delta = 0
        const distance = body.radius + ball.body.radius + delta;
        return {
            x: x + Math.cos(rotation) * distance,
            y: y + Math.sin(rotation) * distance
        };
    }

    isTeammateWith(player: Player): boolean {
        return this.team && player.team && this.team === player.team;
    }

    update() {
    }

    render() {
        this.game.debug.body(this);
    }
};
