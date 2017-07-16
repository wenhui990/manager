//ztree树形菜单
			var setting = {
			view: {
				addHoverDom: addHoverDom,
				removeHoverDom: removeHoverDom,
				selectedMulti: false
			},
			edit: {
				enable: true,
				editNameSelectAll: true,
				showRemoveBtn: showRemoveBtn,
				showRenameBtn: showRenameBtn,
				drag:{
					isMove :true,
					prev:true,
					next:true
				}
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeDrag: beforeDrag,
				
				beforeEditName: beforeEditName,
				beforeRemove: beforeRemove,
				beforeRename: beforeRename,
				onRemove: onRemove,
				onRename: onRename,
				onClick: OnClick,
				onDrop:onDrop
			}
		};

		var zNodes =[
			{ id:1, pId:0, name:"教学计划", open:true},
			{ id:11, pId:1, name:"01 数与试"},
			{ id:111, pId:11, name:"01-1 有理数" },
			{ id:1111, pId:111, name:"01-1-11 正数与负数" },
			{ id:12, pId:1, name:"1-2"},
			{ id:121, pId:12, name:"1-2-1" },
			{ id:122, pId:12, name:"1-2-2" },
			{ id:123, pId:12, name:"1-2-3" },
			{ id:13, pId:1, name:"1-3"},
			{ id:131, pId:13, name:"1-3-1" },
			{ id:132, pId:13, name:"1-3-2" },
			{ id:133, pId:13, name:"1-3-3" },
		];
		var log, className = "dark";
		function beforeDrag(treeId, treeNodes) {
			return false;
		}
		function beforeEditName(treeId, treeNode) {
			className = (className === "dark" ? "":"dark");
			showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.selectNode(treeNode);
		}
		function beforeRemove(treeId, treeNode) {
			className = (className === "dark" ? "":"dark");
			showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.selectNode(treeNode);
		}
		function onRemove(e, treeId, treeNode) {
			showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
		}
		function beforeRename(treeId, treeNode, newName, isCancel) {
			className = (className === "dark" ? "":"dark");
			showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
			if (newName.length == 0) {
				alert("节点名称不能为空.");
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				setTimeout(function(){zTree.editName(treeNode)}, 10);
				return false;
			}
			return true;
		}
		function onRename(e, treeId, treeNode, isCancel) {
			showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
		}
		function showRemoveBtn(treeId, treeNode) {
			return treeNode;
		}
		function showRenameBtn(treeId, treeNode) {
			return treeNode;
		}
		function showLog(str) {
			if (!log) log = $("#log");
			log.append("<li class='"+className+"'>"+str+"</li>");
			if(log.children("li").length > 8) {
				log.get(0).removeChild(log.children("li")[0]);
			}
		}
		function getTime() {
			var now= new Date(),
			h=now.getHours(),
			m=now.getMinutes(),
			s=now.getSeconds(),
			ms=now.getMilliseconds();
			return (h+":"+m+":"+s+ " " +ms);
		}
	
		var newCount = 1;
		function addHoverDom(treeId, treeNode) {
			var sObj = $("#" + treeNode.tId + "_span");
			if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='添加' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_"+treeNode.tId);
			if (btn) btn.bind("click", function(){
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"节点名称" + (newCount++)});
				return false;
			});
		};
		function add(e) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			isParent = e.data.isParent,
			nodes = zTree.getSelectedNodes(),
			treeNode = nodes[0];
			if (treeNode) {
				treeNode = zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, isParent:isParent, name:"new node" + (newCount++)});
			} else {
				treeNode = zTree.addNodes(null, {id:(100 + newCount), pId:0, isParent:isParent, name:"节点名称" + (newCount++)});
			}
			if (treeNode) {
				zTree.editName(treeNode[0]);
			} else {
				alert("叶子节点被锁定，无法增加子节点");
			}
		};
		function removeHoverDom(treeId, treeNode) {
			$("#addBtn_"+treeNode.tId).unbind().remove();
		};
		function selectAll() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
		}
		//判断是否是根节点
		function OnClick(event,treeId, treeNode) {
			console.log(treeNode.level)
			if(treeNode.level){
				$(".noTreeRoot").show();
				$(".treeRoot").hide()
			}else{
				$(".treeRoot").show();
				$(".noTreeRoot").hide();
			}
			console.log(treeNode.children)
			$(".parentTree").show()
			$(".oNum").val(fnSlice0(treeNode.name));
			$(".oName").val(fnSlice1(treeNode.name));
			$("tr:not(.oFirstTr)").remove()
			if(treeNode.children){
				$(".noHasNext").show()
				for(var i=0;i<treeNode.children.length;i++){
					var content = '<tr>'+
						'<td>'+
							'<input class="form-control zsd" type="text" value="'+fnSlice0(treeNode.children[i].name)+'">'+
							'<input class="form-control zsd" type="text" value="789">'+
							'<input class="form-control zsd" type="text" value="456">'+
						'</td>'+
						'<td>'+
							'<input class="form-control zsdName" type="text" value="'+fnSlice1(treeNode.children[i].name)+'">'+
						'</td>'+
						
						'<td>'+
							'<a href="javascript:;" onclick="delRow(this)">删除</a>&nbsp;'+
							'<a href="javascript:;" class="upClick">上移</a>&nbsp;'+
							'<a href="javascript:;" class="downClick" >下移</a>'+
						'</td>'+
					'</tr>';
					$("#teacherTab").append(content);
				}
			}else{
				$(".noHasNext").hide()
			}
			
		  
		    
		};
		function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy){
			console.log(treeNode)
		};
		function fnSlice0(str){
			return str.split(" ")[0]
		}
		function fnSlice1(str){
			return str.split(" ")[1]
		}
		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			$("#addParent").bind("click", {isParent:true}, add);
			$("#selectAll").bind("click", selectAll);
		});