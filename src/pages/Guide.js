import React, { Component } from 'react';
import Globals from '../Globals';
import './Guide.css';
/* global document */

class Guide extends Component {

  componentDidMount() {
    document.title = 'Guide @ ' + Globals.title;
  }

  render() {
    return (
      <div className="page">
        <ol className="contents">
          <li><a href="#intro">Introduction</a></li>
          <li><a href="#example">MD5 Example</a></li>
          <li><a href="#input">Input Methods</a></li>
          <li><a href="#encryption">Encryption</a></li>
          <li><a href="#nonprintable">Non Printable Characters</a></li>
          <li><a href="#lineendings">Line Endings</a></li>
          <li><a href="#emoji">Emoji</a></li>
          <li><a href="#combining">Combining Characters</a></li>
          <li><a href="#security">Security</a></li>
        </ol>
        <h4><span className="ion-ios-cog-outline"/> <a name="intro">Introduction</a></h4>
        <div className="guide-section-content">
          <p>
            To transform some text, simply type it, paste it, or upload it using the Input box. Keep reading for more information
            on these options. Next, select the transformation step you want from the blue step selector box at the bottom.
            The new step will be added to the end of the pipeline, and the result displayed within it.
          </p>
          <p>
            You can now add additional steps as required. Each step receives the output from the previous step and transforms
            it, with the end result shown in the last step.
          </p>
          <p>
            Some steps have additional settings such as character encoding or formatting options. These will be shown in
            the box for that step. As you change these settings, the output is updated immediately.
          </p>
          <p>
            Sometimes, a step will be unable to transform the input it receives. For example, the Hex Decode step cannot
            handle text with non-hex characters. An error will be displayed in this step, and later steps will be greyed
            out because they received no input from the broken step. Most errors will have a clear explanation that indicates
            how to fix the problem.
          </p>
        </div>
        <h4><span className="ion-ios-cog-outline"/> <a name="example">MD5 Example</a></h4>
        <div className="guide-section-content">
          <p>
            Let&apos;s say you want to generate the MD5 hash of a string. Enter the string in the Input box. Now select MD5
            from the Hash section of the step selector. This adds the MD5 step to the pipeline.
          </p>
          <p>
            You&apos;ll see the MD5 hash displayed as a hex encoded string, in all lower case e.g. <code>b4d90c13</code>.
            Behind the scenes, the MD5 algorithm produced a byte array, and this site displays it in this simple hex format
            because it&apos;s the most commonly used. If this is the format you want, you&apos;re finished!
          </p>
          <p>
            Now suppose you would like each hex byte prefixed with <code>\x</code>. Add a Hex Encode step from the step
            selector. This receives the byte array from the MD5 step and turns it into a hex string. Initially you&apos;ll
            see the same output in this step because lower case with no prefixes is the default. To add your prefix, enter
            <code>\x</code> in the prefix field. You&apos;ll now see something like <code>\xb4\xd9\x0c\x13</code>.
          </p>
        </div>
        <h4><span className="ion-ios-cog-outline"/> <a name="input">Input Methods</a></h4>
        <div className="guide-section-content">
          <p>
            You can enter the text you want to transform using the following methods. Binary files such as images are also
            supported using the File option.
          </p>
          <h5>Text</h5>
          <p>
            This is the default option. It shows a text box you can type or paste your text into.
            This is ideal for any data you&apos;re working with that can be displayed as text, but may not give you the
            right results if you try pasting data from a binary file such as an image.
          </p>
          <h5>File</h5>
          <p>
            If you have a file you want to transform, click the File tab and import it by dragging and dropping it from
            your computer&apos;s File Explorer (Windows), Finder (Mac) or desktop, or by clicking the file icon to open
            a file picker. The maximum supported file size is 1Mb - importing larger files could make your browser run
            very slowly.
          </p>
          <p>
            Files that can be read as text will be displayed in an editable text box.
          </p>
          <p>
            Files that appear to be binary - for example images - will be imported as a byte array, which can&apos;t
            be edited. Byte arrays are supported by hashing, encryption and some encoding steps. For example, you can
            calculate the MD5 sum of a file by uploading it and selecting the MD5 step, which will give the same result
            as using a command line tool.
          </p>
          <p>
            <strong>Your file is read by your browser, not uploaded to the server.</strong>
          </p>
        </div>
        <h4><span className="ion-ios-cog-outline"/> <a name="encryption">Encryption</a></h4>
        <div className="guide-section-content">
          <p>
            <strong>Cryptography is hard. Really hard.</strong>
          </p>
          <p>
            This site hasn&apos;t been developed or reviewed a professional cryptographer. It runs in an unknown environment
            (your browser) using a random source that may not be secure and a third party library that may have bugs. It
            uses defaults for some options you may want to control.
          </p>
          <p>
            The encryption and decryption steps provided are for information only and should be treated with extreme caution.
            You may be unable to verify the results with other AES sites because most are not transparent about how the
            key and plain text are converted to bytes, how the IV is generated, the padding mode in use and even the key
            size or block mode they use. This site tries to be transparent even though this makes it more complex.
          </p>
          <p>
            <strong>You must do your own research to find the best algorithm and options for your purposes.</strong>
          </p>
        </div>
        <h4><span className="ion-ios-cog-outline"/> <a name="nonprintable">Non Printable Characters</a></h4>
        <div className="guide-section-content">
          <p>
            Some characters have no visible representation, for example null (\x00), delete (\x7F) and beep (\x07).
            These are called control characters. They won&apos;t normally occur in text files and can&apos;t be typed,
            but they will be present if you copy or import a binary file.
          </p>
          <p>
            By default, this site will replace them with &#xfffd; when displaying text, so you can see the characters
            are there. The next step in your pipeline receives the unmodified string including control characters.
            You can add a hex encode step to see the bytes that make up the string.
          </p>
          <p>
            Whitespace characters, including space, tab, carriage return and line feed are considered printable by this
            site, but it can be difficult to distinguish between them. A normal space and non-breaking space look the same
            and a tab can be invisible or look like spaces. A carriage return, a line feed and both together all look
            the same.
          </p>
          <p>
            Your operating system or browser may strip some control characters when you paste text into this site. If
            you think this could corrupt the text you&apos;re pasting in, import a file instead.
          </p>
          <p>
            There are hundreds or thousands of non printable multi-byte unicode characters but there is no special
            handling for them. They are not substituted and may not be visible.
          </p>
        </div>
        <h4><span className="ion-ios-cog-outline"/> <a name="lineendings">Line Endings</a></h4>
        <div className="guide-section-content">
          <p>
            Windows uses CRLF line endings and Unix uses just LF. In a text area, most browsers will display LF, CR,
            and CRLF as a single break so it&apos;s not obvious which form is in use. Additionally, the application
            you&apos;re copying from, your operating system or browser may change the line endings as you copy and paste.
          </p>
          <p>
            If you are working with text that has line endings and it&apos;s important to preserve the correct form,
            you must check that this site has interpreted your pasted or imported text correctly by adding a hex encode
            step, and that results you copy out of it are correct using a hex viewer app.
          </p>
        </div>
        <h4><span className="ion-ios-cog-outline"/> <a name="emoji">Emoji</a></h4>
        <div className="guide-section-content">
          <p>
            <strong>
              Some browsers do not properly support emoji. For example, on Chrome/Linux you may not see any coloured
              emoji in this guide or in the pipeline. That&apos;s a limitation of the browser and not this site.
            </strong>
          </p>
          <p>
            Emoji are fully supported by most transformation steps but you may see some unexpected behaviour due to the
            way they work and how javascript encodes characters.
          </p>
          <p>
            You may notice that string lengths are reported incorrectly if certain emoji are included. For example, the
            red heart emoji <span role="img" aria-label="red heart">&#x2764;&#xFE0F;</span> appears as a single character
            but according to javascript it has a length of 2. This is because it&apos;s actually made up of the black
            heart emoji (<span role="img" aria-label="black heart">&#x2764;</span> - <code>U+2764</code>) followed by
            variation selector 16 (<code>U+FE0F</code>) which turns the heart red.
          </p>
          <p>
            This site doesn&apos;t attempt to interpret multi-character emoji as single characters, because not all browsers
            and other applications interpret emoji the same way, so this would always be error prone. As a result you&apos;ll
            see unexpected string lengths and some steps will corrupt emoji.
          </p>
          <p>
            For example, the String Reverse step will reverse the order of the characters that make up <span role="img" aria-label="red heart">&#x2764;&#xFE0F;</span>,
            producing <span role="img" aria-label="red heart">&#xFE0F;&#x2764;</span> (your browser may not display the
            variation selector). If you have several emoji together, reversing the string may cause them to be combined
            together in unpredictable ways.
          </p>
          <p>
            Most steps such as hashing and encryption are unaffected by this limitation and you simply need to use either
            UTF-8 or UTF-16 where the option is available to ensure emoji are correctly interpreted.
          </p>
          <p>
            For more information, and some insight into why this site doesn&apos;t attempt more advanced handling, take a
            look at <a href="http://blog.jonnew.com/posts/poo-dot-length-equals-two" target="_blank" rel="noopener noreferrer">this excellent article</a>.
          </p>
        </div>
        <h4><span className="ion-ios-cog-outline"/> <a name="combining">Combining Characters</a></h4>
        <div className="guide-section-content">
          <p>
            Combining characters modify the character before them. The most common use of combining characters is to add
            diacritical marks such as accents. For example a lower case <code>a</code> followed by the grave accent
            combining diacritical <code>&#x0300;</code> produces <code>a&#x0300;</code>.
          </p>
          <p>
            Unicode contains many precomposed accented characters which represent the same glyph as a letter plus
            diacritical combination. The accented a as a single character appears as <code>&#xe0;</code>.
          </p>
          <p>
            As with emoji, combining characters can produce unexpected results because they appear to be multiple characters
            but are combined together in one glyph by the browser, which javascript can&apos;t detect. You may see string
            lengths that are inaccurate or string transformations that look corrupt because the combining character now
            appears after a different character.
          </p>
          <p>
            A warning message will be shown if your input may be affected.
          </p>
          <p>
            The following pseudocode examples illustrate some behaviour you might see.
          </p>
          <table>
            <thead>
              <tr>
                <th><code>a</code> + combining character <code>&#x0300;</code></th>
                <th>Single character <code>&#xE0;</code></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>a&#x0300;.length() = 2</code>
                </td>
                <td>
                  <code>&#xE0;.length() = 1</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>a&#x0300;e.reverse() = e&#x0300;a</code>
                </td>
                <td>
                  <code>&#xE0;e.reverse() = e&#xE0;</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>a&#x0300;.replace(&#xE0;, x) = a&#x0300;</code>
                </td>
                <td>
                  <code>&#xE0;.replace(&#xE0;, x) = x</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>a&#x0300;.replace(<span>&#x0300;</span>, x) = ax</code>
                </td>
                <td>
                  <code>&#xE0;.replace(<span>&#x0300;</span>, x) = &#xE0;</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4><span className="ion-ios-cog-outline"/> <a name="security">Security</a></h4>
        <div className="guide-section-content">
          <p>
            You might choose to use this site to prototype or verify encryption or hashing of sensitive data, perhaps
            including production passwords. For this reason, there are no ads, no analytics, no third-party fonts,
            styles or scripts and the content security policy blocks any attempt to load anything from a third-party site.
            All the calculations are run within your browser and nothing you enter is sent to any server including the
            site&apos;s own.
          </p>
          <p>
            <strong>Despite these measures, the security of this site cannot be guaranteed. Never enter production secrets or passwords.</strong>
          </p>
          <p>
            For developers, string-o-matic is open source and is easy to run locally if you have Node installed. This allows
            it to be used with production secrets and passwords, but you are responsible for ensuring the security of your
            development environment. Note that the simple web servers run by <code>react-scripts</code> and <code>serve</code> do
            not send content security policy (CSP) headers or provide SSL support, so by default a local development environment is not
            secure. For the most secure local development environment, follow the instructions for running a local Docker
            container.
          </p>
        </div>
      </div>
    );
  }

}

export default Guide;
