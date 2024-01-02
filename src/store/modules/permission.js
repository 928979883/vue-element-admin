import { constantRoutes } from '@/router'
import Layout from '@/layout'
import { getRoutes } from '@/api/role'

/**
 * 传入登录用户的角色 = roles
 * 传入正在匹配的某个路由 = route.meta.roles
 * 返回是否有权限访问该路由
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 *  传入动态路由表 = routes
 *  传入登录用户的角色 = roles
 *  过滤出用户有权访问的路由表 = res
 * @param routes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      const component = tmp.component
      if (route.component) {
        if (component === 'Layout') {
          tmp.component = Layout
        } else {
          // 接口组件字符串转换成组件对象
          tmp.component = (resolve) => require([`@/views/${component}`], resolve)
        }
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 根据角色生成可访问路由表 = accessedRoutes
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      getRoutes().then(response => {
        const accessedRoutes = filterAsyncRoutes(response.data, roles)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
