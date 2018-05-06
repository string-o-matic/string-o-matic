import MD5 from './hash/MD5';
import SHA1 from './hash/SHA1';
import SHA256 from './hash/SHA256';
import SHA384 from './hash/SHA384';
import SHA512 from './hash/SHA512';
import SHA512224 from './hash/SHA512224';
import SHA512256 from './hash/SHA512256';
import BCryptHash from './hash/BCryptHash';
import BCryptVerify from './hash/BCryptVerify';
import AesEncrypt from './encrypt/AesEncrypt';
import AesDecrypt from './encrypt/AesDecrypt';
import HtmlEscape from './escape/HtmlEscape';
import HtmlUnescape from './escape/HtmlUnescape';
import HexEncode from './encode/HexEncode';
import HexDecode from './encode/HexDecode';
import Base64Encode from './encode/Base64Encode';
import Base64Decode from './encode/Base64Decode';
import BinaryEncode from './encode/BinaryEncode';
import BinaryDecode from './encode/BinaryDecode';
import DecimalEncode from './encode/DecimalEncode';
import DecimalDecode from './encode/DecimalDecode';
import UnicodeEncode from './encode/UnicodeEncode';
import UnicodeDecode from './encode/UnicodeDecode';
import URIEncode from './encode/URIEncode';
import URIDecode from './encode/URIDecode';
import Reverse from './string/Reverse';
import UpperCase from './string/UpperCase';
import LowerCase from './string/LowerCase';
import InverseCase from './string/InverseCase';
import TitleCase from './string/TitleCase';
import StripControlCharacters from './string/StripControlCharacters';
import StripWhiteSpace from './string/StripWhiteSpace';
import TextToBytes from './convert/TextToBytes';
import BytesToText from './convert/BytesToText';
import AsyncTest from './test/AsyncTest';
import Iso88591Test from './test/Iso88591Test';
/* global process */

class StepRegistry {

  static categories = {
    'String Case': [ UpperCase, LowerCase, InverseCase, TitleCase ], // Snake, Camel
    'String Transform': [ Reverse, StripControlCharacters, StripWhiteSpace ], // Replace, Normalize ...
    'Escape': [ { root: 'HTML', variants: [HtmlEscape, HtmlUnescape] } ], // Java, Python ...
    'Character Encode': [
      { root: 'URI', variants: [URIEncode, URIDecode] },
      { root: 'Unicode', variants: [UnicodeEncode, UnicodeDecode] }
    ],
    'Byte Encode': [
      { root: 'Base64', variants: [Base64Encode, Base64Decode] },
      { root: 'Hex', variants: [HexEncode, HexDecode] },
      { root: 'Decimal', variants: [DecimalEncode, DecimalDecode] },
      { root: 'Binary', variants: [BinaryEncode, BinaryDecode] }
    ],
    'Convert': [ TextToBytes, BytesToText ],
    'Hash': [
      { root: 'BCrypt', variants: [BCryptHash, BCryptVerify] },
      MD5, SHA1, SHA256, SHA384, SHA512, SHA512224, SHA512256
    ],
    'Encrypt': [
      { root: 'AES', variants: [ AesEncrypt, AesDecrypt ] }
    ],
    'Cipher': [ ] // ROT13 ...
  };

}

if (process.env.NODE_ENV === 'development') {
  StepRegistry.categories['Tests'] = [ AsyncTest, Iso88591Test ];
}

export default StepRegistry;