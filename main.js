song = "";
coffin_dance_bna = 0;
coffin_dance_dan = 0;
bna_kobji_x = 0;
dan_kobji_x = 0;
bna_kobji_y = 0;
dan_kobji_y = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    kagoj = createCanvas(600, 500)
    kagoj.position(370, 200);

    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('red');
    if (coffin_dance_bna > 0.2) {
        circle(bna_kobji_x, bna_kobji_y, 20);
        volume = floor(Number(bna_kobji_y)) / 500;
        console.log(volume);
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "VOLUME = " + volume;

    }
    fill('gray');
    stroke('gray');
    if (coffin_dance_dan > 0.2) {
        circle(dan_kobji_x, dan_kobji_y, 20);
        if (dan_kobji_y > 0 && dan_kobji_y <= 50) {
            document.getElementById("speed").innerHTML = "SPEED = 0.25x";
            song.rate(0.25);
        } else if (dan_kobji_y > 50 && dan_kobji_y <= 100) {
            document.getElementById("speed").innerHTML = "SPEED = 0.5x";
            song.rate(0.5);
        } else if (dan_kobji_y > 100 && dan_kobji_y <= 150) {
            document.getElementById("speed").innerHTML = "SPEED = 0.75x";
            song.rate(0.75);
        } else if (dan_kobji_y > 150 && dan_kobji_y <= 200) {
            document.getElementById("speed").innerHTML = "SPEED = 1.0x";
            song.rate(1);
        } else if (dan_kobji_y > 200 && dan_kobji_y <= 250) {
            document.getElementById("speed").innerHTML = "SPEED = 1.25x";
            song.rate(1.25);
        } else if (dan_kobji_y > 250 && dan_kobji_y <= 300) {
            document.getElementById("speed").innerHTML = "SPEED = 1.5x";
            song.rate(1.5);
        } else if (dan_kobji_y > 300 && dan_kobji_y <= 350) {
            document.getElementById("speed").innerHTML = "SPEED = 1.75x";
            song.rate(1.75);
        } else if (dan_kobji_y > 350) {
            document.getElementById("speed").innerHTML = "SPEED = 2.0x";
            song.rate(2);
        }
    }

}

function gan_bajao() {
    song.play();
    song.setVolume(0.5);
    song.rate(1)
}

function modelLoaded() {
    console.log("poseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        bna_kobji_x = results[0].pose.leftWrist.x;
        bna_kobji_y = results[0].pose.leftWrist.y;
        dan_kobji_y = results[0].pose.rightWrist.y;
        dan_kobji_x = results[0].pose.rightWrist.x;
        coffin_dance_bna = results[0].pose.keypoints[9].score;
        coffin_dance_dan = results[0].pose.keypoints[10].score;
        console.log(bna_kobji_x, bna_kobji_y, dan_kobji_x, dan_kobji_y, coffin_dance_bna, coffin_dance_dan);
    }
}