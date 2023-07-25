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
    path: '/web/chatgpt',
    name: '免费chatGPT',
    icon: 'smile',
    component: './chatgpt/MyChat.tsx',
  },
  {
    path: '/web/welcome',
    name: 'welcome123',
    icon: 'smile',
    component: './navigation/index.tsx',
  },
  {
    path: '/web/navigation/MyDiyWeb',
    name: '网址管理',
    icon: 'smile',
    component: './navigation/MyDiyWeb.tsx',
  },
  {
    path: '/web/AIWebsite',
    name: 'AI导航',
    icon: 'smile',
    component: './navigation/AIWebsite.tsx',
  },
  {
    path: '/web/navigation/TodayFrequencyStatistics',
    name: '本站流量分析',
    hideInMenu: false,
    icon: 'smile',
    component: './navigation/TodayFrequencyStatistics.tsx',
  },

  {
    path: '/web/sponsorme',
    name: '友情赞助',
    icon: 'smile',
    component: './user/sponsor/sponsor.tsx',
  },
  {
    path: '/web/work',
    name: '工作',
    hideInMenu: false,
    icon: 'crown',
    access: 'canAdmin',
    key: "work",
    routes: [
      {
        path: 'navigation/WebConstructionWebsite',
        name: '网站建设',
        icon: 'smile',
        component: './navigation/WebConstructionWebsite.tsx',
      },
      {
        path: 'navigation/MyNavigationSoftWare',
        name: '软件开发',
        icon: 'smile',
        component: './navigation/software.tsx',
      },
      {
        path: 'navigation/WebDeveloperWebsite',
        name: '前端开发',
        icon: 'smile',
        component: './navigation/WebDeveloperWebsite.tsx',
      },
      {
        path: 'navigation/PersonalCreation',
        name: '自媒体创作',
        icon: 'smile',
        component: './navigation/PersonalCreation.tsx',
      },
      {
        path: 'navigation/PublicWelfareWebsite',
        name: '公益事业',
        icon: 'smile',
        component: './navigation/PublicWelfareWebsite.tsx',
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
    path: '/web/play',
    name: '休闲娱乐',
    hideInMenu: false,
    icon: 'crown',
    access: 'canAdmin',
    key: "play",
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
    path: '/web/users',
    name: '用户',
    hideInMenu: false,
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: 'Register/Register',
        name: '注册',
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

      {
        path: 'management/sponsor',
        name: '友情赞助',
        hideInMenu: false,
        icon: 'smile',
        component: './user/sponsor/sponsor.tsx',
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
