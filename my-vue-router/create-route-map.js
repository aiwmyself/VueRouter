// 通过路由信息返回存储所有路由地址路由表和路径对应组件的相关信息
export default function createRouteMap(routes,pathList,pathMap) {
    // 存储所有路由地址
    const pathList = pathList || []
    // 路由表：路径对应组件的相关信息
    const pathMap = pathMap || {}
    routes.forEach(route => {
        addRouteRecord(route, pathList, pathMap)
    })
    return { pathList, pathMap }
}
function addRouteRecord(route, pathList, pathMap, parentRecord) {
    const path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path
    const record = {
        path: path,
        component: route.component,
        parentRecord: parentRecord
    }
    // 判断当前路径，是否已经存储在路由表中了
    if (!pathMap[path]) {
        pathList.push(path)
        pathMap[path] = record
    }
    if (route.children) {
        route.children.forEach(childRoute => {
            addRouteRecord(childRoute, pathList, pathMap, route)
        })
    }
}