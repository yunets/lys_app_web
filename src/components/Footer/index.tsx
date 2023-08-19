import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from 'umi';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '蚂蚁集团体验技术部出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant1',
          title: '淘宝福利',
          href: 'https://s.click.taobao.com/Qcq84Bu',
          blankTarget: true,
        },
        {
          key: 'Ant2',
          title: '天猫国际福利',
          href: 'https://s.click.taobao.com/N9goTBu',
          blankTarget: true,
        },
        {
          key: 'Ant3',
          title: '多多百亿补贴',
          href: 'https://p.pinduoduo.com/xLK015Yj',
          blankTarget: true,
        },
        {
          key: 'Ant4',
          title: '拼多多员工内购清单',
          href: 'https://p.pinduoduo.com/nLt0xrnQ',
          blankTarget: true,
        },
        {
          key: 'Ant Design Pro',
          title: '阿里云特价服务器',
          href: 'https://www.aliyun.com/minisite/goods?userCode=6knb4rtg',
          blankTarget: true,
        },
        {
          key: 'github',
          title: '华为云特价服务器',
          href: 'https://activity.huaweicloud.com/discount_area_v5/index.html?fromacct=641ffa68-d6ac-4e88-9cd2-b05cecc06fd0&utm_source=V1g3MDY4NTY=&utm_medium=cps&utm_campaign=201905',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: '腾讯云特价服务器',
          href: 'https://cloud.tencent.com/act/cps/redirect?redirect=5049&cps_key=822991d9cc1eddb9c45d4c9d51e8cc65&from=console',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
