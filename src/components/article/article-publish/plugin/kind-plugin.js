import React, {Component} from 'react';
import { Radio, Row, Col, Input, Tag, Icon, Tooltip  } from 'antd';


class KindPlugin extends Component{

  state = {
    kinds: [],
    inputVisible: false,
    inputValue: '',
  };

  handleClose = (removedTag) => {
    const kinds = this.state.kinds.filter(tag => tag !== removedTag);
    this.setState({ kinds });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let kinds = state.kinds;
    if (inputValue && kinds.indexOf(inputValue) === -1) {
      kinds = [...kinds, inputValue];
    }
    if (kinds.length > 0) {
      this.props.receiveKind(kinds);
    }
    if (kinds.length) {
      this.props.addClassification(kinds[kinds.length-1]);
    }
    this.setState({
      kinds,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => this.input = input;

  onChange = checkedValues => {
    this.props.receiveKind(checkedValues.target.value)
  };

  renderClassification = data => data.map((item, index) => {
    return (
      <Col span={8} key={index}><Radio value={item.id}>{item.name}</Radio></Col>
    );
  });

  render(){
    const { kinds, inputVisible, inputValue } = this.state;
    // 分类 和添加分类函数
    const { classification } = this.props;
    return (
      <div>
        个人分类： {kinds.map((tag, index) => {
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </Tag>
        );
        return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
      })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> 添加分类
          </Tag>
        )}
      <div style={{ background: '#ECECEC', padding: '10px', marginTop: '5px' }}>
        <Radio.Group style={{ width: '90%' }} onChange={this.onChange}>
          <Row>
            {this.renderClassification(classification)}
          </Row>
        </Radio.Group>
      </div>
      </div>
    );
  }
}

export default KindPlugin;
