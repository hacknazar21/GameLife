class Canvas {
    constructor({ a }) {
        this.a = a;
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.grid = new Array()
        document.body.insertAdjacentElement('afterbegin', this.canvas);
    }

    createGrid() {
        let i = 0;
        for (let x = 0; x < this.canvas.width; x += this.a) {
            let j = 0;
            this.grid.push(new Array())
            for (let y = 0; y < this.canvas.height; y += this.a) {
                this.grid[i][j] = {
                    x: x,
                    y: y,
                    isLife: false
                }
                j++;
            }
            i++;
        }
    }

    updateGrid({ x, y, isLife }) {
        if (isLife) {
            this.ctx.fillStyle = `rgb(${this.getNewRange(0, this.grid.length, 0, 255, x)} ${this.getNewRange(0, this.grid[0].length, 0, 255, y)} ${this.getNewRange(5, this.grid[0].length, 0, 255, x)})`
            this.ctx.fillRect(x, y, this.a, this.a)
        }
        else {
            this.ctx.clearRect(x, y, this.a, this.a)
        }
    }

    getNewRange(old_min, old_max, new_min, new_max, old) {
        const old_range = old_max - old_min;
        const new_range = new_max - new_min;
        return (((old - old_min) * new_range) / old_range) + new_min;
    }
}