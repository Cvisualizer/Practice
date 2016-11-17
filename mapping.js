// 幅や高さはとりあえず決め打ちなので修正
const data_width = 450;
// const data_height = 700;
const data_height = window.innerHeight;
var objectPos_x = 20;
// var objectPos_y = 600;
var objectPos_y = data_height-100;
var global_variable_w = 60;
var global_variable_h = 40;
var main_func_w = 420;
var main_func_h = 140;
var main_local_w = 50;
var main_local_h = 30;
var func_w = 200;
var func_h = 100;
var local_w = 50;
var local_h = 30;
var local_x;
var local_y;
var get_width;
var get_height;
var draw_speed;
var draw_sec;

var intFrameHeight = window.innerHeight;

var data_index = [];
var pair = {};
var variable_list = [];
var function_list = [];
var data_list = [];
var data_att = [];

// 外枠(いらないので後で消去)
//var frame = getRect(10,10,data_width,data_height,"white",1,"black",5);
var base = getRect(10, data_height, data_width, 10, "black",1);
var group = svg.g().attr({mask: getRect(10,10,data_width,data_height,"#fff")})
var labelGroup = svg.g().attr({mask: getRect(10, 10, data_width, data_height, "#fff")});


// data_attの属性値の割り当て
// 1 -> global_variable, 2 -> main, 3 -> main_local_variable, 4 -> call_func, 5 -> local_variable
function make_dataList(receive_func) {
	data_list.push(receive_func);
	var funcName = receive_func.toString();
	if(funcName.match(/global_variable/)) {
		data_att.push(1);
	} else if(funcName.match(/main_local_variable/)) {
		data_att.push(3);
	} else if(funcName.match(/main/)) {
		data_att.push(2);
	} else if(funcName.match(/call_func/)) {
		data_att.push(4);
	} else if(funcName.match(/local_variable/)) {
		data_att.push(5);
	}
}


//　test3.c
// https://github.com/Cvisualizer/Cvisualizer/blob/master/compiler/test3.c
make_dataList(function(){ global_variable('*s','blue') });
make_dataList(function(){ global_variable('*s1 ','blue') });
make_dataList(function(){ global_variable('*s2','blue') });
make_dataList(function(){ main_func('main','black') });
make_dataList(function(){ main_local_variable('a','red') });
make_dataList(function(){ main_local_variable('b','red') });
make_dataList(function(){ main_local_variable('c','red') });
make_dataList(function(){ main_local_variable('*p','red') });


function global_variable(name,color){
	var rect = getRect(objectPos_x,objectPos_y,global_variable_w,global_variable_h,color,1,"",5);
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


function main_func(name,color) {
	var rect = getRect(objectPos_x,objectPos_y, main_func_w,main_func_h,color,0.9,"black",5);
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
	var rect = getRect(objectPos_x,objectPos_y,func_w,func_h,"#736d71",0.9,"",5);
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
				if(variable_list.length > 5) {
					//はみ出たらxを固定
					objectPos_x = 760;
					get_width = 20;
					get_height = objectPos_y;
	  			data_list.shift()();
					scale_variable(0,variable_list,get_width,get_height);
				// グローバル変数の横移動
				} else {
					objectPos_x += 70;
					data_list.shift()();
				}
			} else if(data_att[i] == 3) {
				if(variable_list.length > 6) {
					local_x = 760;
					data_list.shift()();
					get_width = objectPos_x;
					get_height = objectPos_y;
					scale_variable(1,variable_list,get_width,get_height);
				} else {
					local_x += 60;
					data_list.shift()();
				}
			// 前が空の関数の時だけ呼ばれる
			} else if(data_att[i] == 4) {
				if(function_list.length > 1) {
					objectPos_x = 20;
					objectPos_y -= 140;
					// スクロール
					if(objectPos_y < 40) {
						scrollRectsTo(scroll_counter);
						lazy_draw();
					} else {
						data_list.shift()();
					}
				} else {
					console.log(objectPos_x);
					objectPos_x += func_w + 10;
					if(objectPos_x > data_width) {
						scrollRectsTo(scroll_counter);
						lazy_draw();
					} else {
						data_list.shift()();
					}
				}
			} else if(data_att[i] == 5) {
				if(variable_list.length > 2) {
					if(objectPos_x > 200) {
						local_x = 480;
					} else {
						local_x = 200;
					}
					data_list.shift()();
					get_width = objectPos_x;
					get_height = objectPos_y;
					scale_variable(2,variable_list,get_width,get_height);
				} else {
					local_x += 60;
					data_list.shift()();
				}
      }
    // ローカル変数の最初の描画
    } else if(data_att[i] == 3 || data_att[i] == 5) {
      local_x = objectPos_x + 10;
      local_y = objectPos_y + 25;
      data_list.shift()();
		// 前がローカル変数で次がcallFuncだったら
		} else if(data_att[i] == 4 && data_att[i-1] == 5) {
			variable_list = [];
			function_list = [];
			objectPos_x += 220;
			// ここにはみ出た時の処理の追加
			if(objectPos_x > 620) {
				objectPos_x = 20;
				objectPos_y -= 140;
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
			objectPos_x = 20;
			objectPos_y -= 170;
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
	if(data_list.length > 2) {
		startScroll();
	}
}

//ローカル変数の縮小
function scale_variable(type,data,width,height){
	var object_width;
	if(type == 0 || type == 1) {
		object_width = main_func_w / data.length * 0.9;
	} else if(type == 2) {
		object_width = func_w / data.length * 0.8;
	}
	for(count=0; count < data.length; count++){
		changeSize(data[count],object_width,object_width/2,1000);
		move(data[count],width + 10,height + 30 ,1000);
		width += object_width + 2;
	}
}

// 遅延実行
function lazy_draw(){
	objectPos_x = 20;
	objectPos_y = 30;
	var lazy_sec = draw_sec/2*draw_speed
	setTimeout( function() {
		data_list.shift()();
	}, lazy_sec );
}

function scrollRectsTo(count){
	if(data_att[i] == 1) {
		if(data_att[i-1] == 4 || data_att[i-1] == 5) {
			move(base, parseInt(base.node.getAttribute("x")), data_height+main_func_h*count-100,100);
		}
	} else {
		move(base, parseInt(base.node.getAttribute("x")), data_height+main_func_h*count-50,100);
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

// 遅延で描画
// draw_speed = 1
function draw_mapping(sec,speed=1) {
	draw_sec = sec
	if(speed == 2) {
		draw_speed = 0.5;
	} else {
		draw_speed = 1;
	}
	call_count = 1
	var draw_func = setInterval(
		function() {
			mapping();
			if(call_count == data_att.length) {
				clearInterval(draw_func);
			}
			call_count ++;
		}
		, draw_sec*draw_speed
	);
}

// データ構造の描画
// 第一引数ミリセカンド、第二引数を2に変更すると2倍速
draw_mapping(800,1);
