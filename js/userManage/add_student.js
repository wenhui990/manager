
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
    $(".form_datetime1").datetimepicker({
        minView: "month",
        language: 'zh-CN',
        todayBtn: true
    });
	
	
	//点击新建保存     // 编辑保存学生
	$('.save').click(function (){
		//获取当前页面的元素值
		var student_name=$('#student_name').val(),  //学生姓名
			gradeLists=$('.gradeLists').val(),   //所在年级
			schoolLists = $('.schoolLists').val();  //所在学校
			classGradeLists=$('.classGradeLists').val(), //所在班级
			student_ID = $('#student_ID').val(),  //身份证号
			studentSex = $('.studentSex').val()||"",  //性别
			student_birth = $('#student_birth').val()||"",  //出生日期
			into_school_date = $('#into_school_date').val()||"",  //入校时间
			patriarch1_name = $('#patriarch1_name').val()||"",  //家长一姓名
			patriarch1_phone = $('#patriarch1_phone').val()||"", //家长一电话
			student_relation1 = $('.student_relation input[name="student_relation1"]:checked').val()||"",  //家长一和学生关系
			student_relation2 = $('.student_relation input[name="student_relation2"]:checked').val()||"",  //家长二和学生关系
			patriarch2_name = $('#patriarch2_name').val()||"",  //家长二姓名
			patriarch2_phone = $('#patriarch2_phone').val()||""; //家长二电话
		
		var studentJson = {
			student_name: student_name,
			gradeLists: gradeLists,
			classGradeLists: classGradeLists,
			student_ID: student_ID,
			studentSex: studentSex,
			student_birth: student_birth,
			into_school_date: into_school_date,
			student_relation1:{
				student_relation1:student_relation1,
				patriarch1_name: patriarch1_name,
				patriarch1_phone: patriarch1_phone
			},
			student_relation2:{
				student_relation2:student_relation1,
				patriarch2_name: patriarch2_name,
				patriarch2_phone: patriarch2_phone
			}
		};
		
		console.log(studentJson);
		
		if(student_name==""||gradeLists==""||schoolLists==""||classGradeLists==""||student_ID=="")
		{
			layer.open({
                title: "",
                content: '请把带*的选项输入完整！',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定'],
                yes: function(index, layero) {
                    layer.close(index);
                }
            });
            
		}else{
			layer.open({
                title: "",
                content: '确定要新建教师吗？',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定','取消'],
                yes: function(index, layero) {
                    window.location.href='student_list.html';
                    $('.add_teacher_bar',window.parent.document).remove();
                    // 调用保存接口保存
                    
                },
                btn2: function(index, layero) {
                    //按钮【按钮二】的回调
                    layer.close(index);
                },
                cancel: function() {
                    //右上角关闭回调
                }
            });
            
		}
	});
	
	
	
	
	
	//点击返回
	$('.back').click(function (){
		$('.see_student_bar',window.parent.document).remove();
		window.location.href='student_list.html';
	});
	
});
