import React  from 'react';
import Pipeline from '../Pipeline';
import BCryptHash from '../steps/hash/BCryptHash';
import BCryptVerify from '../steps/hash/BCryptVerify';
import Globals from '../../Globals';
/* globals document */

class BCryptHashPipeline extends Pipeline {

  componentDidMount() {
    document.title = 'BCrypt Hash @ ' + Globals.title;
  }

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>BCrypt Hash</h1>
        <p>
          BCrypt is a password hashing function. It generates a random salt, hashes the password you enter, and combines
          the two in a string that includes details of the algorithm used. You&apos;ll get a different hash every time even
          for the same password.
        </p>
        <p>
          BCrypt has a cost option, sometimes referred to as &quot;rounds&quot;. The higher the cost, the longer it
          takes to calculate the hash, making it harder for a hacker to crack it. Note the cost is exponential. Our
          default is 12, and this site is limited to 16 for performance reasons. The maximum cost is 31. You should
          research the current best practice and choose your own compromise between speed and security.
        </p>
        <p>
          BCrypt supports hashing up to 72 bytes. Anything after this is ignored. Accented and non-latin characters can
          be 1 to 3 bytes, and emoji up to 6; more if they are joined with others. For example, &quot;woman health worker,
          light skin tone&quot; (<span role="img" aria-label="woman health worker, light skin tone">&#x1F469;&#x1F3FB;&#x200D;&#x2695;&#xFE0F;</span>) is 18 bytes.
        </p>
        <ol>
          <li>
            Enter your password in the <strong>Input</strong> box.
          </li>
          <li>
            The <strong>BCrypt Hash</strong> step will show a hash of your password. It changes every time, even for the
            same input.
          </li>
          <li>
            So you can test validation, we&apos;ve added a <strong>BCrypt Verify</strong> step as well. Enter your
            password in this step and it will tell you if your password is correct.
          </li>
        </ol>
        <p>
          string-o-matic.com allows you to build up a string transformation from composable steps and format the output
          however you like. Add or remove steps and change step settings to get the results you need!
        </p>
      </div>
    );
  }

  buildPrecomposedPipeline() {
    this.addStep(new BCryptHash());
    this.addStep(new BCryptVerify());
  }
  
}

export default BCryptHashPipeline;