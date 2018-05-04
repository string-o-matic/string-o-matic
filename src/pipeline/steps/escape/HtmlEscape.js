import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HtmlUtils from '../../../lib/HtmlUtils';

class HtmlEscapeForm extends Component {

  render() {
    return (
      <form className="form-inline row">
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Encode</label>
          <select onChange={this.onCharactersChange} value={this.props.step.characters}>
            <option value="minimal">&lt; &gt; &amp; &quot; &apos;</option>
            <option value="nonascii">Non-ASCII</option>
            <option value="all">All</option>
          </select>
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Entities</label>
          <select onChange={this.onEncodingChange} value={this.props.step.encoding}>
            <option value="names-hex">Names, Hex</option>
            <option value="names-dec">Names, Decimal</option>
            <option value="hex">Hex</option>
            <option value="dec">Decimal</option>
          </select>
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Line endings</label>
          <select onChange={this.onLinesChange} value={this.props.step.lines}>
            <option value="keep">Keep</option>
            <option value="encode">Encode</option>
            <option value="brx">&lt;br/&gt;</option>
            <option value="br">&lt;br&gt;</option>
            <option value="p">&lt;p&gt;...&lt;/p&gt;</option>
            <option value="strip">Strip</option>
          </select>
        </div>
      </form>
    );
  }

  onCharactersChange = (e) => {
    this.props.step.setCharacters(e.target.value);
    this.props.refresh();
  };

  onEncodingChange = (e) => {
    this.props.step.setEncoding(e.target.value);
    this.props.refresh();
  };

  onLinesChange = (e) => {
    this.props.step.setLines(e.target.value);
    this.props.refresh();
  };

}

/**
 * TODO Try https://github.com/mathiasbynens/he or use its entity list
 */
class HtmlEscape extends Step {

  static title = 'HTML Escape';
  static variantTitle = 'Escape';
  static supports = [ StringType ];
  static output = StringType;
  static form = HtmlEscapeForm;

  characters = 'minimal';
  encoding = 'names-hex';
  lines = 'keep';
  
  setCharacters(characters) {
    this.output = null;
    this.characters = characters;
    this.passInput();
  }

  setEncoding(encoding) {
    this.output = null;
    this.encoding = encoding;
    this.passInput();
  }

  setLines(lines) {
    this.output = null;
    this.lines = lines;
    this.passInput();
  }

  calculate(input) {
    let result = '';
    let data = input.data;
    // When encoding lines as breaks/paragraphs, replace windows new lines first
    if (this.lines === 'b' || this.lines === 'p') {
      data = data.replace(/\r\n/g, '\n');
    }
    for (let i = 0; i < data.length; i++) {
      const char = data.substring(i, i + 1);
      const int = data.charCodeAt(i);
      if (char === '\r' || char === '\n') {
        if (this.lines === 'keep') {
          result += char;
        } else if (this.lines === 'encode') {
          result += this.entity(int);
        } else if (this.lines === 'brx') {
          result += '\n<br/>\n';
        } else if (this.lines === 'br') {
          result += '\n<br>\n';
        } else if (this.lines === 'p') {
          result += '\n</p>\n<p>\n';
        }
      } else if (HtmlUtils.minimalEntities[char] || (int > 0x7F && this.characters === 'nonascii') || this.characters === 'all') {
        if (HtmlUtils.charToEntity[char] && this.encoding.indexOf('names') > -1) {
          result += '&' + HtmlUtils.charToEntity[char] + ';';
        } else if (int >= 0xD800 && int <= 0xDBFF && i < data.length - 1) {
          // Surrogate high byte. Combine this and the next.
          // NOTE No check if the second byte is in the low surrogate range 0xDC00 to 0xDFFF.
          const hi = int;
          const lo = data.charCodeAt(i + 1);
          const pair = (hi - 0xD800) * 0x400 + lo - 0xDC00 + 0x10000;
          result += this.entity(pair);
          i += 1;
        } else if (int <= 0xFFFF) {
          result += this.entity(int);
        } else {
          // Should never happen as utf16 character can't be above 0xFFFF
          result += char;
        }
      } else {
        result += char;
      }
    }
    if (this.lines === 'p') {
      result = '<p>\n' + result + '\n</p>';
    }
    return Data.string(result);
  }

  /**
   * @param int {number}
   * @returns {string}
   */
  entity(int) {
    if (this.encoding.indexOf('hex') > -1) {
      return '&#x' + int.toString(16) + ';';
    } else {
      return '&#' + int.toString(10) + ';';
    }
  }

}

HtmlEscapeForm.propTypes = {
  step: PropTypes.instanceOf(HtmlEscape).isRequired,
  refresh: PropTypes.func.isRequired
};

export {HtmlEscapeForm};
export default HtmlEscape;
