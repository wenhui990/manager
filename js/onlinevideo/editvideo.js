var courseid,stageid,question,knownum;
courseid = getUrlParams().courseid;
stageid = getUrlParams().stageid;
id = getUrlParams().id;
console.log(id)

//下拉框知识点树菜单
function setFontCss(treeId, treeNode) {
	return treeNode.type == 2 ? {color:"#068fe2"} : {};
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


videos = new Vue({
	el: '#videoMain',
	data:{
		videodata:'',
		stageid: '', //学段id
		courseid: '', //科目id
		stages: {}, //学段列表
		courses: {}, //科目列表
		knowledges: [], //知识点列表,
		knowledgtreeid: '', //知识点树id
		picked: 'S', //题库对象，是老师还是学生
		videoname: '', //微课名称
		videocrowd: '', //适用人群
		objectives: '', //学习目标
		coursedesc: '', //课程介绍
		teachername: '', //讲师姓名
		teacherdesc: '', //讲师介绍
		videoprice: 0, //微课价格
		videoimgsrc: 'http://linkpad.oss-cn-beijing.aliyuncs.com/27/6c4de02ff36f5fae640161e332321011/newvideoimg.png',//微课图片
		videosrc: '', //微课视频
		videosrcname: '',
		duration:''
	},
	beforeCreate:function(){
		//获取所有学段，学科目录
		$.ajax({
			type:"get",
			url: org_url+dataUrl.commons+'?token='+sessionStorage.token,
			success: function(data){
				videos.courses = data.courses;
				videos.stages = data.stages;
			}
		});
		//根据题目id查询详细信息
		$.ajax({
			type:"get",
			url: org_url+dataUrl.video+id+'?token='+sessionStorage.token,
			data:{
				courseid:courseid,
				stageid:stageid,
			},
			success: function(data){
				videos.videosrc = data.path;
//				videos.knowledges = data.knowledgeinfo;
//				videos.knowledges = data.stageid;
				videos.stageid = stageid||data.stageid;
				videos.courseid = courseid||data.courseid;
				videos.videoname = data.title; //微课名称
				videos.videocrowd = data.target; //适用人群
				videos.objectives = data.aims; //学习目标
				videos.coursedesc = data.desc; //课程介绍
				videos.teachername = data.author; //讲师姓名
				videos.teacherdesc = data.authordesc; //讲师介绍
				videos.videoprice = data.coins;  //微课价格
				videos.videoimgsrc = data.cover;
				videos.videosrcname = data.path;
//				videos.duration = data.videos;
			}
		})
	},
	methods:{
		//点击每个知识点框对应显示树
		showMenu: function(id){
			videos.knowledgtreeid = "#prevknowledgeName"+id;
			var cityObj = $("#prevknowledgeName"+id);
			var cityOffset = $("#prevknowledgeName"+id).offset();
			$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
			$("body").bind("mousedown", onBodyDown1);
		},
		//添加知识点
		addKnowledge: function(){
			videos.knowledges.push('');
		},
		delknowledge: function(){
			videos.knowledges.pop('');
		},
		//上传图片change
		videoImgFile: function(e){
			var region = 'oss-cn-beijing';
			var bucket = 'linkpad';
			$('.progress-img').show();
			ossfile(e.target,region,bucket,'videoimgsrc');
		},
		//上传微课change
		videoFile: function(e){
			var region = 'oss-cn-beijing';
			var bucket = 'linkpad';
			$('.progress-video').show();
			ossfile(e.target,region,bucket);
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
			if (videos.difficulty<0 || videos.difficulty>1) {
				layer.alert('难度系数只能填写0-1之间的数字');
			}
			var data = {
				knowledgelist:knowledgeids, //知识点
//				stageid:videos.stageids,//学段
				stageid: videos.stageid,
				courseid: videos.courseid,
				title: videos.videoname, //微课名称
				target: videos.videocrowd, //适用人群
				aims: videos.objectives, //学习目标
				desc: videos.coursedesc, //课程介绍
				author: videos.teachername, //讲师姓名
				authordesc: videos.teacherdesc, //讲师介绍
				coins: videos.videoprice,  //微课价格
				teacherid: '',
				cover: videos.videoimgsrc,   //：封面地址,
				path: videos.videosrc,   //：存储路径
				duration: parseInt(myFunction())
			}
			
			console.log(data);
//			return
			$.ajax({
				type:"put",
				url:org_url+dataUrl.video+id+'?token='+sessionStorage.token,
				contentType: "application/json; charset=utf-8",
		        data: JSON.stringify(data),
		        dataType: "json",
				success: function(data){
					if (data.result==1||data==1) {
						layer.alert('修改成功！')
					}else{
						layer.alert('修改失败！'+data.msg)
					}
				}
			});
		},
		back: function(e){
			layer.confirm('是否确定退出不保存？',function(){
				window.location.href = 'videolist.html?courseid='+courseid+'&stageid='+stageid;
				layer.close();
			});
		}
	},
	watch:{
		stages:function(n,o){
			stages = n;
			$.fn.zTree.init($("#treeDemo1"), setting2);
		}
	}
});
$('.videofile').click(function(){
	$('#videofile').click();
})

$('.videoimg').click(function(){
	$('#videoimg').click();
})

var progress = function (p) {
  return function (done) {
    var bar = document.getElementById('progress-bar');
    bar.style.width = Math.floor(p * 100) + '%';
    bar.innerHTML = Math.floor(p * 100) + '%';
    done();
  }
};
var progressimg = function (p) {
  return function (done) {
    var bar = document.getElementById('progress-bar-img');
    bar.style.width = Math.floor(p * 100) + '%';
    bar.innerHTML = Math.floor(p * 100) + '%';
    done();
  }
};
//oss上传
function ossfile(e,region,bucket,src){
	var appServer = org_url+dataUrl.getosstoken+'?token='+sessionStorage.token;
	var file = $(e)[0].files[0];
	var storeAs = sessionStorage.userid+'/'+hex_md5(new Date().getTime()+sessionStorage.userid)+'/'+file.name;
	if (!src) {
		storeAs = sessionStorage.userid+'/'+hex_md5(new Date().getTime()+sessionStorage.userid)+'/'+file.name+'?x-oss-process=image/resize,m_mfit,h_188,w_268';
	}
	videos.videosrcname = file.name;
	console.log((src?progressimg:progress))
//	return;
	$.ajax({
		type:"get",
		url:appServer,
		success:function(response){
			var client = new OSS.Wrapper({
				accessKeyId: response.credentials.access_key_id,
				accessKeySecret: response.credentials.access_key_secret,
				stsToken: response.credentials.security_token,
				region: region,
				bucket: bucket	
			});
			client.multipartUpload(storeAs, file,{progress: (src?progressimg:progress)}).then(function(result) {
				console.log(result);
				if(src){
					if(result.src){
						videos.videoimgsrc=result.url; 
					}else{
						videos.videoimgsrc=result.res.requestUrls[0]; 
					}
					console.log(videos.videoimgsrc);
				}else{
					if(result.src){
						videos.videosrc=result.url.split('?')[0]; 
					}else{
						videos.videosrc=result.res.requestUrls[0].split('?')[0]; 
					}
					console.log(videos.videosrc);
				}
			}).catch(function(err) {
				console.log(err);
			});
		}
	});
}

//加载知识点树
var setting2 = {
	async: {
		enable: true,
		url: org_url + dataUrl.knowledgetree + "?courseid="+(courseid||videos.courseid)+"&stageid="+(stageid||videos.stageid)+"&token="+sessionStorage.token,
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

function showMenu(id){
	videos.knowledgtreeid = "#prevknowledgeName"+id;
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
	console.log(videos.knowledgtreeid)
	$(videos.knowledgtreeid).val(treeNode.name);
	$(videos.knowledgtreeid).attr({"data-id":treeNode.id,"data-knowid":treeNode.knowid});
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

function myFunction() {
	var a = $("#video")[0].duration;
	return a;
}