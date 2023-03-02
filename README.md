## views和api
1. 根据业务模块来划分 views
2. 将views 和 api 两个模块一一对应
## components
1. 全局公用的一些组件，如上传组件，富文本等等
2. 页面级的组件建议还是放在各自views文件下
## store
1. 不要为了用 vuex 而用 vuex
2. 每个页面里存放自己的 data 就行
3. 需要用 vuex 来统一管理的，如登录token,用户信息，或者是一些全局个人偏好设置等
## webpack
1. 用 vue-cli 的 webpack-template 为基础模板构建、
## jquery (本项目已移除)
## alias
1. 指向src目录下，再使用相对路径找文件
  1.1 方法一
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  }
  //使用
  import stickTop from '~/components/stickTop'
  1.2 方法二
  alias: {
    'src': path.resolve(__dirname, '../src'),
    'components': path.resolve(__dirname, '../src/components'),
    'api': path.resolve(__dirname, '../src/api'),
    'utils': path.resolve(__dirname, '../src/utils'),
    'store': path.resolve(__dirname, '../src/store'),
    'router': path.resolve(__dirname, '../src/router')
  }
  //使用
  import stickTop from 'components/stickTop'
  import getArticle from 'api/article'
## ESLint
1. 安装eslint插件
2. ctrl+shift+P 选择：首选项:打开工作区设置(JSON)
3. 自动生成 .vscode配置文件夹
4. 将配置文件的内容粘贴进setting.json
## 封装 axios
1. src\utils\request.js
2. 使用
  import request from '@/utils/request'
  export function getInfo(params) {
    return request({
      url: '/user/info',
      method: 'get',
      params
    });
  }
## 多环境
## 跨域问题
1. 后端：配置cors
2. 前端：
  2.1 dev环境:在vue.config.js通过配置proxy来解决
  2.2 开发环境用nginx反代理
## 前后端的交互问题
1. 前端自行mock
  1.1 mock server
  1.2 mockjs + rap
  1.3 easy-mock
## iconfont
## router-view
1. 当不同的路由使用同一个组件时，这两个页面切换时并不会触发vue的created或者mounted钩子
2. 在 router-view上加上一个唯一的key，来保证路由切换时都会重新渲染触发钩子
  2.1 :key="key"
  2.2 this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
## Layout
## axios拦截器
1. 服务端对每一个请求都会验证权限
2. request拦截器在每个请求头里面塞入token，好让后端对请求进行权限验证
3. respone拦截器，当服务端返回特殊的状态码，我们统一做处理，如没权限或者token失效等操作
## 两步验证
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
  2.1 var path = require('path')
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
3. 在项目中(main.js)引入主题 import 'assets/custom-theme/index.css'
4. 使用：toggleClass(document.body, 'custom-theme')
## Table
1. 拖拽排序 基于Sortable
  1.1 import Sortable from 'sortablejs'
      let el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      let sortable = Sortable.create(el)
  1.2 table mounted之后申明Sortable.create(el) table的每行tr就可以随意拖拽了
  1.3 数据层list并没有随之改变。所以我们就要手动的来管理我们的列表
  1.4 this.sortable = Sortable.create(el, {
        onEnd: evt => { //监听end事件 手动维护列表
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
          this.newList.splice(evt.newIndex, 0, tempIndex);
        }
      });
2. 内联编辑
  2.1 往list数据组，每一条数据里面插入一个edit[ true or false ]判断符，来表示当前行是否处于编辑状态
  2.2 之后通过v-show动态切换不同的相应view
  2.3 