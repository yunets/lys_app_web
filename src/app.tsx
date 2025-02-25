import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import type { RequestConfig } from 'umi';
import { getAuthority } from './utils/authority';
import { message } from 'antd';
import SettingCard from './pages/components/SettingCard';
// const isDev = process.env.NODE_ENV === 'development';
const isDev = true;
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.waterMark,
      width: 800,
      fontSize: 18,
    },
    footerRender: () => <div><SettingCard name="footer" /><Footer /></div>,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
        <Link key="openapi" to="" onClick={() => { window.open("https://txc.qq.com/products/598216", "_blank") }} target="_blank">
          <LinkOutlined />
          <span>意见反馈</span>
        </Link>,
        <Link to="" onClick={() => { window.open("https://txc.qq.com/products/598216", "_blank") }} key="docs">
          <BookOutlined />
          <span>留言</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};







// RequestConfig 全局拦截
export const request: RequestConfig = {
  // prefix: '/api/*',
  // timeout: 1000,
  errorConfig: {},
  middlewares: [
    async function middlewareA(ctx, next) {

      console.log('A before');
      await next();
      if (ctx.res.code === -1 && ctx.res.msg === "jwt 已过期，请重新登录！！！") {
        history.push(loginPath);
        ctx.res.content = [];
      } if (ctx.res.code === -1 && ctx.res.msg.includes("The")) {
        history.push(loginPath);
        ctx.res.content = [];
      } else if (ctx.req.url === '/api/currentUser' && ctx.res.data != undefined) {
        localStorage.setItem('user-ip', ctx.res.data.ip);
        localStorage.setItem('user-address', ctx.res.data.address);
        localStorage.setItem('user-name', ctx.res.data.name);
      } else if (ctx.req.url === '/api/login/account' && ctx.res.jwt != undefined) {
        localStorage.setItem('antd-pro-authority', JSON.stringify(ctx.res.jwt));
      } else if (ctx.req.url === '/api/login/outLogin') {
        localStorage.setItem('antd-pro-authority', JSON.stringify("no"));
        history.push(loginPath);
      } else if (ctx.res.code === -1) {
        if (ctx.res.code = -1) {
          message.error(ctx.res.msg);
        }
      }

      else if (ctx.req.url === '/api/webInfo/listByWebCategoryName') {
        const baseStr = ctx.res.content;
        ctx.res.content = JSON.parse(decodeURIComponent(baseStr));
      }
      console.log('A after');
    },],
  requestInterceptors: [(_, options) => {
    return {
      options: {
        ...options,
        headers: {
          ...(options?.headers ?? {}),
          Authorization: getAuthority(),

        },
      },
    };
  },],
  responseInterceptors: [],
};