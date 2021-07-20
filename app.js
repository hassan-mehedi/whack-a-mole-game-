const moles = document.getElementsByClassName("mole");
const mole_img = document.getElementsByClassName("mole_img");
const mode = document.getElementsByClassName("mode")[0];
const holes = document.getElementsByClassName("holes")[0];
const timeLeft = document.querySelector(".time-left");
const highest_score = document.querySelector(".high-score");
const scoreElement = document.querySelector(".score");
const msgElement = document.querySelector(".msg");
const replayElement = document.querySelector(".replay");
const load = document.querySelector(".load");
const start = document.getElementById("start");
const hard = document.getElementById("hard");
const medium = document.getElementById("medium");
const easy = document.getElementById("easy");
const home = document.getElementById("home");
const exit = document.getElementById("exit"); //Not being used
let counter;

let time, mole;
let count;
let flag = false;
let score = 0;
let least, max;
let msg = "Hurray! You have demolished the moles";
let max_score = localStorage.getItem("highest_score") || 0;

highest_score.innerText = `Highest Score: ${max_score}`;

setTimeout(() => {
    load.style.display = "none";
    mode.style.display = "flex";
}, 2000);

function up(least, max) {
    time = Math.floor(Math.random() * max + least);
    mole = Math.floor(Math.random() * moles.length);
    moles[mole].style.pointerEvents = "auto";
    moles[mole].classList.add("up");
    setTimeout(() => {
        moles[mole].classList.remove("up");
        mole_img[mole].src = "https://i.ibb.co/dfJzYwd/mole-not-hit.png";
        if (flag !== true) {
            up(least, max);
        }
    }, time);
}

function modeSelected(l, m, c) {
    least = l;
    max = m;
    count = c;
    counter = c;
    mode.style.display = "none";
    start.style.display = "block";
    highest_score.style.display = "block";
    timeLeft.style.display = "block";
    scoreElement.style.display = "block";
    holes.style.display = "block";
    timeLeft.innerText = `Time Left: ${count}s`;
}

hard.addEventListener("click", () => {
    modeSelected(500, 500, 20);
});

medium.addEventListener("click", () => {
    modeSelected(1000, 500, 25);
});

easy.addEventListener("click", () => {
    modeSelected(1000, 1000, 30);
});

function startTheGame() {
    holes.style.display = "block";
    up(least, max);
    let checker = setInterval(() => {
        count -= 1;
        if (count > 0) {
            timeLeft.innerText = `Time Left: ${count}s`;
        } else {
            timeLeft.innerText = `Time Left: ${count}s`;
            flag = true;
            if (score > max_score) {
                msg = "Hurray! You achieved the higest score";
                localStorage.setItem("highest_score", score);
                max_score = score;
                highest_score.innerText = `Highest Score: ${max_score}`;
            }
            clearInterval(checker);
            over();
        }
    }, 1000);
}

start.addEventListener("click", () => {
    start.style.display = "none";
    startTheGame();
});

function over() {
    holes.style.display = "none";

    msgElement.style.display = "block";
    msgElement.innerText = msg;
    replayElement.style.display = "block";
    home.style.display = "block";
    exit.style.display = "block";
}

replayElement.addEventListener("click", () => {
    msgElement.style.display = "none";
    replayElement.style.display = "none";
    home.style.display = "none";
    exit.style.display = "none";
    count = counter;
    flag = false;
    score = 0;
    startTheGame();
});

home.addEventListener("click", () => {
    msgElement.style.display = "none";
    replayElement.style.display = "none";
    home.style.display = "none";
    exit.style.display = "none";
    flag = false;
    score = 0;
    scoreElement.innerText = `Score: ${score}`;
    mode.style.display = "flex";
});

for (let i = 0; i < moles.length; i++) {
    moles[i].addEventListener("click", () => {
        score += 1;
        mole_img[i].src = "https://i.ibb.co/bgsLTsZ/mole-hit.png";
        scoreElement.innerText = `Score: ${score}`;
        moles[i].style.pointerEvents = "none";
    });
}
