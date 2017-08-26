$(document).ready(function(){
	$('.questionbutton>button').click(function(){
		$(this).addClass('btn-info').siblings().removeClass('btn-info');
	});
	var winheight = $(window).height();
	var offsettop = $('.treeleft').offset().top;
	var treeleftheight = winheight - offsettop;
	$('.treeleft').height(treeleftheight);
});
var page=1,pagesize=10,catalog = [],dataobj={};
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
		editquestionhref: 'edit_question.html?',
		uploadingquestion: '',
		questionNum: 0
	},
	beforeCreate:function(){
		//获取所有学段，学科目录
		$.ajax({
			type:"get",
			url: org_url+dataUrl.commons+'?token='+sessionStorage.token,
			success: function(data){
				if (data.code=='10010') {
					layer.alert('身份验证失败！请重新登录！',{yes:function(){
						parent.location.href = "../../enter.html";
					},cancel:function(){
						parent.location.href = "../../enter.html";
					}});
					return false;
				}
				question.courses = data.courses;
				question.stages = data.stages;
				if (getUrlParams().courseid||getUrlParams().stageid) {
					question.courseid = getUrlParams().courseid;
					question.stageid = getUrlParams().stageid;
				}
			}
		});
		if (getUrlParams().courseid||getUrlParams().stageid) {
			question.questiondata=[];
			//获取全部题目
			$.ajax({
				type:"get",
				url: org_url+dataUrl.questions+"?token="+sessionStorage.token,
				data:{
					courseid:getUrlParams().courseid,
					stageid:getUrlParams().stageid,
					page:page,
					size:pagesize
				},
				success: function(data){
					if (data.code=='10010') {
						layer.alert('身份验证失败！请重新登录！',{yes:function(){
							parent.location.href = "../../enter.html";
						},cancel:function(){
							parent.location.href = "../../enter.html";
						}});
					}
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
					question.questiondata=data.data;
					question.questionNum = data.total;
					pages(data.total);
					treeNodes();
				}
			})
		}
	},
	methods:{
		//点击查询
		selectquestion: function(){
			$('.questionbutton').hide();
			question.questiondata=[];
			var qurl = '',data={};
			if (question.question_code=='') {
				qurl = org_url+dataUrl.questions+'?token='+sessionStorage.token;
				dataobj = {
					courseid:question.courseid,
					stageid:question.stageid,
					page:page,
					size:pagesize
				}
			}else{
				qurl = org_url+dataUrl.question+question.question_code+'?token='+sessionStorage.token;
				dataobj = {
					courseid:question.courseid,
					stageid:question.stageid,
				}
			}
			$.ajax({
				type:"get",
				url: qurl,
				data:dataobj,
				success: function(data){
					if (data.code=='10010') {
						layer.alert('身份验证失败！请重新登录！',{yes:function(){
							parent.location.href = "../../enter.html";
						},cancel:function(){
							parent.location.href = "../../enter.html";
						}});
						return false;
					}
					console.log(data[0]);
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
					
					if (question.question_code!='') {
						$.each(data, function(i,e) {
							if (e.options) {
								if (e.options.indexOf(',')>-1) {
									var newoption = JSON.parse(e.options);
									e.options = newoption;
								}
							}
						});
						question.questiondata=data;
						question.questionNum = 1;
					}else{
						question.questiondata=data.data;
						question.questionNum = data.total;
						pages(data.total);
					}
				}
			})
		},
		//筛选题
		teacherStudent: function(id){
			console.log(id)
			dataobj.tag = id;
			questionList('',dataobj);
		},
		backstageTeacher: function(id){
			console.log(id)
			dataobj.uploadtype = id;
			questionList('',dataobj);
		},
		questionType: function(id){
			console.log(id)
			dataobj.type = id;
			questionList('',dataobj);
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
		editquestion: function(id,event){
//			if (userAgent().ie>=11.0) {
//				question.editquestionhref += ();
				if(getUrlParams().courseid){
					question.courseid = getUrlParams().courseid;
					question.stageid = getUrlParams().stageid;
				}
				question.editquestionhref += "courseid="+question.courseid+"&stageid="+question.stageid+'&id='+id;
				$(event.target).attr('href',question.editquestionhref);
				console.log(question.editquestionhref)
//			}else{
//				layer.alert('当前浏览器不支持编辑功能，请使用 IE11.0以上浏览器打开！');
//			}
		},
		//删除
		delquestion: function(id,event){
			$.ajax({
				type:"delete",
				url:org_url + dataUrl.question+id+'?token='+sessionStorage.token,
				success: function(data){
					if (data.code=='10010') {
						layer.alert('身份验证失败！请重新登录！',{yes:function(){
							parent.location.href = "../../enter.html";
						},cancel:function(){
							parent.location.href = "../../enter.html";
						}});
						return false;
					}
					if (data.result==1) {
						layer.alert('删除成功！',function(i){
							$(event.target).parents('.questionlist').remove();
							layer.close(i);
						});
					}else{
						layer.alert('删除失败'+data.msg);
					}
				}
			});
		}
	},
	watch:{
		stageid: function(n,o){
			treeNodes(n,'s',false);
		},
		courseid: function(n,o){
			treeNodes(n,false,'c');
		}
	}
});

