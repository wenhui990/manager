$(function(){
	//教育局管理新建下级机构
	$("#newlower").on('click',function(){
		layer.open({
		    title: "添加机构",
		    area: ['315px', '260px'],
		    skin: 'layui-layer-lana',
		    shadeClose: 'true',
		    btn: ['保存','取消'],
		    content: '<div class="highlevel">上级机构名称<span class="lowerlevel">北京市教育局</span></div><div class="form-group row_2"><span class="fl warn jgname">机构名称</span><div class="fl alertjg"><input class="form-control" id="disabledInput" type="text" placeholder=""></div></div><div class="form-group row_2"><span class="fl jgname mar_t_20">机构排序</span><div class="fl alertjg mar_t_20"><input class="form-control" id="disabledInput" type="text" placeholder=""></div></div>',
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
	});
	
	//选择城域版还是学校版
	$("#area").click(function(){
		$("#high").show();
		$("#sjgljg").show();
	});
	$("#school").click(function(){
		$("#high").hide();
		$("#sjgljg").hide();
	}); 
	//bootstrap摸态框垂直居中显示
	$('#myModal').each(function(i) {
		var $clone = $(this).clone().css('display', 'block').appendTo('body');
		var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
		top = top > 0 ? top : 0;
		$clone.remove();
		$(this).find('.modal-content').css("margin-top", top);
	});
	//树点击添加样式
	$(".tree li a").click(function(){
		$(this).toggleClass("treeclick");
	});
	$(".list_delete").on('click',function(){
		layer.alert('确定删除吗？', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 ,//动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	        btn: ['保存','取消']
	    });
	});
	//
	//CheckBox全选
    $('#allCheck').off('click');
    $('#allCheck').on('click',function (){
        // var isChecked = $(this).prop("checked");
        // $("input[name='one']").prop("checked", isChecked);
        if($(this).hasClass("on_check"))
        {
            $(this).removeClass("on_check");
            $('.everBtn').removeClass("on_check");
        }else{
            $(this).addClass("on_check");
            $('.everBtn').addClass("on_check");
        }
    });

    //判断每一行中的复选框有没有选中,如果选中了就全选
    $(".everBtn").off('click'); 
    $(".everBtn").on('click',function (){
        if($(this).hasClass("on_check"))
        {
            $(this).removeClass("on_check");
        }else{
            $(this).addClass("on_check");
        }
        var len=$(".everBtn").length;
        //总的checkbox的个数
        //已选中的checkbox的个数
        var checkedLen  =0;
        $('.everBtn').each(function (){
            if($(this).hasClass("on_check"))
            {
                checkedLen++;
            }
        });
        if(len  ==  checkedLen){
            $('#allCheck').addClass("on_check");
        }else{
            $('#allCheck').removeClass("on_check");
        }
    }); 
})
//小学二选一
function checkBox(obj) {
// 只有当选中的时候才会去掉其他已经勾选的checkbox，所以这里只判断选中的情况
    if (obj.is(":checked")) {
         // 先把所有的checkbox 都设置为不选种
        $('input.mybox').prop('checked', false);
        // 把自己设置为选中
        obj.prop('checked',true);
    }
}
//初中二选一
function checkBox2(obj) {
// 只有当选中的时候才会去掉其他已经勾选的checkbox，所以这里只判断选中的情况
    if (obj.is(":checked")) {
         // 先把所有的checkbox 都设置为不选种
        $('input.mybox2').prop('checked', false);
        // 把自己设置为选中
        obj.prop('checked',true);
    }
}
//新建机构验证
function save(){
	var name = document.getElementById("jgname").value;
	if($.trim(name) == ''){
		layer.alert('请添加机构名称', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	    });
	}else{
		layer.alert('确定保存？', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        btn: ['确定','取消'],
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	    });
	}
}
//组织机构管理--新建学校验证
function newSchool(){
	var type=$('input:radio[name="product"]:checked').val();
	var name=$("#xxname").val();
	var sjgl=$("#highgljg").val();
	if(type == null){
		layer.alert('请选择使用产品类型', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	    });
	}else if($.trim(name) == ''){
		layer.alert('请输入学校名称', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	    });
	}else if(!$("#period input[type=checkbox]").is(":checked")){
		layer.alert('请选择学段学制', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	    });
	}else{
		layer.alert('确定保存？', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        btn: ['确定','取消'],
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	    });
	}
}
//组织机构管理--编辑学校验证
function editSchool(){
	var type=$('input:radio[name="product"]:checked').val();
	var name=$("#xxname").val();
	var sjgl=$("#highgljg").val();
	if(type == null){
		layer.alert('请选择使用产品类型', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	    });
	}else if($.trim(name) == ''){
		layer.alert('请输入学校名称', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	    });
	}else if(!$("#period input[type=checkbox]").is(":checked")){
		layer.alert('请选择学段学制', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	    });
	}else{
		layer.alert('确定保存？', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        btn: ['确定','取消'],
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	    });
	}
}
//添加班级验证
function newClass(){
	var className = $("#classname").val();
	if($.trim(className) == ''){
		layer.alert('请添加班级名称', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	    });
	}else{
		layer.alert('确定保存？', {//第一个参数是提示文本
	        skin: 'layui-layer-demo',//蓝色外框皮肤
	        btn: ['确定','取消'],
	        closeBtn: 1,//没有关闭按钮
	        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
	    });
	}
}

























