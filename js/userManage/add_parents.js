
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
	
	//新建保存     // 编辑保存家长
	$('.save').click(function (){
		//获取当前页面的元素值
		var parents_name=$('#parents_name').val(),  //家长姓名
			parents_phone=$('.parents_phone').val(),   //家长手机号
			schoolLists,  //所在学校
			gradeLists,  //所在学校
			classGradeLists, //所在班级
			child_name, //孩子姓名
			to_child_relate, //与孩子关系
		    relate_childs = [];//存放父母关系对象
		//与孩子关系
		$.each($('.relate_child'), function(i,e) {
			var	schoolLists = $(e).find('.schoolLists').val(),  //所在学校
			gradeLists = $(e).find('.gradeLists').val(),  //所在学校
			classGradeLists=$(e).find('.classGradeLists').val(), //所在班级
			child_name=$(e).find('#child_name').val(), //孩子姓名
			to_child_relate = $(e).find('.to_child_relate input[type="radio"]:checked').val(),
			childobj = {};
			childobj.school = schoolLists;
			childobj.grade = gradeLists;
			childobj.classgrade = classGradeLists;
			childobj.child_name = child_name;
			childobj.child_relate = to_child_relate;
			relate_childs.push(childobj);
		});
		console.log(relate_childs)
		
		
		if(parents_name==""||parents_phone==""||schoolLists==""||classGradeLists==""||gradeLists==""||child_name==""||to_child_relate=="")
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
                content: '确定要新建家长吗？',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定','取消'],
                yes: function(index, layero) {
                    window.location.href='parents_list.html';
                    $('.add_teacher_bar',window.parent.document).remove();
                    // 调用保存家长接口保存
                    
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
		$('.add_parents_bar',window.parent.document).remove();
		window.location.href='parents_list.html';
	});
	
	//继续关联
	var relatenum =0;
	$('.continue_relate').click(function(){
		++relatenum;
		var $rc = $('.relate_child_template').eq(0).clone().appendTo($('.relate_child_all'));
		$rc.show().removeClass('relate_child_template').addClass('relate_child');
		$rc.find('.to_child_relate input[type="radio"]').attr('name','student_relation'+relatenum);
//		$rc
		$.each($rc.find('.to_child_relate label'), function(i,e) {
			var label_for = $(e).attr('for');
			var input_id = $(e).find('input').attr('id');
			$(e).attr('for',label_for+relatenum);
			$(e).find('input').attr('id',input_id+relatenum);
		});
	});
	
	//取消关联
	$(document).on('click','.change_relate',function(){
		var $this = $(this);
		layer.open({
            title: "",
            content: '确定删除吗？',
            skin: 'layui-layer-lana',
            shadeClose: 'true',
            btn: ['确定','取消'],
            yes: function(index, layero) {
                layer.close(index);
                $this.parent().parent().parent().remove();
            },
            btn2: function(index, layero) {
                layer.close(index);
            },
        });
		
	});
	
});
