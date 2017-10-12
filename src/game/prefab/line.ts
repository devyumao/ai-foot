import {Game, Graphics, Sprite} from 'phaser';

export default class Line extends Sprite {
    static WIDTH: number = 6;
    relX: number;
    relY: number;
    color: number;

    constructor(
        game: Game,
        x: number, y: number,
        relX: number, relY: number,
        color: number = 0xffffff
    ) {
        super(game, x, y);
        this.relX = relX;
        this.relY = relY;
        this.color = color;

        this.init();
    }

    protected init() {
        const line = this.draw(this.relX, this.relY);
        
        this.loadTexture(line.generateTexture());
        this.game.add.existing(this);

        line.destroy();
    }

    protected draw(relX: number, relY: number): Graphics {
        const line = this.game.add.graphics(0, 0);

        line.beginFill(this.color);
        line.drawRect(0, 0, relX || Line.WIDTH, relY || Line.WIDTH);
        line.endFill();

        return line;
    }
};
