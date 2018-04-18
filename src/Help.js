import React, { Component } from 'react';

class Help extends Component {

  render() {
    return (
      <div className="page">
        <h4><span className="ion-ios-cog-outline"/> Mission statement</h4>
        <p>
          You may have used a variety of websites that allow you to hash, encrypt, encode, cipher or transform strings.
          Many of these sites have a single function on each page, don&apos;t update as you type, and don&apos;t give
          you any formatting options. Perhaps you want URL-safe base64, or hex with a space between each pair.
          Often it&apos;s necessary to use multiple sites to achieve simple goals like encrypting a string and encoding
          the result as hex.
        </p>
        <p>
          The goal of string-o-matic is to provide a variety of useful string transformation tools on a single page, with
          powerful output options and a modular design that allows you to compose a complex string transformation from a
          series of steps. This is called a pipeline, and it&apos;s the inspiration behind the name.
        </p>
        <p>
          This is an open source project. Suggestions and pull requests from the developer community are welcome.
        </p>
        <h4><span className="ion-ios-cog-outline"/> Basic usage</h4>
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
        <h4><span className="ion-ios-cog-outline"/> Example</h4>
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
        <h4><span className="ion-ios-cog-outline"/> Input options</h4>
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
        <h4><span className="ion-ios-cog-outline"/> Security</h4>
        <p>
          You might choose to use this site to prototype or verify encryption or hashing of sensitive data, perhaps
          including production passwords. For this reason, there are no ads, no analytics, no third-party fonts,
          styles or scripts and the content security policy blocks any attempt to load anything from a third-party site.
          All the calculations are run within your browser and nothing you enter is sent to any server including the
          site&apos;s own.
        </p>
        <p>
          Despite these measures, please observe the following disclaimer.
        </p>
        <p>
          <strong>
            Disclaimer: The security of this site cannot be guaranteed. Never enter production secrets or passwords.
          </strong>
        </p>
        <p>
          For developers, string-o-matic is open source and is easy to run locally if you have Node installed. This allows
          it to be used with production secrets and passwords, but you are responsible for ensuring the security of your
          environment. See <a href="https://github.com/davemorrissey/string-o-matic" target="_blank" rel="noopener noreferrer">GitHub</a> for information.
        </p>
      </div>
    );
  }

}

export default Help;
