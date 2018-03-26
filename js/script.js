timelineCircle=document.getElementById("timeline-circle");
volumeCircle=document.getElementById("volume-circle");
audio=document.querySelector("#mp3Now");
songPlayed=document.querySelector("#songPlayed");
songLength=document.querySelector("#songLength");
audio.volume=0.4;
audio.onplaying=audioOnPlaying;
audio.onpause=audioOnPause;
audio.onloadedmetadata=function(){
    
    songLength.innerHTML=secondToMin(audio.duration);
    songPlayed.innerHTML="0.00";
}
window.playing=false;
timelineCircle.onmousedown=function(){
    //document.onmousemove=timelineCircleMove;
}
document.onmouseup=function(){
    document.onmousemove=null;
}

//timelineCircle.parentElement.onclick=timelineClick;
timelineCircle.parentElement.onmousedown=timelineClick;
volumeCircle.parentElement.onmousedown=volumeClick;

function volumeCircleMove(e){
    e.stopPropagation();
    window.e=e;
    var oldMargin=parseInt(volumeCircle.style.marginLeft);
    if(oldMargin+e.movementX >=0 && oldMargin+e.movementX <=75){
        var tm=oldMargin+e.movementX;
        //audio.currentTime=audioCurrentTime(tm);
        audio.volume=Math.abs((tm / 80))
        volumeCircle.style.marginLeft=(tm)+"px";
    }

}
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
function volumeClick(e){
    console.log(audioCurrentTime(e.offsetX));
    volumeCircle.style.marginLeft=(e.offsetX-10)+"px";
    audio.volume=Math.abs((e.offsetX / 80))
    document.onmousemove=volumeCircleMove;
    
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
		var ii=i*4;
		childs[i].style.height=(freqData[ii]*3)+"px";
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

function changeSong(num,e){
    audio.src="mp3/music"+num+".mp3";
    var imgPath="img/songs/track_"+num;
    var t=trendingSongs[num];
    $("#currentSong").find("img").attr("src",imgPath);
    $("#currentSong").find(".cpi-title").text(t.title);
    audio.play();
    if($(".main-area .fa-pause").hasClass("fa-pause")){
        $(".main-area .fa-pause").addClass("fa-play")
        $(".main-area .fa-pause").removeClass("fa-pause");
    }
    $(e).find(".fa-play").addClass("fa-pause");
    if($("#play-pause").hasClass("fa-play")){
        $("#play-pause").toggleClass("fa-play");
        $("#play-pause").toggleClass("fa-pause");
    }
    
}
function audioOnPause(){
    window.playing=false;
    clearInterval(window.timeUpdateInterval);
    if(window.canEqulize){
        eqBox.style.display="none";
        clearInterval(window.equlizerInterval);
    }
    
}
function audioOnPlaying(){
    window.playing=true;
    window.timeUpdateInterval=setInterval(timeUpdated,500);
    if(window.canEqulize){
        window.equlizerInterval=setInterval(animate,33);
        setTimeout(function(){
            eqBox.style.display="block";
        },100);
    }
}
function secondToMin(sec){
    sec=Math.floor(sec);
    var min=Math.floor(sec/60);
    min+=(sec%60)/100;
    return min.toFixed(2);
}
function timeUpdated(){
    timelineCircle.style.marginLeft=Math.floor(timeToPx(audio.currentTime) -5)+"px";
    songPlayed.innerHTML=secondToMin(audio.currentTime);
    //console.log("playing");
}

function showPopup(id,per=30){
    $("#"+id).animate({top:per+"%"})
}
function hidePopup(id){
    $("#"+id).animate({top:"-200%"})
}

function validateSignup(frm){
    console.log("jhi");
    window.frm=frm;
    if(frm.name.value == ""){
        notie.error("Please Enter Full Name");
        return false;
    }
    else if(frm.username.value == ""){
        notie.error("Please Enter username");
        return false;
    }
    else if(frm.username.value.length < 8){
        notie.error("Username should not be less then 8 characters");
        return false;
    }
    else if(frm.email.value.indexOf("@")== -1 || frm.email.value.indexOf(".",frm.email.value.indexOf("@"))==-1||frm.email.value.indexOf("@") > frm.email.value.indexOf(".",frm.email.value.indexOf("@"))){
      notie.error("Enter valid email");
        return false;  
    }
    else if(frm.password.value == "" || frm.password.value.length < 8){
        notie.error("Password Must be atleast 8 characters long");
        return false;
    }
    else if(frm.password.value != frm.repassword.value){
        notie.error("Retype Password Do not match");
        return false;
    }
    else if(frm.dob.value == ""){
        notie.error("Enter Date of Birth");
        return false;
    }
    notie.success("Registeration Successful");
    hidePopup("signupPopup");
    $("#loginArea").hide();
    return false;
}
function validateLogin(frm){
    if(frm.username.value == ""){
        notie.error("Please Enter username");
        return false;
    }
    else if(frm.password.value == ""){
        notie.error("Please Enter password");
        return false;
    }
    notie.success("Login Successful");
    hidePopup("loginPopup");
    $("#loginArea").hide();
    return false;
}

function toggleCurrentPlaylist(){
    if($("#cpiContainer").height() <=10){
       $("#cpiContainer").animate({height:"500px"}); 
    }
    else{
        $("#cpiContainer").animate({height:"0px"}); 
    }
}