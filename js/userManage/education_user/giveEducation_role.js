function check()
{
	layer.open({
        title: "",
        content: '确定给选中用户授予该角色吗？',
        skin: 'layui-layer-lana',
        shadeClose: 'true',
        btn: ['确定',"取消"],
        yes: function(index, layero) {
            window.location.href='educationUser_list.html';
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
		$('.back').click(function (){
			window.location.href='educationUser_list.html';
		});
	
		/*-------------------复选框-------------------*/
	/*--复选框-全选-*/
	$("._all").on("click",function(){
		var flag = $(this).find(".radioclass").prop("checked");
		console.log(flag)
			$("._list").find(".radioclass").prop("checked", flag);
		if($(this).hasClass("on_check")){
			$(this).removeClass("on_check")
			$("._list").removeClass("on_check")
			
		}else{
			$(this).addClass("on_check")
			$("._list").addClass("on_check")
		
		}
	})
	/*--复选框-单选-*/
	
	var Len_num=$("._all_lsit").length
	$("tr").each(function(){
		if($(this).index()>0){
			$(this).find("._list").on("click",function(){
				if($(this).hasClass("on_check")){
					$(this).removeClass("on_check");
					$(this).find("._all_lsit").prop("checked",false);
					
				}else{
					$(this).addClass("on_check")
					$(this).find("._all_lsit").prop("checked",true);
				}
				if($("._all_lsit:checked").length==Len_num){
					$("._all").prop("checked",true);
					$("._all").addClass("on_check");
				}else{
					$("._all").prop("checked",false);
					$("._all").removeClass("on_check");
				}
				console.log($(this).find(".radioclass").prop("checked"))
			})
		}
	
	})
});
