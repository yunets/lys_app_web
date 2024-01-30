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
    path: '/web/chatgpt5',
    name: 'chatpgt用户聊天室',
    hideInMenu: true,
    icon: 'smile',
    component: './chatgpt/MyChat5.tsx',
  },
  {
    path: '/web/play/navigation/VIPVideo',
    name: 'vip视频免费看（人工智能解析）',
    icon: 'smile',
    component: './navigation/VIPVideo.tsx',
  },
  {
    path: '/web/chatgpt3',
    name: '免费影视',
    icon: 'smile',
    component: './chatgpt/MyChat3.tsx',
  },
  {
    path: '/web/chatgpt2',
    name: '免费文档转换',
    icon: 'smile',
    component: './chatgpt/MyChat2.tsx',
  },
  {
    path: '/web/chatgpt4',
    name: '免费视频去水印',
    icon: 'smile',
    component: './chatgpt/MyChat4.tsx',
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
        path: '/web/fund/TransactionHistory',
        name: '我的网格交易策略',
        icon: 'smile',
        component: './fund/TransactionHistory.tsx',
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
    path: '/web/play',
    name: '休闲娱乐',
    hideInMenu: false,
    icon: 'crown',
    access: 'canAdmin',
    key: "play",
    routes: [

      {
        path: '/web/play/navigation/VideoWebsite',
        name: '免费电影',
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
    path: '/web/welcome',
    name: '友情链接',
    icon: 'smile',
    component: './navigation/index.tsx',
  },
  {
    path: '/web/house',
    name: '房子',
    icon: 'smile',
    hideInMenu: false,
    component: './house/DiscoveryWeb.tsx',
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
    redirect: '/web/chatgpt',
  },
  {
    component: './404',
  },
];
