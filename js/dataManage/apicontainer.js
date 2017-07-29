

//获取版本列表
function getEditions(cbfunc, page, size){
    var url = org_url + dataUrl['edition']['editionList'] + "?size=" + size + "&page=" + page;
    $.ajax({
        url: url,
        type: 'get',
        success: function (resp) {
            cbfunc(resp);
        },
        error: function(d, data) {
            console.log(data);
        },
        complete: function(data) {
        }
    });
}

//获取 年级课本
function getTerms(cbfunc){
    //FIXME 为了一次取出所有记录，定义一个大数
    var pagesize = 1000000;
    var url = org_url + dataUrl['textbook']['getTerms'] + "?size=" + pagesize + "&page=1";
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

//获取 科目列表
function getCourses(cbfunc){
    //FIXME 为了一次取出所有记录，定义一个大数
    var pagesize = 1000000;
    var url = org_url + dataUrl['textbook']['getCourse'] + "?size=" + pagesize + "&page=1";
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

//获取 教材列表
function getTextbooks(cbfunc, page=1, size=10, textbooktype=0, stage=0, course=0, editon=0, term=0, status=2){
    // console.log("selectedTextBookType: " + vvm.selectedTextBookType + ", selectedStage: " + vvm.selectedStage + ", selectedCourse: " + vvm.selectedCourse + ", selectedEdtion: " + vvm.selectedEdtion + ", selectedTerm: " + vvm.selectedTerm + ", selectedStatus: " + vvm.selectedStatus);

    var querystr = "&";
    if (textbooktype != "0"){
        querystr += "textbooktype=" + textbooktype + "&";
    }
    if (stage != "0"){
        querystr += "stageid=" + stage + "&";
    }
    if (course != "0"){
        querystr += "courseid=" + course + "&";
    }
    if (editon != "0"){
        querystr += "editionid=" + editon + "&";
    }
    if (term != "0"){
        querystr += "termid=" + term + "&";
    }
    if (status != "2"){
        querystr += "valid=" + status + "&";
    }

    if (querystr.length == 1){
        querystr = "";
    }

    var pagesize = size;
    var url = org_url + dataUrl['textbook']['getTextbooks'] + "?size=" + pagesize + "&page=" + page + querystr;
    console.log('url: ' + url);
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
    var querystr = "?page=" + page + '&size=' + size;
    if (school){
        querystr += "&schoolid=" + school
    }
    if (name){
        querystr += "&name=" + name
    }
    if (mobile){
        querystr += "&phone=" + mobile
    }
    if (valid != "2"){
        querystr += "&valid=" + valid
    }
    url += querystr;
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

function addTeacher(cbfunc, req){
    var url = org_url + dataUrl['teacher']['addTeacher'];
    console.log('url ' + url);
    $.ajax({
        url: url,
        type: 'post',
        contentType: "application/json",
        data: JSON.stringify(req),
        success: function(resp) {
            console.log("resp: " + JSON.stringify(resp));
            cbfunc(resp);
        },
        error: function(d, data) {
            console.log("error: " + JSON.stringify(d));
        },
        complete: function(data) {
        }
    });
}

function updateTeacher(cbfunc, req){
    var url = org_url + dataUrl['teacher']['updateTeacher'];
    console.log('url ' + url);
    $.ajax({
        url: url,
        type: 'put',
        contentType: "application/json",
        data: JSON.stringify(req),
        success: function(resp) {
            console.log("resp: " + JSON.stringify(resp));
            cbfunc(resp);
        },
        error: function(d, data) {
            console.log("error: " + JSON.stringify(d));
        },
        complete: function(data) {
        }
    });
}

//通用信息列表，包括：版本列表，年级列表，年级课本列表，科目列表 等
function getTeacher(cbfunc, id){
    var url = org_url + dataUrl['teacher']['getTeacher'] + '/' + id;
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

