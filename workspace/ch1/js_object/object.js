let game = {
    startTime: null,
    displayArea: document.getElementById('display-area')
};

function start() {
    game.startTime = Date.now();
    document.body.onkeydown = stop;
    console.log('started');
}

function stop() {
    let currentTime = Date.now();
    let seconds = (currentTime - game.startTime) / 1000;
    if (9.5 <= seconds && seconds <= 10.5) {
        game.displayArea.innerText = seconds + ' seconds. Nice!';
    } else {
        game.displayArea.innerText = seconds + ' seconds. Next time!';
    }
    console.log('stopped');
}

if (confirm('Press okay if you think 10 seconds passed')) {
    start();
}