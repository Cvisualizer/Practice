var colorSet;
var colorCount=0;

socket=io.connect("http://133.27.5.14:5324/",function(){
	//socket.emit('message');
});
socket.emit('message');
socket.on('greeting',function(data){
	colorSet=data;
	console.log(data);
});

function selectColor(){
	var rn=Math.floor(Math.random()*58);
	var rcv=colorSet[colorCount%4][rn];
	colorCount++;
	return rcv;
}