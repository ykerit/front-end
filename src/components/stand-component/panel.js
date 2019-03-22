import React, { Component } from 'react';
import {List} from'antd';
import { Link } from 'dva/router'
import {queryArticleList} from '../../services/kind';
import InfiniteScroll from 'react-infinite-scroller';

class Panel extends Component{
  state = {
    list: []
  };
  componentDidMount() {
    this.mounted = true;
    this.getData(this.props.id)
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getData =async id => {
    const data = await queryArticleList(id);
    if (data && data.status === 200) {
      if (this.mounted) {
        this.setState({list: data.list})
      }
    }
  };

  render() {
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        hasMore={true}
        useWindow={false}
        loadMore={()=>{}}
      >
        <List
          dataSource={this.state.list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Link to={`/article/${item.id}`}>
                <List.Item.Meta
                  title={item.title}
                  description={item.create_time}
                />
              </Link>
            </List.Item>
          )}
        >
        </List>
      </InfiniteScroll>
    );
  }
}

export default Panel;
