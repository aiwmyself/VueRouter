import install from "./install"
import createMatcher from "./create-matcher"
import HashHistory from './history/hash'
import HTML5History from "./history/html5"
export default class VueRouter {
    constructor(options) {
        // 记录路由信息
        this._routes = options.routes || []
        // 根据路由信息，返回一个对象有下面属性
        // match函数输入url匹配对应路由信息
        // addRoutes函数输入路由信息，添加新的路由后返回新的pathList和pathMap
        this.matcher = createMatcher(this._routes)
        // 选择路由模式
        const mode = this.mode = options.mode || 'hash'
        switch (mode) {
            case 'hash':
                this.history = new HashHistory(this)
                break;
            case 'history':
                this.history = new HTML5History(this)
                break;
            default:
                throw new Error('mode error')
        }
    }
    init(app) {
        // app是vue的实例
        const history = this.history
        // 创建箭头函数使setUpListener函数中的this指向history，直接传入的话，传入的是函数引用，this为window
        const setUpListener = () => {
            history.setUpListener()
        }
        // 定义history对象的cb回调函数，当hash值改变时触发该回调函数。
        // 该回调会触发_route改变，即RouterView重新渲染。
        history.listen(current => {
            app._route = current
        })
        // 默认在url结尾加上/#/，在完成后设置监听函数监听hashchange事件。
        history.transitionTo(history.getCurrentLocation(), setUpListener)
    }
}
VueRouter.install = install