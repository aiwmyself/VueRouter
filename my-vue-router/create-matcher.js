import createRouteMap from './create-route-map'
import createRoute from './util/route'
// 根据路由地址，匹配一个路由数据对象，返回匹配路由和添加路由信息的函数。
export default function createMatcher(routes) {
    // pathList 是一个数组，存储所有的路由地址['/','/music','/music/pop','/music/rock]
    // pathMap路由表，路由地址-->record一个记录(path、component、parent){'/':{路由信息},'/music':{路由信息}...}
    const { pathList, pathMap } = createRouteMap(routes)
    function match(path) {
        const record = pathMap[path]
        if (record) {
            return createRoute(record, path)
        }
        // 返回注释节点
        return createRoute(null, path)
    }
    function addRoutes(routes) {
        createRouteMap(routes, pathList, pathMap)
    }
    // match('/music/pop') --->  {path:'/music/pop',matched:[{/music路由信息},{/music/pop路由信息}]}
    return {
        match,
        addRoutes
    }
}