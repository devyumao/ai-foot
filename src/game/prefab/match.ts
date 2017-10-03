import {Game, Group} from 'phaser';

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
    teams: Group;
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
        this.away = new Team(game, 'away-kit', 3);
        this.teams = game.add.group();
        this.teams.addMultiple([this.home, this.away]);
        
        this.embattle();
    }

    private embattle() {
        this.teams.callAll('embattle', null, this);
    }

    private onPlayerCollideBall(player: Player, ball: Ball) {
        if ((!this.ballBy || !player.isTeammateWith(this.ballBy)) && player.isOffBall()) {
            player.beControlling();
            this.ballBy = player;
        }
    }

    private checkPlayerVsBall(player: Player) {
        if (!player.isKicking()) {
            this.game.physics.arcade.collide(player, this.ball, this.onPlayerCollideBall, null, this);
        }
    }

    private checkTeamVsBall(team: Team) {
        team.forEach(this.checkPlayerVsBall, this);
    }

    private checkHomeVsAway() {
        const {game, home, away} = this;
        game.physics.arcade.collide(home, away);
    }

    private checkBallControlled() {
        const {ballBy, ball} = this;
        if (ballBy) {
            if (ballBy.isControlling()) {
                ball.moveToPlayerFront(ballBy);
            }
            else {
                this.ballBy = null;
            }
        }
    }

    update() {
        const {home, away, ball, teams} = this;

        teams.callAll('update', null);
        ball.update();

        teams.callAll('setImmovable', null, false);
        this.checkHomeVsAway();
        teams.callAll('setImmovable', null, true);

        this.checkTeamVsBall(home);
        this.checkTeamVsBall(away);
        

        this.checkBallControlled();
    }

    render() {
        this.ball.render();
        this.home.render();
        this.away.render();
    }
};
