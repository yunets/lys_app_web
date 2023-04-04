import { Fragment } from 'react';
import React from 'react';
import styles from './../index.less';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';


export interface Props {
  item: any;
}

const ItemShow: React.FC<Props> = ({ item }) => {
  const getImg = (url: { url: string | URL; }) => {
    console.log(url.url);
    const u = new URL(url.url);
    return "" + u.origin + "/favicon.ico";
  }





  return (
    <Fragment>
      <div>



        <DeleteOutlined title='点击移动！！！' onClick={() => { console.log("移动") }} />
        <div className={styles.urlContent}>

          <a onClick={() => { console.log("添加到个人收藏") }}>

            <img
              className={styles.urlImg}
              src={getImg(item)} onError={(e) => {
                const img = e.currentTarget;
                img.src = "https://api.iowen.cn/favicon/www.aliued.cn.png";
                img.οnerrοr = null;


              }}
            />
          </a>
          <div className={styles.urlText}>
            <a onClick={() => {
              window.open("" + item.url + "", '_blank',);
            }} rel="noreferrer">
              <strong>{item.name}</strong>
            </a>
            <p>{item.comment}</p>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default ItemShow;
