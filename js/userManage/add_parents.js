function getQueryString(name) { 
	//alert(window.location.search);
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); 
	return null; 
} 


//获取url中字段
function getUrlParams() {
	var params = {};
	var url = window.location.href;
	var idx = url.indexOf("?");
	if(idx > 0) {
		var queryStr = url.substring(idx + 1);
		var args = queryStr.split("&");
		for(var i = 0, a, nv; a = args[i]; i++) {
			nv = args[i] = a.split("=");
			params[nv[0]] = nv.length > 1 ? nv[1] : true;
		}
	}
	return params;
};	


$(function (){
	initSchool();
	
	var id = getQueryString("id"),isphone = false;
	if(id!=null&&id!=""){
		load(id);
	}
	
	$('#parents_phone').blur(function(){
		var phone = $(this).val();
		if(phone.length > 0) {
			if(!(/^1[34578]\d{9}$/.test(phone))) {
				layer.alert("手机号码有误，请重填");
				isphone = false;
			} else{
				isphone = true;
			}
		}
	})
	
	
	//新建保存     // 编辑保存家长
	$('.save').click(function (){
		//获取当前页面的元素值
		var parents_name=$('#parents_name').val(),  //家长姓名
			parents_phone=$('#parents_phone').val(),   //家长手机号
			parents_id=$('#parents_id').val(),   //家长id
//			schoolLists,  //所在学校
//			gradeLists,  //所在学校
//			classGradeLists, //所在班级
//			studentLists, //孩子id
//			to_child_relate, //与孩子关系
		    relate_childs = [];//存放父母关系对象,studentid,relation
		//与孩子关系
		var invalid = false;
		$.each($('.relate_child'), function(i,e) {
//			schoolLists = $(e).find('.schoolLists').val(),  //所在学校
//			gradeLists = $(e).find('.gradeLists').val(),  //所在学校
//			classGradeLists=$(e).find('.classGradeLists').val(), //所在班级
			var studentLists = $(e).find('.studentLists').val();//孩子姓名
			var to_child_relate = $(e).find('.to_child_relate input[type="radio"]:checked').val();
			var childobj = {};
//			childobj.school = schoolLists;
//			childobj.grade = gradeLists;
//			childobj.classgrade = classGradeLists;
			childobj.studentid = studentLists;
			childobj.relation = to_child_relate;
			if(to_child_relate==null){
				//alert("请选择家长与学生的关系");
				invalid=true;
			}
			relate_childs.push(childobj);
		});
		console.log(relate_childs);
				
		if(parents_name=="")
		{
			layer.alert('请输入家长姓名！',function(index){
				layer.close(index);
				return false;
			});
		}else if(!isphone){
			layer.alert('请输入正确的手机号！',function(index){
				layer.close(index);
				return false;
			});
		}else if(invalid){
			layer.alert('请关联孩子！',function(index){
				layer.close(index);
				return false;
			});
		} else{
			var id = $("#parents_id").val();
			//alert(JSON.stringify(relate_childs));
			layer.open({
                title: "",
                content: '确定要保存家长信息吗？',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定','取消'],
                yes: function(index, layero) {                   
                    // 调用保存家长接口保存
                	var data = {
        				"name":parents_name,
        				"phone":parents_phone,
        				"studentlis":relate_childs,
        				"token":sessionStorage.token
        				}
                    var type = (id==""||id==null)?"POST":"PUT";
                    var url = (id==null||id=="")?"/parent/addparent":"/parent/updateparent";
                    if(id!=""&&id!=null){
                    	data.id = id;
                    }
                    $.ajax({
            			type:type,
            			url: url+"?token="+sessionStorage.token,
            			contentType: "application/json",
            			data:JSON.stringify(data),
            		    success: function(data){
            		    	window.location.href='parents_list.html';
                            $('.add_teacher_bar',window.parent.document).remove();	    	   							layer.close(index);
            		    }
            		});
                    
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
	});
	
	//点击返回
	$('.back').click(function (){
		$('.add_parents_bar',window.parent.document).remove();
		window.location.href='parents_list.html';
	});
	
	//继续关联
	var relatenum = $(".relate_child").length+1;
	
	$('.continue_relate').click(function(){
		++relatenum;
		//alert(relatenum);
		var $rc = $('.relate_child_template').eq(0).clone().appendTo($('.relate_child_all'));
		//$rc.prop("id","r"+relatenum);
		$rc.show().removeClass('relate_child_template').addClass('relate_child');
		$rc.find('.to_child_relate input[type="radio"]').attr('name','student_relation'+relatenum);
		$.each($rc.find('.to_child_relate label'), function(i,e) {
			var label_for = $(e).attr('for');
			var input_id = $(e).find('input').attr('id');
			$(e).attr('for',label_for+relatenum);
			$(e).find('input').attr('id',input_id+relatenum);
		});
		
		initSchool($rc);
	});
	
	//取消关联
	$(document).on('click','.change_relate',function(){
		var $this = $(this);
		layer.open({
            title: "",
            content: '确定删除吗？',
            skin: 'layui-layer-lana',
            shadeClose: 'true',
            btn: ['确定','取消'],
            yes: function(index, layero) {
                layer.close(index);
                $this.parent().parent().parent().remove();
            },
            btn2: function(index, layero) {
                layer.close(index);
            },
        });
		
	});
	
	//初始化数据
	function initSchool(panel,school,grade,clazz,student){	
		$.ajax({
			type:"get",
			url: org_url + "/school?token="+sessionStorage.token,
			async:true,
			dataType:"json",
			xhrFields: {
		        withCredentials: true
		    },
		    crossDomain: true,
		    success: function(data){
		    	if(panel==null){
			    	$(".relate_child").each(function(val,index){
			    		$(this).find(".schoolLists").empty();
				    	for(var i=0;i<data.data.length;i++){    		
				    		var option = "<option value='"+data.data[i].id+"'>"+data.data[i].name+"</option>";
				    		$(this).find(".schoolLists").append(option);
				    	}
			    	});	
		    	}
		    	else{
		    		$(panel).find(".schoolLists").empty();
			    	for(var i=0;i<data.data.length;i++){    		
			    		var option = "<option value='"+data.data[i].id+"'>"+data.data[i].name+"</option>";
			    		$(panel).find(".schoolLists").append(option);
			    	}
			    	if(school!=null){
			    		$(panel).find(".schoolLists").val(school);
			    	}
			    	initGrade(panel,grade,clazz,student);
		    	}
		    }
		});
		$(".relate_child").each(function(val,index){
			var panel = this;
			$(panel).find(".schoolLists").change(function(){
				initGrade(panel,grade,clazz,student);
				//initClass(panel);
			}); 
			$(panel).find(".gradeLists").change(function(){
				initClass(panel,clazz,student);
			}); 
			$(panel).find(".classGradeLists").change(function(){
				initStudent(panel,student);
			}); 
		});
	}

	function initGrade(panel,grade,clazz,student){	
		//alert($(panel).find(".schoolLists")[0].tagName);
		if($(panel).find(".schoolLists").val()==""){
			return;
		}
		$.ajax({
			type:"get",
			url: org_url + "/school/grades",
			async:true,
			dataType:"json",
			xhrFields: {
		        withCredentials: true
		    },
		    data:{"schoolId":$(panel).find(".schoolLists").val(),token:sessionStorage.token},
		    crossDomain: true,
		    success: function(data){
		    	//alert($(panel).find(".gradeLists").length);
		    	$(panel).find(".gradeLists").empty();
		    	for(var key in data){
		    		var grades = data[key];
			    	for(var i=0;i<grades.length;i++){    		
			    		var option = "<option value='"+grades[i].id+"'>"+grades[i].title+"</option>";
			    		$(panel).find(".gradeLists").append(option);
			    	}
		    	}
		    	if(grade!=null){
		    		$(panel).find(".gradeLists").val(grade);
		    	}

		    	initClass(panel,clazz,student);
		    }
		});
	}
	
	function initClass(panel,clazz,student){	
		if($(panel).find(".schoolLists").val()==""){
			return;
		}
		$.ajax({
			type:"get",
			url: org_url + "/clazz",
			async:true,
			dataType:"json",
			data:{
				"schoolid":$(panel).find(".schoolLists").val(),
				"gradeid":$(panel).find(".gradeLists").val(),
				"token":sessionStorage.token
				},
			xhrFields: {
		        withCredentials: true
		    },
		    crossDomain: true,
		    success: function(data){
		    	$(panel).find(".classGradeLists").empty();
		    	
		    	for(var i=0;i<data.length;i++){    		
		    		var option = "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
		    		$(panel).find(".classGradeLists").append(option);
		    	}	
		    	if(clazz!=null){
		    		$(panel).find(".classGradeLists").val(clazz);
		    	}
		    	initStudent(panel,student);
		    }
		});
		
		
	}
	
	
	function initStudent(panel,student){	
		if($(panel).find(".classGradeLists").val()==""){
			return;
		}
		$.ajax({
			type:"get",
			url: org_url + "/student/studentbyclazzid",
			async:true,
			dataType:"json",
			data:{
				"clazzid":$(panel).find(".classGradeLists").val(),
				"token": sessionStorage.token
				},
			xhrFields: {
		        withCredentials: true
		    },
		    crossDomain: true,
		    success: function(data){
		    	$(panel).find(".studentLists").empty();
		    	
		    	for(var i=0;i<data.length;i++){    		
		    		var option = "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
		    		$(panel).find(".studentLists").append(option);
		    	}
		    	
		    	if(student!=null){
		    		$(panel).find(".studentLists").val(student);
		    	}
		    }
		});
	}
	
	
	//初始化数据
	function load(id){	
		$.ajax({
			type:"get",
			url: org_url + "/parent/searchparentbyid?pid="+id+"&token="+sessionStorage.token,
			async:true,
			dataType:"json",
			xhrFields: {
		        withCredentials: true
		    },
		    crossDomain: true,
		    success: function(data){
		    	if(data.length>0){
		    		data = data[0];
		    	}
		    	else{
		    		alert("没有查到数据");
		    		return;
		    	}
		    	$("#parents_id").val(data.pid);
		    	$("#parents_phone").val(data.phone);
		    	$('#parents_name').val(data.pname);
				//$(".relate_child").remove();

				load_relation(data.studentlis);
			}
		});
	}
	
	function load_relation(relations){	
		if(relations==undefined||!relations instanceof Array||relations.length==0){
			 $('.relate_child').remove();
			return;
		}
		//alert(relations.length);
		for(var i=0;i<relations.length;i++){
			var $rc = $('.relate_child');
			if(i!=0){
				$rc = $('.relate_child_template').eq(0).clone().appendTo($('.relate_child_all'));
			}
			$rc.show().removeClass('relate_child_template').addClass('relate_child');
			$rc.find('.to_child_relate input[type="radio"]').attr('name','student_relation'+i);
			$.each($rc.find('.to_child_relate label'), function(i,e) {
				var label_for = $(e).attr('for');
				var input_id = $(e).find('input').attr('id');
				$(e).attr('for',label_for+i);
				$(e).find('input').attr('id',input_id+i);
			});
			
					
			var relation = relations[i];
			//alert(relation.school);
			initSchool($rc,relation.school,relation.grade,relation.clazz,relation.sid);			
			//var id = $($rc).prop("id");
			//alert(id);
			$($rc).find("input.relation[value='"+relation.relation+"']").prop("checked", "checked");
			//$($rc).find("input[name='student_relation']").val(relation.relation);
			//$($rc).find(".schoolLists").val(relation.schoolid);
			//initGrade($rc,relation.grade);
			//$($rc).find(".gradeLists").val(relation.gradeid);
			//initClass($rc,relation.clazz);
			//$($rc).find(".classGradeLists").val(relation.clazzid);
			//initStudent($rc,relation.studentid);
			//$($rc).find(".studentLists").val(relation.studentid);
		}
		
		//++relatenum;
	}
});
