//json数组去重
Array.prototype.removeRepeatAttr = function() {
	var tmp = {},
		a = this.slice();
	for(var i = j = 0; i < a.length; i++) {
		if(!tmp[a[i].id]) {
			tmp[a[i].id] = !0;
			j++;
		} else {
			this.splice(j, 1);
		}
	};
}
var pagecount = 10,
	allgrage, allclazz;
var students = new Vue({
	el: '#studentMain',
	data: {
		page:1,
		pagesize:10,
		studentLists: '', //学生列表
		schools: '', //学校列表
		grades: '', //年级
		classs: '', //班
		grades1: '', //年级
		classs1: '',
		schoolChange: '',
		gradeChange: '',
		schoolsVal: '',
		gradeVal: '',
		classVal: '',
		schoolsVal1: '',
		gradeVal1: '',
		classVal1: '',
		checkeds: '', //全选框状态
		allchecked: '', //单选框状态
		iswarning: false,
		checkItem: true,
		studentdata: {},
		checksubmit: true,
		checksubmit1: true
	},
	beforeCreate: function() {
		$.ajax({
			type: "get",
			url: org_url + dataUrl.schools+'?token='+sessionStorage.token,
			success: function(data) {
				if (data.code=='10010') {
					layer.alert('身份验证失败！请重新登录！',{yes:function(){
						parent.location.href = "../../enter.html";
					},cancel:function(){
						parent.location.href = "../../enter.html";
					}});
					return false;
				}
				students.schools = data.data;
			}
		});
	},
	methods: {
		checkAll: function(e) { //全选
			students.checkeds = $(e.target).prop('checked');
		},
		checkOne: function(e) { //单选
			var check = $(e.target).prop('checked');
			console.log(check)
			check ? $(e.target).parents('tr').addClass('warning') : $(e.target).parents('tr').removeClass('warning')
		},
		searchstudent: function(e) { //搜索学生
			students.studentdata = {
				page: students.page,
				size: students.pagesize,
				school: students.schoolsVal,
				clazz: students.classVal,
				grade: students.gradeVal,
				valid: $('#valid').val(),
				name: $('#studentname').val().trim(),
				token: sessionStorage.token
			}
			pages(students.studentdata);
		},
		seeStudent: function(see, id) { //查看学生
			window.location.href = 'student_add.html?id=' + id + '&' + see + '=' + see;
		},
		exportStudent: function(e) { //导出学生
			$(e.target).prop('href', org_url + dataUrl.exportstudent + '?school=' + students.schoolsVal + '&clazz=' + students.classVal + '&grade' + students.gradeVal + '&valid=' + $("#valid").val() + '&name=' + $('#studentname').val().trim() + '&token=' + sessionStorage.token);
		},
		delStudent: function(id, e,ind) { //删除学生
			layer.confirm('是否删除该帐号？', function() {
				$.ajax({
					type: 'delete',
					url: org_url + dataUrl.student + id+'?token='+sessionStorage.token,
					success: function(data) {
						if (data.code=='10010') {
							layer.alert('身份验证失败！请重新登录！',{yes:function(){
								parent.location.href = "../../enter.html";
							},cancel:function(){
								parent.location.href = "../../enter.html";
							}});
							return false;
						}
						if(data == 1) {
							layer.alert('删除成功！',function(index){
								layer.close(index);
								$(e.target).parents('tr').remove();
								if (ind==0) {
									pages();
								}
							});
							
						} else {
							layer.alert('删除失败！');
						}
					}
				})
			})
		},
		enableValid: function(index){   //禁用学生
			var s = this.studentLists[index];
			var reversevalid = (s['valid'] == "1" ? "0":"1");
			var ids = [s['id']];
			var data = {"id":ids.join(","), "valid":reversevalid};
			var url = org_url + dataUrl.studentstatus+"?token="+sessionStorage.token;
			$.ajax({
				type: 'post',
				url: url,
				contentType: "application/json",
				data: JSON.stringify(data),
				success: function(data) {
					if (data.code=='10010') {
						layer.alert('身份验证失败！请重新登录！',{yes:function(){
							parent.location.href = "../../enter.html";
						},cancel:function(){
							parent.location.href = "../../enter.html";
						}});
						return false;
					}
					if(data == 1) {
						layer.alert(reversevalid==0?'禁用成功':'启用成功');
						s['valid'] = reversevalid;
					} else {
						layer.alert(reversevalid==0?'禁用失败':'启用失败');
					}
				}
			})
		}
	},
	watch: {
		checkeds: function(n, old) {
			students.allchecked = n;
			students.iswarning = n;
		},
		schoolsVal: function(n, o) {
			console.log(n)
			if (n=='') {
				students.gradeVal = '';
				students.classVal = '';
			}
			gradelist(n, 'grades', 'classs');
		},
		schoolsVal1: function(n, o) {
			if (n=='') {
				students.gradeVal1 = '';
				students.classVal1 = '';
			}
			if (students.schoolsVal1 != ''&&students.gradeVal1 != ''&&students.classVal1 != '') {
				students.checksubmit = false;
				console.log(students.checksubmit)
			}else{
				students.checksubmit = true;
			}
			gradelist(n, 'grades1', 'classs1');
		},
		gradeVal: function(n, o) {
			if (n=='') {
				students.classVal = '';
			}
			students.classs = allclazz;
			var len = students.classs.length,
				tempclass = [];
			for(var i = 0; i < len; i++) {
				if(students.classs[i]['pid'] == n) {
					tempclass.push(students.classs[i]);
				}
			}
			students.classs = tempclass;
		},
		gradeVal1: function(n, o) {
			if (n=='') {
				students.classVal1 = '';
			}
			if (students.schoolsVal1 !== ''&&students.gradeVal1 !== ''&&students.classVal1 !== '') {
				students.checksubmit = false;
			}else{
				students.checksubmit = true;
			}
			students.classs1 = allclazz;
			var len = students.classs1.length,
				tempclass = [];
			for(var i = 0; i < len; i++) {
				if(students.classs1[i]['pid'] == n) {
					tempclass.push(students.classs1[i]);
				}
			}
			students.classs1 = tempclass;
			console.log(students.classs1)
		},
		classVal1: function(n,o){
			console.log(n)
			if (students.schoolsVal1 !== ''&&students.gradeVal1 !== ''&&students.classVal1 !== '') {
				students.checksubmit = false;
			}else{
				students.checksubmit = true;
			}
		}
	}
});
console.log(students.checksubmit)
function gradelist(n, g, c) {
	$.ajax({
		type: "get",
		url: org_url + dataUrl.clazzs,
		data: {
			schoolid: n,
			token: sessionStorage.token
		},
		success: function(data) {
			if (data.code=='10010') {
				layer.alert('身份验证失败！请重新登录！',{yes:function(){
					parent.location.href = "../../enter.html";
				},cancel:function(){
					parent.location.href = "../../enter.html";
				}});
				return false;
			}
			var gdatas = [];
			var cdatas = [];
			for(var i = 0; i < data.length; i++) {
				var gradedata = {};
				var classdata = {};
				gradedata.id = data[i].gradeid;
				gradedata.title = data[i].gradename;
				gdatas.push(gradedata);
				classdata.pid = data[i].gradeid;
				classdata.id = data[i].id;
				classdata.name = data[i].name;
				cdatas.push(classdata);
			}
			gdatas.removeRepeatAttr();
			allgrage = gdatas;
			allclazz = cdatas;
			students[g] = gdatas;
//			students[c] = cdatas;
		}
	})
}

