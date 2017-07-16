function off()
{
	layer.open({
        title: "",
        content: '确定禁用该用户吗？',
        skin: 'layui-layer-lana',
        shadeClose: 'true',
        btn: ['确定',"取消"],
        yes: function(index, layero) {
            layer.close(index);
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
$(function (){
	$('#pageToolbar').Paging({pagesize:10,count:85,toolbar:true,callback:function(page,size,count){
		console.log(page)
	}});
	$('.addRole').click(function (){
		window.location.href='add_educationrole.html';
	});
	$(".tree").treemenu({delay:300}).openActive();
   
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
	
	$('.importRole').click(function (){
		layer.alert('<form action=""><input type="file" value="选择文件"><span></span></form>',{
			btn:['确定','取消'],
			yes:function(){
	           layer.alert('本次待导入数据100条，导入成功50条，导入不成功50条！',{
					btn:['查看导入结果'],
					yes:function(){
			           //点击按钮后执行的操作
			       }
				});
		      },
		      btn2: function(index, layero) {
	            	layer.close(index);
	        }
		});
	});
});
