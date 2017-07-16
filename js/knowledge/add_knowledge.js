/*限制输入整数*/
	
$(function (){
	$('.save').click(function (){
		
		var secondname=$('.secondname').val(),
		
			 grade=$('.grade').val();
		
		if(secondname==""||grade=="")
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
            
		}else{
			layer.open({
                title: "",
                content: '确定要新建知识结构？',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定'],
                yes: function(index, layero) {
                    window.location.href='knowledge_list.html';
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
	$('.back').click(function (){
		window.location.href='knowledge_list.html';
	});
});
