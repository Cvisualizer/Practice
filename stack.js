// 宣言とか
var stack = document.getElementById('stack');
var stackWrapper = document.getElementById('stackWrapper');
var globalMemory = document.getElementById('globalMemory');
var stackArrows = [];
var isDisplayStackID = true;

//---- Node pushMemory(String str, String textColor, String backgroundColor) ----
// stackに積む　積んだやつを返す 色の初期値はstack.cssのもの
function pushMemory(str, textColor, backgroundColor){
	var element = createElement('div', {
		appendTo: stack,
		id: stack.children.length,
		className: 'memory',
		style: {
			color: textColor,
			backgroundColor: backgroundColor
		},
		innerHTML: (isDisplayStackID ? stack.children.length+':': '')+str
	});
	return element;
}

//---- Node pushGlobalMemory(String str, String textColor, String backgroundColor) ----
// globalMemoryに追加
function pushGlobalMemory(str, textColor, backgroundColor){
	var element = createElement('div', {
		appendTo: globalMemory,
		id: "g"+globalMemory.children.length,
		className: 'memory',
		style: {
			color: textColor,
			backgroundColor: backgroundColor
		},
		innerHTML: (isDisplayStackID ? globalMemory.children.length+':' : '')+str
	});
	return element;
}

//---- void displayMemories(int[] arr) ----
// 引数に渡した配列の番号(int)のIDのメモリだけ開く
function displayMemories(arr){
	[].slice.call(stack.children).forEach(function(memory){
		if(~arr.indexOf(parseInt(memory.id))){
			memory.classList.remove('close');
		} else {
			memory.classList.add('close');
		}
	})
}

//---- Node addStackArrow(int start, int end, String color) ----
// 始点・終点を指定して矢印を描画
function addStackArrow(start, end, color){
	var x = stackWrapper.offsetLeft-5;
	var y = stackWrapper.offsetTop;
	var arrow = getArrow(x, y+getDisplayY(start)+20, x, y+getDisplayY(end)+10, 3, color||"#aaa");
	stackArrows.push(arrow);
	return arrow;
}
//----
function addGlobalArrow(start, end, color){
	var x = stackWrapper.offsetLeft-5;
	var y = stackWrapper.offsetTop;
	var arrow = getArrow(x, y+getDisplayY(start, true)+20, x, y+getDisplayY(end, true)+10, 3, color||"#aaa");
	return arrow;
}

//---- move Arrow
function moveStackArrow(targetArrow, start, end){
	var x = stackWrapper.offsetLeft-5;
	var y = stackWrapper.offsetTop;
	targetArrow.transform(x, y+getDisplayY(start)+20, x, y+getDisplayY(end)+10, 3, 100);
}
//----
function moveGlobalArrow(targetArrow, start, end){
	var x = stackWrapper.offsetLeft-5;
	var y = stackWrapper.offsetTop;
	targetArrow.transform(x, y+getDisplayY(start, true)+20, x, y+getDisplayY(end, true)+10, 3, 100);
}

//---- void clearStackArrow() ----
//
function clearStackArrow(){
	stackArrows.forEach(function(arw){
		arw.remove();
	});
}

//---- Node getArrowById ----
// スタックのIDに対応した矢印を探す
function getArrowById(id){
	var targetY = stackWrapper.offsetTop + getDisplayY(id);
	var returnArrow = null;
	stackArrows.some(function(arrow){
		var y = parseInt(arrow.node.getAttribute("d").match(/,(.*?)C/)[1]);
		if(targetY-20<=y && y<=targetY+20){
			returnArrow = arrow;
			return true;
		}
	});
	return returnArrow;
}


//---- rewriteMemory
//
function rewriteMemory(id, str){
	document.getElementById(id).innerHTML = str;
}

//---- int getDisplayY(int id) ----
// 見える通りの、stackWrapperの上端から、指定したIDの要素の上端との距離を返す
function getDisplayY(id, isGlobal){
	if(!isGlobal){
		return document.getElementById(id).offsetTop;
	} else {
		if(id[0]=="g") id=id.slice(1);
		return document.getElementById("g"+id).offsetTop;
	}
}


//------------------------------------------------------------
//---- Node createElement(String tagName, Object options) ----
function createElement(tagName, options){
	var options = options;
	var tag = document.createElement(tagName);
	Object.keys(options).forEach(function(key){
		if(key=='appendTo'){
			options[key].appendChild(tag);
			return;
		} else if(key=='style'){
			Object.keys(options[key]).forEach(function(keyStyle){
				tag.style[keyStyle] = options[key][keyStyle];
			});
			return;
		}
		tag[key] = options[key];
	});
	return tag;
}
