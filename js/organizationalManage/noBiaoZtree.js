
//ztree树形菜单
var setting = {
//	async: {
//		enable: true,
//		url: org_url + dataUrl.institutions+"?token="+sessionStorage.token,
//		autoParam:["id", "name=n", "level=lv"],
//		otherParam:{"otherParam":"zTreeAsyncTest"},
//		dataFilter: filter,
//		type: 'get'
//	},
	view: {
		expandSpeed:"",
		addHoverDom: addHoverDom,
		removeHoverDom: removeHoverDom,
		selectedMulti: false,
		fontCss:{
			"font-size": "16px"
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
	if(treeNode.id){
		$.ajax({
			type:"delete",
			url: org_url + dataUrl.institution + treeNode.id+"?token="+sessionStorage.token ,
			success: function(data){
				if (data.code=='10010') {
					layer.alert('身份验证失败！请重新登录！',{yes:function(){
						parent.location.href = "../../enter.html";
					},cancel:function(){
						parent.location.href = "../../enter.html";
					}});
					return false;
				}
				if(data==1){
					layer.alert('删除成功！',function(index){
						updateNodes(index);
					});
				}else{
					layer.alert('删除失败！'+data.msg,function(index){
						updateNodes(index);
					});
				}
			}
		});
	}
		
}

//重命名，修改
function beforeRename(treeId, treeNode, newName) {
	if (newName.length == 0) {
		setTimeout(function() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.cancelEditName();
			alert("节点名称不能为空.");
		}, 0);
		return false;
	}else if(newName.length >20){
		layer.alert('节点名称太长！不能超过20个字符');
		return false;
	}
	return true;
}
function onRename(event,treeId, treeNode) {
	console.log(jsonsData())
	console.log(treeNode)
	var url = '',types='',data={};
	if (treeNode.id) {
		url = org_url + dataUrl.institution + treeNode.id;
		types = 'put';
		data = {
			id: treeNode.id,
			name: treeNode.name,
			sn: treeNode.getIndex(),
			upper: treeNode.pId || 0,
			token: sessionStorage.token
		}
	}else{
		url = org_url + dataUrl.institution;
		types = 'post';
		data = {
			name: treeNode.name,
			sn: treeNode.getIndex(),
			upper: treeNode.pId || 0,
			token: sessionStorage.token
		}
	}
	$.ajax({
		type: types,
		url:  url,
		async:true,
		data: data,
		success: function(data){
			if (data.code=='10010') {
				layer.alert('身份验证失败！请重新登录！',{yes:function(){
					parent.location.href = "../../enter.html";
				},cancel:function(){
					parent.location.href = "../../enter.html";
				}});
				return false;
			}
			if(data==1){
				layer.alert('修改成功！',function(index){
					updateNodes(index);
				});
			}else{
				layer.alert('修改失败！'+data.msg,function(index){
					updateNodes(index);
				});
				
			}
		}
	});
}

//移动
function onDrap(event,treeId,treeNodes,targetNode){
	$.ajax({
		type:"put",
		url: org_url + dataUrl.institution + targetNode.id ,
		async:true,
		data:{
			id:treeNodes[0].id,
			name: treeNodes[0].name,
			sn: treeNodes[0].getIndex(),
			upper: targetNode.pId || 0,
			token: sessionStorage.token
		},
		success: function(data){
			if (data.code=='10010') {
				layer.alert('身份验证失败！请重新登录！',{yes:function(){
					parent.location.href = "../../enter.html";
				},cancel:function(){
					parent.location.href = "../../enter.html";
				}});
				return false;
			}
			if(data==1){
				layer.alert('移动成功！'+data.msg,function(index){
					updateNodes(index);
				});
			}else{
				layer.alert('移动失败！'+data.msg,function(index){
					updateNodes(index);
				});
			}
		}
	});
}
//取到树结构的数据
function jsonsData() {
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getNodes();
	var jsonObjs = []; //树状图的所有数据
	(function jsonsObj(nodes) {
		$.each(nodes, function(i, e) {
			var jsonNode = {};
			jsonNode.id = e.id;
			jsonNode.name = e.name;
			jsonNode.pId = e.pId;
			jsonNode.index = e.getIndex();
			jsonNode.open = e.open;
			jsonNode.previa = e.previa;
			jsonNode.code = e.code;
			jsonObjs.push(jsonNode);
			if(e.children) {
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
	if (treeNode.level==0) {
		$("#"+treeNode.tId+"_remove").unbind().remove();
	}
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
	$.fn.zTree.init($("#treeDemo"), setting,treeDatas());
});

function updateNodes(index){
	layer.close(index);
	var oldtreedatas = jsonsData();
	console.log(oldtreedatas);
	var treedatas = treeDatas();
	for (var i=0,len=oldtreedatas.length;i<len;i++) {
		for (var j=0,jlen=treedatas.length;j<jlen;j++) {
			if(oldtreedatas[i].open&&oldtreedatas[i].id==treedatas[j].id){
				treedatas[j].open=true;
			}
		}
	}
	console.log(treedatas);
	$.fn.zTree.init($("#treeDemo"), setting,treedatas);
}
//获取树结构数据
function treeDatas(){
	var treedata;
	$.ajax({
		type:"get",
		url:org_url + dataUrl.institutions+"?token="+sessionStorage.token,
		async:false,
		success: function(data){
			treedata =  data;
		}
	});
	return treedata;
}
