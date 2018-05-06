import HtmlEscape from './HtmlEscape';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new HtmlEscape();
});

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  const result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

test('empty', () => {
  expectResult('', '');
});

test('safe characters', () => {
  expectResult('abc', 'abc');
});

test('minimal names', () => {
  expectResult('<script>alert("ÀËÎÕÚ\'&🔥")</script>', '&lt;script&gt;alert(&quot;ÀËÎÕÚ&apos;&amp;🔥&quot;)&lt;/script&gt;');
});

test('minimal hex', () => {
  step.setEncoding('hex');
  expectResult('<script>alert("ÀËÎÕÚ\'&🔥")</script>', '&#x3c;script&#x3e;alert(&#x22;ÀËÎÕÚ&#x27;&#x26;🔥&#x22;)&#x3c;/script&#x3e;');
});

test('minimal dec', () => {
  step.setEncoding('dec');
  expectResult('<script>alert("ÀËÎÕÚ\'&🔥")</script>', '&#60;script&#62;alert(&#34;ÀËÎÕÚ&#39;&#38;🔥&#34;)&#60;/script&#62;');
});

test('non-ascii names+hex', () => {
  step.setEncoding('names-hex');
  step.setCharacters('nonascii');
  expectResult('<script>alert("ÀËÎÕÚ\'&🔥")</script>', '&lt;script&gt;alert(&quot;&Agrave;&Euml;&Icirc;&Otilde;&Uacute;&apos;&amp;&#x1f525;&quot;)&lt;/script&gt;');
});

test('non-ascii names+dec', () => {
  step.setEncoding('names-dec');
  step.setCharacters('nonascii');
  expectResult('<script>alert("ÀËÎÕÚ\'&🔥")</script>', '&lt;script&gt;alert(&quot;&Agrave;&Euml;&Icirc;&Otilde;&Uacute;&apos;&amp;&#128293;&quot;)&lt;/script&gt;');
});

test('non-ascii hex', () => {
  step.setEncoding('hex');
  step.setCharacters('nonascii');
  expectResult('<script>alert("ÀËÎÕÚ\'&🔥")</script>', '&#x3c;script&#x3e;alert(&#x22;&#xc0;&#xcb;&#xce;&#xd5;&#xda;&#x27;&#x26;&#x1f525;&#x22;)&#x3c;/script&#x3e;');
});

test('non-ascii dec', () => {
  step.setEncoding('dec');
  step.setCharacters('nonascii');
  expectResult('<script>alert("ÀËÎÕÚ\'&🔥")</script>', '&#60;script&#62;alert(&#34;&#192;&#203;&#206;&#213;&#218;&#39;&#38;&#128293;&#34;)&#60;/script&#62;');
});

test('all names+hex', () => {
  step.setEncoding('names-hex');
  step.setCharacters('all');
  expectResult('<script>alert("ÀËÎÕÚ\'&🔥")</script>', '&lt;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;&gt;&#x61;&#x6c;&#x65;&#x72;&#x74;&#x28;&quot;&Agrave;&Euml;&Icirc;&Otilde;&Uacute;&apos;&amp;&#x1f525;&quot;&#x29;&lt;&#x2f;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;&gt;');
});

test('all names+dec', () => {
  step.setEncoding('names-dec');
  step.setCharacters('all');
  expectResult('<script>alert("ÀËÎÕÚ\'&🔥")</script>', '&lt;&#115;&#99;&#114;&#105;&#112;&#116;&gt;&#97;&#108;&#101;&#114;&#116;&#40;&quot;&Agrave;&Euml;&Icirc;&Otilde;&Uacute;&apos;&amp;&#128293;&quot;&#41;&lt;&#47;&#115;&#99;&#114;&#105;&#112;&#116;&gt;');
});

test('all hex', () => {
  step.setEncoding('hex');
  step.setCharacters('all');
  expectResult('<script>alert("ÀËÎÕÚ\'&🔥")</script>', '&#x3c;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;&#x3e;&#x61;&#x6c;&#x65;&#x72;&#x74;&#x28;&#x22;&#xc0;&#xcb;&#xce;&#xd5;&#xda;&#x27;&#x26;&#x1f525;&#x22;&#x29;&#x3c;&#x2f;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;&#x3e;');
});

test('all dec', () => {
  step.setEncoding('dec');
  step.setCharacters('all');
  expectResult('<script>alert("ÀËÎÕÚ\'&🔥")</script>', '&#60;&#115;&#99;&#114;&#105;&#112;&#116;&#62;&#97;&#108;&#101;&#114;&#116;&#40;&#34;&#192;&#203;&#206;&#213;&#218;&#39;&#38;&#128293;&#34;&#41;&#60;&#47;&#115;&#99;&#114;&#105;&#112;&#116;&#62;');
});

test('lines keep', () => {
  step.setLines('keep');
  expectResult('a\nb\r\nc', 'a\nb\r\nc');
});

test('lines encode hex', () => {
  step.setLines('encode');
  step.setEncoding('hex');
  expectResult('a\nb\r\nc', 'a&#xa;b&#xd;&#xa;c');
});

test('lines encode dec', () => {
  step.setLines('encode');
  step.setEncoding('dec');
  expectResult('a\nb\r\nc', 'a&#10;b&#13;&#10;c');
});

test('lines <br>', () => {
  step.setLines('br');
  expectResult('a\nb\r\nc', 'a\n<br>\nb\n<br>\nc');
});

test('lines <br/>', () => {
  step.setLines('brx');
  expectResult('a\nb\r\nc', 'a\n<br/>\nb\n<br/>\nc');
});

test('lines <p/>', () => {
  step.setLines('p');
  expectResult('a\nb\r\nc', '<p>\na\n</p>\n<p>\nb\n</p>\n<p>\nc\n</p>');
});

test('lines strip', () => {
  step.setLines('strip');
  expectResult('a\nb\r\nc', 'abc');
});