$(document).ready(function(){
	$('.questionbutton>button').click(function(){
		$(this).addClass('btn-info').siblings().removeClass('btn-info');
	});
	var winheight = $(window).height();
	var offsettop = $('.treeleft').offset().top;
	var treeleftheight = winheight - offsettop;
	$('.treeleft').height(treeleftheight);
});
var page=1,pagesize=20,catalog = [],dataobj={};
var question = new Vue({
	el: '#questionMain',
	data:{
		stageid: '', //学段id
		courseid: '', //科目id
		stages: {}, //学段列表
		courses: {}, //科目列表
		catalogs:[], //面包屑导航数据
		question_code: '',  //题目编号
		questiondata: [], //题目数据
		teacherstudent: '',
		backstageteacher: '',
		questiontype: '',
		editquestionhref: '',
		uploadingquestion: ''
	},
	beforeCreate:function(){
		//获取所有学段，学科目录
		$.ajax({
			type:"get",
			url: org_url+dataUrl.questionbank.commonlist,
			success: function(data){
				question.courses = data.courses;
				question.stages = data.stages;
			}
		});
		if (getUrlParams().courseid||getUrlParams().stageid) {
			//获取全部题目
			$.ajax({
				type:"get",
				url: org_url+dataUrl.questionbank.questionlist,
				data:{
					courseid:getUrlParams().courseid,
					stageid:getUrlParams().stageid,
				},
				success: function(data){
					var newdata = data.data;
					if(newdata){
						$.each(newdata, function(i,e) {
							console.log(e.options)
							if (e.options.indexOf(',')>-1) {
								var newoption = JSON.parse(e.options);
								e.options = newoption;
							}
						});
					}
					question.questiondata=newdata;
					pages(data.total);
				}
			})
		}
	},
	methods:{
		//点击查询
		selectquestion: function(){
			$.ajax({
				type:"get",
				url: org_url+dataUrl.questionbank.questionlist,
				data:{
					courseid:question.courseid,
					stageid:question.stageid,
					id: question.question_code
				},
				success: function(data){
					var newdata = data.data;
					if(newdata){
						$.each(newdata, function(i,e) {
							if (e.options) {
								if (e.options.indexOf(',')>-1) {
									var newoption = JSON.parse(e.options);
									e.options = newoption;
								}
							}
						});
					}
					question.questiondata=newdata;
					pages(data.total);
				}
			})
		},
		//筛选题
		teacherStudent: function(id){
			console.log(id)
			dataobj.tag = id;
			questionList(catalog,dataobj);
		},
		backstageTeacher: function(id){
			console.log(id)
			dataobj.uploadtype = id;
			questionList(catalog,dataobj);
		},
		questionType: function(id){
			console.log(id)
			dataobj.type = id;
			questionList(catalog,dataobj);
		},
		//查看解析
		seeAnalysis: function(imgsrc){
			layer.open({
			  type: 1,
			  area: ['auto', 'auto'], //宽高
			  content: '<div style="padding:10px 20px">'+imgsrc+'</div>'
			})
		},
		//上传
		upload: function(e){
			if (userAgent().ie>=11.0) {
				if (question.stageid=='') {
					layer.alert('请选择学段!');
					return false;
				}
				if (question.courseid=='') {
					layer.alert('请选择科目!');
					return false;
				}
				$(e.target).attr('href',question.uploadingquestion);
			}else{
				layer.alert('当前浏览器不支持导入功能，请使用 IE11.0以上浏览器打开！');
			}
		},
		//编辑
		editquestion: function(id){
			if (userAgent().ie>=11.0) {
				question.editquestionhref += ('&id='+id);
			}else{
				layer.alert('当前浏览器不支持编辑功能，请使用 IE11.0以上浏览器打开！');
			}
		},
		//删除
		delquestion: function(id,event){
			$.ajax({
				type:"delete",
				url:org_url + dataUrl.questionbank.questionlist+id,
				success: function(data){
					if (data==1) {
						layer.alert('删除成功！',function(i){
							$(event.target).parents('.questionlist').remove();
							layer.close(i);
						});
					}else{
						layer.alert(data.msg);
					}
				}
			});
		}
	},
	watch:{
		stageid: function(n,o){
			setting.async.url=org_url + dataUrl.questionbank.questionbanktree+'?token='+sessionStorage.token+'&courseid='+question.courseid+'&stageid='+n;
			$.fn.zTree.init($("#treeDemo"), setting);
			question.editquestionhref = "edit_question.html?courseid="+question.courseid+"&stageid="+n;
			question.uploadingquestion = "uploading_question.html?courseid="+question.courseid+"&stageid="+n;
		},
		courseid: function(n,o){
			setting.async.url=org_url + dataUrl.questionbank.questionbanktree+'?token='+sessionStorage.token+'&stageid='+question.stageid+'&courseid='+n;
			$.fn.zTree.init($("#treeDemo"), setting);
			question.editquestionhref = "edit_question.html?courseid="+n+"&stageid="+question.stageid;
			question.uploadingquestion = "uploading_question.html?courseid="+n+"&stageid="+question.stageid;
		}
	}
});

