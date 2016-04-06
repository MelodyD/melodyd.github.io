/**
 * Created by Jeremy on 2016/4/2.
 */
/**
 * Created by Jeremy on 2016/3/30.
 */
var queue=["阿萨德","123","asd","ASD"];
var textArea=document.getElementById("text-area");
var queueContent=document.getElementById("queue-content");
var result=[];
/*
初始化按键
 */
function initOptions(){
    var inputOptions=document.getElementById("input-options");
    inputOptions.addEventListener("click",function(e){
        if(e.target&& e.target.nodeName.toUpperCase()=="BUTTON"){
            handleOptions(e.target.value);

        }
    });
}
/**
 *按键功能处理函数
 * @param option
 */
function handleOptions(option){

    switch(option){
        case "left-push":
            if(!isInputCorrect()) return;
            for (var i=0;i<result.length;i++)
            {
                queue.unshift(result[i]);
            }
            break;
        case "right-push":
            if(!isInputCorrect()) return;
            for (var i=0;i<result.length;i++)
            {
                queue.push(result[i]);
            }
            break;
        case "left-pop":
            queue.shift();
            break;
        case "right-pop":
            queue.pop();
            break;
        case "find":
            render();
            var seek=document.getElementById("seek-info").value;
            if(seek=="") return;
            for(var i=0;i<queue.length;i++)
            {
                if (queue[i].indexOf(seek)>=0)
                {
                    var items=document.getElementsByClassName("queue");
                    items[i].style.backgroundColor="red";
                }
            }
            return;
            break;
        default:
            break;
    }
    render();//渲染
}
/**
 判断是输入合法性，以及队列情况
 */
function isInputCorrect(){
    if(queue.length>60){
        alert("队列元素已满");
        return 0;
    }
    result=[];
    var inputInfo=textArea.value.trim();
    //var pattern=/(\s)/g;
    if(inputInfo=="") {alert("空数据"); return;}
    var re=new RegExp("[\\s,，]+","g");
    result=inputInfo.replace(re,"|").split("|");
    console.log(result);
    return 1;
}
/**
 *渲染函数
 */
function render(){
    var text='';
    for(var i=0;i<queue.length;i++){
        text+="<div  class='queue'  data-value='"+queue[i]+"'>"+queue[i]+"</div>"
    }
    queueContent.innerHTML=text;
    var items=document.getElementsByClassName("queue");
    for(var i=0;i<items.length;i++){
    }
}
function init(){
    initOptions();
render();
}
init();