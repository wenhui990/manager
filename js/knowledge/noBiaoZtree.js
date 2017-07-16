//ztree树形菜单
var setting = {
	view: {
		addHoverDom: addHoverDom,
		removeHoverDom: removeHoverDom,
		selectedMulti: false
	},
	edit: {
		enable: true,
		editNameSelectAll: true,
		showRemoveBtn: showRemoveBtn,
		showRenameBtn: showRenameBtn
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeDrag: beforeDrag,
		beforeEditName: beforeEditName,
		beforeRemove: beforeRemove,
		beforeRename: beforeRename,
		onRemove: onRemove,
		onRename: onRename,
		onClick: OnClick
	}
};

var zNodes = [{
		id: 1,
		pId: 0,
		name: "领信教育",
		open: true
	},
		{
			id: 11,
			pId: 1,
			name: "xx教育局"
		},
			{
				id: 111,
				pId: 11,
				name: "市局机关科室"
			},
				{
					id: 1111,
					pId: 111,
					name: "局领导"
				},
				{
					id: 1111,
					pId: 111,
					name: "局领导2"
				},
		{
			id: 22,
			pId: 1,
			name: "县教育局"
		},
			{
				id: 222,
				pId: 22,
				name: "县局机关科室"
			},
			{
				id: 223,
				pId: 22,
				name: "县领导"
			},
			{
				id: 224,
				pId: 22,
				name: "县领导2"
			},
			{
				id: 225,
				pId: 22,
				name: "县领导22222"
			},
		{
			id: 33,
			pId: 1,
			name: "xx县教育局",
		},
			{
				id: 222,
				pId: 33,
				name: "xx县局机关科室"
			},
			{
				id: 2222,
				pId: 33,
				name: "xx县领导"
			},
			{
				id: 2222,
				pId: 33,
				name: "xx县领导2"
			},
];
var log, className = "dark";

function beforeDrag(treeId, treeNodes) {
	return false;
}

function beforeEditName(treeId, treeNode) {
	className = (className === "dark" ? "" : "dark");
	showLog("[ " + getTime() + " beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.selectNode(treeNode);
}

function beforeRemove(treeId, treeNode) {
	className = (className === "dark" ? "" : "dark");
	showLog("[ " + getTime() + " beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.selectNode(treeNode);
}

function onRemove(e, treeId, treeNode) {
	showLog("[ " + getTime() + " onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
}

function beforeRename(treeId, treeNode, newName, isCancel) {
	className = (className === "dark" ? "" : "dark");
	showLog((isCancel ? "<span style='color:red'>" : "") + "[ " + getTime() + " beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>" : ""));
	if(newName.length == 0) {
		alert("节点名称不能为空.");
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		setTimeout(function() {
			zTree.editName(treeNode)
		}, 10);
		return false;
	}
	return true;
}

function onRename(e, treeId, treeNode, isCancel) {
	showLog((isCancel ? "<span style='color:red'>" : "") + "[ " + getTime() + " onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>" : ""));
}

function showRemoveBtn(treeId, treeNode) {
	return treeNode;
}

function showRenameBtn(treeId, treeNode) {
	return treeNode;
}

function showLog(str) {
	if(!log) log = $("#log");
	log.append("<li class='" + className + "'>" + str + "</li>");
	if(log.children("li").length > 8) {
		log.get(0).removeChild(log.children("li")[0]);
	}
}

function getTime() {
	var now = new Date(),
		h = now.getHours(),
		m = now.getMinutes(),
		s = now.getSeconds(),
		ms = now.getMilliseconds();
	return(h + ":" + m + ":" + s + " " + ms);
}

var newCount = 1;

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
			id: (100 + newCount),
			pId: treeNode.id,
			name: "节点名称" + (newCount++)
		});
		return false;
	});
};

