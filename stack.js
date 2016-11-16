// 宣言とか
var stack = document.getElementById('stack');
var stackWrapper = document.getElementById('stackWrapper');
var globalMemory = document.getElementById('globalMemory');
var stackArrows = [];

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
		innerHTML: stack.children.length+':'+str
	});
	return element;
}

//---- Node pushGlobalMemory(String str, String textColor, String backgroundColor) ----
// globalMemoryに追加
function pushGlobalMemory(str, textColor, backgroundColor){
	var element = createElement('div', {
		appendTo: globalMemory,
		id: globalMemory.children.length,
		className: 'memory',
		style: {
			color: textColor,
			backgroundColor: backgroundColor
		},
		innerHTML: globalMemory.children.length+':'+str
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
// スタックの左側に矢印を追加 stackArrows配列に自動的に格納
function addStackArrow(start, end, color){
	var x = stackWrapper.offsetLeft-10;
	var y = stackWrapper.offsetTop;
	var arrow = getArrow(x, y+getDisplayY(start)-20, x, y+getDisplayY(end)-10, 3, color||"#aaa")
	stackArrows.push(arrow);
	return arrow;
}

//---- void clearStackArrows() ----
// stackArrowsに格納されているものをすべて削除
function clearStackArrows(){
	stackArrows.forEach(function(arw){
		arw.remove();
	});
}

//---- int getDisplayY(int id) ----
// 見える通りの、stackWrapperの上端から、指定したIDの要素の下端との距離を返す
function getDisplayY(id){
	return stack.offsetHeight - getY(id) - stackWrapper.scrollTop;
}

//---- int getY(int id) ----
// 0番目の要素の下端から、指定したIDの要素の下端との距離を返す
function getY(id){
	var sum = 0;
	for(var i=0; i<id; i++){
		sum += document.getElementById(i).offsetHeight;
	}
	return sum;
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