//知识点树加载
function treeNodes(n,s,c){
	var csrc='';
	if (c) {
		question.editvideohref = "edit_video.html?courseid="+n+"&stageid="+question.stageid;
		question.uploadingquestion = "uploading_question.html?courseid="+n+"&stageid="+question.stageid;
		csrc = org_url + dataUrl.knowledgetree+'?token='+sessionStorage.token+'&stageid='+question.stageid+'&courseid='+n;
	}else if(s){
		question.editvideohref = "edit_video.html?courseid="+question.courseid+"&stageid="+n;
		question.uploadingquestion = "uploading_question.html?courseid="+question.courseid+"&stageid="+n;
		csrc = org_url + dataUrl.knowledgetree+'?token='+sessionStorage.token+'&courseid='+question.courseid+'&stageid='+n;
	}else{
		csrc = org_url + dataUrl.knowledgetree+'?token='+sessionStorage.token+'&courseid='+getUrlParams().courseid+'&stageid='+getUrlParams().stageid;
	}
	var treenodejson = treeDatas(csrc);
	var dataobj = [];
	$.fn.zTree.init($("#treeDemo"), setting, treenodejson);
	var newtree = jsonsData();
	for (var i=0;i<newtree.length;i++) {
		if (newtree[i].level==1||newtree[i].level==0) {
			newtree[i].open = true;
		}
	}
	for(var i=0;i<10;i++){
		if (newtree[i].id) {
			dataobj.push(newtree[i].id.substring(1));
		}
	}
	var data = {knowledgeids:dataobj,page:page,size:pagesize};
	$.fn.zTree.init($("#treeDemo"), setting, newtree);
	questionList('',data);
	console.log(treenodejson)
}


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
			question.questiondata=[];
			dataobj.page = p;
			dataobj.size = size;
			pagesize = size;
			$.ajax({
				type: "get",
				url: org_url+dataUrl.questions+'?token='+sessionStorage.token,
				data: dataobj,
				success: function(data){
					if (data.code=='10010') {
						layer.alert('身份验证失败！请重新登录！',{yes:function(){
							parent.location.href = "../../enter.html";
						},cancel:function(){
							parent.location.href = "../../enter.html";
						}});
						return false;
					}
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
					question.questiondata=data.data;
					question.questionNum = data.total;
//					pages(data.total);
				}
			})
		}
	});
}
//ztree树形菜单
var setting = {
//	async: {
//		enable: true,
//		url: org_url + dataUrl.knowledgetree+"?token="+sessionStorage.token,
//		autoParam:["id", "name=n", "level=lv"],
//		otherParam:{"otherParam":"zTreeAsyncTest"},
//		dataFilter: filter,
//		type: 'get'
//	},
	view: {
		expandSpeed:"",
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

////节点树点击
function OnClick(event, treeId, treeNode) {
	console.log(treeNode)
	if (treeNode.level>0) $('.questionbutton').show();
	$('.questionbutton>button').removeClass('btn-info');
	question.teacherstudent='';
	question.backstageteacher='';
	question.questiontype='';
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
		knowledgeids: JSON.stringify(id),
		page:page,
		size:pagesize
	}
	console.log(dataobj)
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
	question.questiondata=[];
	if (catalog!='') {
		question.catalogs = catalog.reverse();
	}
	$.ajax({
		type: "get",
		url: org_url+dataUrl.questions+'?token='+sessionStorage.token,
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
			question.questiondata=data.data;
			question.questionNum = data.total;
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
//取到树结构的数据
function jsonsData() {
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getNodes();
	var jsonObjs = []; //树状图的所有数据
	(function jsonsObj(nodes) {
		$.each(nodes, function(i, e) {
			var jsonNode = {};
			jsonNode.id = e.id;
			jsonNode.level = e.level;
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
//获取树结构数据
function treeDatas(src){
	var treedata;
	$.ajax({
		type:"get",
		url:src,
		async:false,
		success: function(data){
			treedata =  data;
		}
	});
	return treedata;
}
