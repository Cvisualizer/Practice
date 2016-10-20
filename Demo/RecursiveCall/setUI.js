if(window.localStorage.getItem("code")!=undefined){
	editor.setValue(window.localStorage.getItem("code"));
}
setOp(1);

$(function(){ 
    $(".execButton").mousedown(function(){  
        document.getElementById('exec').style.backgroundColor = '#6b3f31';
        document.getElementById('execText').style.color = '#aaa';
    });
    $(".execButton").mouseup(function(){  
        window.localStorage.setItem("code",editor.getValue());
        if(slide==false){
        	setSlide(true);
    	}
        play();
    });
    $(".body").mouseup(function(){ 
    	document.getElementById('exec').style.backgroundColor = '#ed6d46';
        document.getElementById('execText').style.color = '#fff';
    })
});

function setOp(rate){
	document.getElementById('head').style.opacity = rate;
	document.getElementById('title').style.opacity = rate;
	document.getElementById('sideBar').style.opacity = rate;
	document.getElementById('tutorial').style.opacity = rate;
	document.getElementById('exec').style.opacity = rate;
	document.getElementById('execText').style.opacity = rate;
	document.getElementById('editor').style.opacity = rate;
}

function request(){
    //removeTutorial();
            //document.getElementById('button').style.backgroundColor = '#7BA23F';
            //window.localStorage.setItem("code",document.getElementById("textArea").value);
            socket=io.connect("http://127.0.0.1:8000/",function(){
                socket.emit('message',editor.getValue());
            });
            socket.emit('message',editor.getValue());
            socket.on('greeting',function(data){
                //removeTutorial();
                dataset=data;
                is_read=true;
            });
}