pages();
//分页
function pages(datas) {
	$('#pageToolbar').html('');
	var data = {};
	if(datas) {
		datajson = datas;
	} else {
		datajson = {
			page: students.page,
			size: students.pagesize,
			token: sessionStorage.token
		}
	}
	$.ajax({
		type: "get",
		url: org_url + dataUrl.students,
		data: datajson,
		success: function(data) {
			if (data.code=='10010') {
				layer.alert('身份验证失败！请重新登录！',{yes:function(){
					parent.location.href = "../../enter.html";
				},cancel:function(){
					parent.location.href = "../../enter.html";
				}});
				return false;
			}
			students.studentLists = data.data;
			pagecount = data.total;
			$('#pageToolbar').Paging({
				page:students.page,
				pagesize: students.pagesize,
				count: pagecount,
				toolbar: true,
				hash: true,
				callback: function(page, size, count) {
//					students.pagesize=size;
//					students.page=page;
					datajson.page = page;
					datajson.size = size;
					pagesize = size;
					$.ajax({
						type: "get",
						url: org_url + dataUrl.students,
						data: datajson,
						success: function(data) {
							students.studentLists = data.data;
						}
					});
				},
				changePagesize: function(ps) {
					console.log(datajson)
					datajson.page = 1;
					datajson.size = ps;
					pagesize = ps;
					$.ajax({
						type: "get",
						url: org_url + dataUrl.students,
						data: datajson,
						success: function(data) {
							students.studentLists = data.data;
						}
					});
				}
			});
		}
	});
}
//点击新建教师
//		$('.addStudent').click(function() {
//			//			$('.breadcrumb',window.parent.document).append('<li class="active add_teacher_bar"><span class="Current_page iframeurl" name="view/userManage/student_add.html" style="color: rgb(51, 51, 51); cursor: default;">新建学生</span></li>');
//			window.location.href = 'student_add.html';
//		});

