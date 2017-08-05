/*!
 * 通用脚本
 * sundongguo@20140502-20141012
 */

//≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡[通用模块]
//==================================================[开发环境配色]
// 开发环境使用特殊配色，以避免和线上环境混淆。
if (location.host.startsWith('d.jingyizhihui.com')) {
  document.addStyleRules([
    'header::after { content: "开发环境"; float: right; width: 100px; height: 40px; margin: 5px 10px; padding: 0 20px; border-radius: 40px; box-shadow: 0 0 10px gold; background: yellow; color: red; font-size: 16px; font-weight: bold; line-height: 40px; text-align: center; }'
  ]);
}

//==================================================[数据通信]
var RESTfulRequest = function() {
//--------------------------------------------------[资源列表]
  var resources = {
    knowledge: ['knowledge', '知识点列表'],
    cards: ['cards', '知识卡片'],
    textbooks: ['textbooks', '教材列表'],
    chapters: ['chapters', '章节列表'],
    categories: ['categories', '题型列表'],
    questions: ['questions', '试题'],
    videos: ['videos', '视频'],
    connections: ['connections', '关联关系'],
    tests: ['section_tasks', '自测卷列表'],
    tasks: ['tasks', '自测卷'],

    schools: ['schools', '学校数据'],
    grades: ['grades', '年级数据'],
    classes: ['classes', '班级数据'],
    teachers: ['teachers', '教师数据'],
    students: ['students', '学生数据'],
    products: ['items', '商品数据'],

    times: ['time_tag', '时间限制']

  };

//--------------------------------------------------[加载提示]
  /**
   * @新增属性
   * @新增方法
   *   show
   *     显示提示，仅在耗时超过 200ms 时才会显示。
   *     参数：
   *       {string} message 要显示的文本信息。
   *     返回值：
   *       {Element} 本元素。
   *   hide
   *     隐藏提示。
   *     参数：
   *       {string} message 要隐藏的文本信息。
   *     返回值：
   *       {Element} 本元素。
   * @新增事件
   */
  var $loading = function() {
    document.addStyleRules([
      '#loading { display: none; position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 5000000; background: hsla(0, 0%, 0%, 0); }',
      '#loading span { position: absolute; left: 50%; top: 50%; width: 400px; height: 60px; margin: -30px 0 0 -200px; border: 3px solid hsla(0, 0%, 100%, .25); box-shadow: 0 0 5px hsla(0, 0%, 0%, .75); background: content-box hsla(0, 0%, 0%, .75); color: white; font-weight: 600; font-size: 16px; line-height: 60px; text-align: center; }'
    ]);
    var $loading = $('<div id="loading"><span></span></div>');
    var $message = $loading.find('span');
    var messages = [];
    document.on('beforedomready:once', function() {
      $loading.insertTo(document.body);
    });
    return Object.mixin($loading, {
      show: function(message) {
        messages.push(message);
        return this.fade('in', {
          duration: 400,
          timingFunction: 'cubic-bezier(1, 0, 1, 0)',
          onStart: function() {
            $message.innerText = messages.getLast();
          }
        });
      },
      hide: function(message) {
        messages.remove(message);
        if (messages.length === 0) {
          this.fade('out', {
            duration: 200,
            onFinish: function() {
              $message.innerText = '';
            }
          });
        }
        return this;
      }
    });
  }();

//--------------------------------------------------[异步请求]
  /**
   * 对 Request 的定制封装。
   * @name RESTfulRequest
   * @constructor
   * @param {Object} options 参数，除以下列出的属性之外，还包括 Request 的同名参数的所有其他属性。
   * @param {string} options.action 要操作的资源，由资源名称和操作方法组成，格式为 name:method。
   * @param {Function} [options.dataFilter] 数据过滤器，每次请求完成时被调用，传入响应数据，其返回值将成为 success 事件对象的 data 属性。如果发现错误数据，则应抛出异常，异常信息将成为 failure 事件的 message 属性。
   * @param {string} [options.loadingMessage] 请求开始时要显示的提示信息。配置资源时可以指定默认值，但此处的设定优先级更高。如果指定为空字符串，则请求开始时不会显示任何提示信息。
   * @param {string} [options.failureMessage] 请求失败时要显示的提示信息，失败的具体原因被追加在此信息后。配置资源时可以指定默认值，但此处的设定优先级更高。如果指定为空字符串，则请求失败时不会显示任何提示信息。
   * @fires start
   *   请求开始时触发，与 Request 的同名事件相同。
   * @fires abort
   *   请求被取消时触发，与 Request 的同名事件相同。
   * @fires error
   *   请求出错时触发，与 Request 的同名事件相同。
   * @fires timeout
   *   请求超时时触发，与 Request 的同名事件相同。
   * @fires uploading
   *   数据上传过程中每隔一段时间触发，与 Request 的同名事件相同。
   *     {number} loaded 已传输的数据量，可能为 NaN。
   *     {number} total 要传输的总数据量，可能为 NaN。
   *     {string} percentage 已传输的数据量占总数据量的百分比，可能为 ''。
   * @fires downloading
   *   数据下载过程中每隔一段时间触发，与 Request 的同名事件相同。
   *     {number} loaded 已传输的数据量，可能为 NaN。
   *     {number} total 要传输的总数据量，可能为 NaN。
   *     {string} percentage 已传输的数据量占总数据量的百分比，可能为 ''。
   * @fires complete
   *   请求完成时触发，与 Request 的同名事件相同。
   *     {number} status 状态码。
   *     {string} statusText 状态描述。
   *     {Object} headers 响应头。
   *     {string} text 响应文本。
   * @fires finish
   *   请求结束时触发，与 Request 的同名事件相同。
   *   只要请求已开始，此事件就必然会在 abort、error、timeout 或 complete 事件之后立即被触发。
   *   如果此事件在 complete 事件之后被触发，则以下事件对象属性中的 status、statusText、headers 和 text 的值与 complete 事件对象的同名属性的值一致。
   *   否则，status 为 0，statusText 和 text 为空字符串，headers 为空对象。
   *     {string} state 本次请求结束时的状态，可能是 'abort'、'error'、'timeout' 或 'complete'。
   *     {number} status 状态码。
   *     {string} statusText 状态描述。
   *     {Object} headers 响应头。
   *     {string} text 响应文本。
   * @fires success
   *   请求成功时触发，只在请求完成并且数据成功被 options.dataFilter 过滤后(如果有）才会被触发。
   *     {number} status 状态码。
   *     {Object} headers 响应头。
   *     {Object} data 过滤后的响应数据。
   * @fires failure
   *   请求失败时触发，只要 success 事件没有被触发，本事件就一定会被触发。
   *     {number} status 状态码。
   *     {Object} headers 响应头。
   *     {string} message 错误信息。
   */
  var reAction = /^([a-zA-Z]+):(options|head|get|post|put|patch|delete)$/;
  var actionNames = {options: '检查', head: '查询', get: '获取', post: '创建', put: '新增', patch: '更新', delete: '删除'};
  var parseAction = function(action) {
    try {
      var match = action.match(reAction);
    } catch (e) {
    } finally {
      if (!match) {
        throw new SyntaxError('Invalid action "' + action + '"');
      }
    }
    var name = match[1];
    if (!RESTfulRequest.resources.hasOwnProperty(name)) {
      throw new Error('Undefined resource name "' + name + '"');
    }
    var resource = RESTfulRequest.resources[name];
    var url = '/api/' + resource[0];
    var method = match[2];
    var resourceName = resource[1];
    return {
      url: url,
      method: method,
      loadingMessage: resourceName ? ('正在' + actionNames[method] + resourceName + '……') : '',
      failureMessage: resourceName ? (resourceName + actionNames[method] + '失败！') : ''
    };
  };
  var RESTfulRequest = function(options) {
    var result = parseAction(options.action);
    this.dataFilter = options.dataFilter || null;
    options.method = result.method;
    if (!options.hasOwnProperty('loadingMessage')) {
      options.loadingMessage = result.loadingMessage;
    }
    if (!options.hasOwnProperty('failureMessage')) {
      options.failureMessage = result.failureMessage;
    }
    options.headers = {'Accept': '*/*'};
    options.contentType = 'multipart/form-data';
    Request.call(this, result.url, options);
    this
        .on('start', function() {
          if (options.loadingMessage) {
            $loading.show(options.loadingMessage);
          }
        })
        .on('finish', function(e) {
          if (options.loadingMessage) {
            $loading.hide(options.loadingMessage);
          }
          var data = null;
          var message = '';
          switch (e.status) {
            case 200:
              if (e.text) {
                try {
                  data = JSON.parse(e.text);
                  if (this.dataFilter) {
                    data = this.dataFilter(data);
                  }
                } catch (exception) {
                  data = null;
                  message = exception.message + ' (' + e.status + ')';
                }
              }
              break;
            case 403:
              message = '您的授权已过期，请重新登录。';
              break;
            default:
              message = e.state + ' (' + e.status + ': ' + e.statusText + ')';
              break;
          }
          if (message) {
            this.fire('failure', {status: e.status, headers: e.headers, message: message});
          } else {
            this.fire('success', {status: e.status, headers: e.headers, data: data});
          }
        })
        .on('failure', function(e) {
          if (options.failureMessage) {
            alert(options.failureMessage + '\n' + e.message);
            if (e.status === 403) {
              signOut();
            }
          }
          console.warn('RESTfulRequest "' + options.action + '" failure: ' + e.message);
        });
    return this;
  };

  /**
   * 资源列表。
   * @name RESTfulRequest.resources
   * @type Object
   */
  RESTfulRequest.resources = resources;

  /**
   * 复制 Request 的原型方法。
   */
  Object.mixin(RESTfulRequest.prototype, Request.prototype);

  /**
   * 覆盖 Request 的原型方法 - 发送请求。
   * @name RESTfulRequest.prototype.send
   * @function
   * @param {Object} [data] 要发送的数据，同 Request 的同名方法的同名参数。
   * @returns {boolean} 本方法是否已被成功调用。
   */
  RESTfulRequest.prototype.send = function(data) {
    return Request.prototype.send.call(this, data);
  };

  return RESTfulRequest;

}();

