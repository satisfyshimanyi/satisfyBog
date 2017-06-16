//实例化编辑器
//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
var ue = UE.getEditor('editor');

function getContent() {
    var arr = [];
    //arr.push("使用editor.getContent()方法可以获得编辑器的内容");
    //arr.push("内容为：");
    arr.push(UE.getEditor('editor').getContent());
    $.ajax({
        url:"/learn/saveArticle",
        type:"POST",
        data:{
          article:UE.getEditor('editor').getContent(),
        },
        dataType:"json",
        success:function(data){
          if(data.success="true"){
              window.setTimeout('location.href="/"',0);
          }
        }

    });
    //alert(arr.join("\n"));
}