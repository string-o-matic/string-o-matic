import React, { Component } from 'react';
import Data from '../Data';
import ResizingTextArea from '../ResizingTextArea';
import './Input.css'
import Dropzone from 'react-dropzone'

class FileInput extends Component {

  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.onChange = this.onChange.bind(this);
  }

  render() {
    var style = { };
    var status = null;
    var textarea = null;
    if (this.state.file) {
      status = (
        <div className="file-success"><span className="ion-md-checkmark-circle"/> Imported {this.state.file.name}</div>
      );
      textarea = (
        <div>
          <ResizingTextArea onChange={this.onChange} readOnly={false} value={this.state.input}/>
          <div className="meta">String, {this.state.input.length} characters</div>
        </div>
      );
    } else if (this.state.error) {
      status = <div className="file-error"><span className="ion-md-alert"/> {this.state.error}</div>
    }
    return (
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

  componentDidMount() {
    this.props.inputChange(Data.string(this.state.input + ''));
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsString = reader.result;
        this.props.inputChange(Data.string(fileAsString));
        this.setState({ file: acceptedFiles[0], input: fileAsString});
      };
      reader.onabort = () => this.setState({ file: null, error: "Oops, couldn't read your file!"});
      reader.onerror = () => this.setState({ file: null, error: "Oops, couldn't read your file!"});
      reader.readAsText(acceptedFiles[0]);
    } else if (rejectedFiles && rejectedFiles.length > 0) {
      this.setState({ file: null, error: 'File ' + rejectedFiles[0].name + ' is unsupported. Max size is 1Mb.'});
    }
  }

  onChange(value) {
    this.props.inputChange(Data.string(value));
    this.setState({ input: value });
  }

  clear() {
    this.setState({ input: '', error: null, file: null });
    this.props.inputChange(Data.string(''));
  }

}

export default FileInput;
