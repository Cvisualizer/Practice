//from tools.js
svg=Snap("#svg");
var generate_count=0;
var label_count=0;
var ghost_count=0;
var rects=new Array();
var labels=new Array();
var ghosts={
	obj:new Array(),
	mode:new Array()
};
var dyings=new Array();
var target_param=new Array();
var target_label={
	obj:new Array(),
	value:new Array()
};
var is_return=0;
var is_parent=new Array();
var count=0;
var slide=false;
var slideCount=0;
var started=false;
var stackCount=0;
var appearCount=0;
var moveDepth=0;
var markerShape = new Array();
var marker = new Array();
var markerCount=0;

//from main.js
var span=10;
var time=30;
var num=time/span;
var rectW=0;
var rectH=0;
var rectColE="#e9546b";
var is_play=false;
var showRise=false;
var riseOp=0;
var objects=svg.group();
var count=0;
var is_pause=false;
var exec_speed=1;
var def_speed=exec_speed;
var wait_count=0;
var dataset;
var shadowRep = Snap.filter.shadow(1,1,1,"black",0.5);
var shadow = svg.filter(shadowRep);
var blurRep = Snap.filter.blur(2,2);
var blur = svg.filter(blurRep);
var is_stop=false;

//from readJson.js
var gc=0; //globalの読み込み回数
var lc=0; //localの読み込み回数
var cc=0; //codeの読み込み回数
var mode=0;	//Json読み込みのフェーズ管理用
var is_read=false;
var value_label={
	obj:new Array(),
	parent:new Array(),
	num:0
};
var func_list=new Array();	//関数リスト。同名の関数が複数呼ばれた場合は別物として登録する
var local_list=new Array();	//ローカル変数のリスト。同名の変数が複数登場する場合は別物として登録する
var local_list_num=0;
var func_count=0;
var param_num=0;
var var_num=0;
var child_num={
	variable:0,
	param:0
};
var param_len=0;
var local_column=0;
var local_line=0;
var local_scale=0;
var current_func=new Array();
var return_count=0;
var func_pos_list=new Array();
var local_var_list=new Array();
var globalElements=new Array();
var var_max=0;
var var_min=0;
var is_start=false;
var g_len=0; //globalの個数
var l_len=0; //localの個数
var is_end=false;
var scales=new Array();
var target;
var pos_list=new Array();
var line_num=0;
var is_parent=new Array();
var dying=null;
var var_name="";
var first_max=0;
var replay=false;
var relation={
	num:0,
	dis:0,
	x:new Array(),
	y:new Array(),
	width:new Array(),
	height:new Array(),
	parent:new Array(),
	child:new Array()
};