//		//点击查看
//		function seeStudent() {
//			//			$('.addStudent').click(function() {
//			$('.breadcrumb', window.parent.document).append('<li class="active see_student_bar"><span class="Current_page iframeurl" name="view/userManage/student_see.html" style="color: rgb(51, 51, 51); cursor: default;">查看学生</span></li>');
//			window.location.href = 'student_see.html';
//			//			});
//		}

//		//点击编辑
//		function editStudent() {
//			$('.breadcrumb', window.parent.document).append('<li class="active see_student_bar"><span class="Current_page iframeurl" name="view/userManage/student_edit.html" style="color: rgb(51, 51, 51); cursor: default;">编辑学生</span></li>');
//			window.location.href = 'student_edit.html';
//		}

//点击禁用用户
//function off() {
//	layer.open({
//		title: "",
//		content: '确定禁用该用户吗？',
//		skin: 'layui-layer-lana',
//		shadeClose: 'true',
//		btn: ['确定', "取消"],
//		yes: function(index, layero) {
//			layer.close(index);
//			students.v
//		},
//		btn2: function(index, layero) {
//			//按钮【按钮二】的回调
//			layer.close(index);
//		},
//		cancel: function() {
//			//右上角关闭回调
//		}
//	});
//}

//导入用户
$('.importStudent').click(function() {
	$('#toStudent').modal('show');
	$('.modal-title').text('导入选择！');
	students.schoolsVal1='';
	students.gradeVal1='';
	students.classVal1='';
	$('#student_file').val('');
});

 $('#student_file').change(function(){
 	var fd = new FormData();
	fd.append('file', $('#student_file')[0].files[0]);
	var filename = $('#student_file')[0].files[0].name;
	console.log(filename.indexOf('xls'))
	if (filename.indexOf('xls')>-1||filename.indexOf('xlsx')>-1) {
		return true;
	}else{
		layer.alert('只能上传excel文件！');
		return false;
	}
 })

//导入确定
$("#toStudentOk").click(function() {
	if (students.schoolsVal1=='') {
		layer.alert('请选择学校！');
		return false;
	}
	if (students.gradeVal1=='') {
		layer.alert('请选择年级！');
		return false;
	}
	if (students.classVal1=='') {
		layer.alert('请选择班级！');
		return false;
	}
	var fd = new FormData();
	fd.append('file', $('#student_file')[0].files[0]);
//	var filename = $('#student_file')[0].files[0].name;
//	if (filename.split('.')[1].indexOf('xls')<0) {
//		layer.alert('只能上传excel文件！');
//		return false;
//	}
//	console.log($('#student_file')[0].files[0])
	var data = {
		school: students.schoolsVal1,
		clazz: students.classVal1,
		grade: students.gradeVal1,
		fromdata: fd
	}
	if ($('#student_file').val()=='') {
		layer.alert('请选择上传文件！');
		return false;
	}
//	return;
	$.ajax({
		type: "post",
		url: org_url + dataUrl.tostudent + '?school=' + students.schoolsVal1 + '&clazz=' + students.classVal1 + '&grade=' + students.gradeVal1+'&token='+sessionStorage.token,
		data: fd,
		processData: false,
		contentType: false,
		success: function(data){
			if (data.code=='10010') {
				layer.alert('身份验证失败！请重新登录！',{yes:function(){
					parent.location.href = "../../enter.html";
				},cancel:function(){
					parent.location.href = "../../enter.html";
				}});
				return false;
			}
			console.log(data)
			if(data == 1) {
				layer.open({
					title: "导入结果！",
					content: '<div>'+(data.result?data.result:"")+'</div><br /><a href="'+org_url+dataUrl.resultstudent+'?filename='+data.filename+'&token='+sessionStorage.token+'" class="btn btn-info btn-block">查看导入结果</a>',
					skin: 'layui-layer-lana',
					area: ['auto', 'auto'],
					shadeClose: false,
					fixed: false,
					btn: [],
					cancel:function(){
						pages();
					},
				});
			} else {
				layer.open({
					title: "导入结果！",
					content: '<div>'+(data.result?data.result:"")+'</div><br /><a href="'+org_url+dataUrl.resultstudent+'?filename='+data.filename+'&token='+sessionStorage.token+'" class="btn btn-info btn-block">查看导入结果</a>',
					skin: 'layui-layer-lana',
					area: ['auto', 'auto'],
					shadeClose: false,
					fixed: false,
					btn: [],
					cancel:function(){
						pages();
					},
				});
			}

		}
	});
	console.log(data)
	$('#toStudent').modal('hide');
})

