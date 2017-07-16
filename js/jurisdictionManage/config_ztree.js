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
	callback: {
		onCheck: OnCheck
	}

};

var zNodes = [{
	"id": "1",
	"name": "11",
	"pId": "0"
}, {
	"id": "2",
	"name": "南方区1",
	"pId": "1"
}, {
	"id": "21",
	"name": "南方区2",
	"pId": "2"
}, {
	"id": "3",
	"name": "西城区2",
	"pId": "2"
}, {
	"id": "31",
	"name": "西城区3",
	"pId": "3"
}, {
	"id": "5",
	"name": "东城区51",
	"pId": "1"
}, {
	"id": "4",
	"name": "东城区1",
	"pId": "1"
}, {
	"id": "6",
	"name": "客家话教育局1",
	"pId": "1"
}, {
	"id": "61",
	"name": "客家话教育局6",
	"pId": "6"
}, {
	"id": "41",
	"name": "东城区4",
	"pId": ""
}, {
	"id": "51",
	"name": "东城区5",
	"pId": ""
}];

//[{"id":"1","name":"11","pId":"0"},{"id":"2","name":"南方区1","pId":"1"},{"id":"2","name":"南方区2","pId":"2"},{"id":"3","name":"西城区2","pId":"2"},{"id":"3","name":"西城区3","pId":"3"},{"id":"4","name":"东城区1","pId":"1"},{"id":"5","name":"东城区51","pId":"1"},{"id":"6","name":"客家话教育局1","pId":"1"},{"id":"6","name":"客家话教育局6","pId":"6"},{"id":"4","name":"东城区4","pId":"4"},{"id":"5","name":"东城区5","pId":"5"}];

var log, className = "dark";

function getTime() {
	var now = new Date(),
		h = now.getHours(),
		m = now.getMinutes(),
		s = now.getSeconds(),
		ms = now.getMilliseconds();
	return(h + ":" + m + ":" + s + " " + ms);
}

var tree = [];

//判断是否是根节点
function OnCheck(event, treeId, treeNode) {
	console.log(treeNode)
	console.log(treeId)
	console.log(treeNode.children)
	var treechildobj = {};
	var treeobj = {};
	var temptree = [];
	var tree2 = [];
	if(treeNode.checked) {
		treenodes(tree, treeNode);
	} else {
		treenodes(tree2, treeNode);
	}
	console.log(tree);
	console.log(tree2);
	for(var i = 0, len = tree.length; i < len; i++) {
		for(var j = 0, jlen = tree2.length; j < jlen; j++) {
			if(tree[i] == tree2[j]) {
				tree.splice(i, 1);
			}
		}
	}
	console.log(unique(tree));

};

function unique(arr) {
	var res = [];
	var json = {};
	for(var i = 0; i < arr.length; i++) {
		if(!json[arr[i]]) {
			res.push(arr[i]);
			json[arr[i]] = 1;
		}
	}
	return res;
}

function treenodes(tree, treeNode) {
	tree.push(treeNode.id);
	if(treeNode.children) {
		$.each(treeNode.children, function(i, e) {
			tree.push(e.id);
			if(e.children) {
				$.each(e.children, function(i, e) {
					tree.push(e.id);
				});
			}
		});
	}
}

$(document).ready(function() {

	//	$.ajax({
	//		url:'http://192.168.1.1:8080/institution/tree/1',
	//		type:'get',
	//		success:function(d){
	//			zNodes = d.result;
	//			console.log(zNodes);
	//			
	//		},
	//		error: function(d,data){
	//			console.log(data);
	//		},
	//		complete: function(data){
	//			console.log(data);
	//		}
	//	})

	$.fn.zTree.init($("#treeDemo"), setting, zNodes);

});