
make_dataList(function(){
    global_variable('*s','blue');
    pushGlobalMemory('*s','white','blue');
});
make_dataList(function(){
    global_variable('*s1','blue');
    pushGlobalMemory('*s1','white','blue');
});
make_dataList(function(){
    global_variable('*s2','blue');
    pushGlobalMemory('*s2','white','blue');
});
make_dataList(function(){ main_func('main','black') });
make_dataList(function(){
    main_local_variable('a','red');
    pushMemory('a','white','red');
});
make_dataList(function(){
    main_local_variable('b','red');
    pushMemory('b','white','red');
});
make_dataList(function(){
    main_local_variable('c','red');
    pushMemory('c','white','red');
});
make_dataList(function(){
    main_local_variable('*p','red');
    pushMemory('*p','white','red');
});


function update(){

}
