

var myApp=angular.module("app",[]);
myApp.controller("ctrl",function($scope,$http){
	//渲染列表
	$scope.init=function(pageNo,lineSize){
		
		$http.get(dataUrl.edition.editionList,
			{
				params:{
					pageNo : pageNo,
					lineSize : lineSize
				}
			}).success(function(data){
				if(data.success){
					$scope.list=data.result.list;
					$scope.oPage=data.result.pageData;
					$scope.pagingLoad($scope.oPage.pageSize,$scope.oPage.totalCount);
					
				}
			})
	}
	
	//修改
	$scope.fnEdit=function(id,title,sn,note){
		
		localStorage.setItem("name",JSON.stringify({
			id:id,
			title:title,
			sn:sn,
			note:note
		}))
		window.location.href="editVersion.html"
	}
	//翻页
	$scope.pagingLoad=function(pagesize,totalCount){
		$('#pageToolbar').children().remove();
		$('#pageToolbar').Paging({
			target:'#pageToolbar',
			pagesize:pagesize,
			count:totalCount,
			current:$scope.pageNo,
			toolbar:true,
			callback:function(page,size,count){
					$scope.pageNo=page;
					console.log($scope.pageSize)
					
					$scope.init(page,size)
				}
			});
		Paging.prototype.changePagesize=function(size){
			console.log(size)
			$scope.pageSize=size;
			$scope.init(1,size)
		}
	}
	//$scope.pagingLoad()
	$scope.init(1,10)
	//禁用
	$scope.fnDis=function(id,valid){
		var oValid;
		if(valid){
			oValid=0;
		}else{
			oValid=1;
		}
		$http.post(dataUrl.edition.enableEdition,{
			id:id,
			type:oValid
			
		}).success(function(data){
			console.log(data)
			console.log(valid)
			console.log($scope.pageSize)
			if(!$scope.pageNo){
				$scope.pageNo=1;
			};
			if(!$scope.pageSize){
				$scope.pageSize=10;
			}
			
			$scope.init($scope.pageNo,$scope.pageSize)
		})
	}
})
myApp.config(function ($httpProvider) {
    // Initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
 
    // Enables Request.IsAjaxRequest() in ASP.NET MVC
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
 
    //禁用IE对ajax的缓存
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
});