//分页
function pages(tatal) {
	$('#pageToolbar').html('');
	dataobj.page = page;
	dataobj.size = pagesize;
	$('#pageToolbar').Paging({
		pagesize: pagesize,
		count: tatal,
		toolbar: false,
		callback: function(p, size, count) {
			dataobj.page = p;
			dataobj.size = size;
			pagesize = size;
			$.ajax({
				type: "get",
				url: org_url+dataUrl.questionbank.questionlist,
				data: dataobj,
				success: function(data){
					var newdata = data.data;
					if(newdata){
						$.each(newdata, function(i,e) {
							console.log(e.options)
							if(e.options){
								if (e.options.indexOf(',')>-1) {
									var newoption = JSON.parse(e.options);
									e.options = newoption;
								}
							}
						});
					}
					question.questiondata=newdata;
//					pages(data.total);
				}
			})
		}
	});
}
//ztree树形菜单
var setting = {
	async: {
		enable: true,
		url: org_url + dataUrl.questionbank.questionbanktree+"?token="+sessionStorage.token,
		autoParam:["id", "name=n", "level=lv"],
		otherParam:{"otherParam":"zTreeAsyncTest"},
		dataFilter: filter,
		type: 'get'
	},
	view: {
		expandSpeed:"",
//		addHoverDom: addHoverDom,
		removeHoverDom: removeHoverDom,
		selectedMulti: false,
		fontCss:{
			"fontSize": "14px"
		}
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
		url: org_url + dataUrl.organization.educationDel + treeNode.id+"?token="+sessionStorage.token ,
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
			token: sessionStorage.token
		}
	}else{
		url = org_url + dataUrl.organization.educationAdd;
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
			token: sessionStorage.token
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

////节点树点击
function OnClick(event, treeId, treeNode) {
	if (treeNode.level>0) $('.questionbutton').show();
	var id=[],type;
	catalog =[];
	if (treeNode.level == 1) {
		if (treeNode.children) {
			$.each(treeNode.children, function(i,e) {
				if(e.children){
					$.each(e.children, function(f,ev) {
						if(ev.children){
							$.each(ev.children, function(g,eve) {
								id.push(eve.id.substring(1));
							});
						}else{
							id.push(ev.id.substring(1));
						}
					});
				}
			});
		}
	}
	if (treeNode.level == 2) {
		if (treeNode.children) {
			$.each(treeNode.children, function(i,e) {
				id.push(e.id.substring(1));
			});
		}
	}
	if (treeNode.level == 3) {
		id.push(treeNode.id.substring(1));
	}
	
	dataobj = {
		knowledgeids: id.toString(),
		token: sessionStorage.token
	}
	if (treeNode.level==1) {
		catalog.push(treeNode.name);
		catalog.push(treeNode.getParentNode().name);
		questionList(catalog,dataobj)
	}else if(treeNode.level==2){
		catalog.push(treeNode.name);
		catalog.push(treeNode.getParentNode().name);
		catalog.push(treeNode.getParentNode().getParentNode().name);
		questionList(catalog,dataobj)
	}else if (treeNode.level==3) {
		catalog.push(treeNode.name);
		catalog.push(treeNode.getParentNode().name);
		catalog.push(treeNode.getParentNode().getParentNode().name);
		catalog.push(treeNode.getParentNode().getParentNode().getParentNode().name);
		questionList(catalog,dataobj)
	}
};
//题目列表数据
function questionList(catalog,data){
	question.catalogs = catalog.reverse();
	$.ajax({
		type: "get",
		url: org_url+dataUrl.questionbank.questionlist,
		data: data,
		success: function(data){
			var newdata = data.data;
			if(newdata){
				$.each(newdata, function(i,e) {
					if (e.options) {
						if (e.options.indexOf(',')>-1) {
							var newoption = JSON.parse(e.options);
							e.options = newoption;
						}
					}
				});
			}
			question.questiondata=newdata;
			pages(data.total);
		}
	})
}

//判断浏览器
function userAgent(){
	var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	return Sys;
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

