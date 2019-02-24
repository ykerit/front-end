import React, { Component } from 'react';
import { connect } from 'dva';
import { Calendar, message } from 'antd';
import Header from '../../stand-component/header';
import Comments from '../../stand-component/comment';
import { getlocalStorage } from '../../../utils/helper';
import styles from './article-content.css';


class ArticleContent extends Component{
  constructor(props){
    super(props);
    props.dispatch({
      type: 'article/queryArticleById',
      payload: props.match.params.id
    });
    this.state={
      value: '',
      page: props.match.params.id
    };
  }
  componentDidMount(){
    document.getElementById('content').style.minHeight= (window.screen.availHeight - 180) + 'px';
    this.props.dispatch({
      type: 'article/queryComment',
      payload: {article: this.state.page, page_size: 1 },
    })
  }
  handlerSubmit = () => {
    const id = this.props.id === '' ? getlocalStorage('id') : this.props.id;
    if (this.state.value !== '') {
      this.props.dispatch({
        type: 'article/createComment',
        payload: {id: id, content: this.state.value, article_id: this.state.page},
      });
      this.setState({value: ''});
    } else {
      message.warning('输入框不能为空');
    }
  };
  handlerChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render(){
    const { articleContent, comment, dispatch, comment_total } = this.props;

    const data = {...articleContent[0]};

    return (
      <div style={{height: '100%'}}>
        <Header/>
        <div id="content" className={styles.content}>
          <div className={styles.another}> </div>
          <div className={styles.middle}>
            <div dangerouslySetInnerHTML={{__html: data.preview}}>
            </div>
          </div>
          <div className={styles.other}>
            <div style={{width: 300, border: '1px solid #d9d9d9', borderRadius: 4, justifyContent: 'center'}}>
              <Calendar fullscreen={false}/>
            </div>
          </div>
        </div>
        <div className={styles.comment}>
          <Comments
            data={comment}
            dispatch={dispatch}
            onSubmit={this.handlerSubmit}
            value={this.state.value}
            page={this.state.page}
            comment_total={comment_total}
            onChange={this.handlerChange}/>
        </div>
        <div className={styles.footer}>
          <span>Blog ©2018 Created by yker</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { articleContent, comment, comment_total } = state.article;
  const { id } = state.auth;
  return {
    articleContent,
    comment,
    id,
    comment_total
  };
}

export default connect(mapStateToProps)(ArticleContent)
