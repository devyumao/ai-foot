import {Game} from 'phaser';

import Pitch from './pitch';
import Team from './team';
import Ball from './Ball';
import Player from './Player';

export default class Match {
    private game: Game;
    pitch: Pitch;
    home: Team;
    away: Team;
    ball: Ball;
    homeScore: number = 0;
    awayScore: number = 0;
    ballBy: Player;

    constructor(game: Game) {
        this.game = game;

        this.init();
    }

    private init() {
        const game = this.game;

        // FIXME: put into play
        this.ball = new Ball(game, game.width / 2, game.height / 2);
        this.home = new Team(game, 'home-kit', 3);
        this.away = new Team(game, 'home-kit', 3);
        
        this.embattle();
    }

    private embattle() {
        this.home.embattle(this);
        this.away.embattle(this);
    }

    private checkTeamVsBall(team: Team) {
        team.forEach((player: Player) => {
            if (!player.isKicking()) {
                this.game.physics.arcade.collide(
                    player,
                    this.ball,
                    () => {
                        if ((!this.ballBy || !player.isTeammateWith(this.ballBy)) && player.isOffBall()) {
                            player.beControlling();
                            this.ballBy = player;
                        }
                    }
                );
            }
        }, this);
    }

    private checkHomeVsAway() {
        this.game.physics.arcade.overlap(this.home, this.away);
    }

    update() {
        const {home, away, ball} = this;

        home.update();
        away.update();
        ball.update();

        this.checkHomeVsAway();
        this.checkTeamVsBall(home);
        this.checkTeamVsBall(away);

        const ballBy = this.ballBy;
        if (ballBy) {
            if (ballBy.isControlling()) {
                ball.moveToPlayerFront(ballBy);
            }
            else {
                this.ballBy = null;
            }
        }
    }

    render() {
        this.ball.render();
        this.home.render();
        this.away.render();
    }
};
