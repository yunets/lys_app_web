import { Fragment } from 'react';
import React from 'react';
import styles from './../index.less';
import { connect } from 'umi';


export interface Props {
  item: any;
}

const ItemShowReadOnly: React.FC<Props> = ({ item }) => {





  const getImg = (url: { url: string | URL; }) => {
    const u = new URL(url.url);
    return "" + u.origin + "/favicon.ico";
  }










  return (
    <Fragment>
      <div>


        {/* <div className={styles.urlOperate}>
          <DeleteOutlined onClick={() => fetchUpdateWebInfoList(item)} spin title='点击删除！！！' />
          <HeartTwoTone twoToneColor="#eb2f96" onClick={() => fetchUpdateWebInfoList(item)} title='收藏！！！' />
          <HomeTwoTone twoToneColor="#222222" onClick={() => fetchUpdateWebInfoList(item)} title='添加到首页！！！' />
        </div> */}

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


function mapStateToProps(state: any) { //state是项目所有的models
  const { list } = state.navigation; //获取namespace命名空间为navigation的models数据state
  const { title } = state.navigation;
  return {
    cards: list.content,
    title
  };
}
export default connect(mapStateToProps)(ItemShowReadOnly as any);