import React, {Component} from 'react';
import {connect} from 'dva';
import MarkDownEdit from '../../library/src/markdown-edit'
import ArticleEdit from '../../components/article/article-publish/article-index';
import { routerRedux} from 'dva/router';

class MdeEditorPage extends Component {
  state ={
    visible: false,
    title: '',
    text: '',
    html: '',
    tag: [],
    kind: [],
  };

  releaseArticle = () => {
    this.setState({visible: false});
    if (this.state.title !== '' &&
      this.state.html !== '' &&
      this.state.html !== '') {
      this.props.dispatch({
        type: 'article/createArticle',
        payload: {'title': this.state.title, 'body': this.state.text, body_html: this.state.html}
      });
      this.props.dispatch(routerRedux.push('/admin'));
    }
  };

  receiveTag = tags => this.setState({tag: tags});
  receiveKind = kinds => this.setState({kind: kinds});
  receiveTitle = e => this.setState({title: e});

  onChange =(html, mark) => {
    this.setState({text: mark, html: html});
  };

  render(){
    const editOptions = {
      visible: this.state.visible,
      receiveTag: this.receiveTag,
      receiveKind: this.receiveKind,
      releaseArticle: this.releaseArticle,
      receiveTitle: this.receiveTitle,
      onCancel: () => this.setState({visible: false}),
      onOpen: () => this.setState({visible: true}),
      backAdmin: () => this.props.dispatch(routerRedux.push('/admin'))
    };

    return (
      <div>
        <ArticleEdit
          {...editOptions}
        >
          <MarkDownEdit
            height={695}
            onChange={this.onChange}
          />
        </ArticleEdit>
      </div>
    );
  }
}
export default connect()(MdeEditorPage);
