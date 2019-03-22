import React, {Component} from 'react'
import { Button, Row } from 'antd';
import style from './table-frame.css'

export default class TableFrame extends Component{
  render() {
    const {text, showModal, children} = this.props;
    return (
      <div className={style.container}>
        <Row>
          <Button type="primary" onClick={showModal}>{text}</Button>
        </Row>
        <Row style={{height: 20}}/>
        <Row>
          {children}
        </Row>
      </div>
    );
  }
}
