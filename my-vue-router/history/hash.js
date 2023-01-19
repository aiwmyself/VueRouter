import History from './base'
function ensureSlash() {
    if (window.location.hash) {
        return
    }
    window.location.hash = '/'
}
export default class HashHistory extends History {
    constructor(router) {
        super(router)
        // 保证首次访问的url路径有#/
        ensureSlash()
    }
    getCurrentLocation() {
        return window.location.hash.slice(1)
    }
    setUpListener() {
        window.addEventListener('hashchange', () => {
            this.transitionTo(this.getCurrentLocation())
        })
    }
}
