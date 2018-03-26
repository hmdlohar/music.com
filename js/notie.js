window.notie={
	success: function(msg,time=2000){
		notiePopup.innerHTML=msg;
		notiePopup.style.top="0px";
		notiePopup.style.backgroundColor="green";
		setTimeout(function(){
			notiePopup.style.top="-70px";
		},time);
	},
	error: function(msg,time=2000){
		notiePopup.innerHTML=msg;
		notiePopup.style.top="0px";
		notiePopup.style.backgroundColor="red";
		setTimeout(function(){
			notiePopup.style.top="-70px";
		},time);
	}
}

document.write(`
	<div id="notiePopup" style="height:40px;width:100%;position: fixed;top:-80px;left:0px;background: green;color:white;z-index:20;transition: top 0.3s;font-size:35px;text-align:center;font-weight:bold;padding:10px;">hello</div>
`);
window.notiePopup=document.getElementById("notiePopup");