import React, { Component } from 'react';
import {Icon, Empty} from'antd';
import style from './collapse.css'
import Panel from './panel';

class Collapse extends Component{

  constructor(props) {
    super(props);
    this.itemHd = React.createRef();
    this.state = {
      selectKey: null
    }
  }
  componentDidMount() {
    if (this.props.data.length > 0) {
      this.itemHdList = this._findNodeList(this.itemHd);
      this._onSelect();
    }
  }

  // 使用选择器获得dom结点
  _findNodeList = selector=>{
    return [].slice.call(document.querySelectorAll('.'+selector.current.className));
  };

  _addEvent = document.addEventListener ?
    (elem,type,listener,useCapture)=>{
      elem.addEventListener(type,listener,useCapture);
    }	:
    (elem,type,listener,useCapture)=>{
      elem.attachEvent('on'+type,listener);
    };

  // 获取选中的子级dom
  _onSelect = () => {
    for(let itemHd of this.itemHdList){
      this._addEvent(itemHd,'click',(ev)=>{
        let key = ev.currentTarget.dataset.flag;
        let show = ev.currentTarget.dataset.show;
        if (key) {
          let selectItem = document.getElementById('child'+key);
          if (show === 'false') {
            selectItem.className=style.show;
            ev.currentTarget.dataset.show = 'true'
          } else {
            selectItem.className=style.itemMn;
            ev.currentTarget.dataset.show = 'false'
          }
        }
      })
    }
  };

  /*
   * 渲染父级菜单
   */
  renderPanel = data => data.map((item, index) => {
    return (
      <div className={style.collapseItem} key={index}>
        <div className={style.itemHd} ref={this.itemHd} data-flag={index} data-show="false">
          <div className={style.collapseDown}>
            <Icon type="book"/>
          </div>
          <div className={style.title}>
            <h3>{item.name}</h3>
          </div>
        </div>
        <div className={style.itemMn} id={`child${index}`}>
          <Panel id={item.id}/>
        </div>
      </div>
    );
  });


  render() {
    const { data } = this.props;
    return (
      <div className={style.callapce}>
        {data.length === 0 ? <Empty description="没有分类哦!"/> : this.renderPanel(data)}
      </div>
    )
  }
}

export default Collapse;
