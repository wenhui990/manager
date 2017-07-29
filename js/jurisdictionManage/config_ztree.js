var id = getUrlParams().id;
//ztree树形菜单
var setting = {
	check: {
		enable: true
	},
	data: {
		simpleData: {
			enable: true
		}
	},
};

function filter(treeId, parentNode, childNodes) {
	if (!childNodes) return null;
	for (var i=0, l=childNodes.length; i<l; i++) {
		if (childNodes[i].name) {
			childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
		} else{
			childNodes[i].name='';
		}
	}
	return childNodes;
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

//取到树结构的数据
function jsonsData(){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getNodes();
	var jsonObjs = [];//树状图的所有数据
	(function jsonsObj(nodes){
		$.each(nodes,function(i,e){
			var jsonNode = {};
			jsonNode.checked = e.checked
			jsonNode.id = e.id;
			jsonNode.name = e.name;
			jsonNode.pId = e.pId;
			jsonNode.index = e.getIndex();
			jsonObjs.push(jsonNode);
			if(e.children){
				jsonsObj(e.children);
			}
		});
	})(nodes);
	return jsonObjs;
}
$.fn.zTree.init($("#treeDemo"), setting);
$(function() {
	var treeNodes = '';
	$.ajax({
		type: "get",
		url: org_url + dataUrl.jurisdiction.jurisdictionlist,
		async: false,
		data:{token: sessionStorage.token},
		success: function(data){
			treeNodes = data;
			$.fn.zTree.init($("#treeDemo"), setting, treeNodes);
		}
	})		
	
	$.ajax({
		type: "get",
		url: org_url + dataUrl.jurisdiction.role + id + "/entry",
		data: {
			"id": id,
			token: sessionStorage.token
		},
		success: function(data){
			console.log(data.length);
			if (data.length) {
				$.each(data, function(i,e) {
					$.each(treeNodes, function(ind,ev) {
						if ((ev.id == e.entryid) && (ev.name == e.name)) {
							ev["checked"] = true;
							ev["open"] = true;
						}
					});
				});
				console.log(treeNodes);
				$.fn.zTree.init($("#treeDemo"), setting, treeNodes);
			}
		}
	})		
	
	
	
	//点击保存
	$('.save').click(function(){
		var treejson = [];
		
		$.each(jsonsData(), function(i,e) {
			if (e.checked) {
				treejson.push({entryid:e.id});
			}
		});
		console.log(treejson);
		$.ajax({
			type: "put",
			url: org_url + dataUrl.jurisdiction.role + id + "/entry",
			data: {
				"id": id,
				"json": JSON.stringify(treejson),
				token: sessionStorage.token
			},
			success: function(data){
				if(data==1){
					layer.alert('保存成功！');
				}else{
					layer.alert('保存失败！');
				}
			}
		})
	})
	//点击返回
	$('.back').click(function (){
		$('.add_teacher_bar',window.parent.document).remove();
		window.location.href='role_list.html';
	});
});