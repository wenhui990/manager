$(document).ready(function() {
	//选择民族
    var nations = ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族","白族","土家族",
        "哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",
        "土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族", "乌孜别克族",
        "俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"];
    var nation = $("#mz");
    for ( var i=0;i<nations.length;i++) {
        var a=nations[i];
        console.log(nations[i]);
        nation.append("<option value='nations[i]'>"+a+"</option>");
    }
    //新建学生点击保存验证
    $("#newStudent").on('click',function(){
    	var studentname = $("#studentname").val();
		var stuschool = $("#stuschool").val();
		var stugrade = $("#stugrade").val();
		var stuclass = $("#stuclass").val();
		if($.trim(studentname) == ''){
			layer.alert('请输入姓名', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else if($.trim(stuschool) == ''){
			layer.alert('请选择学校', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else if($.trim(stugrade) == ''){
			layer.alert('请选择年级', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else if($.trim(stuclass) == ''){
			layer.alert('请选择班级', {//第一个参数是提示文本
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
   //编辑学生点击保存验证
    $("#editStudent").on('click',function(){
    	var studentname = $("#studentname").val();
		var stuschool = $("#stuschool").val();
		var stugrade = $("#stugrade").val();
		var stuclass = $("#stuclass").val();
		if($.trim(studentname) == ''){
			layer.alert('请输入姓名', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else if($.trim(stuschool) == ''){
			layer.alert('请选择学校', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else if($.trim(stugrade) == ''){
			layer.alert('请选择年级', {//第一个参数是提示文本
		        skin: 'layui-layer-demo',//蓝色外框皮肤
		        closeBtn: 1,//没有关闭按钮
		        shift: 5 //动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
		    });
		}else if($.trim(stuclass) == ''){
			layer.alert('请选择班级', {//第一个参数是提示文本
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
   	//导入学生
   	$(".loading-in_stu").on('click',function (){
		layer.open({
			type: 2,
			title: "导入学生",
			area: ['315px', '340px'],
			fixed: false, //不固定
			maxmin: true,
			btn: ['确定','取消'],
			content: 'loading-in_student.html',
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
});
