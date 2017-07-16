
function addRow(){
	var id = $("#teacherTab").find('tr:last').children('td:first').text();
	id = id*1+1;
	var a;
	var content = '<tr>'+
					'<td>'+
						'<input class="form-control oInputS"  type="text" readonly value="请选择" onclick="showMenu(this);" />'+
						'<input class="form-control oInputS"  type="text" readonly value="请选择" />'+
					'</td>'+
					'<td>'+
						'<a href="javascript:;" onclick="delRow(this)">删除</a>&nbsp;'+
						'<a href="javascript:;" onclick="fnUp(this)">上移</a>&nbsp;'+
						'<a href="javascript:;" onclick="fnNext(this)">下移</a>'+
					'</td>'+
				'</tr>';
	$("#teacherTab").append(content);
	
}
//下移	
	
function fnNext(obj){
	var oThisZsd=obj.parentNode.previousElementSibling.firstElementChild.value; //当前知识点
	
	
	
	
	
	
	//console.log(lastZsdName)
	if(obj.parentNode.parentNode.nextElementSibling){
		var lastZsd=obj.parentNode.parentNode.nextElementSibling.firstElementChild.firstElementChild.value;//下一个当前知识点
		obj.parentNode.previousElementSibling.firstElementChild.value=lastZsd;//当前知识点编号
		obj.parentNode.parentNode.nextElementSibling.firstElementChild.firstElementChild.value=oThisZsd;//下一个当前知识点
		
		
	}
	
}
//上移
function fnUp(obj){
	//previousSibling ie678
		var oThisZsd=obj.parentNode.previousElementSibling.firstElementChild.value; //当前知识点
		var lastZsd=obj.parentNode.parentNode.previousElementSibling.firstElementChild.firstElementChild.value;//上一个当前知识点
		if(lastZsd){
			obj.parentNode.previousElementSibling.firstElementChild.value=lastZsd;//当前知识点
			
			obj.parentNode.parentNode.previousElementSibling.firstElementChild.firstElementChild.value=oThisZsd;//上一个当前知识点
			
			
		}
		
	}


//删除行
function delRow(obj) {
	console.log()
   console.log(obj.parentElement.parentElement)
    var rowIndex = obj.parentElement.parentElement.rowIndex;  
  	obj.parentElement.parentElement.parentElement.deleteRow(rowIndex); 
}

 var setting1 = {
            check: {
                enable: true,
                chkStyle: "radio",
                radioType: "all"
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
                onCheck: onCheck1
            }
        };

        var zNodes1 =[
            {id:1, pId:0, name:"北京"},
            {id:2, pId:0, name:"天津"},
            {id:3, pId:0, name:"上海"},
            {id:6, pId:0, name:"重庆"},
            {id:4, pId:0, name:"河北省", open:true, nocheck:true},
            {id:41, pId:4, name:"石家庄"},
            {id:42, pId:4, name:"保定"},
            {id:43, pId:4, name:"邯郸"},
            {id:44, pId:4, name:"承德"},
            {id:5, pId:0, name:"广东省", open:true, nocheck:true},
            {id:51, pId:5, name:"广州"},
            {id:52, pId:5, name:"深圳"},
            {id:53, pId:5, name:"东莞"},
            {id:54, pId:5, name:"佛山"},
            {id:6, pId:0, name:"福建省", open:true, nocheck:true},
            {id:61, pId:6, name:"福州"},
            {id:62, pId:6, name:"厦门"},
            {id:63, pId:6, name:"泉州"},
            {id:64, pId:6, name:"三明"}
         ];

        function onClick1(e, treeId, treeNode) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
            zTree.checkNode(treeNode, !treeNode.checked, null, true);
            return false;
        }

        function onCheck1(e, treeId, treeNode) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo1"),
            nodes = zTree.getCheckedNodes(true),
            v = "";
            for (var i=0, l=nodes.length; i<l; i++) {
                v += nodes[i].name + ",";
            }
            console.log(currentObj)
            if (v.length > 0 ){
            	v = v.substring(0, v.length-1);
           		 //var cityObj = $("#citySel");
           		
           		 currentObj.val(v) }
            else{
            	currentObj.val("请选择")
            	};////////使用变量存储的input对象
        }
 		var currentObj;////////////存储当前操作的input对象
        function showMenu(o) {
            var cityObj = $(o);
            if (o.tagName == 'A') cityObj = cityObj.parent().find('input');//点击的是连接，获取和连接对应的input对象
            currentObj=cityObj///
            var cityOffset = cityObj.offset();
            $("#menuContent").css({ left: cityOffset.left + "px", top: cityOffset.top + cityObj.outerHeight() + "px" }).slideDown("fast");

            var treeObj = $.fn.zTree.getZTreeObj("treeDemo1");
            var nodes = treeObj.getSelectedNodes();
            if (nodes.length > 0) treeObj.checkNode(nodes[0], false, null, false);//取消ztree的选择

            $("body").bind("mousedown", onBodyDown);
        }
        function hideMenu() {
            $("#menuContent").fadeOut("fast");
            $("body").unbind("mousedown", onBodyDown);
        }
        function onBodyDown(event) {
            if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
                hideMenu();
            }
        }

        $(document).ready(function(){
            $.fn.zTree.init($("#treeDemo1"), setting1, zNodes1);
        });
