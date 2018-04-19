import React, { Component } from 'react';

class Guide extends Component {

  render() {
    return (
      <div className="page">
        <ol className="contents">
          <li><a href="#intro">Introduction</a></li>
          <li><a href="#example">MD5 Example</a></li>
          <li><a href="#input">Input Methods</a></li>
          <li><a href="#nonprintable">Non Printable Characters</a></li>
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
