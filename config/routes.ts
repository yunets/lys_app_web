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
    path: '/web/welcome',
    name: 'navigation',
    icon: 'smile',
    component: './navigation/index.tsx',
  },
  {
    path: '/web/chatgpt',
    name: 'chatGPT',
    icon: 'smile',
    component: './chatgpt/MyChat.tsx',
  },

  {
    path: '/web/navigation/MyDiyWeb',
    name: '网址管理',
    icon: 'smile',
    component: './navigation/MyDiyWeb.tsx',
  },
  {
    path: '/MyDiyPrivate',
    name: '私密导航',
    icon: 'smile',
    component: './navigation/MyDiyPrivate.tsx',
  },
  {
    path: '/web/MyNavigationDownload',
    name: '资源下载',
    icon: 'smile',
    component: './navigation/download.tsx',
  },
  {
    path: '/web/work',
    name: '工作',
    hideInMenu: false,
    icon: 'crown',
    access: 'canAdmin',
    key: "navigation",
    routes: [
      {
        path: 'navigation/MyNavigationSoftWare',
        name: '软件开发',
        icon: 'smile',
        component: './navigation/software.tsx',
      },
      {
        path: 'navigation/MyNavigationSoftWare',
        name: '自媒体创作',
        icon: 'smile',
        component: './navigation/software.tsx',
      },
    ],
  },
  {
    path: '/web/play',
    name: '休闲娱乐',
    hideInMenu: false,
    icon: 'crown',
    access: 'canAdmin',
    key: "navigation",
    routes: [
      {
        path: '/web/play/navigation/VideoWebsite',
        name: '电影',
        icon: 'smile',
        component: './navigation/VideoWebsite.tsx',
      },
      {
        path: '/web/play/navigation/MusicWebsite',
        name: '音乐',
        icon: 'smile',
        component: './navigation/MusicWebsite.tsx',
      },
      {
        path: '/web/play/navigation/BookWebsite',
        name: '阅读',
        icon: 'smile',
        component: './navigation/BookWebsite.tsx',
      },
      {
        path: '/web/play/navigation/GameWebsite',
        name: '游戏',
        icon: 'smile',
        component: './navigation/GameWebsite.tsx',
      },
    ],
  },
  {
    path: '/web/fund',
    name: '财富',
    hideInMenu: false,
    icon: 'crown',
    access: 'canAdmin',
    key: "fund",
    routes: [
      {
        path: '/web/fund/MyFund',
        name: '我的基金',
        icon: 'smile',
        component: './fund/MyFund.tsx',
      },
      {
        path: '/web/fund/FundDictionaryList',
        name: '基金列表',
        icon: 'smile',
        component: './fund/FundDictionaryList.tsx',
      },
      {
        path: '/web/fund/FinanceWebsite',
        name: '财经金融',
        icon: 'smile',
        component: './navigation/FinanceWebsite.tsx',
      },
    ],
  },
  {
    path: '/web/users',
    name: '用户',
    hideInMenu: false,
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: 'Register/Register',
        name: 'Register',
        icon: 'smile',
        component: './user/Register/Register.tsx',
      },
      {
        path: 'management/UserList',
        name: 'UserList',
        hideInMenu: true,
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
    redirect: '/web/welcome',
  },
  {
    component: './404',
  },
];
