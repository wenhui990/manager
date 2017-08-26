var chapterid = getUrlParams().id,
	courseid=getUrlParams().courseid,
	stageid=getUrlParams().stageid,
	previa=getUrlParams().previa;

var treeNodeObjs = {};
//获取树结构数据
function treeDatas(){
	var treedata;
	$.ajax({
		type:"get",
		url:org_url + dataUrl.sectiontree + "?id=" + chapterid + "&token=" + sessionStorage.token,
		async:false,
		success: function(data){
			treedata =  data;
		}
	});
	return treedata;
}
//章节树形菜单
var setting = {
//	async: {
//		enable: true,
//		// url: org_url + dataUrl.chapter.sectiontree + "?id=" + chapterid + "&token="+sessionStorage.token,
//		url: org_url + dataUrl.sectiontree + "?id=" + chapterid + "&token="+sessionStorage.token,
//		dataFilter: filter,
//		type: 'get'
//	},
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
		showRemoveBtn: true,
		showRenameBtn: false,
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeRemove: beforeRemove,
		beforeRename: beforeRename,
		beforeDrop: beforeDrop,
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
//删除节点
function onRemove(event,treeId, treeNode) {
	console.log(treeNode);
	var delurl = '';
	if(treeNode.type==1){
		// delurl = org_url + dataUrl.chapter.section +'?id='+treeNode.id.substring(1)+'&upper='+treeNode.pId.substring(1)+'&textbookid='+chapterid+'&token='+sessionStorage.token;
		delurl = org_url + dataUrl.section +'?id='+treeNode.id.substring(1)+'&upper='+treeNode.pId.substring(1)+'&textbookid='+chapterid+'&token='+sessionStorage.token;
	}else if(treeNode.type==2){
		// delurl = org_url + dataUrl.knowledge.sectionKnowledge +'?id='+treeNode.id.substring(1)+'&sectionid='+treeNode.pId.substring(1)+'&knowid='+treeNode.knowid+'&token='+sessionStorage.token;
		delurl = org_url + dataUrl.sectionknowledge +'?id='+treeNode.id.substring(1)+'&sectionid='+treeNode.pId.substring(1)+'&knowid='+treeNode.knowid+'&token='+sessionStorage.token;
	}
	$.ajax({
		type:"delete",
		url: delurl,
		success: function(data){
			if(data==1){
				layer.alert('删除成功！',function(index){
					updateNodes(index);
				});
			}else{
				layer.alert('删除失败！'+dada.msg,function(index){
					updateNodes(index);
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
//移动前
function beforeDrop(treeId, treeNodes, targetNode){
	if (treeNodes[0].type !== targetNode.type) {
		layer.alert('不能移到其他章节中！');
		return false;
	}
	return confirm("确认节点移动到此吗？");
}
//移动节点
var drapurl = '',data = {};
function onDrap(event,treeId,treeNodes,targetNode){
	if (treeNodes[0].type==1) {
		// drapurl = org_url + dataUrl.chapter.section;
		drapurl = org_url + dataUrl.section;
		data = {
			textbookid: chapterid,
			id: treeNodes[0].id.substring(1),
			title: treeNodes[0].name,
			sn: treeNodes[0].getIndex(),
			upper: targetNode.pId.substring(1) || 0,
			code: treeNodes[0].code,
			token: sessionStorage.token
		}
	}else if(treeNodes[0].type==2){
		// drapurl = org_url + dataUrl.knowledge.sectionKnowledge;
		drapurl = org_url + dataUrl.sectionknowledge;
		data = {
			textbookid: chapterid,
			id: treeNodes[0].id.substring(1),
			title: treeNodes[0].name,
			sn: treeNodes[0].getIndex(),
			code: treeNodes[0].code,
			knowid: treeNodes[0].knowid,
			sectionid: targetNode.pId.substring(1) || 0,
			previa: $('#prevknowledgeName').attr('data-knowid') || 0,
			token: sessionStorage.token
		}
	}
	console.log(drapurl)
	$.ajax({
		type:"put",
		url: drapurl,
		async:true,
		data:data,
		success: function(data){
			if(data==1){
				layer.alert('移动成功！',function(index){
					updateNodes(index);
				});
			}else{
				layer.alert('移动失败！'+data.msg,function(){
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
			jsonObjs.dropInner = false;
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
	$("#"+treeNode.tId+"_remove").unbind().remove();
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
			pId: treeNode.id,
			name: "新节点名称" + (newCount++)
		});
		return false;
	});
	if (treeNode.level>=3) {
		$("#addBtn_" + treeNode.tId).unbind().remove();
	}
	
};

////节点点击
function OnClick(event, treeId, treeNode) {
	if (treeNode.level==0) {
		$(".rightContent").hide();
	}else{
		$(".rightContent").show();
	}
	console.log(treeNode)
	treeNodeIndex = treeNode.getIndex();
	treeNodeObjs.sn = treeNode.getIndex();
	treeNodeObjs.id = treeNode.id;
	treeNodeObjs.upper = treeNode.pId;
	treeNodeObjs.title = treeNode.name.split(' ')[1];
	treeNodeObjs.code = treeNode.code;
	treeNodeObjs.level = treeNode.level;
	$('input[name="chapterknowledge"]').each(function(){
		if (treeNode.type==1||treeNode.level<3) {
			$('#chapterName2').removeAttr('checked').attr({'disabled':'true'});
			$('#chapterName1').attr({'checked':'true'});
			$('#otherNode').show();
			$('#knowledge').hide();
		}
		if (treeNode.type==2||treeNode.level==3) {
			$('#chapterName1').removeAttr('checked').attr({'disabled':'true'});
			$('#chapterName2').attr({'checked':'true'});
			$('#knowledge').show();
			$('#otherNode').hide();
		}
	})
	if(treeNode.id){
		$('#chapterId').val(treeNode.id);
		$('#chapterName').val(treeNode.name.split(' ')[1]);
		$('#knowledgeName').val(treeNode.name.split(' ')[1]);
		$('#chapterCode').val(treeNode.code);
	}else{
		$('#knowledgeName').val('请选择');
	}
	
};

//下拉框知识点树菜单
var setting2 = {
	async: {
		enable: true,
		// url: org_url + dataUrl.knowledge.sectiontreeAll + "?courseid="+courseid+"&stageid="+stageid+"&token="+sessionStorage.token,
		url: org_url + dataUrl.sectioneditiontree + "?courseid="+courseid+"&stageid="+stageid+"&token="+sessionStorage.token,
		dataFilter: filter,
		type: 'get'
	},
	view: {
		dblClickExpand: false
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		onClick: onClick1,
	}
};

function onClick1(e, treeId, treeNode) {
	console.log(treeNode)
	var check = (treeNode.type !== 1);
	if (treeNode.type === 1) {
		layer.alert("只能选择知识点,不能选择章和节！");
		return;
	};
	$("#knowledgeName").val(treeNode.name);
	$("#knowledgeName").attr({"data-id":treeNode.id,"data-knowid":treeNode.knowid,"data-code":treeNode.code});
	treeNodeObjs.knowid = treeNode.knowid;
	hideMenu();
}

function showMenu() {
	var cityObj = $("#knowledgeName");
	var cityOffset = $("#knowledgeName").offset();
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

	$("body").bind("mousedown", onBodyDown1);
}
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown1);
}
function onBodyDown1(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "knowledgeName" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}


$(document).ready(function(){
	var treedatas = treeDatas();
	$.fn.zTree.init($("#treeDemo"), setting,treedatas);
	$.fn.zTree.init($("#treeDemo1"), setting2);
	$('input[name="chapterknowledge"]').change(function(){
		if ($(this).val()==2) {
			$("#knowledge").show();
			$("#otherNode").hide();
		}else{
			$("#knowledge").hide();
			$("#otherNode").show();
		}
	});
});

//保存章节
$('.save_chapter').click(function(){
	console.log(treeNodeObjs)
	var url = '',types='',data={};
	if(treeNodeObjs.level==3){
		if ($('#knowledgeName').val()=='') {
			layer.alert('知识点名称不能为空！');
			$('#knowledgeName').focus();
			return false;
		}
	}
//	if(!treeNodeObjs){
//		layer.alert('请选择章节和知识点后在保存！');
//		return false;
//	}
	if (treeNodeObjs.id) {
		// url = org_url + dataUrl.chapter.section;
		url = org_url + dataUrl.editkonwledname;
		types = 'put';
		data = {
			textbookid: chapterid,
			id: treeNodeObjs.id.substring(1),
			title: $('#chapterName').val().split(' ')[1],
			sn: treeNodeObjs.sn,
			upper: treeNodeObjs.upper.substring(1) || 0,
			code: $('#chapterCode').val(),
			token: sessionStorage.token
		}
		if(treeNodeObjs.knowid>0||treeNodeObjs.level==3){
			// url = org_url + dataUrl.knowledge.sectionKnowledge
			url = org_url + dataUrl.sectionknowledge;
			data.knowid = treeNodeObjs.knowid;
			data.sectionid = treeNodeObjs.upper.substring(1) || 0,
			data.title = $('#knowledgeName').val().split(' ')[1],
			data.code = $('#knowledgeName').attr('data-code'),
			data.previa = (previa=='undefined'||previa=='null')?0:previa,
			data.courseid = courseid,
			data.stageid = stageid
		}
	}else{
		url = org_url + dataUrl.section;
		types = 'post';
		data = {
			textbookid: chapterid,
			title: $('#chapterName').val(),
			sn: treeNodeObjs.sn,
			upper: treeNodeObjs.upper.substring(1) || 0,
			code: $('#chapterCode').val(),
			token: sessionStorage.token
		}
		if(treeNodeObjs.knowid>0||treeNodeObjs.level==3){
			// url = org_url + dataUrl.knowledge.sectionKnowledge
			url = org_url + dataUrl.sectionknowledge;
			data.knowid = treeNodeObjs.knowid;
			data.sectionid = treeNodeObjs.upper.substring(1) || 0,
			data.title = $('#knowledgeName').val().split(' ')[1],
			data.code = $('#knowledgeName').attr('data-code'),
			data.previa = (previa=='undefined'||previa=='null')?0:previa,
			data.courseid = courseid,
			data.stageid = stageid
		}
	}
	console.log(data)
	console.log("before ajax: " + types);
	console.log("url: " + url);
//	return
	$.ajax({
		type: types,
		url:  url,
		// async:false,
		data: data,
		success: function(data){
			console.log("resp ok: " + JSON.stringify(data));
			console.log(data)
			if(data==1){
				layer.open({
	                title: "提示",
	                content: '修改成功！',
	                skin: 'layui-layer-lana',
	                shadeClose: false,
	                btn: ['确定'],
	                yes: function(index, layero) {
//	                    $.fn.zTree.init($("#treeDemo"), setting);
						updateNodes(index);
	                }
	        	});
			}else{
				layer.alert('修改失败！'+data.msg,function(index){
					updateNodes(index);
				})
			}
		}
	});
})

//返回教材管理列表
$('.back_chaper_konwledgelist').click(function(){
	window.location.href = 'chapterList.html';
})

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

function updateNodes(index){
	layer.close(index);
	var oldtreedatas = jsonsData();
	var treedatas = treeDatas();
	for (var i=0,len=oldtreedatas.length;i<len;i++) {
		for (var j=0,jlen=treedatas.length;j<jlen;j++) {
			if(oldtreedatas[i].open&&oldtreedatas[i].id==treedatas[j].id){
				treedatas[j].open=true;
			}
		}
	}
	console.log(treedatas)
	$.fn.zTree.init($("#treeDemo"), setting,treedatas);
}