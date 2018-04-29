import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from './steps/Step';
import {StepTail, StepTop} from '../Common';
import StepForm from './steps/StepForm';
import ResizingTextArea from './ResizingTextArea';
import HexEncode from './steps/encode/HexEncode';
import Base64Encode from './steps/encode/Base64Encode';
import {StringType, BoolType, NullType, ByteStringBufferType} from './Types';
import './StepComponent.css';

class StepComponent extends Component {

  constructor(props) {
    super(props);
    this.deleteStep = this.deleteStep.bind(this);
    this.toggleDirection = this.toggleDirection.bind(this);
  }

  deleteStep() {
    this.props.deleteStep(this.props.step);
  }

  injectStepBefore(step) {
    this.props.injectStepBefore(this.props.step, new step());
  }

  render() {
    const step = this.props.step;
    const output = step.getOutput();
    const content = [];
    let clazz = 'normal';
    content.push(<StepForm key="form" step={step} refresh={this.props.refresh}/>);
    if (output == null) {
      clazz = 'error';
      content.push(this.bug('Whoops! This step hasn\'t received any input. You\'ve found a bug.'));
    } else if (output.then) {
      content.push(this.data('Calculating...', 'calculating'));
      content.push(this.meta(['Unknown']));
      output.then(_ => this.setState({}));
    } else if (output.status === 'valid') {
      const meta = [];
      if (output.type === ByteStringBufferType) {
        content.push(this.data(output.data.toHex()));
        meta.push(<div key="type"><span>Byte array, {output.data.length()} bytes. Hex preview.</span></div>);
      } else if (output.type === StringType) {
        // eslint-disable-next-line no-control-regex
        const cleanData = output.data.replace(/[^\x09\x0a\x0d\x20-\x7e\xa0-\xac\xae-\xff\u00ff-\uffff]/g, '\ufffd');
        if (cleanData !== output.data) {
          meta.push(<div className="warning" key="warningX"><span className="ionicon ion-md-alert"/> Some characters are not printable and are displayed as &#xfffd;.</div>);
        }
        content.push(this.data(cleanData));
        if (output.data.match(/[\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F\uFE00-\uFE0F\uD800-\uDBFF\uDC00-\uDFFF]/g)) {
          meta.push(<div key="type">String, ~{output.data.length} characters<br/><span className="ion-md-information-circle"/> Contains combining characters, variation selectors or surrogate pairs.</div>);
        } else {
          meta.push(<div key="type">String, {output.data.length} characters</div>);
        }
      } else if (output.type === BoolType) {
        content.push(this.data(output.data ? 'TRUE' : 'FALSE', output.data ? 'true' : 'false'));
        meta.push(<div key="type">Boolean</div>);
      } else if (output.type === NullType) {
        content.push(this.data('NULL'));
        meta.push(<div key="type">NULL</div>);
      }
      output.warnings.forEach((w, i) => meta.push(<div className="warning" key={'warning' + i}><span className="ionicon ion-md-alert"/> {w}</div>));
      output.infos.forEach((m, i) => meta.push(<div className="info" key={'info' + i}><span className="ionicon ion-md-information-circle"/> {m}</div>));
      content.push(this.meta(meta));
    } else if (output.status === 'invalid') {
      clazz = 'error';
      content.push(this.error(output.message));
    } else if (output.status === 'bug') {
      clazz = 'error';
      content.push(this.bug('Whoops! This value couldn\'t be calculated. You\'ve found a bug.'));
    } else if (output.status === 'unsupported') {
      clazz = 'error';
      const supports = step.constructor.supports.map(s => s.display).join(', ');
      let suggestions = <div>Try adding a conversion step</div>;
      if (output.inputType === ByteStringBufferType && step.constructor.supports.indexOf(StringType) > -1) {
        suggestions = (<div className="suggestions">
          <p>Recommended conversion steps:</p>
          <button className="btn" onClick={this.injectStepBefore.bind(this, HexEncode)}>{HexEncode.title}</button>
          <button className="btn" onClick={this.injectStepBefore.bind(this, Base64Encode)}>{Base64Encode.title}</button>
        </div>);
      }
      content.push(this.error(<span>This step can&apos;t convert {output.inputType.displayPlural} - supported types are: {supports}{suggestions}</span>));
    } else if (output.status === 'broken-pipe') {
      clazz = 'broken-pipe';
      content.push(this.brokenPipe());
    }

    let rtl = null;
    if (step.constructor.rtl) {
      rtl = <button className="pull-right direction" onClick={this.toggleDirection}>{this.props.step.direction.toUpperCase()}</button>;
    }

    clazz += ' step step-transform';

    return (
      <div className={clazz}>
        <StepTop/>
        <div className="step-header">
          <h4 className="pull-left">{this.props.step.constructor.title}</h4>
          <button className="pull-right delete" onClick={this.deleteStep}><span className="ion-md-trash"/></button>
          {rtl}
        </div>
        <div className="step-body">
          {content.map(c => c)}
        </div>
        <StepTail/>
      </div>
    );
  }

  toggleDirection() {
    if (this.props.step.direction === 'rtl') {
      this.props.step.direction = 'ltr';
    } else {
      this.props.step.direction = 'rtl';
    }
    this.setState({});
  }

  data(content, className) {
    return <ResizingTextArea key="data" readOnly={true} value={content} className={className} direction={this.props.step.direction}/>;
  }

  meta(content) {
    return <div key="meta" className="meta">{content.map(c => c)}</div>;
  }

  error(content) {
    return <div key="error" className="error"><span className="ionicon ion-ios-alert-outline"/><br/>{content}</div>;
  }

  bug(content) {
    return <div key="bug" className="error"><span className="ionicon ion-ios-bug-outline"/><br/>{content}<br/><small>You might find the cause in your browser&apos;s console log.</small></div>;
  }

  brokenPipe() {
    return <div key="broken-pipe" className="broken-pipe"><span className="ionicon ion-ios-thunderstorm-outline"/><br/>Can&apos;t show this step due to errors above</div>;
  }

}

StepComponent.propTypes = {
  deleteStep: PropTypes.func.isRequired,
  injectStepBefore: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  step: PropTypes.instanceOf(Step).isRequired
};

export default StepComponent;
