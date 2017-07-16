 
var imgurl1;
//function basePath(){
//	String path = request.getContextPath();
//	String basePath = request.getScheme() + "://"
//			+ request.getServerName() + ":" + request.getServerPort()
//			+ path + "/";
//    return basePath;
//};
//var basePath;;
//
//$(document).ready(
//        function() {
//            basePath=basePath();
//            alert(basePath);
// });

////var imgArray = new Array();
//function findpicker2(i){imgurl1=i;}
//function findpicker1(i){imgurl1=i;}
$(function() {
	// 初始化Web Uploader
	 var error = "上传控件不支持您的浏览器！请尝试升级flash版本或者使用Chrome引擎的浏览器。";
	  if (!WebUploader.Uploader.support()){
         
         alert(error);
         /*if (window.console) {
             alert(error);
         }
         $(item).text(error);*/
         
       return;
     }
	
	var inds = "";
	var that=0;
	var $indsa = "";
	var flages=false;
	var ths=0;
	var _this = "";
	var seles="";
	$(".filePicker").on("click", function() {
		inds = $(this).parents(".uploader-demo").attr("id");
	});
	$("body").on("click",".filePickerb label",function(){
	flages=true;
	ths=$(this).parents(".file-item").index();
	_this=$(this).parents(".list");
})
	
		var uploader = WebUploader.create({

		// 选完文件后，是否自动上传。
		auto: true,

		// swf文件路径
		swf: 'static/js/Uploader.swf',

		// 文件接收服务端。
		server: 'resourcesGensee/upload',

		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		//pick: '.filePicker',
		pick : {
			id : "#filePicker1,#filePicker2",
			multiple: false
		},
		
		duplicate: true,
		
		// 只允许选择图片文件。
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png',
			mimeTypes: 'image/jpg,image/jpeg,image/png'
		},
		thumb: {
			width: 1000,
			height: 1000,

			// 图片质量，只有type为`image/jpeg`的时候才有效。
			quality: 100,

			// 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
			allowMagnify: false,

			// 是否允许裁剪。
			crop: false,

			// 为空的话则保留原有图片格式。
			// 否则强制转换成指定的类型。
			//pe: 'image/jpeg'
		}
	});
	
	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) {
//    console.log(file)
		var $li = $(
				'<div id="' + file.id + '" class="file-item thumbnail swiper-slide" data="false">' +
				'<div class="imgS">' +
				'<img>' +
				'</div>' +
				'<div class="info">' + file.name + '</div>' +
				'<div class="info removes">删除</div>' +
				'<div class="remove-this"></div>' +
				'<div class="filePickerb fileP" ></div>' +
				'<div class="info infoa"></div>' +
				'<input type="text" id="img1" value="{{listResult.pic_url}}" style="display:none;"/>' +
				'<input type="text" id="img2" value="{{listResult.imgUrl}}" style="display:none;"/>'+
				'</div>'
			),
			$img = $li.find('img');
//			console.log(file.url)
//			console.log($li);
		//$(".ReleaseLive").find(".uploader-demo").eq(inds).find(".list").append($li);
		$("#uploader-demo").find(".list").append($li);
		/*if(inds=="uploader-demo"){
			$("#"+inds).find(".list").html($li)
			imgurl1=1
		}else{
			$("#"+inds).find(".list").html($li)
			imgurl1=2
		} */
		
		var editadv = $("#uploadpage").val();
		if(editadv=="editadv"){
			imgurl1=3;
		}
		
			 
		 
		$(".removes").on("click",function(){
			$(this).parents(".file-item").remove()
			uploader.removeFile( file );
		})
//		$indsa.after(addstr);
		// $list为容器jQuery实例
		// $(".list").append( $li );

		// 创建缩略图
		// 如果为非图片文件，可以不用调用此方法。
		// thumbnailWidth x thumbnailHeight 为 100 x 100
		uploader.makeThumb(file, function(error, src) {
			if(error) {
				$img.replaceWith('<span>不能预览</span>');
				return;
			}
			$img.attr('src', src);

		});
//		uploader.addButton({
//			id: '.filePickerb'
//		});
		if(flages){
//			_this.find(".file-item:last").insertBefore(_this.find(".file-item").eq(ths))
			$li.insertBefore(_this.find(".file-item").eq(ths))
			_this.find(".file-item").eq(ths+1).remove();
			flages=false;
		}

	});
 
//	uploader.addButton({
	//		id:'#btnContainer',
	//		innerHTML:'选择文件'
	//	});
	// 文件上传过程中创建进度条实时显示。
	uploader.on('uploadProgress', function(file, percentage) {
	
		var $li = $('#' + file.id),
			$percent = $li.find('.progress span');
		if(!$percent.length) {
			$percent = $('<p class="progress" style="height:6px;"><span></span></p>').appendTo($li).find('span');
			$percent.css('width', percentage * 100 + '%');
			$percent.css({
				'width': percentage * 100 + '%',
				'display': "block",
				'background': "#0acb33",
				'border': "1px solid #cccccc",
				'height': "6px",
				'border-radius': "5px"

			});
		}

	});

	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader.on('uploadSuccess', function(file, response) {
			console.log(response.data.resUrl);
		   if(imgurl1==3){$("#img3").val(response.data.resUrl);}
		   if(imgurl1==2){$("#img2").val(response.data.resUrl);}
		   if(imgurl1==1){$("#img1").val(response.data.resUrl);}
		$('#' + file.id).addClass('upload-state-done');
	});
	// 文件上传失败，显示上传出错。
	uploader.on('uploadError', function(file, errorinfo) {
		
		var $li = $('#' + file.id),
			$error = $li.find('div.error');

		// 避免重复创建
		if(!$error.length) {
			$error = $('<div class="error"></div>').appendTo($li);
		}
		$error.text('上传失败');
	});
	//
	// 完成上传完了，成功或者失败，先删除进度条。
	uploader.on( 'uploadComplete', function( file ) {
	  $( '#'+file.id ).find('.progress').remove();
	});

	var srcImg = "";
	$('body').on('click', '.file-item', function() {
		$(this).css({
			"border-color": "#03a8ed"
		}).siblings().css({
			"border-color": "#cfcfcf"
		});

		srcImg = $(this).find("img").attr("src");
		$(this).parent().parent().siblings(".srcImg").show();
		$(this).parent().parent().siblings(".packUpS").show();
		$(this).parent().parent().siblings(".srcImg").find("img").attr("src", srcImg);

	});

	//图片删除事件开始
	var imgSr = "";
	var imgSra = "";
	$('body').on('click', '.remove-this', function() {

			imgSr = $(this).siblings("img").attr("src");
			imgSra = $(this).parent().parent().parent(".lists").siblings(".srcImg").find("img").attr("src");
			if(imgSra == imgSr) {
				$(this).parent().parent().parent(".lists").siblings(".srcImg").find("img").removeAttr("src");
				$(this).parent(".file-item").remove();

			} else {
				$(this).parent(".file-item").remove();
			}
		})
		//图片删除事件结束
	uploader.on('beforeFileQueued', function(file) {
		//		console.log(file)
	});

	//点击编辑、上传图片、收起 开始
	//	上传事件	
	$(".filePicker").on("click", function() {
		$(this).parent().siblings().not(".srcImg").show();
		$(this).parent().parent().siblings(".amendaCon").hide();
	});

	//	收起事件	
	$(".packUpS ").on("click", function() {
		//	$(this).parent().parent().slideUp(500);
		$(this).parent().parent().animate({
			height: 'toggle',
			opacity: 'toggle'
		}, 500)
	});
	//点击编辑、上传图片、收起 开始

	

})
