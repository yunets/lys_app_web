import { Dispatch, Fragment } from 'react';
import React from 'react';
import styles from './../index.less';
import { DeleteOutlined, EditOutlined, HeartTwoTone, HomeTwoTone } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { connect } from 'umi';

export interface Props {
  item: any;
  dispatch: Dispatch;
  a: Function;
  editInfo: Function;
}

const ItemShow: React.FC<Props> = ({ item, dispatch, a, editInfo }) => {
  const fetchUpdateWebInfoList = (webInfoList: any) => {
    dispatch({
      type: 'navigation/fetchWebInfoDelete',
      payload: {
        ...webInfoList,
      },
      callback: (response: any) => {
        a();
      },
    });
  };

  const setWebInfoModalEfect = (webInfoList: any) => {
    editInfo(webInfoList);
    dispatch({
      type: 'navigation/setWebInfoModal',
      payload: {
        webInfoUpdateModal: { ...webInfoList, webInfoModal: true },
      },
      callback: (response: any) => {},
    });
  };

  const getImg = (url: { url: string | URL }) => {
    const u = new URL(url.url);
    //console.log("" + u.origin + "/favicon.ico");
    return '' + u.origin + '/favicon.ico';
    // return "https://api.iowen.cn/favicon/www.aliued.cn.png";
    //return "https://api.iowen.cn/favicon/" + u.origin.replace("https://", "").replace("http://", "") + ".png";
  };

  return (
    <Fragment>
      <div>
        <div className={styles.urlOperate}>
          <DeleteOutlined
            onClick={() => fetchUpdateWebInfoList(item)}
            spin
            title="点击删除！！！"
          />
          <EditOutlined
            twoToneColor="#eb2f96"
            onClick={() => setWebInfoModalEfect(item)}
            title="编辑！！！"
          />
          <HomeTwoTone
            twoToneColor="#222222"
            onClick={() => setWebInfoModalEfect(item)}
            title="添加到首页！！！"
          />
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
                img.src = 'https://api.iowen.cn/favicon/github.com.png';
                img.οnerrοr = null;
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
export default connect(mapStateToProps)(ItemShow as any);
