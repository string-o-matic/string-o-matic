import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StringType} from '../Types';
import Data from '../Data';
import ResizingTextArea from '../ResizingTextArea';
import Dropzone from 'react-dropzone';
import './Input.css';

class FileInput extends Component {

  constructor(props) {
    super(props);
    this.state = { input: Data.string('') };
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
      if (this.state.input.type === StringType) {
        textarea = (
          <div>
            <ResizingTextArea onChange={this.onChange} readOnly={false} value={this.state.input.data}/>
            <div className="meta">String, {this.state.input.data.length} characters</div>
          </div>
        );
      } else {
        textarea = (
          <div>
            <div className="binary">This file can&apos;t be displayed or edited as text, so it&apos;s been imported as a byte array. You can encode, hash or encrypt it.</div>
            <div className="meta">Byte array, {this.state.input.data.length()} bytes</div>
          </div>
        );
      }
    } else if (this.state.error) {
      status = <div className="file-error"><span className="ion-md-alert"/> {this.state.error}</div>;
    }
    return (
      <div>
        <Dropzone onDrop={this.onDrop.bind(this)} maxSize={1048576} disablePreview={true} multiple={false} style={style} className="dropzone" activeClassName="active" rejectClassName="reject">
          <span className="ionicon ion-ios-folder-open-outline"/>
          <br/>
          Drop a file here
          <small>
            <br/>or click to select a file
            <br/>Max size 1Mb
          </small>
          {status}
        </Dropzone>
        {textarea}
      </div>
    );
  }

  componentDidMount() {
    this.props.inputChange(this.state.input);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const byteStringBuffer = util.createBuffer(arrayBuffer);
        var input = null;
        try {
          input = Data.string(byteStringBuffer.toString());
        } catch (e) {
          input = Data.byteStringBuffer(byteStringBuffer);
        }
        this.props.inputChange(input);
        this.setState({ file: acceptedFiles[0], input: input });
      };
      reader.onabort = () => this.setState({ file: null, error: 'Oops, couldn\'t read your file!'});
      reader.onerror = () => this.setState({ file: null, error: 'Oops, couldn\'t read your file!'});
      reader.readAsArrayBuffer(acceptedFiles[0]);
    } else if (rejectedFiles && rejectedFiles.length > 0) {
      this.setState({ file: null, error: 'File ' + rejectedFiles[0].name + ' is unsupported. Max size is 1Mb.'});
    }
  }

  onChange(value) {
    const input = Data.string(value);
    this.props.inputChange(input);
    this.setState({ input: input });
  }

  clear() {
    const input = Data.string('');
    this.props.inputChange(input);
    this.setState({ input: input, error: null, file: null });
  }

}

FileInput.propTypes = {
  inputChange: PropTypes.func.isRequired
};

export default FileInput;
