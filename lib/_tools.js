//四角を描画し、配列rectsに格納する
function rect(posX,posY,w,h,col,op,st,stw){
	rects[generate_count]=svg.rect(posX,posY,w,h);
	rects[generate_count].attr({
		fill: col,
		opacity: op,
		stroke:st,
		strokeWidth:stw
	});
	//objects[generate_count]=rects[generate_count];
	is_parent[generate_count]=false;
	generate_count++;
}

//四角を描画してobjectを返す(任意の変数に格納できる)
function getRect(posX,posY,w,h,col,op,st,stw){
	var obj=svg.rect(posX,posY,w,h);
	obj.attr({
		fill: col,
		opacity: op,
		stroke:st,
		strokeWidth:stw,
	});
	return obj;
}

//テキストを描画し、配列labelsに格納する
function label(posX,posY,size,family,content,col){
	labels[label_count]=svg.text(posX,posY,content);
	labels[label_count].attr({
		fontSize: size+"px",
		fill: col,
		fontFamily: family,
		pointerEvents:"none",
		filter:shadow
	})
	label_count++;
}

//テキストを描画してobjectを返す(任意の変数に格納できる)
function getLabel(posX,posY,size,family,content,col){
	var new_label=svg.text(posX,posY,content);
	new_label.attr({
		fontSize: size+"px",
		fill: col,
		fontFamily: family,
		pointerEvents:"none"
	})
	return new_label;
}

//ゴースト生成
function ghost(obj,obj2,value,mode,label){
	is_return++;
	var x=Number(obj.attr("x"))+Number(obj.attr("width"))/2;
	var y=Number(obj.attr("y"))+Number(obj.attr("height"))/2;
	var x2=Number(obj2.attr("x"))+Number(obj2.attr("width"))/2;
	var y2=Number(obj2.attr("y"))+Number(obj2.attr("height"))/2;
	var scale=Number(obj.attr("width"))*0.15;
	ghosts.obj[ghost_count]=svg.rect(x,y,scale,scale);
	ghosts.obj[ghost_count].attr({
		fill:chooseColor(value)+"",
		opacity:0.85,
		r:30,
		filter:blur
	});
	move(ghosts.obj[ghost_count],x2,y2,400*def_speed/30);
	ghosts.mode[ghost_count]=mode;
	if(mode==0){
		setParent(ghosts.obj[ghost_count],obj);
		dyings[ghost_count]=obj;
	}
	else{
		target_param[ghost_count]=obj2;
		target_label.obj[ghost_count]=label;
		target_label.value[ghost_count]=value;
	}
	ghost_count++;
}

function chooseColor(value) {
	var min=min_value;
	var max=max_value;
 	var color_min = "#0000ff"//"#afeeee"; //最小値の色
 	var color_max = "#00ff00"; //最大値の色
 	var color;
 	$(function() {
  		color = $.xcolor.gradientlevel(color_min, color_max, value - min, max - min);
 	});
 	return color;
}

function changeColor(obj,col,op,ms){
	obj.animate( { 
		fill :col,
		opacity : op
	},ms );
}

function changeSize(obj,w,h,ms){
	obj.animate({
		width: w,
		height: h,
	},ms)

	var wRate=w/Number(obj.attr("width"));
	var hRate=h/Number(obj.attr("height"));

	if(obj.id.indexOf("parent")>-1){
		for(var i=0;i<relation.parent.length;i++){
			if(relation.parent[i].id==obj.id){
				//resize(relation.child[i],w*relation.width[i],h*relation.height[i],ms);
				if(relation.child[i].attr("width")!=null){
					changeSize(relation.child[i],relation.child[i].attr("width")*wRate,relation.child[i].attr("height")*hRate,ms);
				}
				else{
					var curSize=Number(relation.child[i].attr("fontSize").replace(/p/g,"").replace(/x/g,""));
					changeTextSize(relation.child[i],curSize*((wRate+hRate)/2),ms);
				}
			}
		}
	}
}

function changeTextSize(obj,size,ms){
	obj.animate({
		fontSize:size+"px"
	},ms)
}

//移動。子要素がある場合は追従させる(子要素単独で移動した際に親との相対距離を修正する必要有り)
function move(obj,px,py,ms){
	moveDepth++;
	obj.animate({
		x: px,
		y: py
	},ms)

	if(obj.id.indexOf("parent")>-1){
		for(var i=0;i<relation.parent.length;i++){
			if(relation.parent[i].id==obj.id){
				move(relation.child[i],px+relation.x[i],py+relation.y[i],ms);
			}
		}
	}

	if(obj.id.indexOf("child")>-1&&moveDepth==1){
		for(var i=0;i<relation.child.length;i++){
			if(relation.child[i].id==obj.id){
				relation.x[i]=px-Number(relation.parent[i].attr("x"));
				relation.y[i]=py-Number(relation.parent[i].attr("y"));
			}
		}
	}
	moveDepth--;
}

