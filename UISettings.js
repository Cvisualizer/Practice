var isLoaded=false;
var fileName="";
var fileNum=localStorage.getItem("fileNum");
if(fileNum==undefined) fileNum=0;
var currentFileNum=0;
//localStorage.clear();

if(localStorage.getItem("editting")!=undefined){
	editor.setValue(localStorage.getItem("editting"));
}

$(function(){  
	$(".saveButton").mousedown(function(){
		document.getElementById("save").style.backgroundColor="#00533f";
		document.getElementById("saveText").style.color="#aaa";
	});
	$(".saveButton").mouseup(function(){
		saveFile();
	});
	$(".execButton").mousedown(function(){
		document.getElementById("exec").style.backgroundColor="#6b3f31";
		document.getElementById("execText").style.color="#aaa";
	});
	$(".execButton").mouseup(function(){
		localStorage.setItem("editting",editor.getValue());
	});
	$(".loadButton").mousedown(function(){
		document.getElementById("load").style.backgroundColor="#00506d";
		document.getElementById("loadText").style.color="#aaa";
	});
	$(".loadButton").mouseup(function(){
		loadFile();
	});
	$("html").mouseup(function(){
		document.getElementById("save").style.backgroundColor="#288c66";
		document.getElementById("saveText").style.color="#fff";
		document.getElementById("exec").style.backgroundColor="#ea5532";
		document.getElementById("execText").style.color="#fff";
		document.getElementById("load").style.backgroundColor="#007199";
		document.getElementById("loadText").style.color="#fff";
	});
});


function saveFile(){
	if(isLoaded==false){
		saveNewFile();
	}
	else{
		if(confirm('上書き保存しますか？')){
			var fileObj={
				name:fileName,
				code:editor.getValue()
			};
			localStorage.setItem("code"+currentFileNum,JSON.stringify(fileObj));
		}
		else{
			saveNewFile();
		}
	}
}

function saveNewFile(){
	var isOverlap=false;
	if(confirm('新規保存しますか？')==false){
		return 0;
	}
	fileName=prompt("ファイル名","hoge.c");
	for(var i=0;i<fileNum;i++){
		if(JSON.parse(localStorage.getItem("code"+i)).name==fileName){
			isOverlap=true;
			break;
		}
	}
	if(isOverlap==false){
		var fileObj={
			name:fileName,
			code:editor.getValue()
		};
		localStorage.setItem("code"+fileNum,JSON.stringify(fileObj));
		isLoaded=true;
		currentFileNum=fileNum;
		alert("「"+fileName+"」が保存されました");
		fileNum++;
		localStorage.setItem("fileNum",fileNum);
	}
	else{
		alert("同名のファイルが存在します\n別名で保存し直してください");
	}
}

function loadFile(){
	var fileList=[];
	var selectedFile;
	for(var i=0;i<fileNum;i++){
		if(localStorage.getItem("code"+i)!=undefined){
			fileList.push(JSON.parse(localStorage.getItem("code"+i)).name);
		}
	}
	var argument_obj = {

		// ------------------------------------------------------------
		// 外部からデータを取得させる関数
		// ------------------------------------------------------------
		getData:function (){
			return {fName:fileList};
		},

		// ------------------------------------------------------------
		// 外部からデータをセットさせる関数
		// ------------------------------------------------------------
		setData:function (receive){

			// 返信データを受け取る
			selectedFile = receive;
		}
	};
	var response_obj = window.showModalDialog("dialog.html",argument_obj);
	editor.setValue(JSON.parse(localStorage.getItem("code"+selectedFile[1])).code);
	fileName=selectedFile[0];
	currentFileNum=selectedFile[1];
	isLoaded=true;
}