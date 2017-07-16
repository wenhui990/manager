
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
	//时间
	$(".form_datetime").datetimepicker({
        format: "yyyy-MM-dd",
        minView: "month",
        language: 'zh-CN',
        todayBtn: true
    });
	
	//点击编辑后
	var this_url = window.location.href;
	var urlId = getUrlParams().id;
	
	
	//点击保存
	$('.save').click(function (){
		
		var teacher_name=$('#teacher_name').val(),
			teacher_phone=$('#teacher_phone').val(),
			schoolLists = $('.schoolLists').val();
		
		if(teacher_name==""||teacher_phone==""||schoolLists=="")
		{
			layer.open({
                title: "",
                content: '请把带*的选项输入完整！',
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
                content: '确定要新建教师吗？',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定'],
                yes: function(index, layero) {
                    window.location.href='teacher_list.html';
                    $('.add_teacher_bar',window.parent.document).remove();
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
		$('.add_teacher_bar',window.parent.document).remove();
		window.location.href='teacher_list.html';
	});
	
//	//点击表格td出现下拉框，选择科目和班级，是否班主任
	$(document).on('click','.subject_grade_lists_td span',function(e){
		e.stopPropagation();
		e=window.event||e;
	    if(document.all){
	        e.cancelBubble=true;
	    }else{
	        e.stopPropagation();
	    }
		$(this).hide();
		$(this).next().show();
	});
	//下拉框触发事件
	$(document).on('change','.subject_grade_lists_td select',function(){
		$(this).prev().text($(this).val()).show();
		$(this).hide();
		$(this).prev().show();
	});
	
	//点击添加行
	var count;
	$('#add_teacher_line').click(function(){
		count = $('.numberlist:last').text()*1;
		$('.subject_grade_lists').append(add_teacher(++count));
	});
	
	//删除行
	$(document).on('click','.delete_line',function(){
		console.log($(this).parents('tr'));
	});
	
	//添加行模版
	function add_teacher(count){
		var addTeacherHtml = '<tr>'+
							'	<td class="numberlist">'+count+'</td>'+
							'	<td class="subject_grade_lists_td">'+
							'		<span class="squad none">请选择</span>'+
							'		<select name="" class="form-control squadlists">'+
							'			<option value="">请选择</option>'+
							'			<option value="初一">初一</option>'+
							'			<option value="初二">初二</option>'+
							'			<option value="初三">初三</option>'+
							'		</select>'+
							'	</td>'+
							'	<td class="subject_grade_lists_td">'+
							'		<span class="grage none">请选择</span>'+
							'		<select name="" class="form-control gragelists">'+
							'			<option value="">请选择</option>'+
							'			<option value="一班">一班</option>'+
							'			<option value="二班">二班</option>'+
							'			<option value="三班">三班</option>'+
							'		</select>'+
							'	</td>'+
							'	<td class="subject_grade_lists_td">'+
							'		<span class="subject none">请选择</span>'+
							'		<select name="" class="form-control subjectlists">'+
							'			<option value="">请选择</option>'+
							'			<option value="数学">数学</option>'+
							'			<option value="语文">语文</option>'+
							'			<option value="英语">英语</option>'+
							'		</select>'+
							'	</td>'+
							'	<td class="subject_grade_lists_td">'+
							'		<span class="isCharge none">请选择</span>'+
							'		<select name="" class="form-control">'+
							'			<option value="">请选择</option>'+
							'			<option value="是">是</option>'+
							'			<option value="否">否</option>'+
							'		</select>'+
							'	</td>'+
							'	<td class="delete_td"> '+
							'		<span class="glyphicon glyphicon-remove delete_line"></span>'+
							'	</td>'+
							'</tr>';
		return addTeacherHtml;
	}
});
