# 项目介绍
1. 纯前端个人项目，所有的数据都是用 mockjs 模拟生成
1. 后台通用集成版本(国际化版本)，基于 vue 和 element-ui实现。
2. 不太适合当基础模板来进行二次开发。因为本项目集成了很多你可能用不到的功能，会造成不少的代码冗余。
1. [项目官方文档](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD)
2. [项目源地址](https://github.com/PanJiaChen/vue-element-admin)
2. [已推送至我的github](https://github.com/928979883/vue-element-admin)
3. 正在剔除原作者相关元素

## 开发
```bash
git clone 项目地址
cd vue-element-admin
# 切换淘宝镜像，解决npm i慢的问题
npm install --registry=https://registry.npm.taobao.org
npm install
npm run dev
```

## 发布
```bash
# 打包测试环境
npm run build:stage
# 打包生产环境
npm run build:prod
```

## Git相关
```bash
# 代码推送
git add .
git commit -m "本次推送备注" --no-verify
git pull
git push
# 将已经push到github的文件删除, 但本地的文件不删除
git rm -r --cached .vscode # 将文件夹从暂存区中删除
git commit -m delete .vscode config # 将修改后的暂存区合并到HEAD中
git push origin master # 推到远端
```

## 其它
```bash
# 预览发布环境效果
npm run preview
# 预览发布环境效果 + 打包结果分析
npm run preview -- --report
# 代码格式检查
npm run lint
# 代码格式检查并自动修复
npm run lint -- --fix
```

## 全局基础
1. views和api
    * 根据业务模块来划分 views,views 和 api 两个模块一一对应，从而方便维护
2. components
    * 全局公用组件   
    * 页面级的组件建议还是放在各自views文件下
3. store
    * 不要为了用 vuex 而用 vuex
    * 需要用 vuex 来统一管理的，如登录token,用户信息，或者是一些全局信息等
4. webpack
    * vue-cli 的 webpack-template 为基础模板构建
5. alias
    * 指向src目录下，再使用相对路径找文件
```bash
# 方法一
resolve: {
  alias: {
    '~': resolve(__dirname, 'src')
  }
}
# 使用
import stickTop from '~/components/stickTop'
# 方法二
resolve: {
  alias: {
    'src': path.resolve(__dirname, '../src'),
    'components': path.resolve(__dirname, '../src/components'),
    'api': path.resolve(__dirname, '../src/api'),
    'utils': path.resolve(__dirname, '../src/utils'),
    'store': path.resolve(__dirname, '../src/store'),
    'router': path.resolve(__dirname, '../src/router')
  }
}
# 使用
import stickTop from 'components/stickTop'
import getArticle from 'api/article'
```
6. ESLint 配置文件
    1. 安装eslint插件
    2. ctrl+shift+P 选择：首选项:打开工作区设置(JSON)
    3. 自动生成 .vscode配置文件夹
    4. 将配置文件的内容粘贴进setting.json

7. 封装axios接口请求
   * src\utils\request.js
```bash
# 使用
import request from '@/utils/request'
export function getInfo(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  });
}
```
8. router-view
    * 当不同的路由使用同一个组件时，这两个页面切换时并不会触发vue的created或者mounted钩子
    * 在 router-view上加上一个唯一的key，来保证路由切换时都会重新渲染触发钩子
```bash
<router-view :key="key"></router-view>
computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
}
```

## 第三方登录验证思路
1. 账号密码验证过之后还需要一个绑定的第三方平台登录验证
  1.1 this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
      // 登录成功不重定向到首页
      // this.$router.push({ path: '/' });
      // 而是进行第三方验证
      this.showDialog = true // 弹出选择第三方平台的dialog
    }).catch(err => {
      this.$message.error(err); // 登录失败提示错误
    });
2. 通过 OAuth2.0 授权
3. 第三方授权成功之后都会跳到一个你之前有一个传入redirect_uri的页面
4. 如微信还必须是你授权账号的一级域名。
  4.1 授权的域名：vue-element-admin.com
  4.2 就只能重定向：vue-element-admin.com/xxx/
  4.3 需要写一个重定向的服务，如vue-element-admin.com/auth/redirect?a.com
  4.4 跳到该页面时会再次重定向给a.com

## Element 动态换肤
1. Theme generator 一个专门用来生成Element主题的工具
2. gulp-css-wrap 将这个主题的每个元素外面包裹一个class 来做命名空间
```bash
var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css');
var cssWrap = require('gulp-css-wrap');
var customThemeName='.custom-theme'
gulp.task('css-wrap', function() {
return gulp.src( path.resolve('./theme/index.css'))
  .pipe(cssWrap({selector:customThemeName}))
  .pipe(cleanCSS())
  .pipe(gulp.dest('dist'));
});
gulp.task('move-font', function() {
return gulp.src(['./theme/fonts/**']).pipe(gulp.dest('dist/fonts'));
});
gulp.task('default',['css-wrap','move-font']);
```
3. 在项目中(main.js)引入主题 import 'assets/custom-theme/index.css'
4. 使用：toggleClass(document.body, 'custom-theme')

## 浏览器支持
Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions |

## 功能
```
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置
  - 二步登录

- 多环境发布
  - dev
  - sit
  - stage
  - prod

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 编辑器
  - 富文本
  - Markdown
  - JSON 等多格式

- Excel
  - 导出excel
  - 导入excel
  - 前端可视化excel
  - 导出zip

- 表格
  - 动态表格
  - 拖拽表格
  - 内联编辑

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 拖拽Select
  - 拖拽看板
  - 列表拖拽
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

- 综合实例
- 错误日志
- Dashboard
- 引导页
- ECharts 图表
- Clipboard(剪贴复制)
- Markdown2html
```
