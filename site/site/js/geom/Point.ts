class Point {
    constructor(public x: number, public y: number) { }

    public clone() {
        return new Point(this.x, this.y);
    }

    public add(p: Point) {
        this.x += p.x;
        this.y += p.y;

        return this;
    }

    public sub(p: Point) {
        this.x -= p.x;
        this.y -= p.y;

        return this;
    }

    //Reduces magnitudes of x and y to 1
    public toUnit() {
        if (this.x != 0) {
            this.x = this.x / Math.abs(this.x);
        }

        if (this.y != 0) {
            this.y = this.y / Math.abs(this.y);
        }

        return this;
    }

    public equals(p: Point) {
        return this.x == p.x && this.y == p.y;
    }

    public toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}

export = Point;