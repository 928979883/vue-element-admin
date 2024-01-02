import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否已经登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 跳转登录页,则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否取得了他的权限角色通过 getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: 角色必须是一个对象数组! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // 基于当前用户角色 筛选出可访问的路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加访问路由
          router.addRoutes(accessRoutes)

          // router.addRoutes之后的next()可能会失效，因为可能next()的时候路由并没有完全add完成
          // 通过next(to)巧妙的避开之前的那个问题了。这行代码重新进入router.beforeEach这个钩子，这时候再通过next()来释放钩子，就能确保所有的路由都已经挂在完成了
          next({ ...to, replace: true })
        } catch (error) {
          // 删除令牌并去登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在自由登录白名单,直接跳转
      next()
    } else {
      // 没有权限访问的其他页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