//==================================================[开启/关闭聚焦模式]
document.setFocusArea = function() {
  document.addStyleRules([
    '.focus-area-mask { position: fixed; left: 0; right: 0; top: 0; bottom: 0; z-index: 500000; background: hsla(0, 0%, 100%, .5); }'
  ]);
  var $body = document.body;
  var $focusArea = null;
  var $top = $('<div class="focus-area-mask"></div>');
  var $bottom = $top.clone();
  var $left = $top.clone();
  var $right = $top.clone();
  var setMask = function() {
    if ($focusArea) {
      var clientRect = $focusArea.getClientRect();
      $top.setStyles({bottom: 'auto', height: clientRect.top}).insertTo($body);
      $bottom.setStyles({top: clientRect.bottom}).insertTo($body);
      $left.setStyles({right: 'auto', top: clientRect.top, bottom: 'auto', width: clientRect.left, height: clientRect.height}).insertTo($body);
      $right.setStyles({left: clientRect.left + clientRect.width, top: clientRect.top, bottom: 'auto', height: clientRect.height}).insertTo($body);
    }
  };
  window.onbeforeunload = function() {
    return $focusArea ? '您有正在编辑的内容尚未保存！' : undefined;
  };
  return function($target) {
    if ($target) {
      $focusArea = $target;
      setMask();
      window.on('scroll.focusareamask, resize.focusareamask', function() {
        setMask();
      });
    } else {
      $focusArea = null;
      $top.remove().removeAttribute('style');
      $bottom.remove().removeAttribute('style');
      $left.remove().removeAttribute('style');
      $right.remove().removeAttribute('style');
      window.off('scroll.focusareamask, resize.focusareamask');
    }
  };
}();