//批量调班,禁用
var batchdata={}, batchsuccees, batchloser;
$('.batchChangeShift,.batchForbidden').click(function() {
	students.schoolsVal1='';
	students.gradeVal1='';
	students.classVal1='';
	$('.checked_student_lists').html('');
	if($('.checkItem:checked').length < 1) {
		$('.checked_student_lists').html('没有选择学生');
	};
	$.each($('.checkItem:checked'), function(i, e) {
		var id = $(e).parents('tr').children().eq(0).find('input').val();
		var schooleName = $(e).parents('tr').children().eq(2).text();
		var grade = $(e).parents('tr').children().eq(3).text() + $(e).parents('tr').children().eq(4).text();
		var name = $(e).parents('tr').children().eq(5).text();
		var idCard = $(e).parents('tr').children().eq(6).text();
		var stu = '<tr class="student_pag" data-id="' + id + '">' +
			'	<td class="csl_school">' + schooleName + '</td>' +
			'	<td class="csl_school">' + grade + '</td>' +
			'	<td class="csl_school">' + name + '</td>' +
			'	<td class="csl_school">' + idCard + '</td>' +
			'	<td class="glyphicon glyphicon-remove remove_student" title="删除"></td>' +
			'</tr>'
		$('.checked_student_lists').append(stu);
	});
	console.log($(this).attr('class'))
	if($(this).attr('class').indexOf('batchForbidden') > -1) { //禁用
		$('.jinyong').hide();
		$('#batchChangeOk').attr('disabled',false);
		$('#table_p').css('height', '200px');
		batchdata.valid=0;
		$('.modal-title').text('禁用用户');
		batchsuccees = '禁用成功！';
		batchloser = '禁用失败！';
		
	} else { //调班
		$('.jinyong').show();
		$('#table_p').css('height', '150px');
		batchdata.clazzid=students.classVal1;
		$('.modal-title').text('调班');
		batchsuccees = '调班成功！';
		batchloser = '调班失败！';
	};
	$('#batchChange').modal('show');
})
//批量调班，禁用  确定
$(document).on('click', '#batchChangeOk', function() {
	var batchChange = [];
	$.each($('.checked_student_lists tbody>tr'), function(i, e) {
		batchChange.push($(e).attr('data-id'));
	});
	batchdata.id = batchChange.toString();
	batchdata.clazzid=students.classVal1;
//	batchdata.token = sessionStorage.token;
	console.log(batchChange.toString() + '==' + students.classVal1)
	$.ajax({
		type: "post",
		url: org_url + dataUrl.studentstatus+'?token='+sessionStorage.token,
		contentType: "application/json",
		data: JSON.stringify(batchdata),
		success: function(data) {
			if (data.code=='10010') {
				layer.alert('身份验证失败！请重新登录！',{yes:function(){
					parent.location.href = "../../enter.html";
				},cancel:function(){
					parent.location.href = "../../enter.html";
				}});
				return false;
			}
			if(data == 1) {
				layer.alert(batchsuccees, function(index) {
					layer.close(index);
					$('#batchChange').modal('hide');
					window.location.reload();
				});
			} else {
				layer.alert(batchloser);
			}
		}
	});
});
//取消已经选择的学生
$(document).on('click', '.remove_student', function() {
	$(this).parents('tr').remove();
});