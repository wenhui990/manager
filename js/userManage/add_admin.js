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
if(getUrlParams().see){
	$('#admin_roles').attr('disabled',true);
	$('#admin_note,#admin_name,#admin_phone').attr('readonly',true);
}

//初始化数据
function init(){	
	$.ajax({
		type:"get",
		url: org_url + dataUrl.roles + "?token="+sessionStorage.token,
		async:false,
		dataType:"json",
		xhrFields: {
	        withCredentials: true
	    },
	    crossDomain: true,
	    success: function(data){
	    	$("#admin_roles").empty();
	    	for(var i=0;i<data.data.length;i++){    		
	    		var option = "<option value='"+data.data[i].id+"'>"+data.data[i].name+"</option>";
	    		$("#admin_roles").append(option);
	    	}
	    	//$("#roles").selectpicker('val',[1,2,8]);
	    	$("#admin_roles").selectpicker('refresh');    	
	    }
	});
}

//初始化数据
function load(id){	
	$.ajax({
		type:"get",
		url: org_url + dataUrl.manager +id+"?token="+sessionStorage.token,
		async:true,
		dataType:"json",
		xhrFields: {
	        withCredentials: true
	    },
	    crossDomain: true,
	    success: function(data){
	    	$("#admin_id").val(data.id);
	    	$("#admin_phone").val(data.phone);
	    	$('#admin_name').val(data.name);
			$('#admin_note').val(data.note);
			console.log(data.roles);
			var array = data.roles.split(",");
			for(var i=0;i<array.length;i++){
				var it = array[i].split(":");
				array[i] = it[0];	
			}
//			$('#admin_roles').val(array)
			$("#admin_roles").selectpicker('val',array);
	    	setTimeout(function(){
	    		$("#admin_roles").selectpicker('refresh');  
	    	},1000);
		}
	});
}




function getQueryString(name) { 
	//alert(window.location.search);
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); 
	return null; 
} 

function save(){
	var id= getQueryString("id");
	var roles = $('#admin_roles').val();
	var arrRoles = $('#admin_roles').val();//roles.splits(",");
    var strRoles = "[";
    for(var i=0;i<arrRoles.length;i++){
    	if(i!=0){
    		strRoles += ",";
    	}
    	strRoles += "{\"roleid\":"+arrRoles[i]+"}";
    }
    strRoles += "]";
    var type="post";
    var data = {
    	roles:strRoles,
		phone: $('#admin_phone').val(),
		name: $('#admin_name').val(),
		note: $('#admin_note').val(),
	};
    url = org_url + dataUrl.manager;
    if(id!=null&&id!=""){
    	type = "put";
    	data.id = id;
    	url += id+'?token='+sessionStorage.token;
    }else{
    	url = org_url + dataUrl.manager+'?token='+sessionStorage.token;
    }
    
	$.ajax({
		type:type,
		url: url,
		async:true,
		dataType:"json",
		xhrFields: {
	        withCredentials: true
	    },
	    data:data,
	    crossDomain: true,
	    success: function(data){
	    	if (data==1) {
	    		if(id){
		    		layer.alert('修改成功！',function(){
			    		window.location.href='admin_list.html';
		            	$('.add_teacher_bar',window.parent.document).remove();   
			    	})
		    	}else{
		    		layer.alert('新建成功！',function(){
			    		window.location.href='admin_list.html';
		            	$('.add_teacher_bar',window.parent.document).remove();   
			    	})
		    	}
	    	}else if(data.code){
	    		if(id){
	    			layer.alert('修改失败：'+data.msg);
	    		}else{
	    			layer.alert('新建失败：'+data.msg);
	    		}
	    	}
	    	
	    	
	    }
	});
}

