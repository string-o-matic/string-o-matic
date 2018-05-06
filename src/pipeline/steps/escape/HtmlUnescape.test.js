import HtmlUnescape from './HtmlUnescape';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new HtmlUnescape();
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
  expectResult('&lt;script&gt;alert(&quot;ÀËÎÕÚ&apos;&amp;🔥&quot;)&lt;/script&gt;', '<script>alert("ÀËÎÕÚ\'&🔥")</script>');
});

test('minimal hex', () => {
  expectResult('&#x3c;script&#x3e;alert(&#x22;ÀËÎÕÚ&#x27;&#x26;🔥&#x22;)&#x3c;/script&#x3e;', '<script>alert("ÀËÎÕÚ\'&🔥")</script>');
});

test('minimal dec', () => {
  expectResult('&#60;script&#62;alert(&#34;ÀËÎÕÚ&#39;&#38;🔥&#34;)&#60;/script&#62;', '<script>alert("ÀËÎÕÚ\'&🔥")</script>');
});

test('non-ascii names+hex', () => {
  expectResult('&lt;script&gt;alert(&quot;&Agrave;&Euml;&Icirc;&Otilde;&Uacute;&apos;&amp;&#x1f525;&quot;)&lt;/script&gt;', '<script>alert("ÀËÎÕÚ\'&🔥")</script>');
});

test('non-ascii names+dec', () => {
  expectResult('&lt;script&gt;alert(&quot;&Agrave;&Euml;&Icirc;&Otilde;&Uacute;&apos;&amp;&#128293;&quot;)&lt;/script&gt;', '<script>alert("ÀËÎÕÚ\'&🔥")</script>');
});

test('non-ascii hex', () => {
  expectResult('&#x3c;script&#x3e;alert(&#x22;&#xc0;&#xcb;&#xce;&#xd5;&#xda;&#x27;&#x26;&#x1f525;&#x22;)&#x3c;/script&#x3e;', '<script>alert("ÀËÎÕÚ\'&🔥")</script>');
});

test('non-ascii dec', () => {
  expectResult('&#60;script&#62;alert(&#34;&#192;&#203;&#206;&#213;&#218;&#39;&#38;&#128293;&#34;)&#60;/script&#62;', '<script>alert("ÀËÎÕÚ\'&🔥")</script>');
});

test('all names+hex', () => {
  expectResult('&lt;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;&gt;&#x61;&#x6c;&#x65;&#x72;&#x74;&#x28;&quot;&Agrave;&Euml;&Icirc;&Otilde;&Uacute;&apos;&amp;&#x1f525;&quot;&#x29;&lt;&#x2f;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;&gt;', '<script>alert("ÀËÎÕÚ\'&🔥")</script>');
});

test('all names+dec', () => {
  expectResult('&lt;&#115;&#99;&#114;&#105;&#112;&#116;&gt;&#97;&#108;&#101;&#114;&#116;&#40;&quot;&Agrave;&Euml;&Icirc;&Otilde;&Uacute;&apos;&amp;&#128293;&quot;&#41;&lt;&#47;&#115;&#99;&#114;&#105;&#112;&#116;&gt;', '<script>alert("ÀËÎÕÚ\'&🔥")</script>');
});

test('all hex', () => {
  expectResult('&#x3c;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;&#x3e;&#x61;&#x6c;&#x65;&#x72;&#x74;&#x28;&#x22;&#xc0;&#xcb;&#xce;&#xd5;&#xda;&#x27;&#x26;&#x1f525;&#x22;&#x29;&#x3c;&#x2f;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;&#x3e;', '<script>alert("ÀËÎÕÚ\'&🔥")</script>');
});

test('all dec', () => {
  expectResult('&#60;&#115;&#99;&#114;&#105;&#112;&#116;&#62;&#97;&#108;&#101;&#114;&#116;&#40;&#34;&#192;&#203;&#206;&#213;&#218;&#39;&#38;&#128293;&#34;&#41;&#60;&#47;&#115;&#99;&#114;&#105;&#112;&#116;&#62;', '<script>alert("ÀËÎÕÚ\'&🔥")</script>');
});
