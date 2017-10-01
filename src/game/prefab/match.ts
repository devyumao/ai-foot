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

    init() {
        const game = this.game;

        // FIXME: put into play
        this.ball = new Ball(game, game.width / 2, game.height / 2);
        this.home = new Team(game, 'home-kit', 3);
    }

    update() {
        const {game, home, ball} = this;

        home.update();
        ball.update();

        home.forEach(
            player => {
                if (!player.isKicking()) {
                    game.physics.arcade.collide(
                        player,
                        ball,
                        () => {
                            player.onColideWithBall();
                            this.ballBy = player;
                            ball.onColideWithPlayer();
                        }
                    );
                }
            },
            this
        );

        if (this.ballBy && this.ballBy.isControlling()) {
            ball.moveToPlayerFront(this.ballBy);
        }
    }

    render() {
        this.ball.render();
        this.home.render();
    }
};
