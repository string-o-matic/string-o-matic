import bcrypt from 'bcryptjs';
import {StringType} from '../../Types';
import Data from '../../Data';
import Step from '../Step';

// https://github.com/dcodeIO/bcrypt.js/
class BCryptVerify extends Step {

  static title = 'BCrypt Verify';
  static supports = [ StringType ];

  calculate(input) {
    return new Promise(function(resolve) {
      // FIXME temp hardcoded password
      bcrypt.compare('Grumpy', input.data).then(success => {
        resolve(Data.bool(success))
      }, error => {
        console.error('BCrypt verify error', error);
        resolve(Data.bug());
      });
    });
  }

}

export default BCryptVerify;
