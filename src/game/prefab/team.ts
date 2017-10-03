import {Game, Group} from 'phaser';

import Player from './player';
import Match from './Match';

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
        // this.enableBody = true;
        // this.physicsBodyType = Phaser.Physics.ARCADE;

        for (let i = 0; i < size; ++i) {
            this.add(new Player(game, 500, 300 + i * 100, kit, this));
        }
    }

    embattle(match: Match) {
        const baseX = this.isHome(match) ? 500 : this.game.width - 500;
        const baseY = 300;

        this.children.forEach((player: Player, index: number) => {
            player.x = baseX;
            player.y = baseY + index * 100;
        });
        
        this.setAll('angle', this.isHome(match) ? 0 : -180);
    }

    isHome(match: Match): boolean {
        return this === match.home;
    }

    isAway(match: Match): boolean {
        return this === match.away;
    }

    setImmovable(value: boolean) {
        this.setAll('body.immovable', value);
    }

    update() {
        this.callAll('update', null);

        this.setImmovable(false);
        this.game.physics.arcade.collide(this);
        this.setImmovable(true);
    }

    render() {
        this.callAll('render', null);
    }
};
