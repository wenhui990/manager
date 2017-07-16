$(function(){
	//新建老师页面保存
	$("#newTeacher").on('click',function(){
		var teacherName = $("#xm").val();
		var teacherTel = $("#phone").val();
		var teacherXx = $("#xx").val();
		if($.trim(teacherName) == ''){
			layer.alert('请输入姓名', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else if($.trim(teacherTel) == ''){
			layer.alert('请输入手机号', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else if($.trim(teacherXx) == ''){
			layer.alert('请输入学校', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else if($("#type1").selectedIndex==0){
			layer.alert('请选择教师类型', {//第一个参数是提示文本
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
	});
	//编辑老师页面保存
	$("#editTeacher").on('click',function(){
		var teacherName = $("#xm").val();
		var teacherTel = $("#phone").val();
		var teacherXx = $("#xx").val();
		if($.trim(teacherName) == ''){
			layer.alert('请输入姓名', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else if($.trim(teacherTel) == ''){
			layer.alert('请输入手机号', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else if($.trim(teacherXx) == ''){
			layer.alert('请输入学校', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else if($("#type").selectedIndex==0){
			layer.alert('请选择教师类型', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else{
			layer.alert('确定保存修改？', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        btn: ['确定','取消'],
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}
	});
	//CheckBox全选
    $('#allCheck').off('click');
    $('#allCheck').on('click',function (){
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
    //导入教师
    $(".leading-in").on('click',function (){
		layer.open({
			type: 2,
			title: "导入教师",
			area: ['315px', '230px'],
			fixed: false, //不固定
			maxmin: true,
			btn: ['确定','取消'],
			content: 'loading-in_teacher.html',
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
    //教师类型
    $(".teachertype").change(function(){
		var type = $(this).children('option:selected').val();//这就是selected的值
		if(type == "0"){
			$("#classandsubject").show();
		}else if(type == "1"){
			$("#classandsubject").hide();
		}
	});
	
})
//添加行
function addRow(){
	var id = $("#teacherTab").find('tr:last').children('td:first').text();
	id = id*1+1;
	var content = '<tr><td>'+id+'</td><td><select class="form-control"><option value="">请选择</option></select></td><td><select class="form-control"><option value="">请选择</option></select></td><td><select class="form-control"><option value="">请选择</option><option value="">是</option><option value="">否</option></select></td><td><img src="../../../images/delete.png" onclick="delRow(teacherTab, this)" /></td></tr>';
	$("#teacherTab").append(content);
}
//删除行
function delRow(tableID, obj) {//参数为表格ID，触发对象  
    //获得触发对象的行号，parentElement的个数取决于触发对象为TR的第几级子项，input=>td=>tr，所以parentElement有两个  
    var rowIndex = obj.parentElement.parentElement.rowIndex;  
    //var table = document.getElementById(tableID).deleteRow(rowIndex);  
    obj.parentElement.parentElement.parentElement.deleteRow(rowIndex); //再简化：省略tableID参数  
}
