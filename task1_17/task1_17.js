/**
 * Created by Jeremy on 2016/3/27.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */


// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
    var aqiChartWrap=document.getElementsByClassName("aqi-chart-wrap");
    var aqiDataShow='';
    var selectedCity=pageState.nowSelectCity;
    var wrapWidth=aqiChartWrap[0].offsetWidth-100;
    for(var i=0 in chartData[selectedCity]){
        var aqiData=chartData[selectedCity][i];                                 //aqiData是具体的数值
        aqiDataShow+="<span class='show' data-aqi='"+aqiData+"' alet=''></span>";
    }
    aqiChartWrap[0].innerHTML=aqiDataShow;
    var aqiShow=document.getElementsByTagName("span");
   var width=Math.floor(wrapWidth/aqiShow.length);
    for(var i=0;i<aqiShow.length;i++)
    {
        aqiShow[i].style.width=width+"px";
        aqiShow[i].style.height=aqiShow[i].getAttribute("data-aqi")+"px";
        aqiShow[i].style.backgroundColor='#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(selectGraTime) {
    // 确定是否选项发生了变化
    if(selectGraTime==pageState["nowGraTime"]) return;
    // 设置对应数据
    pageState["nowGraTime"]=selectGraTime;
    console.log( pageState["nowGraTime"]);
    initAqiChartData();                     //选项改变，初始化数据
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(selectCity) {
    // 确定是否选项发生了变化
 if(selectCity==pageState["nowSelectCity"]) return;
    // 设置对应数据
    pageState["nowSelectCity"]=selectCity;
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var formGraTime=document.getElementById("form-gra-time");
    formGraTime.addEventListener("click" ,function(e){
        if(e.target&& e.target.nodeName.toUpperCase()=="INPUT")
        {
            graTimeChange( e.target.value);
        }
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var citySelect=document.getElementById("city-select");
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        var text='';
    for(var item in aqiSourceData) {
        text += '<option>'+item+'</option>';
        citySelect.innerHTML=text;
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
   citySelect .addEventListener("change" ,function(e){
        if(e.target&& e.target.nodeName.toUpperCase()=="SELECT")
        {   console.log(e.target.value);
            citySelectChange( e.target.value);

        }
    });

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var selectedCity=pageState.nowSelectCity;
    var char=aqiSourceData[selectedCity];
    var i =0;       //天数记数
    var week=0;     //周数
    var sum=0;      //阶段总和
    var month=0;
    switch (pageState.nowGraTime) {
        case "day":
            chartData[selectedCity]=char;
            break;
        case "week":
            var temp={};
            weekLabel:for(var item in char)         //从头开始累加，当天数为6时进行一次为temp添加数据，并从新开始循环。
                    {
                        i++;
                        sum+=char[item];
                        var date=new Date(item);
                        if(date.getDay()==6){
                            week++;
                            temp[week]=Math.floor(sum/i);
                            console.log(temp[week]);
                            sum=0;
                            i=0;
                            continue weekLabel;
                        }
                        temp[week]=Math.floor(sum/i);
                    }
           chartData[selectedCity]=temp;

            break;
        case "month":
            var temp={};
            monthLabel: for(var item in char)
                        {
                            i++;
                            sum+=char[item];
                            var date=new Date(item);
                            console.log(date.getMonth());
                            if(date.getMonth()!=month)
                            {
                                sum+=char[item];
                                temp[month]=Math.floor(sum/i);
                                month++;
                                sum=0;
                                i=0;
                                continue monthLabel;
                            }
                            temp[month]=Math.floor(sum/i);
                        }
            chartData[selectedCity]=temp;
            break;
    }

}


/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();