timelineCircle=document.getElementById("timeline-circle");
timelineCircle.onmousedown=function(){
    document.onmousemove=timelineCircleMove;
}
document.onmouseup=function(){
    document.onmousemove=null;
}
function timelineCircleMove(e){
    window.e=e;
    var oldMargin=parseInt(timelineCircle.style.marginLeft);
    if(oldMargin+e.movementX >=-2 && oldMargin+e.movementX <=400){
        timelineCircle.style.marginLeft=(oldMargin+e.movementX)+"px";
        audio.currentTime=oldMargin+e.movementX;
    }

}
audio=document.querySelector("#music1");
audio.volume=0.2;
audio.onplaying=audioOnPlaying;
audio.ontimeupdate=audioOnPlay;
audio.onpause=audioOnPause;
window.playing=false;

/* equlizer codes */
childs=document.querySelectorAll(".eqBox .child");
eqBox=document.querySelectorAll(".eqBox")[0];
window.canEqulize=true;
var isChrome = !!window.chrome && !!window.chrome.webstore;
try{
    if(isChrome && !location.protocol=="file:"){
        window.canEqulize=false;
    }
    else{
        audioContext = new AudioContext();
        source = audioContext.createMediaElementSource(audio);
        analyser = audioContext.createAnalyser();
        analyser.fftSize=512;
        source.connect(analyser);
        analyser.connect(audioContext.destination);
    }
}
catch(e){
    console.log(e);
}



function animate(){
	var freqData = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(freqData);
	for(i=0;i<32;i++){
		var ii=i*8;
		childs[i].style.height=(freqData[ii]/2)+"px";
	}
}
/* equlizer codes */

$("#play-pause").click(function(){
    $(this).toggleClass("fa-play");
    $(this).toggleClass("fa-pause");
    togglePlay();
});
function togglePlay(){
    if(window.playing){
        audio.pause();
    }
    else{
        audio.play();
    }
}
function audioOnPause(){
    window.playing=false;
    if(window.canEqulize){
        eqBox.style.visibility="hidden";
        clearInterval(window.equlizerInterval);
    }
    
}
function audioOnPlaying(){
    window.playing=true;
    if(window.canEqulize){
        window.equlizerInterval=setInterval(animate,33);
        setTimeout(function(){
            eqBox.style.visibility="visible";
        },100);
    }
}
function audioOnPlay(){
    timelineCircle.style.marginLeft=Math.floor(audio.currentTime)+"px";
    
    //console.log("playing");
}