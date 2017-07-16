$(function(){
	$(".addRow").on("click",function(){
		var content = '<tr>'+
					'<td>'+
						'<input class="form-control zsd" type="text" value="333">'+
						'<input class="form-control zsd" type="text" value="456">'+
						'<input class="form-control zsd" type="text" value="789">'+
					'</td>'+
					'<td>'+
						'<input class="form-control zsdName" type="text" value="456">'+
					'</td>'+
					
					'<td>'+
						'<a href="javascript:;" onclick="delRow(this)">删除1</a>&nbsp;'+
						'<a href="javascript:;" class="upClick">上移</a>&nbsp;'+
						'<a href="javascript:;" class="downClick">下移</a>'+
					'</td>'+
				'</tr>';
		$("#teacherTab").append(content);
	})
	
	$(".addRow1").on("click",function(){ 
		var content = '<tr>'+
					'<td>'+
						'<input class="form-control zsd" type="text" value="333">'+
					'</td>'+
					'<td>'+
						'<input class="form-control zsdName" type="text" value="456">'+
					'</td>'+
					
					'<td>'+
						'<a href="javascript:;" onclick="delRow(this)">删除</a>&nbsp;'+
						'<a href="javascript:;" class="upClick">上移</a>&nbsp;'+
						'<a href="javascript:;" class="downClick">下移</a>'+
					'</td>'+
				'</tr>';
		$("#teacherTab1").append(content);
	})
	
	//下移	
	$("table").on("click",".downClick",function(){
		$(this).parents("tr").next("tr").insertBefore($(this).parents("tr"))
		
	})
	//上移
	$("table").on("click",".upClick",function(){
		if($(this).parents("tr").prev("tr")[0].className!="oFirstTr"){
			$(this).parents("tr").insertBefore($(this).parents("tr").prev("tr"))
		}
	})
})






