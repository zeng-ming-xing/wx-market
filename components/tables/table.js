// components/tables/table.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabs: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        index: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //列表页的点击切换主题背景，以及抛出自定义函数切换商品
        btn(e) {
            //获取传递过来的参数时获取到的是一个对象，使用结构赋值将值传递给index
            const { index } = e.currentTarget.dataset;
            console.log(index);
            //设置index该组件中的index的值
            this.setData({
                    index
                })
                //向父组件发射自定义事件 切换主题商品
            this.triggerEvent("tabsItemChange", index);
        }
    }
})