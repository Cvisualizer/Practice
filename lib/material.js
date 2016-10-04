/*
このファイルを読み込む場合は、どこかにupdate関数を置いてください
update関数は毎フレーム読み込まれます
*/

parent();

//updata関数を呼び続ける
function parent(){
	requestAnimationFrame(parent);
	requestAnimationFrame(update);
}

//textを出力し改行
function line(chara){
	document.write(chara+"<br>");
}

function set(key,value){
	window.localStorage.setItem(key,value);
}

function get(key){
	window.localStorage.getItem(key);
}