var chapterid = getUrlParams().id,
	courseid = getUrlParams().courseid,
	stageid = getUrlParams().stageid,
	previa = getUrlParams().previa,
	tid='';

var treeNodeObjs = {};
var globalcode='',globalname='',globallevel=0,globalprevname='';
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
//		// url: org_url + dataUrl.chapter.sectiontree + "?id=" + chapterid+"&token="+sessionStorage.token,
//		url: org_url + dataUrl.sectiontree + "?id=" + chapterid + "&token=" + sessionStorage.token,
//		dataFilter: filter,
//		type: 'get'
//	},
	view: {
		expandSpeed: "",
		addHoverDom: addHoverDom,
		removeHoverDom: removeHoverDom,
		selectedMulti: false,
		fontCss: setFontCss
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
		onClick: OnClick
	}
};

function setFontCss(treeId, treeNode) {
	return treeNode.type == 2 ? {color:"#068fe2"} : {};
};


function filter(treeId, parentNode, childNodes) {
	if(!childNodes) return null;
	for(var i = 0, l = childNodes.length; i < l; i++) {
		if(childNodes[i].name) {
			childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
		} else {
			childNodes[i].name = '';
		}
	}
	return childNodes;
}

function beforeRemove(treeId, treeNode) {
	if (treeNode.children) {
		return confirm("章节下有子节点，确认删除" + treeNode.name + " 吗？");
	}else{
		return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
	}
}
//删除节点
function onRemove(event, treeId, treeNode) {
	console.log(treeNode);
	var delurl = '';
	if(treeNode.type == 1) {
		delurl = org_url + dataUrl.section + '?id=' + treeNode.id.substring(1) + '&upper=' + (treeNode.pId.substring(1)||"") + '&textbookid=' + chapterid + '&token=' + sessionStorage.token;
	} else if(treeNode.type == 2) {
		delurl = org_url + dataUrl.sectionknowledge + '?id=' + treeNode.id.substring(1) + '&sectionid=' + treeNode.pId.substring(1) + '&knowid=' + treeNode.knowid + '&token=' + sessionStorage.token;
	}
	$.ajax({
		type: "delete",
		url: delurl,
		success: function(data) {
			if(data.code == '10010') {
				layer.alert('身份验证失败！请重新登录！', {
					yes: function() {
						parent.location.href = "../../../enter.html";
					},
					cancel: function() {
						parent.location.href = "../../../enter.html";
					}
				});
				return false;
			}
			if(data == 1) {
				layer.alert('删除成功！',function(index){
					layer.close(index);
					updateNodes()
				});
			} else {
				layer.alert('删除失败！' + data.msg,function(index){
					layer.close(index)
				});
			}
		}
	});
}

function beforeRename(treeId, treeNode, newName) {
	if(newName.length == 0) {
		setTimeout(function() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.cancelEditName();
			alert("节点名称不能为空.");
		}, 0);
		return false;
	}
	return true;
}

function beforeDrop(treeId, treeNodes, targetNode) {
	if(treeNodes[0].type !== targetNode.type) {
		layer.alert('不能移到其他章节中！');
		return false;
	}
	return confirm("确认节点移动到此吗？");
}

//移动节点
var drapurl = '',
	data = {};

