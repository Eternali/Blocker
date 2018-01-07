class Square {

	constructor (i, j, size) {
        this.coord = { i: i, j: j };
        this.pos = { x: j * size + size/2, y: i * size + size/2 };
        this.size = size;
        this.outside = 0;  // border color
        this.inside = 100;  // inner color
        this.angle = 0;
    }

    draw () {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        stroke(this.outside);
        fill(this.inside);
        rect(0, 0, this.size, this.size);
        pop();
    }

}