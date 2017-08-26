var courseid,stageid,question,knownum;
courseid = getUrlParams().courseid;
stageid = getUrlParams().stageid;
id = getUrlParams().id;
console.log(id)

//下拉框知识点树菜单
var setting2 = {
	async: {
		enable: true,
		url: org_url + dataUrl.knowledgetree + "?courseid="+courseid+"&stageid="+stageid+"&token="+sessionStorage.token,
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

function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown1);
}
function onBodyDown1(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "knowledgeName" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}

////节点树点击
function OnClick(event, treeId, treeNode) {
	console.log(treeNode);
};


question = new Vue({
	el: '#questionMain',
	data:{
		questionoptiondata:'',
		stageid: '', //学段id
		courseid: '', //科目id
		stages: {}, //学段列表
		courses: {}, //科目列表
		question_code: '',  //题目编号
		questiondata: [], //题目数据
		questiontype: '', //题目类型
		knowledges: [], //知识点列表,
		knowledgtreeid: '', //知识点树id
		difficulty: '',   //难度分值
		picked: 'S',       //题库对象，是老师还是学生
		blockquotetable:false, //题干是否可编辑
		questionoption: '', //题目选项,
		optionstype: '',  //选项类型1=A,2=B,3=C,4=D
		rightanswers:'',   //正确答案
		difficultylevel: '',//难度类型
	},
	beforeCreate:function(){
		//获取所有学段，学科目录
		$.ajax({
			type:"get",
			url: org_url+dataUrl.commons+'?token='+sessionStorage.token,
			success: function(data){
				question.courses = data.courses;
				question.stages = data.stages;
			}
		});
		//根据题目id查询详细信息
		$.ajax({
			type:"get",
			url: org_url+dataUrl.question+id+'?token='+sessionStorage.token,
			data:{
				courseid:courseid,
				stageid:stageid,
			},
			success: function(data){
				var datas = data[0];
				if(datas.options){
					if (datas.options.indexOf(',')>-1) {
						var newoption = JSON.parse(datas.options);
						question.questionoption = newoption;
					}
				}
				question.questionoptiondata = datas;
				question.knowledges = datas.knowledges;
				question.stageid = stageid;
				question.rightanswers = datas.answer;
				question.difficulty = datas.difficulty||'';
				question.difficultylevel = datas.difficultylevel||'';
				if(datas.answer=='A'){
					question.optionstype=0;
				}else if(datas.answer=='B'){
					question.optionstype=1;
				}else if(datas.answer=='C'){
					question.optionstype=2;
				}else if(datas.answer=='D'){
					question.optionstype=3;
				}
			}
		})
	},
	methods:{
		//点击每个知识点框对应显示树
		showMenu: function(id){
			question.knowledgtreeid = "#prevknowledgeName"+id;
			var cityObj = $("#prevknowledgeName"+id);
			var cityOffset = $("#prevknowledgeName"+id).offset();
			$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
			$("body").bind("mousedown", onBodyDown1);
		},
		//添加知识点
		addKnowledge: function(){
			question.knowledges.push({id:''});
		},
		delknowledge: function(){
			question.knowledges.pop('');
		},
		//添加选项
		addOption:function(){
			console.log(question.questionoption)
			if (question.questionoption.length<4) {
				question.questionoption.push('');
			}else{
				layer.alert('最多只能添加4个选项');
			}
		},
		//编辑题干
		editQuestionStems: function(){
			question.blockquotetable = true;
			$('#questionstems').css('background','#eee');
			$('#questionstems').focus();
		},
		//题干失去焦点
		QuestionStemsBlur: function(){
			question.blockquotetable=false;
			$('#questionstems').css('background','#fff');
		},
		//编辑选项
		focusOption: function(event){
			$(event.target).css('background','#eee');
		},
		blurOption: function(e){
			$(event.target).css('background','#fff');
		},
		//删除选项
		delOption: function(e){
			question.questionoption.pop('');
		},
		//设置正确答案
		rightAnswers: function(a){
			question.optionstype = a;
			if (a==0) {
				question.rightanswers = 'A';
			}else if(a==1){
				question.rightanswers = 'B';
			}else if(a==2){
				question.rightanswers = 'C';
			}else if(a==3){
				question.rightanswers = 'D';
			}
		},
		//保存所有内容
		save: function(e){
			var stageids=[],knowledgeids=[],options=[];
			$.each($('.stagelist'), function(i,e) {
				stageids.push(e.value);
			});
			$.each($('.knowledgeids'), function(i,e) {
				knowledgeids.push($(e).attr('data-knowid')*1);
			});
			stageids = ','+stageids.toString()+',';
//			knowledgeids = ','+knowledgeids.toString()+',';
			$.each($('.questionoptionlist'), function(i,e) {
				options.push($(e).html());
			});
//			if (question.difficulty<0 || question.difficulty>1) {
//				layer.alert('难度系数只能填写0-1之间的数字');
//			}
			if (question.difficultylevel=='') {
				layer.alert('难度不能为空');
				return false;
			}
			var data = {
				knowledgeids:knowledgeids, //知识点
//				stage:stageids,//学段
				difficultylevel:question.difficultylevel,//难度类型
				difficulty:question.difficulty,//难度
				answer:question.rightanswers, //正确答案
				analysis:$('#questionanalysis').html(), //解析
				title:$('#questionstems').html(), //题干
				tag:question.picked, //题库对象
				options:options,//选项
				id: id,//id
				type: question.questionoptiondata.type,//题型，单选多项
				scope:1
			}
			
			console.log(data);
//			return
			$.ajax({
				type:"put",
				url:org_url+dataUrl.question+'?token='+sessionStorage.token,
				contentType: "application/json; charset=utf-8",
		        data: JSON.stringify(data),
		        dataType: "json",
				success: function(data){
					if (data.result==1) {
						layer.alert('修改成功！',function(){
							window.location.href = 'questionbank.html?courseid='+courseid+'&stageid='+stageid;
						})
					}else{
						layer.alert('修改失败！'+data.msg)
					}
				}
			});
		},
		back: function(e){
			$(e.target).attr('href','questionbank.html?courseid='+courseid+'&stageid='+stageid);
		}
	},
	watch:{
		stages:function(n,o){
			stages = n;
			$.fn.zTree.init($("#treeDemo1"), setting2);
		}
	}
});

function showMenu(id){
	question.knowledgtreeid = "#prevknowledgeName"+id;
	var cityObj = $("#prevknowledgeName"+id);
	var cityOffset = $("#prevknowledgeName"+id).offset();
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
	$("body").bind("mousedown", onBodyDown1);
};


//树节点点击事件
function onClick1(e, treeId, treeNode) {
	console.log(treeNode)
	var check = (treeNode.type !== 1);
	if (treeNode.type === 1) {
		layer.alert("只能选择知识点,不能选择章和节！");
		return;
	};
	console.log(question.knowledgtreeid)
	$(question.knowledgtreeid).val(treeNode.name);
	$(question.knowledgtreeid).attr({"data-id":treeNode.id,"data-knowid":treeNode.knowid});
	hideMenu();
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
