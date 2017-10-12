import {Game, Group} from 'phaser';

import Line from './Line';
import Sideline from './sideline';
import Endline from './endline';
import Goal from './Goal';
import Ball from './Ball';
import Team from './Team';

const GOAL_WIDTH = 200;

export default class Pitch {
    static WIDTH: number = 1150;
    static HEIGHT: number = 736;
    private game: Game;
    border: Group;
    sideline: Sideline;
    endline: Endline;
    leftGoal: Goal;
    rightGoal: Goal;

    constructor(game: Game) {
        this.game = game;

        this.init();
    }

    private init() {
        const game = this.game;

        this.sideline = new Sideline(game);
        this.endline = new Endline(game);

        this.leftGoal = new Goal(game, (game.width - Pitch.WIDTH) * .5, game.height * .5);
        this.rightGoal = new Goal(game, (game.width + Pitch.WIDTH) * .5, game.height * .5, true);
        
        this.initBorder();
    }

    private initBorder() {
        const border = this.game.add.physicsGroup();
        border.addMultiple([this.sideline, this.endline, this.leftGoal, this.rightGoal]);
        border.forEach(
            (item: Group) => item.setAll('body.immovable', true),
            this
        );
        this.border = border;
    }

    checkBorderVsBall(ball: Ball) {
        this.border.forEach(
            (item: Group) => this.game.physics.arcade.collide(item, ball),
            this
        );
    }

    checkBorderVsTeam(team: Team) {
        team.setImmovable(false);
        this.border.forEach(
            (item: Group) => this.game.physics.arcade.collide(item, team),
            this
        );
        team.setImmovable(false);
    }
};
