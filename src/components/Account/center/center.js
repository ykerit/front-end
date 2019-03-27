import React, { PureComponent } from 'react';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Input } from 'antd';
import { connect } from 'dva';
import styles from './center.css';
import ArticleList from '../../article/list-article/index';


class Center extends PureComponent {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    current_page: 1,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'article/queryCurrentUserArticle',
      payload: {id: this.props.id, page_size: 1}
    })
  }

  onTabChange = key => {

  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  loadingMoreArticle = () => {
    this.props.dispatch({
      type: 'article/appendCurrentUserArticle',
      payload: {id: this.props.id, page_size: this.state.current_page+1},
    });
    this.setState({current_page: this.state.current_page+1});
  };

  render() {
    const { newTags, inputVisible, inputValue } = this.state;
    const {
      name,
      face,
      signature,
      title,
      group,
      currentUserList_total,
      currentUserList
    } = this.props;

    const operationTabList = [
      {
        key: 'articles',
        tab: (
          <span>
            文章 <span style={{ fontSize: 14 }}>({currentUserList_total})</span>
          </span>
        ),
      },
      {
        key: 'projects',
        tab: (
          <span>
            项目 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
    ];

    return (
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }}>
              <div>
                <div className={styles.avatarHolder}>
                  <Avatar alt="头像" src={face} className={styles.img}/>
                  <div className={styles.name}>{name}</div>
                  <div>{signature}</div>
                </div>
                <div className={styles.detail}>
                  <p>
                    <Icon type="gift" className={styles.title}/>
                    {title}
                  </p>
                  <p>
                    <Icon type="cluster" className={styles.group}/>
                    {group}
                  </p>
                  <p>
                    <Icon type="environment" className={styles.address}/>
                    中国西安
                  </p>
                </div>
                <Divider dashed />
                <div className={styles.tags}>
                  <div className={styles.tagsTitle}>标签</div>
                  {newTags.map(item => (
                    <Tag key={item.key}>{item.label}</Tag>
                  ))}
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
                      <Icon type="plus" />
                    </Tag>
                  )}
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              onTabChange={this.onTabChange}
            >
              <ArticleList
                title=""
                list={currentUserList}
                total={currentUserList_total}
                loadingMoreArticle={this.loadingMoreArticle}
              />
            </Card>
          </Col>
        </Row>
    );
  }
}
function mapStateToProps(state) {
  const {
    id,
    name,
    face,
    signature,
    title,
    group
  } = state.auth;
  const { currentUserList, currentUserList_total } = state.article;
  return {
    id,
    name,
    face,
    signature,
    title,
    group,
    currentUserList,
    currentUserList_total
  };
}

export default connect(mapStateToProps)(Center);
