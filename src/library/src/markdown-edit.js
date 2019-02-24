import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js'
import style from '../theme/markdown-edit.css';
import 'highlight.js/styles/solarized-dark.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic,
  faHeading, faLink, faListOl,
  faList, faQuoteLeft, faCode,
  faImage, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import ImageModal from '../../components/stand-component/image-modal';

class MarkDownEdit extends Component{
  state = {
    col: '0',
    row: '0',
    realLine: '1',
    words: '0',
    html: '',
    visible: false,
    cScroll: false,
    pScroll: false
  };
  componentDidMount(){
    this.el = document.getElementById("edit");
    this.body = document.getElementById("marked-body");
    this.preview = document.getElementById("preview");
    this._eventPublishing();
    this.styleSetting();
  }
  componentWillUnmount(){
    this._eventRemove();
  }
  styleSetting = () => {
    this.body.style.height = this.props.height + 'px';
  };
  // 事件发布
  _eventPublishing = () => {
    if (this.el.addEventListener){
      this.el.addEventListener("input", this.contentChange);
      this.el.addEventListener("propertychange", this.contentChange); //ie事件
      this.el.addEventListener("click", this._realTimeStatus);
      this.preview.addEventListener("scroll", this._synchronyScrollEventHtml);
      this.el.addEventListener("scroll", this._synchronyScrollEventEl);
      this.el.addEventListener("keydown", this._tabSize);
    } else if (this.el.attachEvent) {
      this.el.attachEvent("oninput", this.contentChange);
      this.el.attachEvent("onpropertychange", this.contentChange);
      this.el.attachEvent("onclick", this._realTimeStatus);
      this.preview.attachEvent("onscroll", this._synchronyScrollEventHtml);
      this.el.attachEvent("onscroll", this._synchronyScrollEventEl);
      this.el.attachEvent("onkeydown", this._tabSize);
    }
  };
  // 事件移除
  _eventRemove = () => {
    if (this.el.removeEventListener){
      this.el.removeEventListener("input", this.contentChange);
      this.el.removeEventListener("propertychange", this.contentChange); //ie事件
      this.el.removeEventListener("click", this._realTimeStatus);
      this.preview.removeEventListener("scroll", this._synchronyScrollEventHtml);
      this.el.removeEventListener("scroll", this._synchronyScrollEventEl);
      this.el.removeEventListener("keydown", this._tabSize);
    } else if (this.el.detachEvent){
      this.el.detachEvent("oninput", this.contentChange);
      this.el.detachEvent("onpropertychange", this.contentChange);
      this.el.detachEvent("click", this._realTimeStatus);
      this.preview.detachEvent("onscroll", this._synchronyScrollEventHtml);
      this.el.detachEvent("onscroll", this._synchronyScrollEventEl);
      this.el.detachEvent("onkeydown", this._tabSize);
    }
  };
  // 内容改变监听
  contentChange = () =>{
    this._realTimeStatus();
    this._synchroScroll();
    this.setState({html: this._renderMarked()});
    this.setState({realLine: this._lineCount()});
    this.setState({words: this._realtimeWords()});
    this.props.onChange(this.state.html, this.el.value);
  };

