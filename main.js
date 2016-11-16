//---- 動作確認用

// // スタック
// for(var i=0; i<7; i++){
// 	pushMemory("pre"+i, "#fff", "#bbb");
// }

(function(){
 for(var i=0; i<7; i++){
  pushMemory("pre"+i, "#fff", "#bbb");
 }
})();
// グローバル
pushGlobalMemory("global1");
pushGlobalMemory("global2");
//----

function update(){

}