function changeText(obj,text){
	obj.attr("text",text);
}

//rectを複製して返す
function copyRect(obj1){
	var obj_clone=svg.rect();
	obj_clone.attr({
		x:obj1.attr("x"),
		y:obj1.attr("y"),
		width:obj1.attr("width"),
		height:obj1.attr("height"),
		fill: obj1.attr("fill"),
		opacity: obj1.attr("opacity"),
		stroke:obj1.attr("stroke"),
		strokeWidth:obj1.attr("strokeWidth"),
	});

	return obj_clone;
}

//labelを複製して返す
function copyLabel(obj1){
	var obj_clone=svg.text();
	obj_clone.attr({
		x:obj1.attr("x"),
		y:obj1.attr("y"),
		fontSize:obj1.attr("fontSize"),
		fontFamily:obj1.attr("fontFamily"),
		text:obj1.attr("text"),
		fill: obj1.attr("fill"),
		pointerEvents:"none"
	});

	return obj_clone;
}

//objectを複製する
function duplicate(obj1){
	var obj_clone;
	if(obj1.attr("width")==null){
		obj_clone=svg.text();
		obj_clone=copyLabel(obj1);
	}
	else{
		obj_clone=svg.rect();
		obj_clone=copyRect(obj1);
	}
	return obj_clone;
}

//objectを削除する
function remove(obj){
	if(obj.id.indexOf("func")>-1){
		for(var i=0;i<rises.length;i++){
			if(onTrigger(rises[i],obj)==true){
				on_rise[i]=false;
			}
		}
	}
	if(obj.id.indexOf("parent")>-1){
		for(var i=0;i<relation.parent.length;i++){
			if(relation.parent[i]==obj.id){
				remove(relation.child[i]);
			}
		}
	}
	obj.remove();
}

//衝突判定、trueなら両者を引き離す
function onCollision(obj1,obj2){
	var x1=obj1.attr("x")-0;
	var x2=obj2.attr("x")-0;
	var y1=obj1.attr("y")-0;
	var y2=obj2.attr("y")-0;
	var lx1=obj1.attr("width")-0;
	var lx2=obj2.attr("width")-0;
	var ly1=obj1.attr("height")-0;
	var ly2=obj2.attr("height")-0;
	//console.log(x2+lx2);
	if(x1<=x2+lx2&&y1<=y2+ly2&&x2<=x1+lx1&&y2<=y1+ly1){
		var distanceX;
		var distanceY;
		if(x2-x1>=0)distanceX=x2+(lx1-(x2-x1));
		else distanceX=x2+(-lx1-(x2-x1));
		if(y2-y1>=0)distanceY=y2+(ly1-(y2-y1));
		else distanceY=y2+(-ly1-(y2-y1));
		move(obj2,distanceX,distanceY,0);
		return true;
	}
	else{
		return false;
	}
}

//衝突判定
function onTrigger(obj1,obj2){
	var x1=obj1.attr("x")-0;
	var x2=obj2.attr("x")-0;
	var y1=obj1.attr("y")-0;
	var y2=obj2.attr("y")-0;
	var lx1=obj1.attr("width")-0;
	var lx2=obj2.attr("width")-0;
	var ly1=obj1.attr("height")-0;
	var ly2=obj2.attr("height")-0;
	//console.log(x2+lx2);
	if(x1<=x2+lx2&&y1<=y2+ly2&&x2<=x1+lx1&&y2<=y1+ly1){
		return true;
	}
	else{
		return false;
	}
}

//親子関係を築く
function addChild(child,parent){
	if(parent.id.indexOf("parent")<0){
		parent.id+="parent";
	}
	if(child.id.indexOf("child")<0){
		parent.id+="child";
	}
	if(child.attr("width")==null){
		relation.parent[relation.num]=parent;
		relation.child[relation.num]=child;
		relation.x[relation.num]=(Number(child.attr("x")))-Number(parent.attr("x"));
		relation.y[relation.num]=(Number(child.attr("y")))-Number(parent.attr("y"));
		relation.num++;
	}
	else{
		relation.parent[relation.num]=parent;
		relation.child[relation.num]=child;
		relation.dis=Number(parent.attr("width"))-Number(parent.attr("width"))*0.7;
		relation.dis/=4;
		/*relation.x[relation.num]=(Number(child.attr("x"))+relation.dis)-Number(parent.attr("x"));
		relation.y[relation.num]=(Number(child.attr("y")))-Number(parent.attr("y"));*/
		relation.x[relation.num]=(Number(child.attr("x")))-Number(parent.attr("x"));
		relation.y[relation.num]=(Number(child.attr("y")))-Number(parent.attr("y"));
		relation.width[relation.num]=Number(child.attr("width"))/Number(parent.attr("width"));
		relation.height[relation.num]=Number(child.attr("height"))/Number(parent.attr("height"));
		relation.num++;
	}
}

var stringCounter = function(str,seq){
    return str.split(seq).length - 1;
}

