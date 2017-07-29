

Mock.mock(
    'http://versionlist?page=1', {
    "date":"2017-07-12 14:28:29",
    "statusCode":200,
    "statusMsg":"成功",
    "success":true,
    "result":{
        "list":[
            {
                "id":5,
                "note":"但很多很多很多",
                "sn":1,
                "title":"asd",
                "valid":true
            },
            {
                "id":6,
                "note":"哈哈",
                "sn":2,
                "title":"电话的",
                "valid":true
            },
            {
                "id":7,
                "note":"",
                "sn":33,
                "title":"人教版",
                "valid":false
            }
        ],
        "pageData":{
            "pageCount":1,
            "pageSize":10,
            "totalCount":57
        }
    }
}
);

Mock.mock(
    'http://versionlist?page=2', {
    "date":"2017-07-12 14:28:29",
    "statusCode":200,
    "statusMsg":"成功",
    "success":true,
    "result":{
        "list":[
            {
                "id":5,
                "note":"但很多很多很多111111",
                "sn":1,
                "title":"asd",
                "valid":true
            },
            {
                "id":6,
                "note":"哈哈111111",
                "sn":2,
                "title":"电话的",
                "valid":true
            },
            {
                "id":7,
                "note":"",
                "sn":33,
                "title":"人教版1111111",
                "valid":false
            }
        ],
        "pageData":{
            "pageCount":1,
            "pageSize":10,
            "totalCount":57
        }
    }
}
);

Mock.mock(
    'http://enableEdition', {
    "date":"2017-07-12 14:28:29",
    "statusCode":"200",
    "statusMsg":"成功",
    "success":true,
    }
);

Mock.mock(
    'http://version',
    {
        "id":7,
        "note":"",
        "sn":33,
        "title":"人教版",
        "valid":false
    }
);

// Mock.mock(
//     'http://versionlist', {
//         "userName" : '@name',     //模拟名称
//         "age|1-100": 100,          //模拟年龄(1-100)
//         "color"    : "@color",    //模拟色值
//         "date"     : "@date('yyyy-MM-dd')",  //模拟时间
//         "url"      : "@url()",     //模拟url
//         "content"  : "@cparagraph()" //模拟文本
//     }
// );
