
//获取url中字段
function getUrlParams() {
	var params = {};
	var url = window.location.href;
	var idx = url.indexOf("?");
	if(idx > 0) {
		var queryStr = url.substring(idx + 1);
		var args = queryStr.split("&");
		for(var i = 0, a, nv; a = args[i]; i++) {
			nv = args[i] = a.split("=");
			params[nv[0]] = nv.length > 1 ? nv[1] : true;
		}
	}
	return params;
};	

$(function (){
	//点击编辑后
	var this_url = window.location.href;
	var urlId = getUrlParams().id;
	if (urlId) {
		//编辑学校
		$('#school_name').val('123');
		$('.organization option[value="3"]').attr('selected','selected');
		$('[name="learning_period"]').each(function(i,e){
			if (e.value=='幼儿园') {
				console.log(e);
				$(this).attr('checked',true)
			}
		});
		$('#school_address').val("地址");
		$('#school_postcode').val("邮编");
		$('#school_phone').val("电话”");
		$('#school_url').val("网址”");
		
		//编辑班级
		console.log(window.location.href)
		var subjectjson = JSON.parse('{"gradeName":"高中","chargeTeacherName":"老师姓名2S","subjects":[{"subjecname":"1","teachername":"张三"},{"subjecname":"2","teachername":"张三"}]}');
		$('#grade_name').val(subjectjson.gradeName);
		$('.charge_teacher_name').text(subjectjson.chargeTeacherName);
		//
		$.each(subjectjson.subjects, function(i,e) {
			console.log('subjectlist'+i+' option[value="'+e.subjecname+'"]');
			var tablehtml = '<tr><td><select name="" class="form-control subjectlist'+i+'">'+
							'			<option value="1">数学</option>'+
							'			<option value="2">语文</option>'+
							'			<option value="3">英语</option>'+
							'		</select></td>'+
							'	<td class="teacher1">张三</td>'+
							'	<td><a href="javascript:;" class="edit_teacher">编辑</a>&nbsp;<a href="javascript:;" class="delete_teacher">删除</a></td></tr>';
			$('.teacher_subject').append(tablehtml);
			$('.subjectlist'+i).find('option[value="'+e.subjecname+'"]').attr('selected',true);
		});
		
	}
	
	//点击保存
	$('.save').click(function (){
		
		var school_name=$('#school_name').val(),
			organization=$('.organization').val(),
			learning_period = $('[name="learning_period"]:checked').length;
		
		if(school_name==""||organization==""||learning_period<1)
		{
			layer.open({
                title: "",
                content: '请把*项输入完整！',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定'],
                yes: function(index, layero) {
                    layer.close(index);
                },
                btn2: function(index, layero) {
                    //按钮【按钮二】的回调
                    // layer.close(index);
                },
                cancel: function() {
                    //右上角关闭回调
                }
            });
            
		}else{
			layer.open({
                title: "",
                content: '确定要新建学校吗？',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定'],
                yes: function(index, layero) {
                    window.location.href='schoolManage.html';
                    $('.add_school',window.parent.document).remove();
                },
                btn2: function(index, layero) {
                    //按钮【按钮二】的回调
                    // layer.close(index);
                },
                cancel: function() {
                    //右上角关闭回调
                }
            });
            
		}
	});
	//点击返回
	$('.back').click(function (){
		$('.add_school',window.parent.document).remove();
		window.location.href='schoolManage.html';
	});
	
	//返回班级管理
	$('.back_grademanage').click(function (){
		$('.add_grade_title',window.parent.document).remove();
		window.location.href='gradeManage.html';
	});
	
	//选择班主任弹出层
	$('.select_charge_teacher').click(function (){
		var html = '<table class="table" border="1"><tr><th>老师姓名</th><th>操作</th></tr><tr><td>老师姓名1</td><td><a href="javascript:;" class="selected_charge_teacher">选择</a></td></tr><tr><td>老师姓名2S</td><td><a href="javascript:;" class="selected_teacher">选择</a></td></tr></table>'
		layer.open({
			area:['500px'],
                title: "选择班主任",
                content: html,
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: [],
            });
	});
	//确定班主任
	$(document).on('click','.selected_charge_teacher',function (){
		var teacherName = $(this).parent().prev().text();
		layer.alert('选择了：'+teacherName);
		$('.charge_teacher_name').text(teacherName);
	});
	
	//增加老师
	$('.add_teacher').click(function(){
		$('.teacher_lists').append('<tr><td><select name="" class="form-control subject_list"><option value="1">数学</option><option value="2">语文</option><option value="3">英语</option></select></td><td class="teacher3"></td><td><a href="javascript:;" class="edit_teacher">编辑</a>&nbsp;<a href="javascript:;" class="delete_teacher">删除</a></td></tr>');
	});
	
	//编辑任课教师
	$(document).on('click','.edit_teacher',function(){
		var html = '<table class="table" border="1"><tr><th>老师姓名</th><th>操作</th></tr><tr><td>老师姓名1</td><td><a href="javascript:;" class="selected_teacher">选择</a></td></tr><tr><td>'+$('.teacher2').text()+'</td><td><a href="javascript:;" class="selected_teacher">选择</a></td></tr></table>'
		layer.open({
			area:['500px'],
                title: "选择任课老师",
                content: html,
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: [],
            });
	});
	//确定任课老师
	$(document).on('click','.selected_teacher',function (){
		var teacherName = $(this).parent().prev().text();
		layer.alert('选择了：'+teacherName);
		$('.charge_teacher_name').text(teacherName);
	});
	
	//保存班级
	$('.save_grade').click(function(){
		var grade = {};
		var gradeName = $('#grade_name').val();
		var chargeTeacherName = $('.charge_teacher_name').text();
		var teacher = [];
		$('.teacher_subject tr').each(function(i,e){
			var subjecname = $(e).find('.subjectlist').val();
			var teachername = $(e).find('.teacher1').text();
			var teacherObj = {};
			teacherObj['subjecname'] = subjecname;
			teacherObj['teachername'] = teachername;
			teacher.push(teacherObj);
		});
		grade['gradeName'] = gradeName;
		grade['chargeTeacherName'] = chargeTeacherName;
		grade['subjects'] = teacher;
		$('.add_grade_title',window.parent.document).remove();
		window.location.href='gradeManage.html?obj='+JSON.stringify(grade);
	});
});
