define(["require", "exports"], function(require, exports) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.clone = function () {
            return new Point(this.x, this.y);
        };

        Point.prototype.add = function (p) {
            this.x += p.x;
            this.y += p.y;

            return this;
        };

        Point.prototype.sub = function (p) {
            this.x -= p.x;
            this.y -= p.y;

            return this;
        };

        //Reduces magnitudes of x and y to 1
        Point.prototype.toUnit = function () {
            if (this.x != 0) {
                this.x = this.x / Math.abs(this.x);
            }

            if (this.y != 0) {
                this.y = this.y / Math.abs(this.y);
            }

            return this;
        };

        Point.prototype.equals = function (p) {
            return this.x == p.x && this.y == p.y;
        };

        Point.prototype.toString = function () {
            return "(" + this.x + ", " + this.y + ")";
        };
        return Point;
    })();

    
    return Point;
});
