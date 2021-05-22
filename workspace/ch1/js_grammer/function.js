let myBirthTime = new Date(1998, 9, 12, 10, 10);

function updateParagraph() {
    let now = new Date();
    let seconds = (now.getTime() -  myBirthTime.getTime()) / 1000;
    document.getElementById('birth-time').innerText = 
        seconds + 'seconds has passed since I was born'; 
}

setInterval(updateParagraph, 50);