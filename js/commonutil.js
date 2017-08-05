/*
 *
 *
 */

var g_grademap =  {
    "1" : "小班",
    "2" : "中班",
    "3" : "大班",
    "4" : "一年级",
    "5" : "二年级",
    "6" : "三年级",
    "7" : "四年级",
    "8" : "五年级",
    "9" : "六年级",
    "10" : "七年级",
    "11" : "八年级",
    "12" : "九年级",
    "13" : "高一年级",
    "14" : "高二年级",
    "15" : "高三年级"
};
function id2gradename(id){
    return g_grademap(id);
}

function name2gradeid(name){
    for (k in g_grademap){
        if (g_grademap[k] == name){
            return k;
        }
    }
}

function checkTextInput(t, msg){
    if (t == null || t.length == 0){
        alert(msg);
        return false;
    }else{
        return true;
    }
}

function checkMobileInput(t, msg){
    if (t == null || t.length == 0){
        alert(msg);
        return false;
    }else{
        return true;
    }
}

function getQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

// 获取当前页面url的querystring, 返回的是对象形式的参数
function getUrlArgObject(){
    var args=new Object();
    var query=location.search.substring(1);//获取查询串
    var pairs=query.split(",");//在逗号处断开
    for(var i=0;i<pairs.length;i++){
        var pos=pairs[i].indexOf('=');//查找name=value
        if(pos==-1){//如果没有找到就跳过
            continue;
        }
        var argname=pairs[i].substring(0,pos);//提取name
        var value=pairs[i].substring(pos+1);//提取value
        args[argname]=unescape(value);//存为属性
    }
    return args;//返回对象
}


function confirmDialog(msg, yescbfunc, nocbfunc){
    layer.confirm(msg, {
        btn: ['确认','取消'] //按钮
    }, yescbfunc, nocbfunc);
}

function promptMsg(msg, cbfunc){
    layer.msg(msg, {shift: -1}, cbfunc);
}

function alertMsg(msg, cbfunc){
    layer.alert(msg, null, cbfunc);
}

function commonMsg(msg, cbfunc){
    layer.msg(msg, {shift: -1}, cbfunc);
}