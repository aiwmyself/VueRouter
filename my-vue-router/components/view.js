export default {
    name: 'RouterView',
    render(h) {
        const route = this.$route
        // 判断当前路由是否为子路由，并得到在matched匹配数组中对应的路由信息。
        let depth = 0
        this.routerView = true
        let parent = this.$parent
        // 嵌套路由会先渲染外层的routerview组件，
        // 故父组件的routerView属性会被标记为true，这里可以得出是几级子路由
        while (parent) {
            if (parent.routerView) {
                depth++
            }
            parent = parent.$parent
        }
        const record = route.matched[depth]

        if (record) {
            return h(record.component)
        }
        // 输出空的注释
        return h()
    }
}