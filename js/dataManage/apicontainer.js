
//ajax get
function ajaxget(url, reqs, cbfunc){
    var querystr = "";
    for (k in reqs){
        querystr += "&" + k + "=" + reqs[k];
    }
    if (querystr.length > 0){
        url = url + '?' + querystr.slice(1);
    }

    $.ajax({
        url: url,
        type: 'get',
        success: function (resp) {
            if (typeof(resp) == "object" && ("code" in resp) && ("msg" in resp)){
                layer.alert('错误: ' + resp['detail']);
                return;
            }
            cbfunc(resp);
        },
        error: function(d, data) {
            layer.alert("错误: " + JSON.stringify(d) + ", " + JSON.stringify(data));
        },
        complete: function(data) {
        }
    });
}

//ajax post
function ajaxpost(url, reqs, data, cbfunc){
    var querystr = "";
    for (k in reqs){
        querystr += "&" + k + "=" + reqs[k];
    }
    if (querystr.length > 0){
        url = url + '?' + querystr.slice(1);
    }

    $.ajax({
        url: url,
        type: 'post',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (resp) {
            if (typeof(resp) == "object" && "code" in resp && "msg" in resp){
                layer.alert('错误: ' + resp['detail']);
                return;
            }
            cbfunc(resp);
        },
        error: function(d, data) {
            layer.alert("错误: " + JSON.stringify(d));
        },
        complete: function(data) {
        }
    });
}

//ajax put
function ajaxput(url, reqs, data, cbfunc){
    var querystr = "";
    for (k in reqs){
        querystr += "&" + k + "=" + reqs[k];
    }
    if (querystr.length > 0){
        url = url + '?' + querystr.slice(1);
    }

    $.ajax({
        url: url,
        type: 'put',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (resp) {
            if ((typeof(resp) == "object") && ("code" in resp) && ("msg" in resp)){
                layer.alert('错误: ' + resp['detail']);
                return;
            }
            cbfunc(resp);
        },
        error: function(d, data) {
            layer.alert("错误: " + JSON.stringify(d));
        },
        complete: function(data) {
        }
    });
}

function ajaxdelete(url, reqs, cbfunc){
    var querystr = "";
    for (k in reqs){
        querystr += "&" + k + "=" + reqs[k];
    }
    if (querystr.length > 0){
        url = url + '?' + querystr.slice(1);
    }

    $.ajax({
        url: url,
        type: 'delete',
        success: function (resp) {
            if (typeof(resp) == "object" && "code" in resp && "msg" in resp){
                layer.alert('错误: ' + resp['detail']);
                return;
            }
            cbfunc(resp);
        },
        error: function(d, data) {
            layer.alert("错误: " + JSON.stringify(d));
        },
        complete: function(data) {
        }
    });
}

//ajax post(put) form
function ajaxform(url, reqs, data, method, cbfunc){
    var querystr = "";
    for (k in reqs){
        querystr += "&" + k + "=" + reqs[k];
    }
    if (querystr.length > 0){
        url = url + '?' + querystr.slice(1);
    }

    $.ajax({
        url: url,
        type: method,
        // contentType: "application/json",
        data: data,
        success: function (resp) {
            if (typeof(resp) == "object" && "code" in resp && "msg" in resp){
                console.log("error.... ");
                layer.alert('错误: ' + resp['detail']);
                return;
            }
            cbfunc(resp);
        },
        error: function(d, data) {
            layer.alert("错误: " + JSON.stringify(d));
        },
        complete: function(data) {
        }
    });
}

//获取版本列表
function getEditions(cbfunc, page, size){
    var url = org_url + dataUrl['edition']['editionList'];
    var reqs = {"size":size, "page":page};
    ajaxget(url, reqs, cbfunc);
}

//获取 年级课本
function getTerms(cbfunc, page, size){
    var url = org_url + dataUrl['textbook']['getTerms'];
    var reqs = {"size":size, "page":page};
    ajaxget(url, reqs, cbfunc);
}

//获取 科目列表
function getCourses(cbfunc, page, size){
    var url = org_url + dataUrl['textbook']['getCourse'];
    var reqs = {"size":size, "page":page};
    ajaxget(url, reqs, cbfunc);
}

//获取 教材列表
function getTextbooks(cbfunc, page=1, size=10, textbooktype=0, stage=0, course=0, editon=0, term=0, status=2){
    var reqs = {};

    reqs['page'] = page;
    reqs['size'] = size;
    if (textbooktype != "0"){
        reqs['textbooktype'] = textbooktype;
    }
    if (stage != "0"){
        reqs['stageid'] = stage;
    }
    if (course != "0"){
        reqs['courseid'] = course;
    }
    if (editon != "0"){
        reqs['editionid'] = editon;
    }
    if (term != "0"){
        reqs['termid'] = term;
    }
    if (status != "2"){
        reqs['valid'] = status;
    }

    var url = org_url + dataUrl['textbook']['getTextbooks'];
    ajaxget(url, reqs, cbfunc);
}

function getTextbook(cbfunc, id){
    var url = org_url + dataUrl['textbook']['getTextbooks'] + '/' + id;
    ajaxget(url, null, cbfunc);
}

function enableTextbook(cbfunc, id, valid){
    var url = org_url + dataUrl['textbook']['updateTextbook'] + "/" + id;
    var tb = {};
    tb['id'] = id;
    tb['valid'] = valid;
    ajaxform(url, null, tb, 'put', cbfunc);
}

function updateTextbook(cbfunc, id, data){
    var url = org_url + dataUrl['textbook']['updateTextbook'] + "/" + id;
    ajaxform(url, null, data, 'put', cbfunc);
}

function newTextbook(cbfunc, data){
    var url = org_url + dataUrl['textbook']['updateTextbook'];
    ajaxform(url, null, data, 'post', cbfunc);
}

