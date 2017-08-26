questionvue.courseId = getUrlParams().courseid;	
var knowledgeids = [];
var $importer = function() {
	var $importer = $('#importer');
	var $back = $importer.find('.title b.back');
	var $content = $importer.find('.content');
	var $blockquote = $content.find('.pasteboard blockquote');
//	var $parseDoc = $importer.find("#savequestion");

	//--------------------------------------------------[提取试题]
	var parseQuestions = function(data) {
		console.log("start parseQuesions");
		// 解析。
		var questions = [];
		var question = {};
		var bank = 0;
		var type = 0;
		var currentFieldName = '';
		var match = null;
		var fieldName = undefined;
		var fieldValue = undefined;
		data.replace(/[\r\n]/g, '').split(/<br>/g).forEach(function(line) {
			if(match = line.match(/^\s*(自由学习与作业题库|自测题库|测试题库|单选题|多选题|填空题|简答题|题干|选项|答案|解析|类型|考点|难度|限时|来源|人工判卷|题型)\s*[:：](.*)$/)) {
				// 声明行的数据。
				fieldName = match[1];
				fieldValue = match[2].clean();

				switch(fieldName) {
					case '单选题':
						type = 1;
						currentFieldName = '';
						break;
					case '填空题':
						type = 2;
						currentFieldName = '';
						break;
					case '简答题':
						type = 3;
						currentFieldName = '';
						break;
					case '题干':
						currentFieldName = 'title';
						question = {
							group: bank,
							type: type,
							title: '',
							answer: '',
							analysis: '',
							typical: 0,
							category: '',
							difficulty: 0,
//							expense:''
						};
						questions.push(question);
						break;
					case '选项':
						currentFieldName = 'options';
						break;
					case '答案':
						currentFieldName = 'answer';
						break;
					case '解析':
						currentFieldName = 'analysis';
						break;
//					case '考点':
//						currentFieldName = 'knowledges';
//						break;
					case '难度':
						currentFieldName = 'difficulty';
						break;
//					case '限时':
//						currentFieldName = 'expense';
//						break;
					case '来源':
						currentFieldName = 'from';
						break;
				}
				if(question[currentFieldName]) {
					if(!question.redundant) {
						question.redundant = [];
					}
					question.redundant.push(fieldName);
				}
				switch(currentFieldName) {
					case 'title':
					case 'answer':
					case 'category':
					case 'analysis':
						question[currentFieldName] = fieldValue;
						break;
					case 'options':
						question.options = [];
						break;
//					case 'knowledges':
//						question.knowledges = [];
//						fieldValue.split(/\s*[,，]\s*/).forEach(function(name) {
//							if(name = name.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')) {
//								question.knowledges.push(name);
//							}
//						});
//						break;
					case 'difficulty':
						question.difficulty = +fieldValue;
						break;
//					case 'expense':
//						question.expense = fieldValue;
//						break;
					case 'from':
						question.from = fieldValue;
						break;
				}
			} else {
				// 独立行的数据。
				if(question) {
					switch(currentFieldName) {
						case 'title':
						case 'answer':
						case 'analysis':
						case 'category':
							question[currentFieldName] += (question[currentFieldName] ? '<br>' : '') + line.trim();
							break;
						case 'options':
							match = line.match(/^[A-Z][\.．]?\s*(.*)/);
							if(match) {
								question.options.push(match[1].trim());
							}
							break;
					}
				}
			}
		});

		// 修正与检查。
		var errorMessages = [];
//		var parseTimeLimit = function(expense) {
//			var match = expense.match(/(?:(\d+)分)?(?:(\d+)秒)?/);
//			console.log(match);
//			return match ? ((+match[1] || 0) * 60 + (+match[2] || 0)) * 1000 : 0;
//		};
		questions.forEach(function(question) {
			var questionPreview = question.title.replace(/<img[^>]+>/g, '[...]');
			if(question.redundant) {
				errorMessages.push('本题有冗余的关键字段！\n题干：' + questionPreview + '\n冗余字段：' + question.redundant.join(', '));
			}
			if(question.type === 0) {
				errorMessages.push('本题未指定题目类型！\n题干：' + questionPreview);
			}
			if(question.type === 1) {
				if(!question.options || question.options.length !== 4) {
					errorMessages.push('本题为单选题，但选项有误！\n题干：' + questionPreview + '\n选项个数：' + (question.options ? question.options.length : 0));
				}
				question.answer = question.answer.replace(/\s+/g, '').replace(/<br>/g, '');
				if(!/^[A-D]$/.test(question.answer)) {
					errorMessages.push('本题为单选题，但答案有误！\n题干：' + questionPreview + '\n答案：' + question.answer);
				}
			}
			if(question.type === 2) {
				question.answer = question.answer.replace(/<br>/g, '');
				if(/[<>]/.test(question.answer)) {
					errorMessages.push('本题为填空题，但答案中包含图片！\n题干：' + questionPreview + '\n答案：' + question.answer);
				}
				question.answer = question.answer.toSBCS().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			}
			//      if (question.knowledges && question.knowledges.length) {
			//        question.knowledges = question.knowledges.map(function(name) {
			//          if (kpNameMap.hasOwnProperty(name)) {
			//            return kpNameMap[name];
			//          } else {
			//            errorMessages.push('本题指定的考点不存在！\n题干：' + questionPreview + '\n考点：' + name);
			//            return name;
			//          }
			//        });
			//      } else {
			//        errorMessages.push('本题未指定考点！\n题干：' + questionPreview);
			//      }
			if(question.difficulty < 0 || question.difficulty > 1) {
				errorMessages.push('本题难度超出范围（0-1）！\n题干：' + questionPreview + '\n难度：' + question.difficulty);
			}
//			if(question.expense) {
//				question.expense = parseTimeLimit(question.expense);
//				console.warn(question.expense);
//				if(question.expense === 0) {
//					errorMessages.push('本题限时设定错误！\n题干：' + questionPreview + '\n限时：' + question.expense);
//				}
//			} else {
//				errorMessages.push('本题未指定限时！\n题干：' + questionPreview);
//			}
//			if(question.from && !/\d+\.\S+/.test(question.from)) {
//				errorMessages.push('本题来源格式错误！\n题干：' + questionPreview + '\n来源：' + question.from);
//			}
		});

		if(errorMessages.length) {
			throw new Error(errorMessages.join('\n--------------------------------------------------\n'));
		}
		for(var i = 0; i < questions.length; i++) {
//			questions[i].expense = question.expense;
			questions[i].courseid = questionvue.courseId;
			questions[i].tag = questionvue.picked;
			questions[i].scope = 1;
			questions[i].knowledges=knowledgeids;
//			if(questions[i].options){
//				if(questions[i].options.length > 0) {
//					questions[i].options = JSON.stringify(questions[i].options);
//				}
//			}
		}
		
		console.log(questions);
		var oStr = '';
		var postData = {};
		var oAjax = null;
		try {　　
			oAjax = new XMLHttpRequest();
		} catch(e) {　　
			oAjax = new ActiveXObject("Microsoft.XMLHTTP");
		};
		//post方式打开文件 
		oAjax.open('post', org_url + dataUrl.question + '?token='+sessionStorage.token+'&_ht=' + Math.random(), true);
		// post相比get方式提交多了个这个
		oAjax.setRequestHeader("Content-type", "application/json");
		// post发送数据
		oAjax.send(JSON.stringify(questions));
		oAjax.onreadystatechange = function() {
			//当状态为4的时候，执行以下操作
			var responsedata = JSON.parse(oAjax.response);
			console.log(oAjax);
			if (responsedata.code=='10010') {
				layer.alert('身份验证失败！请重新登录！',{yes:function(){
					parent.location.href = "../../enter.html";
				},cancel:function(){
					parent.location.href = "../../enter.html";
				}});
				return false;
			}
			if(oAjax.readyState == 4) {　　　　
				try {
					if(responsedata.result == 1) {
						layer.alert('上传成功!');
					} else {
						layer.alert('上传失败!'+responsedata.msg?responsedata.msg:' ');
					}　　　　
				} catch(e) {　　　　　　
					layer.alert('你访问的页面出错了');　　　　
				};　　
			};
		};
		// 提取完毕。
		return questions;

	};

	jQuery(document).on("click","#savequestion",function(e) {
		jQuery.each(jQuery('.knowledgeids'), function(i,e) {
			if (!isNaN(jQuery(e).attr('data-knowid')*1)) {
				knowledgeids.push(jQuery(e).attr('data-knowid')*1);
			}
		});
		console.log(knowledgeids)
		console.log(knowledgeids)
		if(knowledgeids&&knowledgeids.length<1){
			layer.alert('请选择知识点');
			return false;
		}else if (jQuery('blockquote').text()=='') {
			layer.alert('请粘贴题库到指定区域!');
			return false;
		}
		var questions = null;
		try {
			questions = parseQuestions($blockquote.getMinimalisticFormatedContent());
		} catch(e) {
			alert(e.message);
		} finally {
			$content.removeClass('processing');
			$blockquote.innerHTML = '';
			console.log('questions:'+questions.length)
			if(questions && questions.length) {
				$blockquote.blur();
				$importer.fire('found', {
					result: questions
				});
			} else {
				layer.alert('提取试题失败！\n请确认粘贴的内容符合约定的格式。\n具体情况请参考“试题模版”。');
				$blockquote.focus();
			}
		}
	});

//	$blockquote.on('keydown', function(e) {
//			var which = e.which;
//			if(!(e.ctrlKey && which === 86 || which >= 112 && which <= 123)) {
//				e.preventDefault();
//			}
//		})
//		.on('drop', function(e) {
//			e.preventDefault();
//		})
//		.on('paste', function() {
//			$content.addClass('processing');
//		})
//		.on('paste:idle(1000)', function() {
//			var questions = null;
//			try {
//				questions = parseQuestions($blockquote.getMinimalisticFormatedContent());
//			} catch(e) {
//				alert(e.message);
//			} finally {
//				console.log('questions:'+questions.length)
//				$content.removeClass('processing');
//				$blockquote.innerHTML = '';
//				if(questions && questions.length) {
//					$blockquote.blur();
//					$importer.fire('found', {
//						result: questions
//					});
//				} else {
//					alert('提取试题失败！\n请确认粘贴的内容符合约定的格式。\n具体情况请参考“试题模版”。');
//					$blockquote.focus();
//				}
//			}
//		});

	// //--------------------------------------------------[取消导入]
	//   $back.on('click', function() {
	//     $importer.disable();
	//   });

	// //--------------------------------------------------[扩展导入试题对象]
	//   return Object.mixin($importer, {
	//     enable: function() {
	//       this.removeClass('disabled');
	//       //$blockquote.focus();
	//       this.fire('enable');
	//       return this;
	//     },
	//     disable: function() {
	//       this.addClass('disabled');
	//       this.fire('disable');
	//       return this;
	//     }
	//   });
}();