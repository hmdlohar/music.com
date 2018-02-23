timelineCircle=document.getElementById("timeline-circle");
audio=document.querySelector("#music1");
audio.volume=0.2;
audio.onplaying=audioOnPlaying;
audio.onpause=audioOnPause;
window.playing=false;
timelineCircle.onmousedown=function(){
    //document.onmousemove=timelineCircleMove;
}
document.onmouseup=function(){
    document.onmousemove=null;
}
//timelineCircle.parentElement.onclick=timelineClick;
timelineCircle.parentElement.onmousedown=timelineClick;
function timelineCircleMove(e){
    e.stopPropagation();
    window.e=e;
    var oldMargin=parseInt(timelineCircle.style.marginLeft);
    if(oldMargin+e.movementX >=-2 && oldMargin+e.movementX <=400){
        var tm=oldMargin+e.movementX;
        //audio.currentTime=audioCurrentTime(tm);
        console.log(audioCurrentTime(tm)+"->"+tm);
        audio.currentTime=audioCurrentTime(tm);
        timelineCircle.style.marginLeft=(tm)+"px";
    }

}
function timelineClick(e){
    console.log(audioCurrentTime(e.offsetX));
    timelineCircle.style.marginLeft=(e.offsetX-10)+"px";
    audio.currentTime=audioCurrentTime(e.offsetX);
    document.onmousemove=timelineCircleMove;
    
}
function audioCurrentTime(px){
    var tLen=400;
    return Math.floor(px/tLen * audio.duration);
}
function timeToPx(tm){
    var tLen=400;
    return Math.floor(tm/ audio.duration * tLen);
}


/* equlizer codes */
childs=document.querySelectorAll(".eqBox .child");
eqBox=document.querySelectorAll(".eqBox")[0];
window.canEqulize=true;
var isChrome = !!window.chrome && !!window.chrome.webstore;
try{
    if(isChrome && location.protocol=="file:"){
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
    clearInterval(window.timeUpdateInterval);
    if(window.canEqulize){
        eqBox.style.visibility="hidden";
        clearInterval(window.equlizerInterval);
    }
    
}
function audioOnPlaying(){
    window.playing=true;
    window.timeUpdateInterval=setInterval(timeUpdated,1000);
    if(window.canEqulize){
        window.equlizerInterval=setInterval(animate,33);
        setTimeout(function(){
            eqBox.style.visibility="visible";
        },100);
    }
}

function timeUpdated(){
    timelineCircle.style.marginLeft=Math.floor(timeToPx(audio.currentTime) -5)+"px";
    //console.log("playing");
}