//新建学校页面选择上级管理机构
	$(".region-s").on("click",function(){
			layer.open({
			type: 2,
			title:"请选择",
			maxmin: true,
			skin:"demo-class",
			closeBtn: 1,
			area: ['333px', '320px'],
			content: ['../../../view/selectschool.html', 'no'], //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			btn: ['确定'],
			a:1,
			success:function(layero, index){// 获取子页面的数据
				 var body = layer.getChildFrame('body', index);
				console.log(body.find(".num"))
				 //var a;
				body.find(".cActive").on("click", function(){
					body.find(".cActive").removeClass("active");
					$(this).addClass("active");
					$(".region-s").find("option").text($(this).text());
					console.log($(this).data("id"))
				})
             
              //  console.log(body.html()) //得到iframe页的body内容
               // body.find(".cq-leave-link").hide();
			},
			yes: function(index, layero) {
				//按钮【按钮一】的回调
				layer.close(index); //如果设定了yes回调，需进行手工关闭
			},
			btn2: function(index, layero) {
				//按钮【按钮二】的回调
				console.log(index)
			}
		});
	});