/**
 * Created by Jeremy on 2016/4/2.
 */
/**
 * Created by Jeremy on 2016/3/30.
 */
var queue=[];
var rabbits=[];
var result=[];
var queueContent=document.getElementById("queue-content");
var inputOptions=document.getElementById("input-info");
var addRabbit=document.getElementById("add-rabbit");
var textArea=document.getElementById("text-area");
var rabbitsContent=document.getElementById("rabbits-content");
/*
 初始化按键
 */
function initOptions(){
    inputOptions.addEventListener("keyup",function(e){
                handleKey(e.keyCode);
    });
    queueContent.addEventListener("mouseover",function(e){
        if(e.target&& e.target.nodeName.toUpperCase()=="SPAN"){
            handleQueueOver(e.target);
        }

    });
    queueContent.addEventListener("mouseout",function(e){
        if(e.target&& e.target.nodeName.toUpperCase()=="SPAN") {
            handleQueueOut(e.target);
        }
        });
    queueContent.addEventListener("mousedown",function(e){
        if(e.target&& e.target.nodeName.toUpperCase()=="SPAN") {
            handleQueueDown(e.target);
        }
    });
    addRabbit.onclick=handleRabbits;
}
/**
 *按键功能处理函数
 * @param option
 */
function handleKey(option){
    console.log(option);
    var text="";
    var temp="";
    if(option==13||option==32||option==9)
    {
        text=inputOptions.value.trim();
        inputOptions.value="";
       if( queue.every(function(item,index,array){
            return item!=text;
        })
       ) queue.push(text);

    }
    if(option==188)
    {
        text=inputOptions.value.trim();
        temp=text.slice(0,-1);
        console.log(temp);
        inputOptions.value="";
        if( queue.every(function(item,index,array){
                return item!=temp;
            })
        ) queue.push(temp);
    }
    render(queueContent,queue);
}
function handleQueueOver(target){
    target.style.backgroundColor="red";
    target.innerHTML="删除"+target.getAttribute("data-value");
    //render();
      //queueContent.childNodes
}
function handleQueueOut(target){
       target.innerHTML=target.getAttribute("data-value");
       target.style.backgroundColor="";

}
function handleQueueDown(target){
    var targetText=target.getAttribute("data-value");
    for(var i=0;i<queue.length;i++)
    {
        if(queue[i]=targetText)
        {
            queue.splice(i,1);
            removeElement(target);
            return;
        }
    }

}
function handleRabbits(){
    if(isInputCorrect()){
        render(rabbitsContent,rabbits);
    }
}

/**
 判断是输入合法性，以及队列情况
 */
function isInputCorrect(){
    result=[];
    var inputInfo=textArea.value.trim();
    //var pattern=/(\s)/g;
    if(inputInfo=="") {alert("空数据"); return;}
    var re=new RegExp("[\\s,，]+","g");
    result=inputInfo.replace(re,"|").split("|");
    rabbits=rabbits.concat(result);
    console.log(rabbits);
    if(rabbits.length>10)
    {
        rabbits=rabbits.slice(rabbits.length-10);
    }
    return 1;
}
/**
 *渲染函数
 */
function render(content,arry){
    var text='';
    for(var i=0;i<arry.length;i++){
        text+="<span  class='queue'  data-value='"+arry[i]+"'>"+arry[i]+"</span>"
    }
    content.innerHTML=text;

}
function removeElement(_element){
    var _parentElement = _element.parentNode;
    if(_parentElement){
        _parentElement.removeChild(_element);
    }
}
function init(){
    initOptions();
}
init();