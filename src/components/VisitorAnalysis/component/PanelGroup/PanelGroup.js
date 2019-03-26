import React from 'react'
import {Row, Col, Icon} from 'antd'
import styles from './PanelGroup.css'
export const PanelGroup = props => {
  const chartList = [
    {
      type: '新增用户',
      className: 'people',
      icon: 'user-add',
      num: 1111,
      color: '#63B8FF'
    }, {
      type: '新增点赞',
      className: 'message',
      icon: 'like',
      num: 12400,
      color: '#CD6839'
    }, {
      type: '昨日阅读',
      className: 'money',
      icon: 'area-chart',
      num: 498200,
      color: '#3f8600'
    }, {
      type: '新增收藏',
      className: 'shoppingCard',
      icon: 'star',
      num: 29600,
      color: '#CD3700'
    }
  ];

  return (
    <div>
      <Row gutter={12}>
        {chartList.map((ele, i) => <Col key={i}
                                        lg={6}
                                        md={12}
                                        xs={24}
        >
          <div className={styles.content}>
            <div className={styles.iconWrap}
            >
              <Icon
                style={{fontSize:55,color:ele.color}}
                type={ele.icon}
              />
            </div>
            <div>
              <p className={styles.text}>
                {ele.type}
              </p>
              <span className={styles.num}>{ele.num}</span>
            </div>
          </div>
        </Col>)
        }

      </Row>
    </div>
  )
};
