/**
 * Created by Jeremy on 2016/3/30.
 */
var queue=[];
var inputNum=document.getElementById("input-number");

var queueContent=document.getElementById("queue-content");
//var lenth=queue.length;
//var leftPush=document.getElementById("left-push");
//var rightPush=document.getElementById("right-push");
//var leftPop=document.getElementById("left-pop");
//var rightPop=document.getElementById("right-pop");
function initOptions(){

    var inputOptions=document.getElementById("input-options");
    inputOptions.addEventListener("click",function(e){
        if(e.target&& e.target.nodeName.toUpperCase()=="BUTTON"){
            handleOptions(e.target.value);
        }
    });
}
function handleOptions(option){
    var number=inputNum.value.trim();
    console.log(option);
    switch(option){
        case "left-push":
            if(!number) {alert("请输入数字");return;}
            queue.unshift(number);
            break;
        case "right-push":
            if(!number) {alert("请输入数字");return;}
            queue.push(number);
            break;
        case "left-pop":
            queue.shift();
            break;
        case "right-pop":
            queue.pop();
            break;
    }
    console.log(queue.toString());
    render();//渲染
}
function render(){
    var items='';
    for(var i=0;i<queue.length;i++){
        items+="<span  class='queue' data-vaule='"+queue[i]+"'>"+queue[i]+"</span>"
    }
    queueContent.innerHTML=items;
}
function init(){
    initOptions();
}
init();