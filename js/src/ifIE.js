	var ie = !-[1,];
		if(ie){
			$(function(){
				$(".dropdown-toggle").each(function(){
					$(this).on("click",function(){
						$(this).slideDown()
					})
				})
			})
	}