function onDrap(event, treeId, treeNodes, targetNode) {
	if(treeNodes[0].type == 1) {
		drapurl = org_url + dataUrl.section+'?token='+sessionStorage.token;
		data = {
			textbookid: chapterid,
			id: treeNodes[0].id.substring(1),
			title: treeNodes[0].name.split(' ')[1],
			sn: treeNodes[0].getIndex(),
			upper: targetNode.pId.substring(1) || 0,
			code: treeNodes[0].code,
		}
	} else if(treeNodes[0].type == 2) {
		drapurl = org_url + dataUrl.sectionknowledge+'?token='+sessionStorage.token;;
		data = {
			textbookid: chapterid,
			id: treeNodes[0].id.substring(1),
			title: treeNodes[0].name.split(' ')[1],
			sn: treeNodes[0].getIndex(),
			code: treeNodes[0].code,
			knowid: treeNodes[0].knowid || 0,
			sectionid: targetNode.pId.substring(1) || 0,
			previa: $('#prevknowledgeName').attr('data-knowid') || 0,
		}
	}
	console.log(drapurl)
	$.ajax({
		type: "put",
		url: drapurl,
		async: true,
		data: data,
		success: function(data) {
			if(data.code == '10010') {
				layer.alert('身份验证失败！请重新登录！', {
					yes: function() {
						parent.location.href = "../../../enter.html";
					},
					cancel: function() {
						parent.location.href = "../../../enter.html";
					}
				});
				return false;
			}
			if(data == 1) {
				layer.alert('移动成功！',function(index){
					layer.close(index);
					updateNodes();
				});
			} else {
				layer.alert('移动失败！' + data.msg,function(){
					layer.alert(index);
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
	$("#addBtn_" + treeNode.tId).unbind().remove();
};
//添加节点
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
	globalcode = treeNode.code;
	globalname = treeNode.name.split(' ')[1];
	globallevel = treeNode.level;
	globalprevname = treeNode.previa;
	tid = treeNode.id;
	if (treeNode.level==0) {
		$(".rightContent").hide();
	}else{
		$(".rightContent").show();
	}
	console.log($('#konwledgeCode').val())
	
	console.log(treeNode)
	treeNodeIndex = treeNode.getIndex();
	treeNodeObjs.sn = treeNode.getIndex();
	treeNodeObjs.id = treeNode.id;
	treeNodeObjs.upper = treeNode.pId;
	treeNodeObjs.title = treeNode.name.split(' ')[1];
	treeNodeObjs.code = treeNode.code;
	treeNodeObjs.level = treeNode.level;
	treeNodeObjs.knowid = treeNode.knowid || 0;
	treeNodeObjs.type = treeNode.type;
	$('input[name="chapterknowledge"]').each(function() {
		if (treeNode.id) {
			if (treeNode.type==1) {
				$('#chapterName2').removeAttr('checked').attr({'disabled':'true'});
				$('#chapterName1').attr({'checked':'true'});
				$('#otherNode').show();
				$('.otherNode_konwled').hide();
			}
			if (treeNode.type==2) {
				$('#chapterName1').removeAttr('checked').attr({'disabled':'true'});
				$('#chapterName2').attr({'checked':'true'});
				$('.otherNode_konwled').show();
				$('#otherNode').hide();
			}
		}else{
			$('#chapterName2').attr({'disabled':false});
			$('#chapterName1').attr({'disabled':false});
		}
//		if(treeNode.type == 1) {
//			$('#chapterName2').removeAttr('checked');
//			$('#chapterName1').attr('checked', 'true');
//			$('#otherNode').show();
//			$('.otherNode_konwled').hide();
//		}
//		if(treeNode.type == 2) {
//			$('#otherNode').hide();
//			$('.otherNode_konwled').show();
//			$('#chapterName1').removeAttr('checked');
//			$('#chapterName2').attr('checked', 'true');
//		}
	})

	if(treeNode.type === 2) {
		$('#konwledgeCode').val(treeNode.code);
		$('#konwledgeName').val(treeNode.name.split(' ')[1]);
		$('#'+treeNode.tId).find('span.add,span.remove').hide();
		$.ajax({
			type: "get",
			//url:org_url + "/knowledge/knowledgebyid",
			url: org_url + dataUrl.knowledge + '/' + treeNode.previa + '?token=' + sessionStorage.token,
			async: true,
			//			data:{
			//				id: treeNode.previa,
			//				token: sessionStorage.token
			//			},
			success: function(data) {
				if(data.code == '10010') {
					layer.alert('身份验证失败！请重新登录！', {
						yes: function() {
							parent.location.href = "../../../enter.html";
						},
						cancel: function() {
							parent.location.href = "../../../enter.html";
						}
					});
					return false;
				}
				if (data) {
					$('#prevknowledgeName').val(data.title);
					$("#prevknowledgeName").attr({
						"data-knowid": data.id
					});
				}else{
					$('#prevknowledgeName').val('请选择');
				}
			}
		});
	} else {
		$('#chapterName').val(treeNode.name.split(' ')[1]);
		$('#chapterCode').val(treeNode.code);
		$('#chapterCode').attr({
			"data-knowid": treeNode.id
		});
	}
};

//下拉框知识点树菜单
var setting2 = {
	async: {
		enable: true,
		//url: org_url + dataUrl.knowledge.sectiontreeAll + "?courseid="+courseid+"&stageid="+stageid+"&token="+sessionStorage.token,
		url: org_url + dataUrl.sectioneditiontree + "?courseid=" + courseid + "&stageid=" + stageid + "&token=" + sessionStorage.token,
		dataFilter: filter,
		type: 'get'
	},
	view: {
		dblClickExpand: false,
		fontCss: setFontCss
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
function setFontCss(treeId, treeNode) {
	return treeNode.type == 2 ? {color:"#068fe2"} : {};
};

function onClick1(e, treeId, treeNode) {
	console.log(treeNode)
	var check = (treeNode.type !== 1);
	if(treeNode.type === 1) {
		layer.alert("只能选择知识点,不能选择章和节！");
		return;
	};
	$("#prevknowledgeName").val(treeNode.name);
	$("#prevknowledgeName").attr({
		"data-id": treeNode.id,
		"data-knowid": treeNode.knowid
	});
	//	treeNodeObjs.knowid = treeNode.knowid || 0;
	hideMenu();
}

function showMenu() {
	var cityObj = $("#prevknowledgeName");
	var cityOffset = $("#prevknowledgeName").offset();
	$("#menuContent").css({
		left: cityOffset.left + "px",
		top: cityOffset.top + cityObj.outerHeight() + "px"
	}).slideDown("fast");

	$("body").bind("mousedown", onBodyDown1);
}

function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown1);
}

function onBodyDown1(event) {
	if(!(event.target.id == "menuBtn" || event.target.id == "knowledgeName" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
		hideMenu();
	}
}

$(document).ready(function() {
	var treedatas = treeDatas();
	console.log(treedatas);
	$.fn.zTree.init($("#treeDemo1"), setting2);
	$.fn.zTree.init($("#treeDemo"), setting, treedatas);

	$('input[name="chapterknowledge"]').change(function() {
		if($(this).val() == 2) {
			$(".otherNode_konwled").show();
			$("#otherNode").hide();
		} else {
			$(".otherNode_konwled").hide();
			$("#otherNode").show();
		}
	})
	//	console.log(jsonsData())
});

//保存章节
$('.save_knonwledge').click(function() {
	var url = '',
		types = '',
		datas = {};
	if(treeNodeObjs.type == 2||$('input[name="chapterknowledge"]:checked').val()=='2') {
		if($('#konwledgeCode').val() == '') {
			layer.alert('知识点编号不能为空！');
			$('#konwledgeCode').focus();
			return false;
		}
		if($('#konwledgeName').val() == '') {
			layer.alert('知识点名称不能为空！');
			$('#konwledgeName').focus();
			return false;
		}
	} else {
		if($('#chapterCode').val() == '') {
			layer.alert('章节编号不能为空！');
			$('#chapterCode').focus();
			return false;
		}
		if($('#chapterName').val() == '') {
			layer.alert('章节名称不能为空！');
			$('#chapterName').focus();
			return false;
		}
	}
	if(!treeNodeObjs) {
		layer.alert('请选择章节和知识点后在保存！');
		return false;
	}
	if(treeNodeObjs.id) {
//		url = org_url + dataUrl.section;
		url = org_url + dataUrl.editkonwledname;
		types = 'put';
		datas = {
			textbookid: chapterid,
			id: treeNodeObjs.id.substring(1),
			title: $('#chapterName').val(),
			sn: treeNodeObjs.sn,
			upper: treeNodeObjs.upper.substring(1) || 0,
			code: $('#chapterCode').val(),
			token: sessionStorage.token,
			type:$('input[name="chapterknowledge"]:checked').val()
		}
		if(treeNodeObjs.knowid > 0 || treeNodeObjs.type == 2) {
			//url = org_url + dataUrl.knowledge.sectionKnowledge
			url = org_url + dataUrl.sectionknowledge;
			datas.knowid = treeNodeObjs.knowid || 0;
			datas.sectionid = treeNodeObjs.upper.substring(1) || 0
				datas.title = $('#konwledgeName').val();
				datas.code = $('#konwledgeCode').val();
			datas.previa = $('#prevknowledgeName').attr('data-knowid') || 0;
				data.courseid = courseid;
				data.stageid = stageid;
		}
	} else {
		//url = org_url + dataUrl.chapter.section;
		url = org_url + dataUrl.section;
		types = 'post';
		datas = {
			textbookid: chapterid,
			title: $('#chapterName').val(),
			sn: treeNodeObjs.sn,
			upper: treeNodeObjs.upper.substring(1) || 0,
			code: $('#chapterCode').val(),
			token: sessionStorage.token,
			type:$('input[name="chapterknowledge"]:checked').val()
		}
		if($('input[name="chapterknowledge"]:checked').val()=='2') {
			//url = org_url + dataUrl.knowledge.sectionKnowledge
			url = org_url + dataUrl.sectionknowledge;
			datas.knowid = treeNodeObjs.knowid || 0;
			datas.sectionid = treeNodeObjs.upper.substring(1) || 0;
				datas.title = $('#konwledgeName').val();
				datas.code = $('#konwledgeCode').val();
			datas.previa = $('#prevknowledgeName').attr('data-knowid') || 0;
				datas.courseid = courseid;
				datas.stageid = stageid;
		}
	}
	console.log(datas)
	//	return
	$.ajax({
		type: types,
		url: url,
		async: true,
		data: datas,
		success: function(data) {
			console.log(data)
			if(data.code == '10010') {
				layer.alert('身份验证失败！请重新登录！', {
					yes: function() {
						parent.location.href = "../../enter.html";
					},
					cancel: function() {
						parent.location.href = "../../enter.html";
					}
				});
				return false;
			}
			if(data == 1) {
				layer.open({
					title: "提示",
					content: '修改成功！',
					skin: 'layui-layer-lana',
					shadeClose: false,
					btn: ['确定'],
					yes: function(index, layero) {
						updateNodes();
//						$.fn.zTree.init($("#treeDemo"), setting);
						$.fn.zTree.init($("#treeDemo1"), setting2);
						console.log(setting2)
						layer.close(index);
					}
				});
			} else {
				layer.alert('修改失败！' + data.msg);
			}
		}
	});
})

//返回教材管理列表
$('.back_chaper_konwledgelist').click(function() {
	if (globallevel<3) {
		if (globalcode != $('#chapterCode').val()) {
			layer.confirm('编号已有变化，确定返回?',function(){
				window.location.href = 'chapterList.html';
			});
		}else if (globalname != $('#chapterName').val()) {
			layer.confirm('名称已有变化，确定返回?',function(){
				
			});
		}else{
			window.location.href = 'chapterList.html';
		}
	}else{
		if (globalcode != $('#konwledgeCode').val()) {
			layer.confirm('编号已有变化，确定返回?',function(){
				window.location.href = 'chapterList.html';
			});
		}else if (globalname != $('#konwledgeName').val()) {
			layer.confirm('名称已有变化，确定返回?',function(){
				window.location.href = 'chapterList.html';
			});
		}else if(globalprevname != $('#prevknowledgeName').val()){
			layer.confirm('前置知识点已有变化，确定返回?',function(){
				window.location.href = 'chapterList.html';
			});
		}else{
			window.location.href = 'chapterList.html';
		}
	}
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
function updateNodes(){
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