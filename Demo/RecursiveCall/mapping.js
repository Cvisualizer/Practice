//var svg=Snap(1700,620);
//var rects=new Array();
var riseX=new Array();
var riseY=new Array();
var riseW=new Array();
var riseH=new Array();
var rises=new Array();
var rise_type=new Array();
var rectW=new Array();
var rectH=[0,0];
var on_rise=new Array();
//var obj_num=1;
var line_num=0;
var col_num=0;
//var is_play=false;
//var var_len = 1; //変数の数
//var func_len = 1; //関数の数
var tmpRises = []; //箱の配置を事前にランダム化して入れておく2次元配列
//tmpRises[i][j] == 0ならi行目j列目は変数マス（小さい） 1なら関数マス

//ボタンの設定
$(function(){  
    $(".sampleBox").click(function(){
    	if(is_play==true){
    		//reset();
    	}
		//例えば入力が 3,1 なら変数3つ関数1つの意
		var s = document.getElementById("textArea").value.split(",");
		/*var_len = Number(s[0]);
		func_len = Number(s[1]);
		obj_num = var_len + func_len;*/
		//mapping();
        //return false;  
    });  
    $(".sampleBox").mousedown(function(){
    	//document.getElementById('button').style.backgroundColor = '#0a1616';
    });
    $(".sampleBox").mouseup(function(){
    	//document.getElementById('button').style.backgroundColor = '#7BA23F';
    });
});

//マスの作成
function mapping(obj_num,func_len,var_len){
	while(line_num*col_num<obj_num){
		line_num+=1;
		col_num+=1;
	}

	//変数マスと関数マスをランダムに並べる
	var count = 0;
	var funcs = generate_random(obj_num, func_len);
	for(var i = 0; i < line_num; i++) {
		tmpRises[i] = [];
		for(var j = 0; j < col_num; j++) {
			if(funcs.indexOf(count) != -1) {
				tmpRises[i][j] = 1;
			}
			else {
				tmpRises[i][j] = 0;
			}
			count++;
		}
	}

	riseW=300/col_num;
	riseH=530/line_num;

	var prevX = 350; //1つ前のマスの右端のx座標
	var prevY = 150; //1行上のマスの下端のy座標
	var tmpY = 166; //今の行の下端のy座標
	for(var i=0,column=0,line=0;i<obj_num;i++){
		if(i%col_num==0&&i>0){
			line++;
			column=0;
			prevX = 570;
			prevY = tmpY;
		}
		if(tmpRises[line][column] == 0) {
		//引数:x座標、y座標、幅、高さ、色、透明度、枠線の色、枠線の幅
			rises[i]=getRect(prevX,prevY,riseW/2,riseH/2,"orange",0,"black",5);
			riseW[i]=rises[i].attr("width");
			riseH[i]=rises[i].attr("height");
			rise_type[i]=0;
			rectW[0]=rises[i].attr("width")/1.1;
			rectH[0]=rises[i].attr("height")/1.1;
			prevX += riseW/2;
			if(prevY + riseH / 2 > tmpY) {
				tmpY = prevY + riseH / 2;
			}
		}
		else {
		//引数:x座標、y座標、幅、高さ、色、透明度、枠線の色、枠線の幅
			rises[i]=getRect(prevX,prevY,riseW,riseH,"orange",0,"black",5);
			rise_type[i]=1;
			riseW[i]=rises[i].attr("width");
			riseH[i]=rises[i].attr("height");
			rectW[1]=rises[i].attr("width")/1.1;
			rectH[1]=rises[i].attr("height")/1.2;
			prevX += riseW;
			if(prevY + riseH > tmpY) {
				tmpY = prevY + riseH;
			}
		}	
		riseX[i]=Number(rises[i].attr("x"))+2;
		riseY[i]=Number(rises[i].attr("y"))+2;
		on_rise[i]=false;
		column++;
	}
	//svg.zpd();
	is_play=true;
}

//描画内容とパラメーターをリセット
/*function reset(){
	svg.remove();
	svg=Snap(1700,620);
	is_play=false;
	for(var i=0;i<rises.length;i++){
		remove(rises[i]);
		riseX[i]=0;
		riseY[i]=0;
		on_rise[i]=false;
	}
	for(var i=0;i<rects.length;i++){
		remove(rects[i]);
	}
	riseW=0;
	riseH=0;
	line_num=0;
	col_num=0;
	count=0;
	generate_count=0;
}*/

//0～(max-1)の乱数num個を生成し配列として返す（並び順のランダム化に使う）
function generate_random(max, num) {
	var generated = new Array();
	var generatedCount = generated.length;
	for(var i = 0 ; i < num; i++) {
		var candidate = Math.floor(Math.random() * max);
		for(var j = 0; j < generatedCount; j++) {
			if(candidate == generated[j]) {
				candidate = Math.floor(Math.random() * max);
				j = -1;
			}
		}
		generated[i] = candidate;
		generatedCount++;
	}
  return generated;
}