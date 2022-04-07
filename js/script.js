function getRandomBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}


window.onload = () => {
    const canvas = new Canvas({ a: 2 });
    canvas.createGrid();

    let i, j;

    i = Math.floor((canvas.grid.length - 1) / 2)
    j = Math.floor((canvas.grid[0].length - 1) / 2)
    canvas.grid[i][j].isLife = true;
    canvas.updateGrid(canvas.grid[i][j])

    /* i = Math.floor((canvas.grid.length - 1) / 2) - 1
    j = Math.floor((canvas.grid[0].length - 1) / 2)
    canvas.grid[i][j].isLife = true;
    canvas.updateGrid(canvas.grid[i][j])
    i = Math.floor((canvas.grid.length - 1) / 2) - 2
    j = Math.floor((canvas.grid[0].length - 1) / 2) */
    canvas.grid[i][j].isLife = true;
    canvas.updateGrid(canvas.grid[i][j])
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
    const forDie = []
    const forLife = []

    canvas.grid.forEach((row, indexrow) => {
        row.forEach((cell, indexcell) => {
            let counterLife = 0;
            if (indexrow - 1 > 0 && canvas.grid[indexrow - 1][indexcell].isLife) counterLife++;
            if (indexcell - 1 > 0 && canvas.grid[indexrow][indexcell - 1].isLife) counterLife++;
            if (indexrow - 1 > 0 && indexcell - 1 > 0 && canvas.grid[indexrow - 1][indexcell - 1].isLife) counterLife++;
            if (indexrow + 1 < canvas.grid.length && canvas.grid[indexrow + 1][indexcell].isLife) counterLife++;
            if (indexcell + 1 < canvas.grid[0].length && canvas.grid[indexrow][indexcell + 1].isLife) counterLife++;
            if (indexrow + 1 < canvas.grid.length && indexcell + 1 < canvas.grid[0].length && canvas.grid[indexrow + 1][indexcell + 1].isLife) counterLife++;
            if (indexrow - 1 > 0 && indexcell + 1 < canvas.grid[0].length && canvas.grid[indexrow - 1][indexcell + 1].isLife) counterLife++;
            if (indexrow + 1 < canvas.grid.length && indexcell - 1 > 0 && canvas.grid[indexrow + 1][indexcell - 1].isLife) counterLife++;
            if (cell.isLife) {
                /* if (counterLife < 2 || counterLife > 3) forDie.push(cell) */
            }
            else {
                if (counterLife == 1) forLife.push(cell)
            }
        })
    });

    for (const cell of forDie) {
        cell.isLife = false
        canvas.updateGrid(cell)
    }
    for (const cell of forLife) {
        cell.isLife = true
        canvas.updateGrid(cell)
    }
}