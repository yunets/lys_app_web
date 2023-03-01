import { Fragment } from 'react';
import React from 'react';
import styles from './../index.less';


export interface Props {
  item: any;
}

const ItemShow: React.FC<Props> = ({ item }) => {
  return (
    <Fragment>
      <div>
        <div className={styles.urlContent}>
          <a onClick={() => { console.log("添加到个人收藏") }}>

            <img
              className={styles.urlImg}
              src={"" + item.url + "/favicon.ico"} onError={(e) => {
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
