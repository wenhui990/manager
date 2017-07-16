$(".list_delete").on('click',function(){
	layer.alert('确定删除吗？', {//第一个参数是提示文本
        skin: 'layui-layer-demo',//蓝色外框皮肤
        closeBtn: 1,//没有关闭按钮
        shift: 5 ,//动画类型，为5的动画效果不突兀，动画效果类型还可以是1,2,3,4,....
        btn: ['保存','取消']
    });
});