$(function(){
	$('input[name="hbe"]').change(function(){
		if ($(this).attr('id')==='hbe') {
			$('.no_hbe').hide();
		} else{
			$('.no_hbe').show();
		}
	});
	$(".preserve").on("click",function(){
		var options = $(".period").val();  //学段选中的option
		var columns = $(".column").val();  //科目选中的option
		var versions = $(".version").val();//版本选中的值
		var classis = $(".classis").val(); //年级选中的值
		if(options==""){
			layer.open({
                title: "",
                content: '请选择学段！',
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
		}else if(columns==""){
			layer.open({
                title: "",
                content: '请选择科目！',
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
		}else if(versions==""){
			layer.open({
                title: "",
                content: '请选择版本！',
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
		}else if(classis==""){
			layer.open({
                title: "",
                content: '请选择年级！',
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
                content: '确定保存？',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定','取消'],
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
		}
	});
})
