# string-o-matic

There are many great sites for developers that provide hashing, encryption, and string manipulation functions.
Unfortunately most of them don't do the work in the browser with javascript, don't offer a live preview, have
each function on a different page, and don't give a choice of output formats for byte array output.

The aim of this site is to provide all those options in one place. You'll be able to build up a pipeline of
transformation steps that take your input and then process it any way you want to give the desired output.
Want an encrypted value represented as a URL-safe base 64 string with line separators every 80 characters?
No problem. Want your hex string in upper case with commas between each pair? Easy.

This site will also be easy to run locally for developers who want to test encryption and hashing without
entering passwords and secret keys on a website. As there are no server round trips and no analytics or other
libraries included from other sites, this site should be safe for use with sensitive data.

![Preview](docs/preview.png)

### Current status

This project was started in March 2018 and hasn't reached MVP yet. Once it has a basic feature set, pull requests
adding new transformation steps will be very welcome.

### Why name it string-o-matic?

Okay, it's a silly name, but it describes the idea of building a machine that transforms a string in a series of
steps. The .com was available, and that settled the debate.

### MVP Steps

- [x] Hex encode/decode (basic)
- [ ] Hex format - separators, line length, case
- [ ] Base 64 encode/decode (standard)
- [ ] Base 64 character set & line length
- [x] MD5
- [x] SHA1, SHA256, SHA384, SHA512, SHA512/224, SHA512/256
- [ ] BCrypt hash/verify
- [ ] Encrypt/Decrypt (forge algorithms)
- [x] UPPER CASE
- [x] lower case
- [x] esreveR
- [x] URI encode/decode
- [ ] HTML hex encode/decode
- [ ] HTML decimal encode/decode
- [ ] Java/Ruby/Python/C++/Go code

### MVP Features

- [x] Delete step
- [x] Reset text
- [x] Upload file
- [x] Catch exceptions and pass through the chain
- [x] Catch unsupported input and show message
- [x] Better mobile design
- [ ] Reset all
- [ ] Step selector search
- [ ] Default representation for byte array, supply this if next step requires it
- [ ] Handle or reject control characters
- [ ] Handle or reject RTL characters
- [ ] Handle or reject emoji

### v2+ Steps

- [ ] HMAC
- [ ] Split
- [ ] Join
- [ ] Repeat
- [ ] Whitespace trim
- [ ] Line length
- [ ] Title Case
- [ ] snake_case
- [ ] camelCase
- [ ] PascalCase
- [ ] kebab-case
- [ ] Train-Case
- [ ] iNVERSE cASE
- [ ] Remove lines
- [ ] Append, prepend
- [ ] Regex replace
- [ ] Regex match array
- [ ] Crop/Substring
- [ ] JSON escape
- [ ] Array reverse
- [ ] For each in array
- [ ] Bit shift
- [ ] Binary (UTF-8, UTF-16)

### v2+ Server side steps

- [ ] SCrypt, verify

### v2+ Features

- [ ] Optional live/on submit toggle
- [ ] Mandatory on submit for slow async steps (e.g. BCrypt)
- [ ] Make steps collapsible - collapse all steps and show just the names
- [ ] Suggested next step (e.g. byte[] -> base64, hex)
- [ ] Copy to clipboard
- [ ] Highlight whitespace as _, \r, \t etc.
- [ ] Step selector filter by supported input
- [ ] Random input with character group selectors or custom character set
- [ ] Common recipes
- [ ] Export JSON
- [ ] Export as code
- [ ] Download text file
- [ ] Support for server-side steps (e.g. SCrypt, minification) with security warning
- [ ] Link to references for encryption steps, encourage best practice
- [ ] Allow >16 BCrypt rounds if live preview is off

### Other

- [ ] Privacy policy, liability, terms, licence etc.
- [ ] Grab console log and allow errors to be encoded as json and reported with or without input data
- [x] Fork bcryptjs and remove node module references
- [ ] Run standard conversion tests in the user's browser to spot potential bugs
- [ ] Thorough unit tests
- [x] Local fonts only
- [ ] Confirm no cross-domain requests can be made by npm libraries
- [ ] Favicons
- [ ] GitHub link
- [ ] Intro, help
- [ ] Minimal icon font
- [ ] Set header Content-Type: text/html; charset=UTF-8
- [ ] Implement a queue for each step so if input change multiple times during calculation, only the most recent input is calculated
- [ ] Clarify what's UTF-8 and UTF-16, provide meta info

### Dependency notes

**bcryptjs** has a reference to Node's Crypto module which won't resolve in a browser but causes webpack to include node
polyfills or mocks totalling hundreds of kilobytes. The ideal solution is to fork bcryptjs and remove this reference.
Another option is ejecting the project to modify webpack config. As a temporary measure, the minified script is in the
public directory and the unit tests add it to the window object from node_modules.