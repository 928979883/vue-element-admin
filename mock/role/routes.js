// Just a mock data

const constantRoutes = [
  {
    path: '/redirect',
    component: 'Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'error-page/401',
    hidden: true
  },
  {
    path: '',
    component: 'Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: 'Layout',
    children: [
      {
        path: 'index',
        component: 'documentation/index',
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: 'Layout',
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: 'guide/index',
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

/**
 * 最小改动切换动态路由 后台数据调整
 * component: 'layout/Layout' -> component: 'Layout'
 * component: 'views/redirect/index' -> component: 'redirect/index'
 */
const asyncRoutes = [
  {
    path: '/table',
    component: 'Layout',
    redirect: '/table/complex-table',
    name: 'Table',
    meta: {
      title: 'Table',
      icon: 'table'
    },
    children: [
      {
        path: 'dynamic-table',
        component: 'table/dynamic-table/index',
        name: 'DynamicTable',
        meta: { title: 'dynamicTable' }
      },
      {
        path: 'drag-table',
        component: 'table/drag-table',
        name: 'DragTable',
        meta: { title: 'dragTable' }
      },
      {
        path: 'inline-edit-table',
        component: 'table/inline-edit-table',
        name: 'InlineEditTable',
        meta: { title: 'inlineEditTable' }
      },
      {
        path: 'complex-table',
        component: 'table/complex-table',
        name: 'ComplexTable',
        meta: { title: 'complexTable' }
      }
    ]
  },

  {
    path: '/tab',
    component: 'Layout',
    children: [
      {
        path: 'index',
        component: 'tab/index',
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },
  {
    path: '/permission',
    component: 'Layout',
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: 'permission/page',
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: 'permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
        }
      },
      {
        path: 'role',
        component: 'permission/role',
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: 'Layout',
    children: [
      {
        path: 'index',
        component: 'icons/index',
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  {
    path: '/components',
    component: 'Layout',
    redirect: 'noRedirect',
    name: 'ComponentDemo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      {
        path: 'tinymce',
        component: 'components-demo/tinymce',
        name: 'TinymceDemo',
        meta: { title: 'tinymce' }
      },
      {
        path: 'markdown',
        component: 'components-demo/markdown',
        name: 'MarkdownDemo',
        meta: { title: 'markdown' }
      },
      {
        path: 'json-editor',
        component: 'components-demo/json-editor',
        name: 'JsonEditorDemo',
        meta: { title: 'jsonEditor' }
      },
      {
        path: 'split-pane',
        component: 'components-demo/split-pane',
        name: 'SplitpaneDemo',
        meta: { title: 'splitPane' }
      },
      {
        path: 'avatar-upload',
        component: 'components-demo/avatar-upload',
        name: 'AvatarUploadDemo',
        meta: { title: 'avatarUpload' }
      },
      {
        path: 'dropzone',
        component: 'components-demo/dropzone',
        name: 'DropzoneDemo',
        meta: { title: 'dropzone' }
      },
      {
        path: 'sticky',
        component: 'components-demo/sticky',
        name: 'StickyDemo',
        meta: { title: 'sticky' }
      },
      {
        path: 'count-to',
        component: 'components-demo/count-to',
        name: 'CountToDemo',
        meta: { title: 'countTo' }
      },
      {
        path: 'mixin',
        component: 'components-demo/mixin',
        name: 'ComponentMixinDemo',
        meta: { title: 'componentMixin' }
      },
      {
        path: 'back-to-top',
        component: 'components-demo/back-to-top',
        name: 'BackToTopDemo',
        meta: { title: 'backToTop' }
      },
      {
        path: 'drag-dialog',
        component: 'components-demo/drag-dialog',
        name: 'DragDialogDemo',
        meta: { title: 'dragDialog' }
      },
      {
        path: 'drag-select',
        component: 'components-demo/drag-select',
        name: 'DragSelectDemo',
        meta: { title: 'dragSelect' }
      },
      {
        path: 'dnd-list',
        component: 'components-demo/dnd-list',
        name: 'DndListDemo',
        meta: { title: 'dndList' }
      },
      {
        path: 'drag-kanban',
        component: 'components-demo/drag-kanban',
        name: 'DragKanbanDemo',
        meta: { title: 'dragKanban' }
      }
    ]
  },
  {
    path: '/charts',
    component: 'Layout',
    redirect: 'noRedirect',
    name: 'Charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [
      {
        path: 'keyboard',
        component: 'charts/keyboard',
        name: 'KeyboardChart',
        meta: { title: 'keyboardChart', noCache: true }
      },
      {
        path: 'line',
        component: 'charts/line',
        name: 'LineChart',
        meta: { title: 'lineChart', noCache: true }
      },
      {
        path: 'mixchart',
        component: 'charts/mixChart',
        name: 'MixChart',
        meta: { title: 'mixChart', noCache: true }
      }
    ]
  },
  {
    path: '/nested',
    component: 'Layout',
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: 'nested/menu1/index',
        name: 'Menu1',
        meta: { title: 'menu1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: 'nested/menu1/menu1-1',
            name: 'Menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: 'nested/menu1/menu1-2',
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: 'nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: 'nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: 'nested/menu1/menu1-3',
            name: 'Menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: 'nested/menu2/index',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: '/example',
    component: 'Layout',
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: 'example/create',
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: 'example/edit',
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: 'example/list',
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/error-log',
    component: 'Layout',
    redirect: 'noRedirect',
    children: [
      {
        path: 'log',
        component: 'error-log/index',
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: 'Layout',
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: 'excel/export-excel',
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: 'excel/select-excel',
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: 'excel/merge-header',
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: 'excel/upload-excel',
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: 'Layout',
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: 'zip/index',
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: 'Layout',
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: 'pdf/index',
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: 'pdf/download',
    hidden: true
  },

  {
    path: '/theme',
    component: 'Layout',
    redirect: 'noRedirect',
    children: [
      {
        path: 'index',
        component: 'theme/index',
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: 'Layout',
    redirect: 'noRedirect',
    children: [
      {
        path: 'index',
        component: 'clipboard/index',
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: 'Layout',
    children: [
      {
        path: 'index',
        component: 'i18n-demo/index',
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
