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
	function(){ global_variable('unko') },
	function(){ global_variable('kome') },
	function(){ global_variable('kome') },
	function(){ global_variable('unko') },
	function(){ global_variable('kome') },
	function(){ global_variable('kome') },
	function(){ global_variable('unko') },
	function(){ global_variable('kome') },
	function(){ global_variable('kome') },
	function(){ global_variable('unko') },
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
	function(){ call_func('gori') },
	function(){ local_variable("me","yellow") },
	function(){ local_variable("me","yellow") },
	function(){ local_variable("you","yellow") },
	function(){ call_func('doro') },
	function(){ local_variable("you","yellow") },
	function(){ local_variable("you","yellow") },
	function(){ call_func('guro') },
	function(){ global_variable('kome') },
	function(){ global_variable('kome') },
	function(){ global_variable('unko') },
	function(){ global_variable('kome') },
	function(){ global_variable('kome') },
	function(){ global_variable('unko') },
	function(){ call_func('doro') }
];



// データの属性
// 1 -> global_variable, 2 -> main, 3 -> main_local_variable, 4 -> call_func, 5 -> local_variable
var data_att = [
	1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,3,3,3,3,3,3,3,4,5,5,5,5,4,5,5,5,4,5,5,4,1,1,1,1,1,1,4
];
var data_index = [];
var pair = {};
var variable_list = [];
var function_list = [];

// 外枠(いらないので後で消去)
var frame = getRect(10,10,data_width,data_height,"white",1,"black",5);
var base = getRect(10, data_height, data_width, 10, "black",1);
var group = svg.g().attr({mask: getRect(10,10,data_width,data_height,"#fff")})
var labelGroup = svg.g().attr({mask: getRect(10, 10, data_width, data_height, "#fff")});


function global_variable(name){
	var rect = getRect(objectPos_x,objectPos_y,global_variable_w,global_variable_h,"blue",1,"",5);
	var label =getLabel(objectPos_x,objectPos_y - 5,20,"",name,"black");
	addChild(label, rect);
	addChild(rect, base);
	group.append(rect);
	labelGroup.append(label);
	variable_list.push(rect);
	pair = {};
	pair["index"] = i;
	pair["name"] = name;
	pair["rect"] = rect;
	pair["scroll_num"] = scroll_counter;
	data_index.push(pair);
}


function main_func(name) {
	var rect = getRect(objectPos_x,objectPos_y, main_func_w,main_func_h,"black",1,"black",5);
	var label =getLabel(objectPos_x,objectPos_y - 5 ,20,"","main","black");
	addChild(label, rect);
	addChild(rect, base);
	group.append(rect);
	labelGroup.append(label);
	pair = {};
	pair["index"] = i;
	pair["name"] = name;
	pair["rect"] = rect;
	pair["scroll_num"] = scroll_counter;
	data_index.push(pair);
}

function main_local_variable(name,color){
	var rect = getRect(local_x,local_y,main_local_w,main_local_h,color,1,"",5);
	var label =getLabel(local_x,local_y - 5,20,"",name,"white");
	addChild(label, rect);
	addChild(rect, base);
	group.append(rect);
	labelGroup.append(label);
	variable_list.push(rect);
	pair = {};
	pair["index"] = i;
	pair["name"] = name;
	pair["rect"] = rect;
	pair["scroll_num"] = scroll_counter;
	data_index.push(pair);
}


function call_func(name) {
	var rect = getRect(objectPos_x,objectPos_y,func_w,func_h,"gray",1,"",5);
	var label =getLabel(objectPos_x,objectPos_y - 5 ,20,"",name,"black");
	addChild(label, rect);
	addChild(rect, base);
	group.append(rect);
	labelGroup.append(label);
	function_list.push(rect);
	pair = {};
	pair["index"] = i;
	pair["name"] = name;
	pair["rect"] = rect;
	pair["scroll_num"] = scroll_counter;
	data_index.push(pair);
}

function local_variable(name,color){
	var rect = getRect(local_x,local_y,local_w,local_h,color,1,"",5);
	var label =getLabel(local_x,local_y - 5,20,"",name,"white");
	addChild(label, rect);
	addChild(rect, base);
	group.append(rect);
	labelGroup.append(label);
	variable_list.push(rect);
	pair = {};
	pair["index"] = i;
	pair["name"] = name;
	pair["rect"] = rect;
	pair["scroll_num"] = scroll_counter;
	data_index.push(pair);
}

