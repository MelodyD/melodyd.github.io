/**
 * Created by Jeremy on 2016/3/28.
 */
/* ���ݸ�ʽ��ʾ
 var aqiSourceData = {
 "����": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */
// ������Ⱦͼ�������
var chartData = {};

// ��¼��ǰҳ��ı�ѡ��
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};
var aqiSourceData = {
    "����": randomBuildData(500),
    "�Ϻ�": randomBuildData(300),
    "����": randomBuildData(200),
    "����": randomBuildData(100),
    "�ɶ�": randomBuildData(300),
    "����": randomBuildData(500),
    "����": randomBuildData(100),
    "����": randomBuildData(100),
    "����": randomBuildData(500)
};
var formGraTime=document.getElementById('form-gra-time');
var citySelect=document.getElementById("city-select");
var item;
var text="";

// �������������������ģ�����ɲ�������
function getDateStr(dat) {          //���dat��ʱ��
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
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);      //datStr �� 2016-01-01
        /*
         returnData = {
         2016-01-01 : �������
         2016-01-02 ���������
         }
         */
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);      //dat��һ��
    }
    return returnData;
}

//�������ȥ��ʱ����ʾ������Ϣ
function hoverDetail(e){
    var detail= e.childNodes[0];
    detail.style.visibility='visible';
}

//����Ƴ�ʱ��������Ϣ
function hideDetail(e){
    var detail= e.childNodes[0];
    detail.style.visibility='hidden';
}

//���¼�����
function on(element,eventName,listener) {
    if(element.addEventListener) {
        element.addEventListener(eventName,listener,false);
    }
    else if(element.attachEvent) {
        element.attachEvent('on'+eventName,listener);
    }
    else
        element['on'+eventName]=listener;
}


/**
 * ��Ⱦͼ��
 */
function renderChart() {
    var aqiChartWrap=document.getElementById('aqi-chart-wrap');
    var color='';
    console.log(chartData);
    text='';
    for(var item in chartData) {        //����ÿ��chartData����
        color='rgb('+parseInt(256*Math.random())+','+
            parseInt(256*Math.random())+','+parseInt(256*Math.random())+')';
        text+='<div class="chat_item" onmouseover="hoverDetail(this)" onmouseout="hideDetail(this)"  style="height: '+
            chartData[item]+'px;background-color:'+color+'">'+
            '<span class="detail">date: '+item+'<br />num: '+chartData[item]+'</span>'+'</div>';
    }
    aqiChartWrap.innerHTML = text;
}

/**
 * �ա��ܡ��µ�radio�¼����ʱ�Ĵ�����
 */
function graTimeChange() {
    var ipt=document.getElementsByTagName("input");
    for(var i=0;i<ipt.length;i++) {

        // ȷ���Ƿ�ѡ����˱仯
        if(ipt[i].checked && ipt[i].value!=pageState.nowGraTime) {
            pageState.nowGraTime=ipt[i].value;

            // ���ö�Ӧ����
            initAqiChartData();
        }
    }
}

/**
 * select�����仯ʱ�Ĵ�����
 */
function citySelectChange() {
    // ȷ���Ƿ�ѡ����˱仯           option�ĵ��ֻ��δѡ����Ч��

    // ���ö�Ӧ����
    initAqiChartData();
}

/**
 * ��ʼ���ա��ܡ��µ�radio�¼��������ʱ�����ú���graTimeChange
 */
function initGraTimeForm() {
    //radio ����¼���
    on(formGraTime,'click',graTimeChange);
    //formGraTime.addEventListener('click',graTimeChange,false);
}
/**
 * ��ʼ������Select����ѡ����е�ѡ��
 */
function initCitySelector() {
    // ��ȡaqiSourceData�еĳ��У�Ȼ������idΪcity-select�������б��е�ѡ��
    text='';
    for(item in aqiSourceData) {
        text += '<option>'+item+'</option>';
        citySelect.innerHTML=text;
    }

    // ��select�����¼�����ѡ����仯ʱ���ú���citySelectChange
    on(citySelect,'change',citySelectChange);
    //citySelect.addEventListener('change',citySelectChange,false);
}

/**
 * ��ʼ��ͼ����Ҫ�����ݸ�ʽ
 */
function initAqiChartData() {
    // ��ԭʼ��Դ���ݴ����ͼ����Ҫ�����ݸ�ʽ
    // ����õ����ݴ浽 chartData ��
    chartData={};
    var sum=0,i= 0,char={};
    for(item in aqiSourceData) {
        if(citySelect.value==item) {
            char=aqiSourceData[item];
        }
    }
    switch (pageState.nowGraTime){
        case 'day':
            chartData=char;
            break;
        case 'week':
            sum=0;i=0;
            var week=0;
            for(item in char) {
                //console.log(new Date(item).getDay());
                sum+=char[item];
                i++;
                if(new Date(item).getDay()==6) {        //�ж��Ƿ�������
                    week++;
                    console.log(week);
                    chartData['2016���'+week+'��']=parseInt(sum/i);
                    i=0;
                    sum=0;
                }
            }
            if(i!=0) {
                week++;
                chartData['2016���'+week+'��']=parseInt(sum/i);
            }
            break;
        case 'month':
            sum=0;i=0;
            var mouth=1;
            for(item in char) {
                var date=new Date(item);
                //console.log(date.getMonth());
                if(date.getMonth()!=mouth) {
                    mouth=date.getMonth();

                    if(sum!=0)
                        chartData[date.getFullYear()+'-'+ (mouth ? ('0'+mouth) : mouth)]=parseInt(sum/i);
                    sum=0;
                    i=0;
                }
                sum+=char[item];
                i++;
            }
            if(i!=0) {
                mouth++;
                chartData[date.getFullYear()+'-'+ (mouth ? ('0'+mouth) : mouth)]=parseInt(sum/i);
            }
            break;
    }
    // ����ͼ����Ⱦ����
    renderChart();
}

/**
 * ��ʼ������
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();