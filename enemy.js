class Enemy extends Block {

    constructor (color, size, startX) {
        this.color = color;
        this.size = size;
        this.coord = { x: startX, y: 0 };
        this.vel = { x: 0, y: 0 };
    }

    update (blocks, gravity) {
        this.coord.x += this.vel.x;
        this.coord.y += this.vel.y;
        this.vel.y += gravity;

        // collision detection
        for (b in blocks)
            switch (blocks[b].collide(this)) {
                case 0:  // left-right collision
                    this.vel.x = -this.vel.x;
                    break;
                case 1:  // top-bottom collision
                    this.vel.y = -this.vel.y;
                    break;
            }

    }

    draw () {
        push();
        translate(this.coord.x, this.coord.y);
        stroke(150);
        fill(this.color);
        rect(0, 0,  this.size, this.size);
        pop();
    }

}
