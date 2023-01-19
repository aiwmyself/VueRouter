import Link from './components/link'
import View from './components/view'
export let _Vue = null
// 作为插件注册
export default function install(Vue) {
    _Vue = Vue
    _Vue.mixin({
        beforeCreate() {
            // 给所有Vue实例增加router的属性 
            if (this.$options.router) {
                // 有router属性的是根组件
                this._router = this.$options.router
                this._routerRoot = this
                // 初始化router对象
                this._router.init(this)
                // 定义Vue实例下的_route属性值为this._router.history.current，并设置为响应式数据。
                // 在RouterView中访问的$route即为_route，故当_route改变时会触发RouterView重新渲染。
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                // 子组件
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        }
    })
    // 注册组件RouterLink和RouterView组件
    _Vue.component(Link.name, Link)
    _Vue.component(View.name, View)
    // 设置可以通过this.$router访问到所有路由信息
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router
        }
    })
    // 设置通过this.$route返回当前的路由信息
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route
        }
    })
}