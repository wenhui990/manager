//ztree树形菜单
var setting = {
	async: {
		enable: true,
		url: org_url + dataUrl.organization.educationAll,
		autoParam:["id", "name=n", "level=lv"],
		otherParam:{"otherParam":"zTreeAsyncTest"},
		dataFilter: filter,
		type: 'get'
	},
	view: {
		expandSpeed:"",
		addHoverDom: addHoverDom,
		removeHoverDom: removeHoverDom,
		selectedMulti: false,
		fontCss:{
			"fontSize": "14px"
		}
	},
	edit: {
		enable: true,
		showRemoveBtn: true
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeRemove: beforeRemove,
		beforeRename: beforeRename,
		onRename: onRename,
		onRemove: onRemove,
		onDrop: onDrap,
		onClick:OnClick
	}
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
function beforeRemove(treeId, treeNode) {
	return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
}
function onRemove(event,treeId, treeNode) {
	
	console.log(treeNode);
	$.ajax({
		type:"delete",
		url: org_url + dataUrl.organization.educationDel + treeNode.id ,
		data:{
			"tree": JSON.stringify(jsonsData())
		},
		success: function(data){
			if(data.code != 1000){
				layer.open({
	                title: "提示",
	                content: '删除成功！',
	                skin: 'layui-layer-lana',
	                shadeClose: false,
	                btn: ['确定'],
	                yes: function(index, layero) {
	                    layer.close(index);
	                }
            	});
            	
			}
		}
	});
}

function beforeRename(treeId, treeNode, newName) {
	if (newName.length == 0) {
		setTimeout(function() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.cancelEditName();
			alert("节点名称不能为空.");
		}, 0);
		return false;
	}
	return true;
}
function onRename(event,treeId, treeNode) {
	console.log(jsonsData())
	console.log(treeNode)
	var url = '',types='',data={};
	if (treeNode.id) {
		url = org_url + dataUrl.organization.educationEdit + treeNode.id;
		types = 'put';
		data = {
			id: treeNode.id,
			name: treeNode.name,
			sn: treeNode.getIndex(),
			upper: treeNode.pId || 0,
//			tree: JSON.stringify(jsonsData())
		}
	}else{
		url = org_url + dataUrl.organization.educationAdd;
		types = 'post';
		data = {
			name: treeNode.name,
			sn: treeNode.getIndex(),
			upper: treeNode.pId || 0,
			tree: JSON.stringify(jsonsData())
		}
	}
	$.ajax({
		type: types,
		url:  url,
		async:true,
		data: data,
		success: function(data){
//			console.log('对还是错')
			if(data==1){
				layer.open({
	                title: "提示",
	                content: '修改成功！',
	                skin: 'layui-layer-lana',
	                shadeClose: false,
	                btn: ['确定'],
	                yes: function(index, layero) {
	                    layer.close(index);
	                }
	        	});
			}
		}
	});
}

//
function onDrap(event,treeId,treeNodes,targetNode){
	$.ajax({
		type:"put",
		url: org_url + dataUrl.organization.educationEdit + targetNode.id ,
		async:true,
		data:{
			id:treeNodes[0].id,
			name: treeNodes[0].name,
			sn: treeNodes[0].getIndex(),
			upper: targetNode.pId || 0,
		},
		success: function(data){
			if(data==1){
				layer.open({
	                title: "提示",
	                content: '移动成功！',
	                skin: 'layui-layer-lana'
            	});
			}
		}
	});
}
//取到树结构的数据
function jsonsData(){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getNodes();
	var jsonObjs = [];//树状图的所有数据
	(function jsonsObj(nodes){
		$.each(nodes,function(i,e){
			var jsonNode = {};
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


var newCount = 1;
function removeHoverDom(treeId, treeNode) {
	$("#addBtn_"+treeNode.tId).unbind().remove();
};

function addHoverDom(treeId, treeNode) {
	var sObj = $("#" + treeNode.tId + "_span");
	if(treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
	var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
		"' title='添加' onfocus='this.blur();'></span>";
	sObj.after(addStr);
	var btn = $("#addBtn_" + treeNode.tId);
	if(btn) btn.bind("click", function() {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.addNodes(treeNode, {
//			id: (100 + newCount),
			pId: treeNode.id,
			name: "新节点名称" + (newCount++)
		});
		return false;
	});
};

////节点点击
function OnClick(event, treeId, treeNode) {
	console.log(treeNode)
	console.log(treeNode.getIndex())
};

$(document).ready(function(){
	$.fn.zTree.init($("#treeDemo"), setting);
});

//学校名称
$('.school_all_name').text('北京市105中学')
//年级列表
$.ajax({
	type: "get",
	url: org_url + dataUrl.clazz.grades,
	data: {
		schoolId: 16//getUrlParams().id学校的ID
	},
	async: true,
	success: function(data) {
		for(var v in data){
			var $lihtm = $('<li><a href="#" class="dropdown-toggle"><i class="icon-desktop"></i><span class="menu-text"> '+v+' </span><b class="arrow icon-angle-down"></b></a></li>');
			var $ulhtm = $('<ul class="submenu" style="display: block;"></ul>');
			$.each(data[v],function(i,e){
				var $sublihtm = '<li class="nav_lis" data-id="'+e.id+'"><a href="javascript:;" ><i class="icon-double-angle-right"></i> '+e.title+'</a></li>';
				$ulhtm.append($sublihtm);
			});
			$lihtm.append($ulhtm);
			$('#mainbody').append($lihtm);
		}
		console.log(data)
	},
	error: function(data) {
		console.log(data.responseText)
	}
});





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