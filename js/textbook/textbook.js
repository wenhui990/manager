($(function(){
	$(".grade").on("click","dd",function(){
		$(".grade>dd").removeClass("fnDd");
		$(this).addClass("fnDd")
	})
}))

var myApp=angular.module("app",[]);
myApp.controller("ctrl",function($scope,$http){
	
	$scope.setting={
		async:{
			enable: true,
		    url:dataUrl.GradeBook.orgList,
		    autoParam:["id"],
		    type:'get',
		    dataType: "json",
		    dataFilter:filter
		},
		data:{
			key:{
		           name:"name"
		        },
	        simpleData: {
	            enable:true,
	            idKey: "id",
	            pIdKey: "upper"
	        }
		},
		callback:{
			
			onAsyncSuccess: zTreeOnAsyncSuccess,  
			onAsyncError: zTreeOnAsyncError     
		}
	}
	function filter(){
		
	}
	function zTreeOnAsyncError(){
		layer.alert("加载节点失败!");
	}
	function zTreeOnAsyncSuccess(event, treeId, treeNode, msg){
		console.log(treeId)
		var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		
		newNode = treeObj.addNodes(treeNode,msg.result);
		console.log(treeObj)
	}
	
	
		$.fn.zTree.init($("#treeDemo"), $scope.setting); 
	
})