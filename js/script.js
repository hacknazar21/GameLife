function getRandomBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}


window.onload = () => {
    const canvas = new Canvas({ a: 12 });
    canvas.createGrid();
    let i, j;

    /* i = Math.floor((canvas.grid.length - 1) / 2)
    j = Math.floor((canvas.grid[0].length - 1) / 2)
    canvas.grid[i][j].isLife = true;
    canvas.updateGrid(canvas.grid[i][j]) */

    /* i = Math.floor((canvas.grid.length - 1) / 2) - 1
    j = Math.floor((canvas.grid[0].length - 1) / 2)
    canvas.grid[i][j].isLife = true;
    canvas.updateGrid(canvas.grid[i][j])

    i = Math.floor((canvas.grid.length - 1) / 2) - 2
    j = Math.floor((canvas.grid[0].length - 1) / 2)
    canvas.grid[i][j].isLife = true;
    canvas.updateGrid(canvas.grid[i][j])

    i = Math.floor((canvas.grid.length - 1) / 2) - 3
    j = Math.floor((canvas.grid[0].length - 1) / 2)
    canvas.grid[i][j].isLife = true;
    canvas.updateGrid(canvas.grid[i][j]) */

    const colors = ['isBlue', 'isGreen', 'isRed']

    for (let index = 0; index < 40000; index++) {
        i = getRandomBetween(0, canvas.grid.length - 1)
        j = getRandomBetween(0, canvas.grid[0].length - 1)
        const randColor = getRandomBetween(0, colors.length - 1)
        if (colors[randColor] == 'isBlue')
            canvas.grid[i][j].isBlue = true
        else if (colors[randColor] == 'isGreen')
            canvas.grid[i][j].isGreen = true
        else if (colors[randColor] == 'isRed')
            canvas.grid[i][j].isRed = true
        canvas.updateGrid(canvas.grid[i][j])
    }

    start_animate(40, canvas);
}


function start_animate(duration, canvas) {
    var requestID;
    var startTime = null;
    var animate = function (time) {
        time = new Date().getTime(); //millisecond-timstamp
        if (startTime === null) {
            startTime = time;
        }
        var progress = time - startTime;

        startTime++;

        if (progress > duration) {
            getRules(canvas)
            requestID = requestAnimationFrame(animate);
            startTime = null;
        }
        else {
            cancelAnimationFrame(requestID);
        }
        requestID = requestAnimationFrame(animate);
    }
    animate();
}

function getRules(canvas) {
    const redGreen = [], greenBlue = [], blueRed = [];

    canvas.grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            let counterBlue = 0, counterGreen = 0, counterRed = 0;
            if (y - 1 > 0 && canvas.grid[y - 1][x].isBlue) counterBlue++;
            else if (y - 1 > 0 && canvas.grid[y - 1][x].isGreen) counterGreen++;
            else if (y - 1 > 0 && canvas.grid[y - 1][x].isRed) counterRed++;

            if (x - 1 > 0 && canvas.grid[y][x - 1].isBlue) counterBlue++;
            else if (x - 1 > 0 && canvas.grid[y][x - 1].isGreen) counterGreen++;
            else if (x - 1 > 0 && canvas.grid[y][x - 1].isRed) counterRed++;

            if (y + 1 < canvas.grid.length && canvas.grid[y + 1][x].isBlue) counterBlue++;
            else if (y + 1 < canvas.grid.length && canvas.grid[y + 1][x].isGreen) counterGreen++;
            else if (y + 1 < canvas.grid.length && canvas.grid[y + 1][x].isRed) counterRed++;

            if (x + 1 < canvas.grid[0].length && canvas.grid[y][x + 1].isBlue) counterBlue++;
            else if (x + 1 < canvas.grid[0].length && canvas.grid[y][x + 1].isGreen) counterGreen++;
            else if (x + 1 < canvas.grid[0].length && canvas.grid[y][x + 1].isRed) counterRed++;


            if (y - 1 > 0 && x - 1 > 0 && canvas.grid[y - 1][x - 1].isBlue) counterBlue++;
            else if (y - 1 > 0 && x - 1 > 0 && canvas.grid[y - 1][x - 1].isGreen) counterGreen++;
            else if (y - 1 > 0 && x - 1 > 0 && canvas.grid[y - 1][x - 1].isRed) counterRed++;

            if (y + 1 < canvas.grid.length && x + 1 < canvas.grid[0].length && canvas.grid[y + 1][x + 1].isBlue) counterBlue++;
            else if (y + 1 < canvas.grid.length && x + 1 < canvas.grid[0].length && canvas.grid[y + 1][x + 1].isGreen) counterGreen++;
            else if (y + 1 < canvas.grid.length && x + 1 < canvas.grid[0].length && canvas.grid[y + 1][x + 1].isRed) counterRed++;

            if (y - 1 > 0 && x + 1 < canvas.grid[0].length && canvas.grid[y - 1][x + 1].isBlue) counterBlue++;
            else if (y - 1 > 0 && x + 1 < canvas.grid[0].length && canvas.grid[y - 1][x + 1].isGreen) counterGreen++;
            else if (y - 1 > 0 && x + 1 < canvas.grid[0].length && canvas.grid[y - 1][x + 1].isRed) counterRed++;

            if (y + 1 < canvas.grid.length && x - 1 > 0 && canvas.grid[y + 1][x - 1].isBlue) counterBlue++;
            else if (y + 1 < canvas.grid.length && x - 1 > 0 && canvas.grid[y + 1][x - 1].isGreen) counterGreen++;
            else if (y + 1 < canvas.grid.length && x - 1 > 0 && canvas.grid[y + 1][x - 1].isRed) counterRed++;

            if (cell.isRed) {
                if (counterGreen >= 2) redGreen.push(cell)
            }
            else if (cell.isGreen) {
                if (counterBlue >= 2) greenBlue.push(cell)
            }
            else if (cell.isBlue) {
                if (counterRed >= 2) blueRed.push(cell)
            }
        })
    });

    for (const cell of redGreen) {
        cell.isRed = false;
        cell.isGreen = true;
        canvas.updateGrid(cell)
    }
    for (const cell of greenBlue) {
        cell.isGreen = false;
        cell.isBlue = true;
        canvas.updateGrid(cell)
    }
    for (const cell of blueRed) {
        cell.isBlue = false;
        cell.isRed = true;
        canvas.updateGrid(cell)
    }

}