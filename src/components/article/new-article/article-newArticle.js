import React from 'react';
import Marked from './article-marked';
import WarpMarked from './article-warpMarked';
import style from './new-article.css';

function NewArticle() {
  return (
    <div>
      <div className={style.header}>工具</div>
    <div className={style.container}>
      <Marked />
      <WarpMarked/>
    </div>
    </div>
  );
}

export default NewArticle;