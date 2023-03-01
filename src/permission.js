import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress 配置

const whiteList = ['/login', '/auth-redirect'] // 无重定向白名单

router.beforeEach(async(to, from, next) => { // 拦截路由，判断是否已获得token
  NProgress.start() // 启动进度条
  document.title = getPageTitle(to.meta.title) // 设置页面标题
  const hasToken = getToken()
  if (hasToken) { // 用户登录成功 有token
    if (to.path === '/login') { // 如果已登录，跳转登陆页面时重定向到主页
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else { // 如果已登录，跳转其他页面时
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) { // 拉取了user_info
        next()
        // 判断权限
        // if (hasPermission(store.getters.roles, to.meta.role)) {
        //   next()
        // } else {
        //   next({ path: '/401' }) // 当访问没权限 会自动进入404页面
        // }
      } else { // 没有拉取到user_info
        try { // 拉取user_info
          const { roles } = await store.dispatch('user/getInfo') // 注意：角色必须是对象数组！如： ['admin'] or ,['developer','editor']

          // 根据角色生成可访问的路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加可访问的路由
          router.addRoutes(accessRoutes)

          // hack 方法确保 addRoutes 是完整的
          // 设置替换：true，因此导航不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除令牌并转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else { // 用户没有登录 无token
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单
      next() // 直接进入
    } else { // 其他没有访问权限的页面将重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done() // hash模式下手动改变hash,重定向回来不会触发afterEach history模式没问题，改行可删除
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
