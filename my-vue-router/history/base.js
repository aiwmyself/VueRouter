import createRoute from '../util/route'
// 记录url当前信息，并在url改变时触发对应的函数
export default class History {
    constructor(router) {
        this.router = router
        // 记录当前路径对应的route对象信息
        this.current = createRoute(null, '/')
        this.cb = null
    }

    listen(cb){
        this.cb = cb
    }
    transitionTo(path, onComplete){
        this.current = this.router.matcher.match(path)
        this.cb && this.cb(this.current)
        onComplete && onComplete()
    }
}