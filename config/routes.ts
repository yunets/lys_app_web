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
    path: '/MyDiyWeb',
    name: 'MyDiyWeb',
    icon: 'smile',
    component: './navigation/MyDiyWeb.tsx',
  },
  {
    path: '/MyDiyPrivate',
    name: 'MyDiyPrivate',
    icon: 'smile',
    component: './navigation/MyDiyPrivate.tsx',
  },
  {
    path: '/MyNavigationDownload',
    name: 'MyNavigationDownload',
    icon: 'smile',
    component: './navigation/download.tsx',
  },
  {
    path: '/welcome',
    name: 'drag',
    icon: 'smile',
    component: './drag/index.tsx',
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
