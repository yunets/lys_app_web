import { Fragment } from 'react';
import React from 'react';

const style: React.CSSProperties = {
  background: '#0092ff',
  padding: '8px 0',
  float: 'left',
  width: '100px',
  marginLeft: '20px',
};

export interface Props {
  name: string;
}

const ItemShow: React.FC<Props> = () => {
  return (
    <Fragment>
      <div>
        <div style={style}>
          <a>
            <img src="https://cdn.jsdelivr.net/gh/volfclub/Tundra-Wolf/assets/logos/o2ov.png" />
          </a>
          <div>
            <a href="###">
              <strong>Bara Art</strong>
            </a>

            <p>免费照片图库</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ItemShow;
