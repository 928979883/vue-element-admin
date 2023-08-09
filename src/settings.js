module.exports = {
  /**
   * @description 网站标题
   */
  title: '后台管理平台',
  /**
  * @description 租户ID
  */
  tenantId: '2',
  /**
  * @description 记住密码状态下的 token 在Cookie中存储的天数，默认1天
  */
  tokenCookieExpires: 1,
  /**
  * @description 记住密码状态下的 密码 在Cookie中存储的天数，默认1天s
  */
  passCookieExpires: 1,
  /**
  * @description 是否只保持一个子菜单的展开
  */
  uniqueOpened: true,
  /**
  * @description token key
  */
  TokenKey: 'WONFAR-SAAS-M-TOEKN',
  /**
  * @description 请求超时时间，毫秒（默认2分钟）
  */
  timeout: 1200000,
  /**
  * 是否显示设置的底部信息
  */
  showFooter: false,
  /**
  * 底部文字，支持html语法
  */
  footerTxt: '<a href="https://www.baidu.cn" target="_blank"></a>',
  /**
  * 备案号
  */
  caseNumber: '',
  /**
   * 是否展示右侧全局控制按钮
   * @type {boolean}
   * @description
   */
  showSettings: true,

  /**
   * 展示面包屑
   * @type {boolean}
   * @description
   */
  tagsView: true,

  /**
   * 是否固定头部栏
   * @type {boolean}
   * @description
   */
  fixedHeader: true,

  /**
   * 是否显示左上角LOGO
   * @type {boolean}
   * @description
   */
  sidebarLogo: true,

  /**
   * @type {boolean}
   * @description 头部搜索框 是否支持拼音搜索
   * Bundle size minified 47.3kb,minified + gzipped 63kb
   */
  supportPinyinSearch: true,

  /**
   * 哪些环境下显示错误日志组件 当前仅为开发环境
   * @type {string | array} 'development' | ['production', 'development']
   * @description 。
   */
  errorLog: 'development'
}
