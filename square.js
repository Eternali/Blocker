class Square {

	constructor (i, j, size) {
        this.coord = { i: i, j: j };
        this.pos = { x: j * size + size/2, y: i * size + size/2 };
        this.size = size;
        this.outside = 0;  // border color
        this.inside = 100;  // inner color
        this.elasticity = 0.25;  // when a block collides, this is the bounce-back force.
    }

    draw () {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(this.outside);
        fill(this.inside);
        rect(0, 0, this.size, this.size);
        pop();
    }

}