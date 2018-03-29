import bcrypt from 'bcryptjs';
import {StringType} from '../../Types';
import Data from '../../Data';
import Step from '../Step'

// https://github.com/dcodeIO/bcrypt.js/
// TODO warn if input exceeds 72 BYTES (not characters)
// TODO fail if crypto.getRandomValues is unavailable, later implement fallback
class BCryptHash extends Step {

  static title = 'BCrypt Hash';
  static supports = [ StringType ];

  rounds = 10;

  calculate(input) {
    const rounds = this.rounds;
    return new Promise(function(resolve) {
      bcrypt.genSalt(rounds).then(salt => {
        bcrypt.hash(input.data, salt).then(hash => {
          resolve(Data.string(hash));
        }, error => {
          console.error('BCrypt hash error', error);
          resolve(Data.bug());
        })
      }, error => {
        console.error('BCrypt salt error', error);
        resolve(Data.bug());
      });
    });
  }

}

export default BCryptHash;
