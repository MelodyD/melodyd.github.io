/**
 * Created by Jeremy on 2016/3/30.
 */
var queue=[];
var inputNum=document.getElementById("input-number");

var queueContent=document.getElementById("queue-content");
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

    switch(option){
        case "left-push":
            if(!isNumberCorrect(number)) return;
            queue.unshift(number);
            break;
        case "right-push":
            if(!isNumberCorrect(number)) return;
            queue.push(number);
            break;
        case "left-pop":
            queue.shift();
            break;
        case "right-pop":
            queue.pop();
            break;
        case "sort":
            sort();
            break;
        case "random":
            for(var i=0;i<60;i++){
                queue[i]= Math.floor(Math.random()*100);
            };
            break;
        default:
            break;
    }
    render();//渲染
}
function sort(){
    var i = 0;

    var tmp=0;
    var outeranimation = setInterval(function () {
        if (i >= queue.length) {
            clearInterval(outeranimation);
            return;
        }

        //for (var j = i + 1; j <  queue.length;j++) {
        //    if (queue[j] < queue[i]) {
        //        tmp = queue[i];
        //        queue[i] = queue[j];
        //        queue[j] = tmp;
        //    }
        //}
        for (var j=0;j <queue.length; j++)
        {
            if(queue[j]>queue[j+1]){
                tmp = queue[j];
                queue[j] = queue[j+1];
                queue[j+1] = tmp;
            }

        }
       render();

        i++;
    }, 100);
}

/**
判断是输入合法性，以及队列情况
 */
function isNumberCorrect(number){
    if(!number) {alert("请输入数字");return 0;}
    if(number<10||number >100){
        alert("请输入10-100以内的数字");
        return 0;
    }
    if(queue.length>60){
        alert("队列元素已满");
        return 0;
    }
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
        items[i].style.backgroundColor='#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
        items[i].style.height=parseInt(items[i].getAttribute("data-value"))/100*100+"%";
    }

}
function init(){
    initOptions();

}
init();