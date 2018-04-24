import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StringType} from '../Types';
import Data from '../Data';
import ResizingTextArea from '../ResizingTextArea';
import Globals from '../../Globals';
import Dropzone from 'react-dropzone';
import './Input.css';

class FileInput extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

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
            <div className="binary">This file can&apos;t be displayed or edited as text, so it&apos;s been imported as a byte array. You can encode, hash or encrypt it.</div>
            <div className="meta">Byte array, {Globals.fileInput.data.length()} bytes</div>
          </div>
        );
      }
    } else if (Globals.fileError) {
      status = <div className="file-error"><span className="ion-md-alert"/> {Globals.fileError}</div>;
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
    this.props.inputChange(Globals.fileInput);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const byteStringBuffer = util.createBuffer(arrayBuffer);
        let input = null;
        try {
          input = Data.string(byteStringBuffer.toString());
        } catch (e) {
          input = Data.byteStringBuffer(byteStringBuffer);
        }
        this.props.inputChange(input);
        Globals.file = acceptedFiles[0];
        Globals.fileInput = input;
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
  }

  onChange(value) {
    const input = Data.string(value);
    this.props.inputChange(input);
    Globals.fileInput = input;
    this.setState({ });
  }

  clear() {
    const input = Data.string('');
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
