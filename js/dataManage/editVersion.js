
var myApp=angular.module("app",[]);
myApp.controller("ctrl",function($scope,$http){
	$scope.message=JSON.parse(localStorage.getItem("name"))
	
	console.log($scope.message.title)
	var reg=/^[0-9]{1,2}$/;
	$scope.save=function(){
		layer.open({
			type:1,
			title:"保存",
			skin: 'layui-layer',
			area:['420px', '240px'],
			content:"是否保存?",
			btn:["确定","取消"],
			yes:function(index, layero){
				
				if($scope.message.title){
					console.log($scope.message.sn)
					if($scope.message.sn!=undefined){
						
						if(!reg.test($scope.message.sn)){
							layer.close(index)
							layer.msg('序号填写错误', {
						    time: 1000 
						   });
						   return
						}
					}
					$http({
							method:"put",
							url:dataUrl.edition.updateEdition,
							data:{
								"id":$scope.message.id,
								"title":$scope.message.title,
								"sn":$scope.message.sn,
								"note":$scope.message.note
							}
						
					}).success(function(data){
						localStorage.clear("name")
						console.log(data)
						layer.close(index)
						if(data.success){
							layer.msg('添加成功', {
							    time: 1000 
							   },function(){
							   		window.location.href="versionManage_list.html";
							   });
						}else{
							alert(添加失败)
						}
						
					})
				}else{
					layer.close(index)
					layer.msg('带*号为必填项', {
					    time: 1000 
					   });
				}
			}
		})
		
	}
})