import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StringType} from '../Types';
import Data from '../Data';
import ResizingTextArea from '../ResizingTextArea';
import Globals from '../../Globals';
import Dropzone from 'react-dropzone';
import './FileInput.css';

class FileInput extends Component {

  render() {
    let style = { };
    let status = null;
    let textarea = null;
    if (Globals.file) {
      status = (
        <div className="file-success"><span className="ion-md-checkmark-circle"/> Imported {Globals.file.name}</div>
      );
      if (Globals.fileInput.type === StringType) {
        textarea = (
          <div>
            <ResizingTextArea onChange={this.onChange} readOnly={false} value={Globals.fileInput.data}/>
            <div className="meta">String, {Globals.fileInput.data.length} characters</div>
          </div>
        );
      } else {
        textarea = (
          <div>
            <div className="binary">All files are currently treated as binary. Just add a <strong>Bytes &rarr; Text</strong> step and select the right encoding if your file is text.<br/>We&apos;re working on encoding detection!</div>
            <div className="meta">Byte array, {Globals.fileInput.data.length} bytes</div>
          </div>
        );
      }
    } else if (Globals.fileError) {
      status = <div className="file-error"><span className="ion-md-alert"/> {Globals.fileError}</div>;
    }
    return (
      <div>
        <Dropzone onDrop={this.onDrop} maxSize={1048576} disablePreview={true} multiple={false} style={style} className="dropzone" activeClassName="active" rejectClassName="reject">
          <span className="ionicon ion-ios-folder-open-outline"/>
          <div className="drop-label">
            Drop a file here
          </div>
          <div className="drop-alt">
            or click to select a file
            <br/>
            Max 1MB
          </div>
          {status}
        </Dropzone>
        {textarea}
      </div>
    );
  }

  componentDidMount() {
    this.props.inputChange(Globals.fileInput.withSequence(++Globals.inputSequence));
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const byteArray = new Uint8Array(arrayBuffer);
        // If string decodes as UTF-8, assume UTF-8
        // else if string has a BOM, assume 16BE/16LE
        // else if string has many null even bytes, assume 16BE
        // else if string has many null odd bytes, assume 16LE
        // else if string has no unprintable characters, assume ISO-8859-1
        // else binary
        let input = Data.byteArray(byteArray);
        Globals.file = acceptedFiles[0];
        Globals.fileInput = input.withSequence(++Globals.inputSequence);
        this.props.inputChange(input);
        this.setState({ });
      };
      const onFail = () => {
        Globals.file = null;
        Globals.fileError = 'Oops, couldn\'t read your file!';
        this.setState({ });
      };
      reader.onabort = onFail;
      reader.onerror = onFail;
      reader.readAsArrayBuffer(acceptedFiles[0]);
    } else if (rejectedFiles && rejectedFiles.length > 0) {
      Globals.file = null;
      Globals.fileError = 'File ' + rejectedFiles[0].name + ' is unsupported. Max size is 1Mb.';
      this.setState({ });
    }
  };

  onChange = (value) => {
    const input = Data.string(value).withSequence(++Globals.inputSequence);
    this.props.inputChange(input);
    Globals.fileInput = input;
    this.setState({ });
  };

  clear() {
    const input = Data.string('').withSequence(++Globals.inputSequence);
    this.props.inputChange(input);
    Globals.fileInput = input;
    Globals.fileError = null;
    Globals.file = null;
    this.setState({ });
  }

}

FileInput.propTypes = {
  inputChange: PropTypes.func.isRequired
};

export default FileInput;