//==================================================[全角转半角]
String.prototype.toSBCS = function() {
  var result = '';
  var i = 0;
  var code = NaN;
  while (!Number.isNaN(code = this.charCodeAt(i++))) {
    if (code === 12288) {
      code = 32;
    } else if (code >= 65281 && code <= 65373) {
      code -= 65248;
    }
    result += String.fromCharCode(code);
  }
  return result;
};

//==================================================[使文本输入框闪烁]
HTMLElement.prototype.blink = function() {
  return this.highlight('yellow', 'backgroundColor', {
    duration: 200,
    timingFunction: 'cubic-bezier(p1x, p1y, p2x, p2y)',
    onFinish: function() {
      if (this.blinking) {
        delete this.blinking;
      } else {
        this.blinking = true;
        setTimeout(this.blink.bind(this), 150);
      }
    }
  });
};

//==================================================[去除不必要的结构和样式]
HTMLElement.prototype.getMinimalisticFormatedContent = function() {
  var data = '';
  Array.from(this.childNodes).forEach(function(node) {
    switch (node.nodeType) {
      case 1:
        switch (node.nodeName) {
          case 'BR':
            data += '<br>';
            break;
          case 'IMG':
            data += '<img src=\'' + node.src + '\'>';
            break;
          default:
            data += node.getMinimalisticFormatedContent();
            if (!node.getStyle('display').startsWith('inline')) {
              data += '<br>';
            }
        }
        break;
      case 3:
        data += node.nodeValue.clean().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        break;
    }
  });
  console.log("data: " + data);
  return data;
};

//≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡[通用变量]
var gradationId = +localStorage.getItem('gradationId');
if (gradationId === 0) {
  localStorage.setItem('gradationId', String(gradationId = 2));
}
var courseId = +localStorage.getItem('courseId');
if (courseId === 0) {
  localStorage.setItem('courseId', String(courseId = 2));
}
var signOut = function() {
  localStorage.clear();
  location.href = '/api/logout';
};

//≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡[通用页头及控件]
document.on('domready', function() {
//==================================================[创建页头]
  var $header = $('#header');
  if ($header) {
    // 注入页头内容。
    $header.insertAdjacentHTML('afterBegin', '<div class="menu widget-selector"></div><div class="user widget-selector" data-placeholder="　　　"></div><div class="gradation widget-selector"></div><div class="course widget-selector"></div>');
    Widget.parse($header, true);

    // 管理菜单。
    var isAdmin = function() {
      return ['/schools/', '/classes/', '/users/', '/products/'].some(function(pathname) {
        return location.pathname.contains(pathname);
      });
    }();
    var menuData = isAdmin ? [
      {text: '学校管理', value: '../schools/'},
      {text: '班级管理', value: '../classes/'},
      {text: '教师管理', value: '../users/?type=teachers'},
      {text: '学生管理', value: '../users/?type=students'}
      //{text: '商品管理', value: '../products/'}
    ] : [
      {text: '知识点管理', value: '../knowledge/'},
      {text: '知识卡片管理', value: '../cards/'},
      {text: '章节管理', value: '../chapters/'},
      {text: '试题管理', value: '../questions/list.html'},
      {text: '自测卷管理', value: '../tests/'},
      {text: '教辅管理', value: '../workbooks/'}
    ];
    var selectedIndex = -1;
    menuData.some(function(item, index) {
      if (item.text === document.title) {
        selectedIndex = index;
        return true;
      } else {
        return false;
      }
    });
    $header.find('.menu')
        .setOptions(menuData)
        .setSelectedIndex(selectedIndex)
        .enable()
        .on('valuechange', function(e) {
          location.href = e.value;
        });

    // 用户。
    var $user = $header.find('.user');
    $user
        .setOptions([
          {text: '用户信息', value: 'info'},
          {text: '注销', value: 'signout'}
        ])
        .enable()
        .on('valuechange', function(e) {
          switch (e.value) {
            case 'info':
              // setTimeout(showUserInfo, 100);
              setTimeout(function() {
                alert('暂无');
              }, 100);
              break;
            case 'signout':
              signOut();
              break;
          }
          this.setSelectedIndex(-1);
        });
    //$user.placeholder = user.name;
    $user.placeholder = '管理员';
    $user.setSelectedIndex(-1);

    // 阶段。
    $header.find('.gradation')
        .setOptions([
          {text: '初中', value: '2'},
          {text: '高中', value: '3'}
        ])
        .setSelectedValue(String(gradationId))
        .enable()
        .on('valuechange', function(e) {
          localStorage.setItem('gradationId', e.value);
          location.reload();
        });

    // 科目。
    $header.find('.course')
        .setOptions([
          {text: '语文', value: '1'},
          {text: '数学', value: '2'},
          {text: '英语', value: '3'},
          {text: '物理', value: '4'},
          {text: '化学', value: '5'},
          {text: '生物', value: '6'}
        ])
        .setSelectedValue(String(courseId))
        .enable()
        .on('valuechange', function(e) {
          localStorage.setItem('courseId', e.value);
          location.reload();
        });

  }

});
