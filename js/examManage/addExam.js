function loopbeselect(obj){
	obj.each(function (){
		var $ele=$(this);
		$ele.click(function (){
			$ele.toggleClass('active');
		});
	});
}
$(function(){
	//返回
	$('.back').click(function (){
		window.location.href='examManagement_list.html';
	});
	//选择地区
	$("#addr").on("click",function(){
			layer.open({
			type: 2,
			title:"选择地区",
			maxmin: true,
			skin:"demo-class",
			closeBtn: 1,
			area: ['333px', '320px'],
			content: ['area.html'], 
			btn: ['确定'],
			scrollbar: false,
			a:1,
			success:function(layero, index){// 获取子页面的数据
				var body = layer.getChildFrame('body', index);
				$('.layui-layer-btn0').on('click',function() {
					body.find(".cActive").each(function() {
						//console.log($(this));
						if ($(this).attr('data-flag')=="true") {
							//alert($(this).attr('data-id'));
							//$("#beselect")  获得的数据放在这个ul里面
						}
					});
				});
			},
			yes: function(index, layero) {
				//按钮【按钮一】的回调
				layer.close(index); //如果设定了yes回调，需进行手工关闭
			},
			btn2: function(index, layero) {
				//按钮【按钮二】的回调
				//console.log(index)
			}
		});
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
})