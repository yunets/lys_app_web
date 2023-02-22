import { Fragment } from 'react';
import React from 'react';
import styles from './../index.less';
const style: React.CSSProperties = {
  padding: '8px 0',
  float: 'left',
  width: '200px',
  marginLeft: '20px',
  marginTop: '5px',
};

export interface Props {
  name: string;
}

const ItemShow: React.FC<Props> = () => {
  return (
    <Fragment>
      <div>
        <div className={styles.urlContent}>
          <a>
            <img
              className={styles.urlImg}
              src="https://cdn.jsdelivr.net/gh/volfclub/Tundra-Wolf/assets/logos/o2ov.png"
            />
          </a>
          <div className={styles.urlText}>
            <a href="###">
              <strong>MongoDB</strong>
            </a>
            <p>自定义的网站导航，自定义的网站导航，导航</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ItemShow;