//获取 机构树
function getInstitutionTree(cbfunc){
    var url = org_url + dataUrl['organization']['educationAll'];
    $.ajax({
        url: url,
        type: 'get',
        success: function(resp) {
            cbfunc(resp);
        },
        error: function(d, data) {
            console.log(data);
        },
        complete: function(data) {
        }
    });
}

//获取 学校列表
function getSchoolTree(cbfunc){
    var url = org_url + dataUrl['school']['getSchools'];
    ajaxget(url, null, cbfunc);
}

//获取 学校关联课本
function getSchoolTextbooks(cbfunc, schoolid){
    var url = org_url + dataUrl['schoolBook']['getSchoolBooks'] + '/' + schoolid;
    $.ajax({
        url: url,
        type: 'get',
        success: function(resp) {
            cbfunc(resp);
        },
        error: function(d, data) {
            console.log(data);
        },
        complete: function(data) {
        }
    });
}

//获取 学校年级的关联课本
function getSchoolGradeTextbooks(cbfunc, schoolid, gradeid){
    var url = org_url + dataUrl['schoolBook']['getSchoolBooks'];
    url += "?schoolid=" + schoolid + "&gradeid=" + gradeid;
    $.ajax({
        url: url,
        type: 'get',
        success: function(resp) {
            cbfunc(resp);
        },
        error: function(d, data) {
            console.log(data);
        },
        complete: function(data) {
        }
    });
}

//通用信息列表，包括：版本列表，年级列表，年级课本列表，科目列表 等
function getCommonList(cbfunc){
    var url = org_url + dataUrl['common']['getCommonList'];
    $.ajax({
        url: url,
        type: 'get',
        success: function(resp) {
            cbfunc(resp);
        },
        error: function(d, data) {
            console.log(data);
        },
        complete: function(data) {
        }
    });
}

//获取 教师列表 (模糊查询)
function getTeachers(cbfunc, page, size, school, name, mobile, valid){
    var url = org_url + dataUrl['teacher']['getTeachers'];
    var reqs = {};
    reqs['page'] = page;
    reqs['size'] = size;
    if (school){
        reqs['schoolid'] = school;
    }
    if (name){
        reqs['name'] = name;
    }
    if (mobile){
        reqs['phone'] = mobile;
    }
    if (valid != "2"){
        reqs['valid'] = valid;
    }
    ajaxget(url, reqs, cbfunc);
}

//获取 班级列表
function getClazz(cbfunc, schoolid){
    var url = org_url + dataUrl['clazz']['clazz'];
    var querystr = "?a=1";
    querystr += "&schoolid=" + schoolid;

    $.ajax({
        url: url + querystr,
        type: 'get',
        success: function(resp) {
            cbfunc(resp);
        },
        error: function(d, data) {
            console.log(data);
        },
        complete: function(data) {
        }
    });
}

function addTeacher(cbfunc, data){
    var url = org_url + dataUrl['teacher']['addTeacher'];
    ajaxpost(url, null, data, cbfunc);
}

function updateTeacher(cbfunc, data){
    var url = org_url + dataUrl['teacher']['updateTeacher'];
    ajaxput(url, null, data, cbfunc);
}

function deleteTeacher(cbfunc, itemid){
    var url = org_url + dataUrl['teacher']['deleteTeacher'] + "/" + itemid;
    ajaxdelete(url, null, cbfunc);
}

//通用信息列表，包括：版本列表，年级列表，年级课本列表，科目列表 等
function getTeacher(cbfunc, id){
    var url = org_url + dataUrl['teacher']['getTeacher'] + '/' + id;
    ajaxget(url, null, cbfunc);
}

function enableTeacher(cbfunc, id, valid){
    var url = org_url + dataUrl['teacher']['enableTeacher'] + "/" + id + "?valid=" + valid;
    ajaxput(url, null, null, cbfunc);
}

function enableStudent(cbfunc, ids, valid){
    var url = org_url + "/student/updatemorestudent";
    var data = {"id":ids.join(","), "valid":valid};
    ajaxpost(url, null, data, cbfunc);
}

function deleteStudent(cbfunc, id){
    var url = org_url + "/student/" + id;
    ajaxdelete(url, null, cbfunc);
}

//添加版本
function addVersion(cbfunc, title, sn, note){
    var url = org_url + dataUrl['edition']['createEdition'];
    var version = new Object();
    version['title'] = title;
    if (sn == ""){
        version['sn'] = "99";
    }else{
        version['sn'] = sn;
    }
    version['note'] = note;
    version['valid'] = "1";
    ajaxform(url, null, version, 'post', cbfunc);
}

//enable 版本 
function enableVersion(cbfunc, id, valid){
    var url = org_url + dataUrl['edition']['updateEdition'] + "/" + id;
    var version = {};
    version['id'] = id;
    version['valid'] = valid;
    ajaxform(url, null, version, 'put', cbfunc);
}

function getVersions(cbfunc, page, size){
    var url = org_url + dataUrl['edition']['editionList'];
    var reqs = {};
    reqs['page'] = page;
    reqs['size'] = size;
    ajaxget(url, reqs, cbfunc);
}

function getVersion(cbfunc, id){
    var url = org_url + dataUrl['edition']['getEdition'] + "/" + id;
    ajaxget(url, null, cbfunc);
}

function editVersion(cbfunc, vid, title, sn, note){
    var url = org_url + dataUrl['edition']['updateEdition'] + "/" + vid;
    var version = {};
    version['id'] = vid;
    version['title'] = vvm.title;
    version['sn'] = vvm.sn;
    version['note'] = vvm.note;
    ajaxform(url, null, version, 'put', cbfunc);
}