$(function (){

	init();
	
	var id = getQueryString("id"),isphone=true;
	if(id){
		load(id);
	}
	
	//验证手机号
	$('#admin_phone').blur(function() {
		var phone = $(this).val();
		if(phone.length > 0) {
			if(!(/^1[34578]\d{9}$/.test(phone))) {
				layer.alert("手机号码有误，请重填");
				isphone = false;
			} else {
				isphone = true;
			}
		}
	});
	
	//点击保存
	$('.save').click(function (){
		var admin_name=$('#admin_name').val().trim();
		var	admin_phone=$('#admin_phone').val().trim();
		var	admin_roles = $('#admin_roles').val();
		var	admin_note = $('#admin_note').val();
		
		if(admin_name==""){
			layer.alert('请输入姓名！',function(i){
				layer.close(i);
				$('#admin_name').focus();
				return false;
			})
		}else if(!(/^1[34578]\d{9}$/.test($('#admin_phone').val()))){
			layer.alert('请输入正确格式的手机号！',function(i){
				$('#admin_phone').focus();
				layer.close(i);
				return false;
			})
		}else if(admin_roles==""||admin_roles=='undefined'){
			layer.alert('请选择所属角色！',function(i){
				layer.close(i);
				return false;
			});
		}else{
			layer.open({
                title: "",
                content: '确定保存管理员信息吗？',
                skin: 'layui-layer-lana',
                shadeClose: 'true',
                btn: ['确定'],
                yes: function(index, layero) {
                	save();   
                	layer.close(index);
                },
                btn2: function(index, layero) {
                	//按钮【按钮二】的回调
                    //layer.close(index);
                },
                cancel: function() {
                    //右上角关闭回调
                }
            });
            
		}
	});
	//点击返回
	$('.back').click(function (){
		$('.add_teacher_bar',window.parent.document).remove();
		window.location.href='admin_list.html';
	});
	
//	//点击表格td出现下拉框，选择科目和班级，是否班主任
	$(document).on('click','.subject_grade_lists_td span',function(e){
		e.stopPropagation();
		e=window.event||e;
	    if(document.all){
	        e.cancelBubble=true;
	    }else{
	        e.stopPropagation();
	    }
		$(this).hide();
		$(this).next().show();
	});
	//下拉框触发事件
	$(document).on('change','.subject_grade_lists_td select',function(){
		$(this).prev().text($(this).val()).show();
		$(this).hide();
		$(this).prev().show();
	});
	
	//点击添加行
	var count;
	$('#add_teacher_line').click(function(){
		count = $('.numberlist:last').text()*1;
		$('.subject_grade_lists').append(add_teacher(++count));
	});
	
	//删除行
	$(document).on('click','.delete_line',function(){
		console.log($(this).parents('tr'));
	});
	
	//添加行模版
	function add_teacher(count){
		var addTeacherHtml = '<tr>'+
							'	<td class="numberlist">'+count+'</td>'+
							'	<td class="subject_grade_lists_td">'+
							'		<span class="squad none">请选择</span>'+
							'		<select name="" class="form-control squadlists">'+
							'			<option value="">请选择</option>'+
							'			<option value="初一">初一</option>'+
							'			<option value="初二">初二</option>'+
							'			<option value="初三">初三</option>'+
							'		</select>'+
							'	</td>'+
							'	<td class="subject_grade_lists_td">'+
							'		<span class="grage none">请选择</span>'+
							'		<select name="" class="form-control gragelists">'+
							'			<option value="">请选择</option>'+
							'			<option value="一班">一班</option>'+
							'			<option value="二班">二班</option>'+
							'			<option value="三班">三班</option>'+
							'		</select>'+
							'	</td>'+
							'	<td class="subject_grade_lists_td">'+
							'		<span class="subject none">请选择</span>'+
							'		<select name="" class="form-control subjectlists">'+
							'			<option value="">请选择</option>'+
							'			<option value="数学">数学</option>'+
							'			<option value="语文">语文</option>'+
							'			<option value="英语">英语</option>'+
							'		</select>'+
							'	</td>'+
							'	<td class="subject_grade_lists_td">'+
							'		<span class="isCharge none">请选择</span>'+
							'		<select name="" class="form-control">'+
							'			<option value="">请选择</option>'+
							'			<option value="是">是</option>'+
							'			<option value="否">否</option>'+
							'		</select>'+
							'	</td>'+
							'	<td class="delete_td"> '+
							'		<span class="glyphicon glyphicon-remove delete_line"></span>'+
							'	</td>'+
							'</tr>';
		return addTeacherHtml;
	}
});
