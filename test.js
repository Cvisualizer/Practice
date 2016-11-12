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
var local_x;
var local_y;
var get_width;
var get_height;

// testdata
var data_list = [
	function(){ global_variable('unko') },
	function(){ global_variable('kome') },
	function(){ global_variable('kome') },
	function(){ main_func('main') },
	function(){ main_local_variable('mini','red') },
	function(){ main_local_variable('gori','red') },
	function(){ main_local_variable('koro','red') },
	function(){ main_local_variable('test1','red') },
	function(){ main_local_variable('mini','red') },
	function(){ main_local_variable('gori','red') },
	function(){ main_local_variable('koro','red') },
	function(){ main_local_variable('test1','red') },
	function(){ main_local_variable('test2','red') },
	function(){ main_local_variable('test3','red') },
	function(){ main_local_variable('test4','red') },
	function(){ call_func('dara') },
	function(){ local_variable("local","yellow") },
	function(){ local_variable("local","yellow") },
	function(){ local_variable("local","yellow") },
	function(){ local_variable("local","yellow") },
	function(){ call_func('gori') }
];



// データの属性
// 1 -> global_variable, 2 -> main, 3 -> main_local_variable, 4 -> call_func, 5 -> local_variable
var data_att = [
	1,1,1,2,3,3,3,3,3,3,3,3,3,3,3,4,5,5,5,5,4
];
var data_index = [];
var pair = {};
var local_variable_list = [];

//外枠(いらないので後で消去)
var frame = getRect(10,10,data_width,data_height,"white",1,"black",5);

function global_variable(name){
	var rect = getRect(objectPos_x,objectPos_y,global_variable_w,global_variable_h,"blue",1,"",5);
	var label =getLabel(objectPos_x,objectPos_y - 5,20,"",name,"black");
	addChild(label, rect);
	pair = {};
	pair["index"] = i;
	pair["name"] = name;
	data_index.push(pair);
}


function main_func(name) {
	var rect = getRect(objectPos_x,objectPos_y, main_func_w,main_func_h,"black",1,"black",5);
	var label =getLabel(objectPos_x,objectPos_y - 5 ,20,"","main","black");
	addChild(label, rect);
	pair = {};
	pair["index"] = i;
	pair["name"] = name;
	data_index.push(pair);
}

function main_local_variable(name,color){
	var rect = getRect(local_x,local_y,main_local_w,main_local_h,color,1,"",5);
	var label =getLabel(local_x,local_y - 5,20,"",name,"white");
	addChild(label, rect);
	local_variable_list.push(rect);
	pair = {};
	pair["index"] = i;
	pair["name"] = name;
	data_index.push(pair);
}


function call_func(name) {
	var rect = getRect(objectPos_x,objectPos_y,func_w,func_h,"gray",1,"",5);
	var label =getLabel(objectPos_x,objectPos_y - 5 ,20,"",name,"black");
	addChild(label, rect);
	pair = {};
	pair["index"] = i;
	pair["name"] = name;
	data_index.push(pair);
}

function local_variable(name,color){
	var rect = getRect(local_x,local_y,local_w,local_h,color,1,"",5);
	var label =getLabel(local_x,local_y - 5,20,"",name,"white");
	addChild(label, rect);
	local_variable_list.push(rect);
	pair = {};
	pair["index"] = i;
	pair["name"] = name;
	data_index.push(pair);
}

var i = 0;
function mapping() {
	if(i == 0) {
		data_list.shift()();
	}
	if(i > 0) {
    // 前とデータの属性が同じかチェック
		if(data_att[i] == data_att[i-1]) {
      // 上昇するかのチェック,
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
        		local_x += 80;
        		data_list.shift()();
						// 縮小部分
						if(data_att[i] == 3 && local_variable_list.length > 7) {
							get_width = objectPos_x;
							get_height = objectPos_y;
							scale_variable(1,local_variable_list,get_width,get_height);
						} else if(data_att[i] == 5 && local_variable_list.length > 3) {
							get_width = objectPos_x;
							get_height = objectPos_y;
							scale_variable(2,local_variable_list,get_width,get_height);
						}
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
			local_variable_list = [];
		}
	}
	i ++;
	console.log(data_index);
}

function scale(){
	changeSize(b,300,10,500);
}

//ローカル変数の縮小
function scale_variable(type,data,width,height){
	var object_width;
	if(type == 1) {
		object_width = main_func_w / data.length * 0.6;
	} else if(type == 2) {
		object_width = func_w / data.length * 0.6;
	}
	for(count=0; count < data.length; count++){
		changeSize(data[count],object_width,object_width/2,1000);
		move(data[count],width + 10,height + 30 ,1000);
		width += object_width + 2;
	}
}


// 遅延で描画
call_count = 1
var draw_func = setInterval(
	function() {
		mapping();
		if(call_count == data_att.length) {
			clearInterval(draw_func);
		}
		call_count ++;
	}
	, 1200
)