function add(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
		isParent = e.data.isParent,
		nodes = zTree.getSelectedNodes(),
		treeNode = nodes[0];
	if(treeNode) {
		treeNode = zTree.addNodes(treeNode, {
			id: (100 + newCount),
			pId: treeNode.id,
			isParent: isParent,
			name: "new node" + (newCount++)
		});
	} else {
		treeNode = zTree.addNodes(null, {
			id: (100 + newCount),
			pId: 0,
			isParent: isParent,
			name: "节点名称" + (newCount++)
		});
	}
	if(treeNode) {
		zTree.editName(treeNode[0]);
	} else {
		alert("叶子节点被锁定，无法增加子节点");
	}
};

function removeHoverDom(treeId, treeNode) {
	$("#addBtn_" + treeNode.tId).unbind().remove();
};

function selectAll() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.setting.edit.editNameSelectAll = $("#selectAll").attr("checked");
}
//判断是否是根节点
function OnClick(event, treeId, treeNode) {
	console.log(treeNode)
	console.log(event)
	//treeChild=[];
	getAllChildInfo(treeNode)
	//console.log(treeChild)
	if(treeNode.level) {
		$(".parentTree").show();
		$(".childTree").hide();
		$(".oParentName").text($('#'+treeNode.parentTId+'_span').text());
		$(".oName").val(treeNode.name);
		$(".oSort").val(treeNode.level);
		$("tr:not(.oFirstTr)").remove();
		
		$('#ebm_hidden').attr({'data-id':treeNode.id,'data-pId':treeNode.pId,'data-tId':treeNode.tId,'data-level':treeNode.level,'data-name':treeNode.name});

	}

};

//保存机构
var ebmSort;
$('.oSort').on('change',function(){
	ebmSort=$(this).val();
})
$(document).on('click','.ebm_save',function(){
	var ebmName = $('.oName').val();
	for(var val in zNodes){
		if(zNodes[val].id==$('#ebm_hidden').attr('data-id')){
			zNodes[val].name = ebmName;
			zNodes[val].pId = ebmSort;
		}
		if(zNodes[val].id==ebmSort){
			zNodes[val].open=true;
		}
	}
	var tid = $('#ebm_hidden').attr('data-tId');
	$('#'+tid+'_span').text(ebmName);
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
	console.log(zNodes);
});
//删除机构
$(document).on('click','.ebm_delete',function(){
	var index = $('#ebm_hidden').attr('data-tid').split('_')[1];
	for(var val in zNodes){
		if(zNodes[val].id==$('#ebm_hidden').attr('data-id')){
			zNodes.splice(val,1);
		}
		if(zNodes[val].id==$('#ebm_hidden').attr('data-pid')){
			zNodes[val].open=true;
		}
	}
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
});
//添加机构
$(document).on('click','.ebm_add',function(){
	var index = $('#ebm_hidden').attr('data-tid').split('_')[1];
	var ebmName = $('.oName').val();
	var ebmPid = ($('#ebm_hidden').attr('data-id'))*1;
	var ebmId = ebmPid + '' +parseInt(Math.random()*10);
	zNodes.splice(index,0,{id:ebmId,pId:ebmPid,name:ebmName});
	for(var val in zNodes){
		if(zNodes[val].id==ebmId){
			zNodes[val].open=true;
			console.log(zNodes[val]);
		}
	}
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
});
//console.log(zNodes.splice(11,1));
		
//这个数组用于装载它所有的孩子节点  
var treeChild = new Array();
//得到最后的子节点或者是父节点  
function getAllChildInfo(treeNode) {
	treeChild = [];
	if(judgeIsFather(treeNode)) {
		for(var i = 0; i < treeNode.children.length; i++) {
			getAllChildInfo(treeNode.children[i]);
		}
	} else {
		treeChild.push(treeNode.getParentNode().name);
		//treeChild[0].getParentNode().name

	}
}

//判断是不是父节点，并且父节点是否有值  
function judgeIsFather(treeNode) {
	if(!treeNode.isParent) {
		return false;
	}
	if(treeNode.children == null || treeNode.children.length < 1) {
		return false;
	}
	return true;
}
$(document).ready(function() {

	$.fn.zTree.init($("#treeDemo"), setting, zNodes);

	$("#addParent").bind("click", {
		isParent: true
	}, add);
	$("#selectAll").bind("click", selectAll);

});