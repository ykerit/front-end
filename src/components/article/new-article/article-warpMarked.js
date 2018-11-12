import React from 'react';
import { connect } from 'dva';

function WarpMarked({ dispatch, content }) {
  return (
    <div dangerouslySetInnerHTML={{__html: content}}></div>
  );
}

function mapStateToProps(state) {
  const { content } = state.article;
  return {
    content,
  };
}
export default connect(mapStateToProps)(WarpMarked);
