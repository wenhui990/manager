//ztree树形菜单
var setting = {
	view: {
		dblClickExpand: false,
		showLine: false,
		selectedMulti: false //禁止ctrl多项选择
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		//beforeClick: beforeClick,
		onDblClick: zTreeOnDblClick,
		onClick: onClick
	}
};
var zNodes = [{
	id: 1,
	pId: 0,
	name: "父节点1 - 展开",
	open: true
}, {
	id: 11,
	pId: 1,
	name: "父节点11 - 折叠"
}, {
	id: 111,
	pId: 11,
	name: "叶子节点111"
}, {
	id: 112,
	pId: 11,
	name: "叶子节点112"
}, {
	id: 113,
	pId: 11,
	name: "叶子节点113"
}, {
	id: 114,
	pId: 11,
	name: "叶子节点114"
}, {
	id: 12,
	pId: 1,
	name: "父节点12 - 折叠"
}, {
	id: 121,
	pId: 12,
	name: "叶子节点121"
}, {
	id: 122,
	pId: 12,
	name: "叶子节点122"
}, {
	id: 123,
	pId: 12,
	name: "叶子节点123"
}, {
	id: 124,
	pId: 12,
	name: "叶子节点124"
}, {
	id: 13,
	pId: 1,
	name: "父节点13 - 没有子节点",
	isParent: true
}, {
	id: 2,
	pId: 0,
	name: "父节点2 - 折叠"
}, {
	id: 21,
	pId: 2,
	name: "父节点21 - 展开",
	open: true
}, {
	id: 211,
	pId: 21,
	name: "叶子节点211"
}, {
	id: 212,
	pId: 21,
	name: "叶子节点212"
}, {
	id: 213,
	pId: 21,
	name: "叶子节点213"
}, {
	id: 214,
	pId: 21,
	name: "叶子节点214"
}, {
	id: 22,
	pId: 2,
	name: "父节点22 - 折叠"
}, {
	id: 221,
	pId: 22,
	name: "叶子节点221"
}, {
	id: 222,
	pId: 22,
	name: "叶子节点222"
}, {
	id: 223,
	pId: 22,
	name: "叶子节点223"
}, {
	id: 224,
	pId: 22,
	name: "叶子节点224"
}, {
	id: 23,
	pId: 2,
	name: "父节点23 - 折叠"
}, {
	id: 231,
	pId: 23,
	name: "叶子节点231"
}, {
	id: 232,
	pId: 23,
	name: "叶子节点232"
}, {
	id: 233,
	pId: 23,
	name: "叶子节点233"
}, {
	id: 234,
	pId: 23,
	name: "叶子节点234"
}, {
	id: 3,
	pId: 0,
	name: "父节点3 - 没有子节点",
	isParent: true
}];
/*function beforeClick(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	if (treeNode.isParent) {
		zTree.expandNode(treeNode);
		return false;
	}else {
		return true;
	}
}*/
//知识点双击添加到右侧
function zTreeOnDblClick(event, treeId, treeNode) {
	if (treeNode.isParent) {
		zTree.expandNode(treeNode);
		return false;
	} else{
	    var knowsNodes = []; //新建数组
		knowsNodes.push(treeNode.name); //选中节点的值放入数组
		//console.log(knowsNodes)
		var knows = "";
		for (var i = 0; i < knowsNodes.length; i++) {
			knows = '<li  class="knows"<span>' + knowsNodes[i] + '</span>' + '<img src="../../images/delete.png" class="del"  onclick="removeKnow(this)"></li>';
			if($("#selectedKnow li").length > 10){
				layer.msg("最多选择十个知识点！");
			}else if ($("#selectedKnow li").length > 0) {
				var i = 0;
				$("#selectedKnow li").each(function() {
					if (knowsNodes[i] == $(this).text()) {
						i++;
					}
				});
				if(i > 0){
					layer.msg("当前知识点已经选择，请重新选择！");
				}else{
					$("#selectedKnow").append(knows);
				}
			}else{
				$("#selectedKnow").append(knows);
			}
		}
	}
};
function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.expandNode(treeNode);
}


$(document).ready(function() {
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
});

function loopbeselect(obj) {
	obj.each(function() {
		var $ele = $(this);
		$ele.click(function() {
			$ele.toggleClass('active');
		});
	});
}
//清除某一知识点
function removeKnow(obj) {
	obj.parentNode.remove();
}
$(function() {
	loopbeselect($('.selected li'));
	//清空已选择知识点
	$('#delete').click(function() {
		$('.selected li').each(function() {
			var $ele = $(this);
			$ele.remove();
		});
	});
	//选择知识点
	$("#select").click(function() {
		var $otherNode = $("#treeDemo li a.curSelectedNode").not("a.level0").not("a.level1"); //除去父节点的选中节点
		var $childInfos = $otherNode.find("span.node_name"); //选中的节点
		//alert($childInfos);
		var chapterNodes = []; //新建数组
		$childInfos.each(function() {
			chapterNodes.push($(this).text()); //选中节点的值放入数组
		});
		//console.log(chapterNodes);
		var knows = "";
		for (var i = 0; i < chapterNodes.length; i++) {
			knows = '<li  class="knows"<span>' + chapterNodes[i] + '</span>' + '<img src="../../images/delete.png" class="del"  onclick="removeKnow(this)"></li>';
			if($("#selectedKnow li").length > 10){
				layer.msg("最多选择十个知识点！");
			}else if ($("#selectedKnow li").length > 0) {
				var i = 0;
				$("#selectedKnow li").each(function() {
					if (chapterNodes[i] == $(this).text()) {
						i++;
					}
				});
				if(i > 0){
					layer.msg("当前知识点已经选择，请重新选择！");
				}else{
					$("#selectedKnow").append(knows);
				}
			}else{
				$("#selectedKnow").append(knows);
			}
		}
	});
	//节点双击
	var $otherNode = $("#treeDemo li a.curSelectedNode").not("a.level0").not("a.level1"); //除去父节点的选中节点
	var $childInfos = $otherNode.find("span.node_name"); //选中的节点
	$childInfos.click(function(){
		alert(0)
	});
})













