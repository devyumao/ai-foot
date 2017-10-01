import {Game, Group} from 'phaser';

import Player from './player';

export default class Team extends Group {
    size: number;
    kit: string;
    gkKit: string;

    constructor(game: Game, kit: string, size: number) {
        super(game);
        this.size = size;
        this.kit = kit;

        this.init();
    }

    init() {
        const {game, size, kit} = this;
        
        game.add.existing(this);
        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;

        for (let i = 0; i < size; ++i) {
            this.add(new Player(game, 500, 400 + i * 100, kit));
        }
    }

    update() {
        this.forEach(player => player.update(), this);

        this.setAll('body.immovable', false);
        this.game.physics.arcade.collide(this);
        this.setAll('body.immovable', true);
    }

    render() {
        this.forEach(player => player.render(), this);
    }
};
