/*
可視化のための構造体用データ構造の設計法
オブジェクトの配列を用い、nameもしくはobj.idを手がかりにして構造体やその子要素を検索する
*/


//構造体はオブジェクトの配列として登録する
var structs=new Array();

//ひとつの構造体を表すオブジェクト
structs[0]={
	name:"AryDimensionList",	//構造体名
	obj:null,					//構造体の実体(実体生成時に追加)
	childs:new Array(),			//子要素として持つ変数のリスト
	pointers:new Array()		//子要素として持つポインタのリスト
};

//構造体の子要素の変数を表すオブジェクト
structs[0].childs[0]={
	name:"elem",				//変数名
	type:"int",					//変数の型
	obj:null,					//変数の実体(実体生成時に追加)
	value:0,					//変数の値(代入時に反映)
	depth:1						//階層の深さ
}

//構造体の子要素のポインタを表すオブジェクト
structs[0].pointers[0]={
	name:"next",				//ポインタの名前
	type:"AryDimensionList",	//ポインタの型
	obj:null,					//ポインタの実体(実体生成時に追加)
	target:null,				//指している先の実体(確定時に追加)
	depth:1						//階層の深さ
}