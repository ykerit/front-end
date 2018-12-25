import React, { Component } from 'react';
import { connect } from 'dva'
import marked from 'marked'
import hljs from 'highlight.js'
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import { Button, Input } from 'antd';
import style from './new-article.css';


class NewArticle extends Component{
  state={
    title: '',
    text: '',
    html: ''
  };
  handleChange = value => {
    this.setState({text: value, html: marked(value,{
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight: code => hljs.highlightAuto(code).value
      })})
  };
  releaseArticle = (dispatch, refresh) => {
    refresh(false);
    dispatch({
      type: 'article/createArticle',
      payload: {'title': this.state.title, 'body': this.state.text, body_html: this.state.html}
    })
  };

  render(){
    const { dispatch, refresh } = this.props;
    return (
      <div>
        <div className={style.header}>
          <Input placeholder="请输入标题"
                 style={{ width: '90%', marginLeft: 5 }}
                 onChange={e => { this.setState({title: e.target.value}) }}/>
          <Button style={{ marginLeft: 40 }} type="primary" onClick={() => this.releaseArticle(dispatch, refresh)}>发布文章</Button>
        </div>
        <div>
          <SimpleMDE
            onChange={this.handleChange}
            options={{
              autofocus: true,
              spellChecker: false,
              previewRender (text) {
                return marked(text,{
                  renderer: new marked.Renderer(),
                  gfm: true,
                  pedantic: false,
                  sanitize: false,
                  tables: true,
                  breaks: true,
                  smartLists: true,
                  smartypants: true,
                  highlight: code => hljs.highlightAuto(code).value
                });
              },
              renderingConfig: {
                singleLineBreaks: false,
                codeSyntaxHighlighting: true,
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect()(NewArticle);
