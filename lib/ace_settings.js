var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow");
editor.session.setMode("ace/mode/c_cpp");

editor.commands.addCommand({
    Name:"savefile",
    bindKey:{
        win : "Ctrl-S",
        mac : "S"
    },
    exec: function(editor){
         onSaveFile();
    }
})