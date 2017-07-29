
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
	var id = getUrlParams().id;
	if (id) {
		$.ajax({
			type:"get",
			url:org_url + dataUrl.jurisdiction.role+id,
			data:{token: sessionStorage.token},
			success: function(data){
				$('#admin_name').val(data.name);
		        $('#admin_note').val(data.note);
			}
		});
	}
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
                }
            });
            
		}else{
			var data ={
        		name: $('#admin_name').val(),
        		note: $('#admin_note').val(),
        		token: sessionStorage.token
       		};
       		var roleurl = org_url + dataUrl.jurisdiction.role;
			if(id) data.id = id;
			$.ajax({
            	type: id?"put":"post",
            	url: id?roleurl+id:roleurl,
            	data: data,
            	async:true,
            	success: function(data){
            		if (data==1) {
            			if (id) {
            				layer.alert('修改成功！');
            			} else{
            				layer.alert('新建成功！');
            			}
//          			window.location.href='role_list.html';
//          			$('.add_teacher_bar',window.parent.document).remove();
            		}else{
            			layer.alert('新建失败！');
            		}
            	}
            });
		}
	});
	//点击返回
	$('.back').click(function (){
		$('.add_teacher_bar',window.parent.document).remove();
		window.location.href='role_list.html';
	});
	
});
