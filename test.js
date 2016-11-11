// 幅や高さはとりあえず決め打ちなので修正
const data_width = 650;
const data_height = 550;
var objectPos_x = 40;
var objectPos_y = 450;
var global_variable_w = 100;
var global_variable_h = 80;
var main_func_w = 580;
var main_func_h = 140;
var main_local_w = 60;
var main_local_h = 40;
var func_w = 280;
var func_h = 180;
var local_w = 60;
var local_h = 40;
var local_x = 0;
var local_y = 0;

// testdata
var data_list = [
	function(){ global_variable('unko') },
	function(){ global_variable('kome') },
	function(){ global_variable('kome') },
	function(){ main_func() },
	function(){ main_local_variable("mini","red") },
	function(){ main_local_variable("gori","red") },
	function(){ main_local_variable("koro","red") },
	function(){ call_func('dara') },
	function(){ local_variable("local","yellow") },
	function(){ local_variable("local","yellow") },
	function(){ call_func('gori') }
];


// データの属性
// 1 -> global_variable, 2 -> main, 3 -> main_local_variable, 4 -> call_func, 5 -> local_variable
var data_att = [
	1,1,1,2,3,3,3,4,5,5,4
];

//外枠(いらないので後で消去)
var frame = getRect(10,10,data_width,data_height,"white",1,"black",5);

function global_variable(name){
	var rect = getRect(objectPos_x,objectPos_y,global_variable_w,global_variable_h,"blue",1,"",5);
	var label =getLabel(objectPos_x,objectPos_y - 5,20,"",name,"black");
	addChild(label, rect);
}


function main_func() {
	var rect = getRect(objectPos_x,objectPos_y, main_func_w,main_func_h,"black",1,"black",5);
	var label =getLabel(objectPos_x,objectPos_y - 5 ,20,"","main","black");
	addChild(label, rect);
}

function main_local_variable(name,color){
	var rect = getRect(local_x,local_y,main_local_w,main_local_h,color,1,"",5);
	var label =getLabel(local_x,local_y - 5,20,"",name,"white");
	addChild(label, rect);
}


function call_func(name) {
	var rect = getRect(objectPos_x,objectPos_y,func_w,func_h,"gray",1,"",5);
	var label =getLabel(objectPos_x,objectPos_y - 5 ,20,"",name,"black");
	addChild(label, rect);
}

function local_variable(name,color){
	var rect = getRect(local_x,local_y,local_w,local_h,color,1,"",5);
	var label =getLabel(local_x,local_y - 5,20,"",name,"white");
	addChild(label, rect);
}

var i = 0;
// ローカル変数が何回続いたか保持
var variable_count_up = 1;

function mapping() {
	if(i == 0) {
		data_list.shift()();
	}
	if(i > 0) {
    // 前とデータの属性が同じかチェック
		if(data_att[i] == data_att[i-1]) {
      // 上昇するかのチェック
      if(data_att[i] == 1 && objectPos_x + global_variable_w > data_width){
        objectPos_x = 40;
  			objectPos_y -= 210;
  			data_list.shift()();
      // 関数時の横移動
      } else if(data_att[i] == 2 || data_att[i] == 4) {
				objectPos_x += 200;
				data_list.shift()();
			// グローバル変数時の横移動
      } else if(data_att[i] == 1) {
				objectPos_x += 120;
				data_list.shift()();
      // ローカル変数の時、縮小できるように変更
			} else if(data_att[i] == 3 || data_att[i] == 5) {
        if(data_att[i] == data_att[i - 1]) {
            variable_count_up += 1;
            console.log("ローカル変数が続いた回数");
            console.log(variable_count_up);
        		local_x += 80;
        		data_list.shift()();
        }
      }
    // ローカル変数の最初の描画
    } else if(data_att[i] == 3 || data_att[i] == 5) {
      local_x = objectPos_x + 20;
      local_y = objectPos_y + 25;
      data_list.shift()();
		// 前がローカル変数で次がcallFuncだったら
		} else if(data_att[i] == 4 && data_att[i-1] == 5) {
			objectPos_x += 300;
			data_list.shift()();
		//上昇
		} else if(data_att[i] != data_att[i-1]){
			objectPos_x = 40;
			objectPos_y -= 210;
			data_list.shift()();
      variable_count_up = 1;
		}
	}
	i ++;
}
// 遅延で描画
call_count = 1
var draw_func = setInterval(
	function() {
		console.log(data_att.length)
		console.log(call_count);
		mapping();
		if(call_count == data_att.length) {
			clearInterval(draw_func);
		}
		call_count ++;
	}
	, 1000
)
