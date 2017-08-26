
//ajax get
function ajaxget(url, reqs, cbfunc){
    var querystr = "";
    for (k in reqs){
        querystr += "&" + k + "=" + reqs[k];
    }
    if (querystr.length > 0){
        url = url + '?' + querystr.slice(1)+"&token="+sessionStorage.token;
    }else{
    	url = url+"?token="+sessionStorage.token;
    }

    $.ajax({
        url: url,
        type: 'get',
        success: function (resp) {
            if (typeof(resp) == "object" && ("code" in resp) && ("msg" in resp)){
                if (resp.code=='10010'){
                    alertMsg("身份验证失败！请重新登录！", function(){
                        parent.location.href = "../../enter.html";
                    });
                }else{
                    layer.alert('错误: ' + resp['detail']);
                }
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
	data.token = sessionStorage.token;
    var querystr = "";
    for (k in reqs){
        querystr += "&" + k + "=" + reqs[k];
    }
    if (querystr.length > 0){
        url = url + '?' + querystr.slice(1)+'&token='+sessionStorage.token;
    }else{
    	url += '?token='+sessionStorage.token;
    }

    $.ajax({
        url: url,
        type: 'post',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (resp) {
            if (typeof(resp) == "object" && "code" in resp && "msg" in resp){
                if (resp.code=='10010'){
                    alertMsg("身份验证失败！请重新登录！", function(){
                        parent.location.href = "../../enter.html";
                    });
                }else{
                    layer.alert('错误: ' + resp['detail']);
                }
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
        url = url + '?' + querystr.slice(1)+'&token='+sessionStorage.token;
    }else{
    	url += '?token='+sessionStorage.token;
    }

    $.ajax({
        url: url,
        type: 'put',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (resp) {
            if ((typeof(resp) == "object") && ("code" in resp) && ("msg" in resp)){
                if (resp.code=='10010'){
                    alertMsg("身份验证失败！请重新登录！", function(){
                        parent.location.href = "../../enter.html";
                    });
                }else{
                    layer.alert('错误: ' + resp['detail']);
                }
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
        url = url + '?' + querystr.slice(1)+'&token='+sessionStorage.token;
    }else{
    	url += '?token='+sessionStorage.token;
    }

    $.ajax({
        url: url,
        type: 'delete',
        success: function (resp) {
            if (typeof(resp) == "object" && "code" in resp && "msg" in resp){
                if (resp.code=='10010'){
                    alertMsg("身份验证失败！请重新登录！", function(){
                        parent.location.href = "../../enter.html";
                    });
                }else{
                    layer.alert('错误: ' + resp['detail']);
                }
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
    data.token = sessionStorage.token;
    for (k in reqs){
        querystr += "&" + k + "=" + reqs[k];
    }
    if (method=='post') {
    	if (querystr.length > 0){
	        url = url +  '?' + querystr.slice(1)+'&token='+sessionStorage.token;
	    }else{
	    	url += '?token='+sessionStorage.token;
	    }
    }else{
    	if (querystr.length > 0){
	        // url = url + "/" +  data.id+'?' + querystr.slice(1)+'&token='+sessionStorage.token;
            url = url +'?' + querystr.slice(1)+'&token='+sessionStorage.token;
	    }else{
	    	// url = url + "/" + data.id+'?token='+sessionStorage.token;
            url += '?token='+sessionStorage.token;
	    }
    }
    
    console.log("form url: " + url);
    $.ajax({
        url: url,
        type: method,
        // contentType: "application/json",
        data: data,
        success: function (resp) {
            if (typeof(resp) == "object" && "code" in resp && "msg" in resp){
                if (resp.code=='10010'){
                    alertMsg("身份验证失败！请重新登录！", function(){
                        parent.location.href = "../../enter.html";
                    });
                }else{
                    layer.alert('错误: ' + resp['detail']);
                }
                return;
            }
            cbfunc(resp);
        },
        error: function(d, data) {
            layer.alert("网络错误: " + JSON.stringify(d));
        },
        complete: function(data) {
        }
    });
}

/* 
 *  版本
 */
// 获取版本列表
function getEditions(cbfunc, page, size){
    var url = org_url + dataUrl.edition
    console.log("url: " + url);
    var reqs = {"size":size, "page":page};
    ajaxget(url, reqs, cbfunc);
}
// 创建版本
function addEdition(cbfunc, title, sn, note){
    var url = org_url + dataUrl.edition;
    var version = new Object();
    version['title'] = title;
    version['sn'] = sn;
    version['note'] = note;
    version['valid'] = "1";

    ajaxform(url, null, version, 'post', cbfunc);
}
// 禁用/启用版本
function enableEdition(cbfunc, id, valid){
    var url = org_url + dataUrl.edition;
    var version = {};
    version['id'] = id;
    version['valid'] = valid;
    ajaxform(url, null, version, 'put', cbfunc);
}
// 获取版本
function getEdition(cbfunc, id){
    var url = org_url + dataUrl.edition + "/" + id;
    ajaxget(url, null, cbfunc);
}
// 编辑版本
function editEdition(cbfunc, vid, title, sn, note){
    var url = org_url + dataUrl.edition;
    console.log("editEdition url:" + url);
    var version = {};
    version['id'] = vid;
    version['title'] = vvm.title;
    version['sn'] = vvm.sn;
    version['note'] = vvm.note;
    ajaxform(url, null, version, 'put', cbfunc);
}

/*
 * 年级课本
 */ 
//获取 年级课本
function getTerms(cbfunc, page, size){
    var url = org_url + dataUrl.term;
    var reqs = {"size":size, "page":page};
    ajaxget(url, reqs, cbfunc);
}

/*
 * 科目
 */
//获取 科目
function getCourses(cbfunc, page, size){
    var url = org_url + dataUrl.courses;
    var reqs = {"size":size, "page":page};
    ajaxget(url, reqs, cbfunc);
}

/*
 *  教材
 */
// 获取教材列表
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

    var url = org_url + dataUrl.textbooks;
    ajaxget(url, reqs, cbfunc);
}
// 获取教材
function getTextbook(cbfunc, id){
    var url = org_url + dataUrl.textbook + '/' + id;
    ajaxget(url, null, cbfunc);
}
// 禁用/启用教材
function enableTextbook(cbfunc, id, valid, textbooktype){
    var url = org_url + dataUrl.textbook;
    var tb = {};
    tb['id'] = id;
    tb['valid'] = valid;
    tb['textbooktype'] = textbooktype;
    ajaxput(url, null, tb, cbfunc);
}
// 编辑教材
function updateTextbook(cbfunc, data){
    var url = org_url + dataUrl.textbook;
    ajaxput(url, null, data, cbfunc);
}
//创建教材
function addTextbook(cbfunc, data){
    var url = org_url + dataUrl.textbook;
    ajaxform(url, null, data, 'post', cbfunc);
}

/*
 * 学校关联教材
 */
//获取 学校关联教材
function getSchoolTextbooks(cbfunc, schoolid, gradeid){
    var url = org_url + dataUrl.schooltextbook;
    var reqs = {"schoolid":schoolid, "gradeid":gradeid};
    ajaxget(url, reqs, cbfunc);
}
//新增 学校关联教材
function newSchoolTextbook(cbfunc, data){
    var url = org_url + dataUrl.schooltextbook;
    ajaxput(url, null, data, cbfunc);
}
//删除 学校关联教材
function removeSchoolTextbook(cbfunc, data){
    var url = org_url + dataUrl.schooltextbook;
    ajaxput(url, null, data, cbfunc);
}

/*
 * 教师
 */
// 获取教师列表 (模糊查询)
function getTeachers(cbfunc, page, size, school, name, mobile, valid){
    var url = org_url + dataUrl.teachers;
    var reqs = {};
    reqs['page'] = page;
    reqs['size'] = size;
    if (school){
        reqs['schoolid'] = school;
    }
    if (name){
        reqs['name'] = name.trim();
    }
    if (mobile){
        reqs['phone'] = mobile.trim();
    }
    if (valid != "2"){
        reqs['valid'] = valid;
    }
    ajaxget(url, reqs, cbfunc);
}
// 创建教师
function addTeacher(cbfunc, data){
    var url = org_url + dataUrl.teacher;
    ajaxpost(url, null, data, cbfunc);
}
// 编辑教师
function updateTeacher(cbfunc, data){
    var url = org_url + dataUrl.teacher;
    ajaxput(url, null, data, cbfunc);
}
// 删除教师
function deleteTeacher(cbfunc, itemid){
    var url = org_url + dataUrl.teacher + "/" + itemid;
    ajaxdelete(url, null, cbfunc);
}
// 获取教师
function getTeacher(cbfunc, id){
    var url = org_url + dataUrl.teacher + '/' + id;
    ajaxget(url, null, cbfunc);
}
// 启用/禁用教师
function enableTeacher(cbfunc, id, valid){
    var url = org_url + dataUrl.teacher;
    var data = {};
    data['id'] = id;
    data['valid'] = valid;
    ajaxput(url, null, data, cbfunc);
}
// 导出教师
function exportTeacher(cbfunc, schoolid, name, phone, valid){
    var url = org_url + dataUrl.excelteacher;
    var reqs = {};
    if (schoolid){
        reqs['schoolid'] = schoolid;
    }
    if (name){
        reqs['name'] = name;
    }
    if (phone){
        reqs['phone'] = phone;
    }
    if (valid){
        reqs['valid'] = valid;
    }
    ajaxget(url, reqs, cbfunc);
}
// 导入教师
function importTeacher(cbfunc, school, file){
    var url = org_url + dataUrl.teachers + "?schoolid=" + school + "&token=" + sessionStorage.token;
    console.log("url : " + url);
    $.ajax({
        url: url,
        type: "post",
        data: file,
        processData: false,
        contentType: false,
        success: function (resp) {
            console.log("resp: " + JSON.stringify(resp));
            cbfunc(resp);
        },
        error: function(d, data) {
            layer.alert("错误: " + JSON.stringify(d));
        },
        complete: function(data) {
        }
    });
    // ajaxform(url, null, file, 'post', cbfunc);
}


//获取 机构树
function getInstitutionTree(cbfunc){
    var url = org_url + dataUrl.institutions;
    ajaxget(url, null, cbfunc);
}

//获取 学校列表
function getSchoolTree(cbfunc){
    var url = org_url + dataUrl.schools;
    ajaxget(url, null, cbfunc);
}

// 通用信息列表，包括：版本列表，年级列表，年级课本列表，科目列表 等
function getCommonList(cbfunc){
    var url = org_url + dataUrl.commonlist;
    ajaxget(url, null, cbfunc);
}


//获取 班级列表
function getClazz(cbfunc, schoolid){
    var url = org_url + dataUrl.clazzs;
    var reqs = {"schoolid":schoolid};
    ajaxget(url, reqs, cbfunc);
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

