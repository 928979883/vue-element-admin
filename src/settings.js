module.exports = {
  title: 'Vue后台管理平台',

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
