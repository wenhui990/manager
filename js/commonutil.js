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

