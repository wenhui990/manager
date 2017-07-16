/*限制输入整数*/
function checkNaN(target){
	target.value=target.value.replace(/\D/g,'');
}
$(function (){
	//日期插件
    $('#datetime1').datetimepicker({
        minView : "month", //选择日期后，不会再跳转去选择时分秒 
        language : 'zh-CN',
        format : 'yyyy-mm-dd',
        todayBtn : 1,
        autoclose : 1,
    });  
	
	$('.save').click(function (){
		var flag=true,
			name=$('#role_name').val(),
			tel=$('#tel').val(),
			idCard=$('#idCard').val(),
			isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/,
			isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		if($.trim(tel)!='')
		{
			if(!(/^1[34578]\d{9}$/.test($.trim(tel)))){ 
		        alert('请输入正确格式的手机号码！');
		        return false;
		    } 
		}
		if($.trim(idCard)!='')
		{
			if(!(isIDCard1.test($.trim(idCard))) && !(isIDCard2.test($.trim(idCard)))){ 
		        alert('请输入正确格式的身份证号码！');
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
                content: '确定要编辑该角色吗？',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定'],
                yes: function(index, layero) {
                    window.location.href='educationUser_list.html';
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
		window.location.href='educationUser_list.html';
	});
	
	/*---------选择机构-----------*/
		$('#selectMechanism').off('click');
		$('#selectMechanism').on("click",function(){
			var str='全部';
			layer.open({
				type: 2,
				maxmin: true,
				skin:"demo-class",
				closeBtn: 1,
				area: ['333px', '418px'],
				content: ['mechanism.html', 'no'], //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
				btn: ['确定'],
				success:function(layero, index){// 获取子页面的数据
					 var body = layer.getChildFrame('body', index);
					 body.find(".cActive").on("click", function(){
						body.find(".cActive").removeClass("active");
						$(this).addClass("active");
						str=$(this).text();
					})
	             
				},
				yes: function(index, layero) {
					//按钮【按钮一】的回调
					$("#selectMechanism").find("option").text(str);
					layer.close(index); //如果设定了yes回调，需进行手工关闭
				},
				btn2: function(index, layero) {
					//按钮【按钮二】的回调
					console.log(index)
				}
			});
		})
});
