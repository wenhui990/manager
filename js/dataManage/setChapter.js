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
		onRename: onRename
	}
};

var zNodes =[
{ id:1, pId:0, name:"根目录", open:true},
{ id:11, pId:1, name:"第一章 有理数", open:true},
{ id:111, pId:11, name:"1.1 正数和负数" },
{ id:112, pId:11, name:"1.2 有理数" , open:true},
{ id:1121, pId:112, name:"1.2.1 有理数" },
{ id:1122, pId:112, name:"1.2.2 数轴" },
{ id:1123, pId:112, name:"1.2.3 相反数" },
{ id:12, pId:1, name:"第二章 整式的加减", open:true},
{ id:121, pId:12, name:"2.1 正数和负数" },
{ id:122, pId:12, name:"2.2 有理数" },
];
var log, className = "dark";
function beforeDrag(treeId, treeNodes) {
	return false;
}
function beforeEditName(treeId, treeNode) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.selectNode(treeNode);
}
function beforeRemove(treeId, treeNode) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.selectNode(treeNode);
}
function onRemove(e, treeId, treeNode) {
	showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
}
function beforeRename(treeId, treeNode, newName, isCancel) {
	className = (className === "dark" ? "":"dark");
	showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
	if (newName.length == 0) {
		alert("节点名称不能为空.");
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		setTimeout(function(){zTree.editName(treeNode)}, 10);
		return false;
	}
	return true;
}
function onRename(e, treeId, treeNode, isCancel) {
	showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
}
function showRemoveBtn(treeId, treeNode) {
	return treeNode;
}
function showRenameBtn(treeId, treeNode) {
	return treeNode;
}
function showLog(str) {
	if (!log) log = $("#log");
	log.append("<li class='"+className+"'>"+str+"</li>");
	if(log.children("li").length > 8) {
		log.get(0).removeChild(log.children("li")[0]);
	}
}
function getTime() {
	var now= new Date(),
	h=now.getHours(),
	m=now.getMinutes(),
	s=now.getSeconds(),
	ms=now.getMilliseconds();
	return (h+":"+m+":"+s+ " " +ms);
}

var newCount = 1;
function addHoverDom(treeId, treeNode) {
	var sObj = $("#" + treeNode.tId + "_span");
	if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
	var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
		+ "' title='添加' onfocus='this.blur();'></span>";
	sObj.after(addStr);
	var btn = $("#addBtn_"+treeNode.tId);
	if (btn) btn.bind("click", function(){
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"节点名称" + (newCount++)});
		return false;
	});
};
function add(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
	isParent = e.data.isParent,
	nodes = zTree.getSelectedNodes(),
	treeNode = nodes[0];
	if (treeNode) {
		treeNode = zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, isParent:isParent, name:"new node" + (newCount++)});
	} else {
		treeNode = zTree.addNodes(null, {id:(100 + newCount), pId:0, isParent:isParent, name:"节点名称" + (newCount++)});
	}
	if (treeNode) {
		zTree.editName(treeNode[0]);
	} else {
		alert("叶子节点被锁定，无法增加子节点");
	}
};
function removeHoverDom(treeId, treeNode) {
	$("#addBtn_"+treeNode.tId).unbind().remove();
};
function selectAll() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
}

$(document).ready(function(){
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
	$("#addParent").bind("click", {isParent:true}, add);
	$("#selectAll").bind("click", selectAll);
});
//添加行
function addRow(){
	var content = '<tr>'+
					'<td>'+
						'<input class="form-control zsd" type="text" value="">'+
					'</td>'+
					'<td>'+
						'<input class="form-control zsdName" type="text" value="">'+
					'</td>'+
					
					'<td>'+
						'<a href="javascript:;" onclick="delRow(chapterTab,this)">删除</a>&nbsp;'+
						'<a href="javascript:;" class="upClick" onclick="fnUp(this)">上移</a>&nbsp;'+
						'<a href="javascript:;" class="downClick" onclick="fnNext(this)">下移</a>'+
					'</td>'+
				'</tr>';
	$("#chapterTab").append(content);
}
//删除行
function delRow(tableID, obj) {//参数为表格ID，触发对象  
    //获得触发对象的行号，parentElement的个数取决于触发对象为TR的第几级子项，input=>td=>tr，所以parentElement有两个  
    var rowIndex = obj.parentElement.parentElement.rowIndex;  
    //var table = document.getElementById(tableID).deleteRow(rowIndex);  
    obj.parentElement.parentElement.parentElement.deleteRow(rowIndex); //再简化：省略tableID参数  
}
//下移
function fnNext(obj){
	var oThisZsd=obj.parentNode.previousElementSibling.previousElementSibling.firstElementChild.value; //当前知识点编号
	//console.log(obj.parentNode.previousElementSibling.previousElementSibling.firstElementChild)
	var oThisZsdName=obj.parentNode.previousElementSibling.firstElementChild.value;//当前知识点名称
	
	var lastZsd=obj.parentNode.parentNode.nextElementSibling.firstElementChild.firstElementChild.value;//上一个当前知识点编号
	
	var lastZsdName=obj.parentNode.parentNode.nextElementSibling.children[1].firstElementChild.value//上一个当前知识点名称
	//console.log(lastZsdName)
	if(lastZsd){
		obj.parentNode.previousElementSibling.previousElementSibling.firstElementChild.value=lastZsd;//当前知识点编号
		obj.parentNode.previousElementSibling.firstElementChild.value=lastZsdName;//当前知识点名称
		obj.parentNode.parentNode.nextElementSibling.firstElementChild.firstElementChild.value=oThisZsd;//上一个当前知识点编号
		obj.parentNode.parentNode.nextElementSibling.children[1].firstElementChild.value=oThisZsdName;//上一个当前知识点名称
		
	}
	
}
//上移
function fnUp(obj){
//previousSibling ie678
	var oThisZsd=obj.parentNode.previousElementSibling.previousElementSibling.firstElementChild.value; //当前知识点编号
	//console.log(obj.parentNode.previousElementSibling.previousElementSibling.firstElementChild)
	var oThisZsdName=obj.parentNode.previousElementSibling.firstElementChild.value;//当前知识点名称
	
	var lastZsd=obj.parentNode.parentNode.previousElementSibling.firstElementChild.firstElementChild.value;//上一个当前知识点编号
	
	var lastZsdName=obj.parentNode.parentNode.previousElementSibling.children[1].firstElementChild.value//上一个当前知识点名称
	//console.log(lastZsdName)
	if(lastZsd){
		obj.parentNode.previousElementSibling.previousElementSibling.firstElementChild.value=lastZsd;//当前知识点编号
		obj.parentNode.previousElementSibling.firstElementChild.value=lastZsdName;//当前知识点名称
		obj.parentNode.parentNode.previousElementSibling.firstElementChild.firstElementChild.value=oThisZsd;//上一个当前知识点编号
		obj.parentNode.parentNode.previousElementSibling.children[1].firstElementChild.value=oThisZsdName;//上一个当前知识点名称
		
	}
}
