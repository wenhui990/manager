
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
function loopbeselect(obj){
	obj.each(function (){
		var $ele=$(this);
		$ele.click(function (){
			$ele.toggleClass('active');
		});
	});
}

$(function (){
	
	//点击保存
	$('.save').click(function (){
		
		var admin_name=$('#admin_name').val(),
			admin_phone=$('#admin_phone').val(),
			schoolLists = $('.schoolLists').val(),
			admin_note = $('#admin_note').val()||'';
		
		if(admin_name==""||admin_phone==""||schoolLists=="")
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
                content: '确定要新建管理员吗？',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定'],
                yes: function(index, layero) {
                    window.location.href='role_list.html';
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
		window.location.href='role_list.html';
	});
	
	loopbeselect($('.beselect li'));
	loopbeselect($('.selected li'));
	//添加学校
	$('#add').click(function (){
		$('.beselect li').each(function (){
			var $ele=$(this);
			if(($ele).hasClass('active'))
			{
				$('beselect').remove($ele);
				$('.selected').append($ele);
				$ele.removeClass('active');
			}
		});
	});
	//添加全部学校
	$('#addAll').click(function (){
		$('.beselect li').each(function (){
			var $ele=$(this);
			$('beselect').remove($ele);
			$('.selected').append($ele);
			$ele.removeClass('active');
		});
	});
	//移除学校
	$('#remove').click(function (){
		$('.selected li').each(function (){
			var $ele=$(this);
			if(($ele).hasClass('active'))
			{
				$('.beselect').append($ele);
				$ele.removeClass('active');
			}
		});
	});
	//移除全部学校
	$('#removeAll').click(function (){
		$('.selected li').each(function (){
			var $ele=$(this);
			$('.beselect').append($ele);
			$ele.removeClass('active');
		});
	});
	
});
