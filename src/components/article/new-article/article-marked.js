import React from 'react';
import { connect } from 'dva';
import marked from 'marked'
import style from './article-marked.css';

function Marked({dispatch}) {
  function onContentChange(e) {
    dispatch({
      type: 'article/reflash',
      payload: marked(e.target.innerText, {breaks: true})
    })
  }
  return (
    <div contentEditable="plaintext-only" onInput={onContentChange} className={style.container}></div>
  );
}
function mapStateToProps(state) {
  const { content } = state.article;
  return {
    content,
  };
}

export default connect(mapStateToProps)(Marked);
