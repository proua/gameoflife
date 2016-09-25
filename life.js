/**
 * Created by sergey on 9/25/16.
 */

var Life = function () {
    //canvas
    var canvas = document.getElementById('lifeCanvas').getContext('2d');
    //cells array
    var cells = [];
    //canvas color styles
    canvas.strokeStyle = '#cccccc';
    canvas.fillStyle = 'blue';

    //draw timer
    var timer = null;

    //draw cells
    var draw = function update() {

        var result = [];

        var countNeighbours = function countNeighbours(x, y) {
            var amount = 0;

            var isFilled = function isFilled(x, y) {
                return cells[ x ] && cells[ x ][ y ];
            }

            if (isFilled(x - 1, y - 1)) amount++;
            if (isFilled(x, y - 1)) amount++;
            if (isFilled(x + 1, y - 1)) amount++;
            if (isFilled(x - 1, y)) amount++;
            if (isFilled(x + 1, y)) amount++;
            if (isFilled(x - 1, y + 1)) amount++;
            if (isFilled(x, y + 1)) amount++;
            if (isFilled(x + 1, y + 1)) amount++;

            return amount;
        }

        cells.forEach(function (row, x) {
            result[ x ] = [];

            row.forEach(function (cell, y) {
                var alive = 0
                var count = countNeighbours(x, y);

                if (cell > 0) {
                    alive = count === 2 || count === 3 ? 1 : 0;
                } else {
                    alive = count === 3 ? 1 : 0;
                }

                result[ x ][ y ] = alive;
            });
        });

        cells = result;

        canvas.clearRect(0, 0, 800, 800);
        cells.forEach(function (row, x) {
            row.forEach(function (cell, y) {
                canvas.beginPath();
                canvas.rect(x * 10, y * 10, 10, 10);
                if (cell) {
                    canvas.fill();
                } else {
                    canvas.stroke();
                }
            });
        });
        timer = step();
    };

    //init cells
    var init = function init() {
        for (var i = 0; i < 64; i++) {
            cells[ i ] = [];
            for (var j = 0; j < 64; j++) {
                cells[ i ][ j ] = 0;
            }
        }

        var getRandomInt = function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };


        for (var i = 200; i <= 500; i++) {
            var randomX = getRandomInt(0, 64);
            var randomY = getRandomInt(0, 64);
            cells[ randomX ] [ randomY ] = 1;
        }

        draw();
    };

    var fps = 100;
    //return drawing timer
    var step = function step() {
        return setTimeout(function() {
            requestAnimationFrame(draw);
        }, 10000 / fps);
    };

    //play game
    var play = function play() {
        draw();
    };

    //stop game
    var stop = function update() {
        clearTimeout(timer);
    };

    init();

    //public interface
    return {
        play: play,
        stop: stop
    }
}
