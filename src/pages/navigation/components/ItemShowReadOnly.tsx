import { Fragment, useState } from 'react';

import React from 'react';
import styles from './../index.less';
import { connect, Dispatch } from 'umi';
import shoucangyes from '@/assets/svg/shoucangyes.svg';
import shoucangno from '@/assets/svg/shoucangno.svg';
import dashang from '@/assets/svg/dashang.svg';
import { Form, Input, Modal, Select, message } from 'antd';
const { Option } = Select;

export interface Props {
  item: any;
  dispatch: Dispatch;
}

const ItemShowReadOnly: React.FC<Props> = ({ item, dispatch }) => {
  const [form] = Form.useForm();

  const [addMyWebInfoModal, setAddMyWebInfoModal] = useState<boolean>(false);
  const [addMyWebInfo, setAddMyWebInfo] = useState<any>({});
  const [webCategoryList, setWebCategoryList] = useState<any>([]);
  const getImg = (url: { url: string | URL }) => {
    const u = new URL(url.url);
    // return "" + u.origin + "/favicon.ico";
    // return "https://api.iowen.cn/favicon/www.aliued.cn.png";
    return (
      'https://api.iowen.cn/favicon/' +
      u.origin.replace('https://', '').replace('http://', '') +
      '.png'
    );
  };

  const updateWebCategoryList = () => {
    dispatch({
      type: 'navigation/fetchWebCategoryListAll',
      payload: {},
      callback: (response: any) => {
        setWebCategoryList(response.content);
      },
    });
  };

  const handleModalTrue = async () => {
    setAddMyWebInfoModal(true);
    form.setFieldValue('name', item.name);
    form.setFieldValue('url', item.url);
    updateWebCategoryList();
  };

  const handleCancel = async () => {
    setAddMyWebInfoModal(false);
  };

  const addMyWebInfoModalEfect = () => {
    form
      .validateFields()
      .then((values) => {
        const result = webCategoryList.find((item1: any) => item1.uid === values.webCategoryId);
        const my = {
          name: item.name,
          url: item.url,
          webCategoryId: values.webCategoryId,
          webCategoryName: result.name,
        };
        dispatch({
          type: 'navigation/fetchWebInfoSave',
          payload: {
            ...my,
          },
          callback: (response: any) => {
            message.success('收藏成功！');
            setAddMyWebInfoModal(false);
          },
        });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const renderWebCategoryOptions = () => {
    const options: any = [];
    webCategoryList.forEach((item2: any) => {
      options.push(
        <Option key={item2.uid} value={item2.uid}>
          {item2.name}
        </Option>,
      );
    });

    return <Select style={{ width: 120 }}>{options}</Select>;
  };

  return (
    <Fragment>
      <Modal
        title="收藏网址（注册登录后才有权限）"
        open={addMyWebInfoModal}
        onOk={addMyWebInfoModalEfect}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="webCategoryId"
            label="分类"
            rules={[{ required: true, message: '分类!', whitespace: true }]}
          >
            {renderWebCategoryOptions()}
          </Form.Item>

          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '网页名称自动回填可修改!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="url"
            label="网址"
            rules={[
              {
                type: 'url',
                message: '网址不合法，样例https://poe-mirror.com!',
              },
              {
                required: true,
                message: '请输入网址',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <div className={styles.urlCard}>
        <div className={styles.urlOperate}>
          <img
            src={shoucangyes}
            className={styles.toolImg}
            title="收藏"
            onClick={() => handleModalTrue()}
          />
          <img src={shoucangno} className={styles.toolImg} title="收藏" />
          <img src={dashang} className={styles.toolImg} title="打赏" />
        </div>

        <div className={styles.urlContent}>
          <a
            onClick={() => {
              console.log('添加到个人收藏');
            }}
          >
            <img
              className={styles.urlImg}
              src={getImg(item)}
              onError={(e) => {
                const img = e.currentTarget;
                img.src = 'https://api.iowen.cn/favicon/www.iowen.cn.png';
                (img as any).οnerrοr = null;
                // img.οnerrοr = null;
              }}
            />
          </a>
          <div className={styles.urlText}>
            <a
              onClick={() => {
                window.open('' + item.url + '', '_blank');
              }}
              rel="noreferrer"
            >
              <strong>{item.name}</strong>
            </a>
            <p>{item.comment}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state: any) {
  //state是项目所有的models
  const { list } = state.navigation; //获取namespace命名空间为navigation的models数据state
  const { title } = state.navigation;
  return {
    cards: list.content,
    title,
  };
}
export default connect(mapStateToProps)(ItemShowReadOnly as any);
