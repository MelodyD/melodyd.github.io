/**
 * Created by Jeremy on 2016/3/23.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {
};
//var canAdd=false;

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var aqiCityInput=document.getElementById("aqi-city-input").value;
    var aqiValueInput=document.getElementById("aqi-value-input").value;

    aqiCityInput.trim().replace(/^\s+|\s+$/g, '');
    var re=new RegExp("^([\u4E00-\u9FA5|a-zA-Z])+$");
    var re1=new RegExp("^[1-9]*$","i");
    console.log( aqiCityInput.trim());
    console.log(aqiValueInput);
    if(!re.test(aqiCityInput.trim() ))
    {
        alert("城市名请输入中文或字母");
        return 0;
    }
    if(!re1.test(aqiValueInput))
    {
        alert("空气质量请输入正整数");
        return 0;
    }
    aqiData[aqiCityInput]=aqiValueInput;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

        var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
       // if(!isDataEmpty(aqiData))
         for(var city in aqiData){
        items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>"
         }
        document.getElementById("aqi-table").innerHTML = city ? items : "";
}
//function isDataEmpty(data){
//    var obj=new Object();
//    for(var o in data){
//        if(o==obj) return 0;
//    }
//    return 1;
//
//}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.
    delete aqiData[this.getAttribute("data-city")]
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn=document.getElementById("add-btn");
    addBtn.addEventListener("click",addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var aqiTable=document.getElementById("aqi-table");
    aqiTable.addEventListener("click",function(e){
        if(e.target&& e.target.nodeName.toUpperCase()=="BUTTON"){
            console.log(e.target.getAttribute("data-city"));
            delBtnHandle.call(e.target);
        }
    });
    //for(var i=0;i<deleteButton.length;i++)
    //{
    //
    //    deleteButton[i].addEventListener("click",delBtnHandle);
    //}
}

init();
window.onload=function(){renderAqiList();}