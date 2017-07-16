/*限制输入整数*/
	function checkNaN(target){
		target.value=target.value.replace(/\D/g,'');
	}
$(function (){
	$('.save').click(function (){
		var flag=true,
			name=$('#role_name').val(),
			tel=$('#tel').val(),
			idCard=$('#idCard').val();
		if($.trim(tel)!='')
		{
			if(!(/^1[34578]\d{9}$/.test($.trim(tel)))){ 
		        alert('请输入正确格式的手机号码！');
		        return false;
		    } 
		}
		if($.trim(name)=='')
		{
			flag=false; 
		}
		if(!flag)
		{
			layer.open({
                title: "",
                content: '请把必填项输入完整！',
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
            return false;
		}else{
			layer.open({
                title: "",
                content: '确定要新建该用户吗？',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定'],
                yes: function(index, layero) {
                    window.location.href='platdoemUser_list.html';
                },
                btn2: function(index, layero) {
                    //按钮【按钮二】的回调
                    // layer.close(index);
                },
                cancel: function() {
                    //右上角关闭回调
                }
            });
            return false;
		}
	});
	$('.back').click(function (){
		window.location.href='platdoemUser_list.html';
	});
});
