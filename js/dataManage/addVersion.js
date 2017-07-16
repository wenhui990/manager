
var myApp=angular.module("app",[]);
myApp.controller("ctrl",function($scope,$http){
	var reg=/^[0-9]{1,2}$/;
	$scope.save=function(){
		//alert(dataUrl.addEdition)
		layer.open({
			type:1,
			title:"保存",
			skin: 'layui-layer',
			area:['320px', '240px'],
			content:"是否保存?",
			btn:["确定","取消"],
			yes:function(index, layero){
				
				if($scope.oName){
					console.log($scope.oNum)
					if($scope.oNum!=undefined){
						
						if(!reg.test($scope.oNum)){
							layer.close(index)
							layer.msg('序号填写错误', {
						    time: 1000 //20s后自动关闭
						   });
						   return
						}
					}
					
					$http({
						method:"post",
						url:dataUrl.edition.addEdition,
						data:{
							"title":$scope.oName,
							"sn":$scope.oNum,
							"note":$scope.oCont
						}
						
					}).success(function(data){
						console.log(data)
						layer.close(index)
						if(data.success){
							layer.msg('添加成功', {
							    time: 1000 //20s后自动关闭
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
					    time: 1000 //20s后自动关闭
					   });
				}
			}
		})
		
	}
})