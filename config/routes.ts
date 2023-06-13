export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome1',
    name: 'navigation',
    icon: 'smile',
    component: './navigation/index.tsx',
  },
  {
    path: '/MyNavigationSoftWare',
    name: 'MyNavigationSoftWare',
    icon: 'smile',
    component: './navigation/software.tsx',
  },

  {
    path: '/MyDiyPrivate',
    name: 'MyDiyPrivate',
    icon: 'smile',
    component: './navigation/MyDiyPrivate.tsx',
  },
  {
    path: '/MyNavigationDownload',
    name: '资源下载',
    icon: 'smile',
    component: './navigation/download.tsx',
  },
  {
    path: '/about',
    name: 'drag',
    icon: 'smile',
    component: './drag/index.tsx',
  },
  {
    path: '/navigation',
    name: '网址导航',
    hideInMenu: false,
    icon: 'crown',
    access: 'canAdmin',
    key: "navigation",
    routes: [
      {
        path: 'navigation/MyDiyWeb',
        name: '网址管理',
        icon: 'smile',
        component: './navigation/MyDiyWeb.tsx',
      },
    ],
  },

  {
    path: '/fund',
    name: '财富',
    hideInMenu: false,
    icon: 'crown',
    access: 'canAdmin',
    key: "fund",
    routes: [
      {
        path: '/fund/MyFund',
        name: 'MyFund',
        icon: 'smile',
        component: './fund/MyFund.tsx',
      },
      {
        path: '/fund/FundDictionaryList',
        name: 'FundDictionaryList',
        icon: 'smile',
        component: './fund/FundDictionaryList.tsx',
      },
    ],
  },
  {
    path: '/users',
    name: '用户',
    hideInMenu: false,
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/users/Register/Register',
        name: 'Register',
        icon: 'smile',
        component: './user/Register/Register.tsx',
      },
      {
        path: '/users/management/UserList',
        name: 'UserList',
        icon: 'smile',
        component: './user/management/UserList.tsx',
      },

    ],
  },
  {
    path: '/admin',
    name: 'admin',
    hideInMenu: true,
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    hideInMenu: true,
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
