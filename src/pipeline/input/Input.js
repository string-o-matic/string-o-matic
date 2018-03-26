import React, { Component } from 'react';
import { StepTail } from '../../Common';
import Data from '../Data';
import './Input.css'
import Dropzone from 'react-dropzone'

class Input extends Component {

  constructor(props) {
    super(props);
    this.state = { textAreaInput: this.props.initialInput, fileInput: '', type: 'textArea' };
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
  }

  render() {
    var content = (
      <div>
        <textarea
          className="data"
          type="text"
          value={this.state.textAreaInput}
          onChange={this.handleChange}
          rows="1"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          ref="textarea1">
        </textarea>
        <div className="meta">String, {this.getLength()} characters</div>
      </div>
    );
    if (this.state.type === 'file') {
      var style = { };
      var status = null;
      var textarea = null;
      if (this.state.file) {
        status = (
          <div className="file-success"><span className="ion-md-checkmark-circle"/> Imported {this.state.file.name}</div>
        );
        textarea = (
          <div>
            <textarea
              className="data"
              type="text"
              value={this.state.fileInput}
              onChange={this.handleChange}
              rows="1"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              ref="textarea2">
            </textarea>
            <div className="meta">String, {this.getLength()} characters</div>
          </div>
        );
      } else if (this.state.fileError) {
        status = <div className="file-error"><span className="ion-md-alert"/> {this.state.fileError}</div>
      }
      content = (
        <div>
          <Dropzone onDrop={this.onDrop.bind(this)} maxSize={1048576} disablePreview={true} multiple={false} style={style} className="dropzone" activeClassName="active" rejectClassName="reject">
            <span className="ionicon ion-md-document"/>
            <br/>
            Drop a file here
            <br/>
            <small>or click to select a file</small>
            <br/>
            <small>Max size 1Mb</small>
            {status}
          </Dropzone>
          {textarea}
        </div>
      );
    }

    return (
      <div className="step step-input">
        <div className="step-header">
          <h4 className="pull-left">Input</h4>
          <div className="btn-group pull-right">
            <button className="btn btn-sm btn-primary btn-clear" onClick={this.clear}><span className="ion-md-close-circle"/> Clear</button>
            <button className={"btn btn-sm btn-primary" + (this.state.type === 'textArea' ? ' active' : '')} onClick={this.setType.bind(this, 'textArea')}>Text</button>
            {/*<button className="btn btn-sm btn-primary" disabled="disabled">Number</button>*/}
            <button className={"btn btn-sm btn-primary" + (this.state.type === 'file' ? ' active' : '')} onClick={this.setType.bind(this, 'file')}>File</button>
            {/*<button className="btn btn-sm btn-primary" disabled="disabled">Random</button>*/}
          </div>
        </div>
        <div className="step-body">
          {content}
        </div>
        <StepTail/>
      </div>
    );
  }

  componentDidMount() {
    this.adjustTextArea();
  }

  componentDidUpdate() {
    this.adjustTextArea();
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsString = reader.result;
        this.props.inputChange(Data.string(fileAsString));
        this.setState({ file: acceptedFiles[0], fileInput: fileAsString});
      };
      reader.onabort = () => this.setState({ file: null, fileError: "Oops, couldn't read your file!"});
      reader.onerror = () => this.setState({ file: null, fileError: "Oops, couldn't read your file!"});
      reader.readAsText(acceptedFiles[0]);
    } else if (rejectedFiles && rejectedFiles.length > 0) {
      this.setState({ file: null, fileError: 'File ' + rejectedFiles[0].name + ' is unsupported. Max size is 1Mb.'});
    }
  }

  getLength() {
    if (this.state.type === 'textArea') {
      return this.state.textAreaInput.length;
    } else if (this.state.type === 'file') {
      return this.state.fileInput.length;
    }
  }

  setType(type) {
    this.setState({type: type});
    if (type === 'textArea') {
      this.props.inputChange(Data.string(this.state.textAreaInput));
    } else if (type === 'file') {
      this.props.inputChange(Data.string(this.state.fileInput));
    }
  }

  handleChange(e) {
    var value = e.target.value;
    this.props.inputChange(Data.string(value));
    if (this.state.type === 'textArea') {
      this.setState({textAreaInput: value});
    } else {
      this.setState({fileInput: value});
    }
  }

  clear() {
    this.setState({ textAreaInput: '', fileInput: '', fileError: null, file: null });
    this.props.inputChange(Data.string(''));
  }

  adjustTextArea() {
    if (this.refs.textarea1) {
      this.refs.textarea1.style.height = 'auto';
      this.refs.textarea1.style.height = Math.min(600, this.refs.textarea1.scrollHeight) + 'px';
    }
    if (this.refs.textarea2) {
      this.refs.textarea2.style.height = 'auto';
      this.refs.textarea2.style.height = Math.min(600, this.refs.textarea2.scrollHeight) + 'px';
    }
  }

}

export default Input;