  // 获取光标
  _getCursorPosition = () => {
    const el= this.el;
    const rangeData = {text: "", start: 0, end: 0};
    // w3c标准
    if (el.setSelectionRange){
      el.focus();
      rangeData.start = el.selectionStart;
      rangeData.end = el.selectionEnd;
      rangeData.text = (rangeData.start !== rangeData.end) ?
        el.value.substring(rangeData.start, rangeData.end) : "";
    } else if (document.selection){ // IE
      el.focus();
      let oS, oR, i;
      oS = document.selection.createRange();
      oR = document.body.createTextRange();
      oR.moveToElementText(el);
      rangeData.text = oS.text;
      rangeData.bookmark = oS.getBookmark();
      for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !==
      0; i++) {
        if (el.value.charAt(i) === '\r') {
          i++;
        }
      }
      rangeData.start = i;
      rangeData.end = rangeData.text.length + rangeData.start;
    }
    return rangeData;
  };
  // 设置光标位置
  _setCursorPosition = (rangeData) => {
    const el= this.el;
    let oR;
    el.focus();
    if (el.setSelectionRange) {
      el.setSelectionRange(rangeData.start, rangeData.end);
    } else if (el.createTextRange){
      oR = el.createTextRange();
      if (el.value.length === rangeData.start) {
        oR.collapse(false);
        oR.select();
      } else {
        oR.moveToBookmark(rangeData.bookmark);
        oR.select();
      }
    }
  };
  // 光标处插入文本
  _addText = (text) => {
    if (text === '') return;
    const el= this.el;
    let oValue, nValue, sR, nStart, nEnd, st;
    const rangeData = this._getCursorPosition();
    this._setCursorPosition(rangeData);
    if (el.setSelectionRange) { // W3C
      oValue = el.value;
      nValue = oValue.substring(0, rangeData.start) + text + oValue.substring(rangeData.end);
      nStart = nEnd = rangeData.start + text.length;
      st = el.scrollTop;
      el.value = nValue;
      if (el.scrollTop !== st) {
        el.scrollTop = st;
      }
      el.setSelectionRange(nStart, nEnd);
    } else if (el.createTextRange) { // IE
      sR = document.selection.createRange();
      sR.text = text;
      sR.setEndPoint('StartToEnd', sR);
      sR.select();
    }
  };
  // 获取行数
  _lineCount = () => {
    return this.el.value.split(/\r?\n/).length;
  };
  // 获取实时字数
  _realtimeWords = () => {
    let el = this.el;
    const pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
    let m = el.value.match(pattern);
    let count = 0;
    if(m === null) return count;
    for(let i = 0; i < m.length; i++) {
      if(m[i].charCodeAt(0) >= 0x4E00) {
        count += m[i].length;
      } else {
        count += m[i].length;
      }
    }
    return count;
  };
  // 实时光标位置
  _realTimeStatus = () => {
    this.setState({col: this._getCursorPosition().end});
  };
  // 获取实时行数
  _realTimeRow = () => {

  };
  // 滚动条同步 输入同步
  _synchroScroll = () => {
    if (this.el.value.length > 0){
      this.preview.scrollTop = this.el.scrollHeight;
    }
  };
  // 滚动条同步 滚动事件同步
  _synchronyScrollEventEl = () => {
    if(this.state.cScroll) {
      this.setState({cScroll: false});
      return;
    }
    this.setState({pScroll: true});
    let ratio = this.el.scrollTop / (this.el.scrollHeight - this.el.offsetHeight);
    let height = ratio * (this.preview.scrollHeight - this.preview.offsetHeight);
    this.preview.scrollTop = height;
  };
  _synchronyScrollEventHtml =() => {
    if(this.state.pScroll) {
      this.setState({pScroll: false});
      return;
    }
    this.setState({cScroll: true});
    let height = this.preview.scrollHeight - this.preview.clientHeight;
    let ratio = this.preview.scrollTop / height;
    let move = (this.el.scrollHeight - this.el.clientHeight) * ratio;
    this.el.scrollTop = move;
  };
  // 设置默认选中
  _setTextSelcted = (selectionStart, selectionEnd) => {
    let el = this.el;
    if (el.setSelectionRange){
      el.setSelectionRange(selectionStart, selectionEnd, "backward");
    } else if (el.createTextRange){
      let range = el.createTextRange();
      range.collapse(true);
      range.moveStart('character', selectionStart);
      range.moveEnd('character', selectionEnd - selectionStart-1);
      range.select();
    }
    el.focus();
  };
  _toggleLine = barName => {
    const insertMap = [{
      name: 'bold',
      text: '**加粗样式**',
      start: 6,
      end: 2
    },{
      name: 'italic',
      text: '*斜体样式*',
      start: 5,
      end: 1
    },{
      name: 'heading',
      text: '## 标题',
      start: 2,
      end: 0
    },{
      name: 'quoteLeft',
      text: '> 这里是引用',
      start: 5,
      end: 0
    },{
      name: 'list',
      text: ' - List item',
      start: 10,
      end: 0
    },{
      name: 'listOl',
      text: ' 1. List item',
      start: 10,
      end: 0
    },{
      name: 'code',
      text: '```\n' +
        '在这里插入代码片\n' +
        '```',
      start: 12,
      end: 4
    }];

    for (let i = 0; i < insertMap.length; i++) {
      if (insertMap[i].name === barName) {
        this._addText(insertMap[i].text);
        this.contentChange();
        let index = this._getCursorPosition().start;
        let start = index - insertMap[i].start;
        let end = index - insertMap[i].end;
        this._setTextSelcted(start, end);
      }
    }
    this.el.focus();
  };
  drawBlod = () => {
    this._toggleLine('bold');
  };
  drawItalic = () => {
    this._toggleLine('italic');
  };
  drawHeading = () => {
    this._toggleLine('heading');
  };
  drawQuoteLeft = () => {
    this._toggleLine('quoteLeft');
  };
  drawList = () => {
    this._toggleLine('list');
  };
  drawListOl = () => {
    this._toggleLine('listOl')
  };
  drawLink = () => {
    let link = prompt('链接');
    if (link === undefined || link === '') return;

    this._addText(`[添加链接描述](${link})`);
    this.contentChange();
  };
  drawImage = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      let url;
      if (values.url !== undefined){
        url = values.url;
      } else {
        url = values.upload.file.response.image_url;
      }
      this._addText(`![添加图片链接描述](${url})`);
    });
    this.contentChange();
    this.setState({visible: false})
  };
  drawCode = () => {
    this._toggleLine('code');
  };
  // 图片上传modal配置
  _handleCancel = () => this.setState({visible: false});
  _saveFormRef = (formRef) => {
    this.formRef = formRef;
  };
  // 支持缩进
  _tabSize = (event) => {
    let e = event || window.event;
    if (e.keyCode === 9) {
      this._addText('  ');
      this.contentChange();
      if (e && e.preventDefault) {
        e.preventDefault()
      } else {
        window.event.returnValue = false
      }
    }
  };

  /* 渲染markdown */
  _renderMarked = () => {
    return marked(this.el.value,{
      renderer: marked.Renderer(),
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: true,
      smartLists: true,
      smartypants: true,
      highlight: code => hljs.highlightAuto(code).value
    });
  };
  /* 渲染工具栏 */
  _renderToolBar = () => {
    return (
      <div className={style.editToolbar}>
        <i title="加粗" onClick={() => this.drawBlod()}><FontAwesomeIcon icon={faBold} size="lg"/></i>
        <i title="斜体" onClick={() => this.drawItalic()}><FontAwesomeIcon icon={faItalic} size="lg"/></i>
        <i title="标题" onClick={() => this.drawHeading()}><FontAwesomeIcon icon={faHeading} size="lg"/></i>
        <i title="引用" onClick={() => this.drawQuoteLeft()}><FontAwesomeIcon icon={faQuoteLeft} size="lg"/></i>
        <i title="无序列表" onClick={() => this.drawList()}><FontAwesomeIcon icon={faList} size="lg"/></i>
        <i title="有序列表" onClick={() => this.drawListOl()}><FontAwesomeIcon icon={faListOl} size="lg"/></i>
        <i title="链接" onClick={() => this.drawLink()}><FontAwesomeIcon icon={faLink} size="lg"/></i>
        <i title="图片" onClick={() => this.setState({visible: true})}><FontAwesomeIcon icon={faImage} size="lg"/></i>
        <i title="代码块" onClick={() => this.drawCode()}><FontAwesomeIcon icon={faCode} size="lg"/></i>
        <i title="markdown说明"><FontAwesomeIcon icon={faQuestionCircle} size="lg"/></i>
      </div>
    );
  };
  /*渲染状态栏*/
  _renderStatusBar = () => {
    return (
      <div className={style.editStatusBar}>
        <span>行数: {this.state.realLine}</span>
        <span>字数: {this.state.words}</span>
        <span>{this.state.row} : {this.state.col}</span>
      </div>
    );
  };
  render(){
    const optionProps = {
      wrappedComponentRef: this._saveFormRef,
      visible: this.state.visible,
      onCancel: this._handleCancel,
      onCreate: this.drawImage
    };
    return (
      <div className={style.container} id="marked-body">
        <div>
          {this._renderToolBar()}
        </div>
        <div className={style.content}>
          <div className={style.markdown}>
            <textarea id="edit" className={style.edit}/>
          </div>
          <div className={style.preview} dangerouslySetInnerHTML = {{ __html: this.state.html }} id="preview">
          </div>
        </div>
        <div className={style.editStatusBar}>
          {this._renderStatusBar()}
        </div>
        <ImageModal {...optionProps}/>
      </div>
    );
  }
}

export default MarkDownEdit