var i = 0;
var scroll_counter = 1;
function mapping() {
	if(i == 0) {
		data_list.shift()();
	}
	if(i > 0) {
		if(data_att[i] == data_att[i-1]) {
      // 上昇するかのチェック 枠をはみでているのかの
      if(data_att[i] == 1){
				if(variable_list.length > 4) {
					//はみ出たらxを固定
					objectPos_x = 640;
					get_width = 40;
					get_height = objectPos_y;
	  			data_list.shift()();
					scale_variable(0,variable_list,get_width,get_height);
				// グローバル変数の横移動
				} else {
					objectPos_x += 120;
					data_list.shift()();
				}
			} else if(data_att[i] == 3) {
				if(variable_list.length > 6) {
					local_x = 620;
					data_list.shift()();
					get_width = objectPos_x;
					get_height = objectPos_y;
					scale_variable(1,variable_list,get_width,get_height);
				} else {
					local_x += 80;
					data_list.shift()();
				}
			// 前が空の関数の時だけ呼ばれる
			} else if(data_att[i] == 4) {
				if(function_list.length > 1) {
					objectPos_x = 40;
					objectPos_y -= 210;
					// スクロール
					if(objectPos_y < 40) {
						scrollRectsTo(scroll_counter);
						lazy_draw();
					} else {
						data_list.shift()();
					}
				} else {
					objectPos_x += 300;
					if(objectPos_x + func_w > data_width) {
						scrollRectsTo(scroll_counter);
						lazy_draw();
					} else {
						data_list.shift()();
					}
				}
			} else if(data_att[i] == 5) {
				if(variable_list.length > 2) {
					local_x = 300;
					data_list.shift()();
					get_width = objectPos_x;
					get_height = objectPos_y;
					scale_variable(2,variable_list,get_width,get_height);
				} else {
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
			variable_list = [];
			function_list = [];
			objectPos_x += 300;
			// ここにはみ出た時の処理の追加
			if(objectPos_x + 20 > data_width) {
				objectPos_x = 40;
				objectPos_y -= 210;
				// スクロール
				if(objectPos_y < 0) {
					scrollRectsTo(scroll_counter);
					lazy_draw();
				} else {
					data_list.shift()();
				}
			} else {
				data_list.shift()();
			}
		//上昇
		} else if(data_att[i] != data_att[i-1]){
			objectPos_x = 40;
			objectPos_y -= 210;
			variable_list = [];
			// スクロール
			if(objectPos_y < 0) {
				scrollRectsTo(scroll_counter);
				lazy_draw();
			} else {
				data_list.shift()();
			}
		}
	}
	i ++;
	// ホイールスクロール
	if(data_list.length == 0 || data_list.length == 1) {
		startScroll();
	}
}

//ローカル変数の縮小
function scale_variable(type,data,width,height){
	var object_width;
	if(type == 0 || type == 1) {
		object_width = main_func_w / data.length * 0.9;
	} else if(type == 2) {
		object_width = func_w / data.length * 0.9;
	}
	for(count=0; count < data.length; count++){
		changeSize(data[count],object_width,object_width/2,1000);
		move(data[count],width + 10,height + 30 ,1000);
		width += object_width + 2;
	}
}

// 遅延実行
function lazy_draw(){
	objectPos_x = 40;
	objectPos_y = 30;
	setTimeout( function() {
		data_list.shift()();
	}, 400);
}

function scrollRectsTo(count){
	if(data_att[i] == 1 || data_att[i-1] == 1 && data_att[i] == 4) {
		var shiftHeight = 60;
		move(base, parseInt(base.node.getAttribute("x")), data_height + (main_func_h + shiftHeight)*count,200);
	} else {
		var shiftHeight = 80;
		move(base, parseInt(base.node.getAttribute("x")), data_height + (main_func_h + shiftHeight)*count,200);
	}
	scroll_counter++;
}

function startScroll() {
	group.node.addEventListener("wheel", function(e){
		// 上にスクロール
		if(e.deltaY<0 && parseInt(base.node.getAttribute("y"))<=data_height){
			move(base, parseInt(base.node.getAttribute("x")), parseInt(base.node.getAttribute("y"))+data_height + 60, 10);
		}
		// 下にスクロール
		if(e.deltaY>0){
			if(data_height<=parseInt(base.node.getAttribute("y"))-data_height*1){
				move(base, parseInt(base.node.getAttribute("x")), parseInt(base.node.getAttribute("y"))- data_height, 10);
			}else{
				move(base, parseInt(base.node.getAttribute("x")), data_height, 1); // 位置を修正
			}
		}
	});
}
// 検索
function searchTarget(target_num){
	var target = data_index[target_num]["rect"];
	changeColor(target,"gold",0.2,1000);
	if(parseInt(target.node.getAttribute("y")) > data_height) {
		move(base, 10, parseInt(target.node.getAttribute("y"))-(func_h*(scroll_counter-data_index[target_num]["scroll_num"])),200);
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
	, 800
)
