video = "";
status = "";
objects = [];

function preload(){
    video = createCapture(VIDEO);
    video.hide();
}
function setup(){
    canvas = createCanvas(600,400);
    canvas.position(500,150);
    synth = window.speechSynthesis;
}
function draw(){
    image(video,0, 0,600, 400);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("object_found").innerHTML = objects[i].label + " found";
            fill('#FF0303');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "% ", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke('#FF0303');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);            
            object_name = objects[i].label;

            
    if(name_of_object = objects[i].label){
        utterThis = new SpeechSynthesisUtterance(name_of_object + " Found");
        synth.speak(utterThis);
        }
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

  
}
function modelLoaded(){
    status = true;
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;

}