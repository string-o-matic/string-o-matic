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

### To do: Steps

- [ ] Hex
- [ ] Base 64: standard, URL safe, custom
- [x] MD5
- [x] SHA
- [ ] BCrypt, verify
- [ ] HMAC
- [ ] Encryption
- [ ] Decryption
- [x] UPPER CASE
- [x] lower case
- [ ] Title Case
- [ ] snake_case
- [ ] camelCase
- [ ] PascalCase
- [ ] kebab-case
- [ ] Train-Case
- [ ] iNVERSE cASE
- [x] esreveR
- [ ] Repeat
- [ ] Whitespace trim
- [ ] Line length
- [ ] Remove lines
- [ ] Append, prepend
- [ ] Regex replace
- [ ] Regex match array
- [ ] Crop/Substring
- [ ] Split
- [ ] Join
- [ ] URL encode (minimum, all)
- [ ] HTML encode
- [ ] JSON escape
- [ ] Array reverse
- [ ] For each in array
- [ ] Bit shift
- [ ] Binary (bit/little endian?)
- [ ] ASCII safe check or convert

### To do: Server side steps

- [ ] SCrypt, verify

### To do: Features

- [x] Delete step
- [x] Reset text
- [x] Upload file
- [x] Catch exceptions and pass through the chain
- [x] Catch unsupported input and show message
- [x] Better mobile design
- [ ] Reset all
- [ ] Step selector search
- [ ] Step selector filter by supported input
- [ ] Random input with character group selectors or custom character set
- [ ] Common recipes
- [ ] Export JSON
- [ ] Export as code
- [ ] Download text file
- [ ] Default representation for byte array, supply this if next step requires it
- [ ] Make steps collapsible - collapse all steps and show just the names
- [ ] Suggested next step (e.g. byte[] -> base64, hex)
- [ ] Copy to clipboard
- [ ] Highlight whitespace as _, \r, \t etc.
- [ ] Handle or reject control characters
- [ ] Handle or reject RTL characters
- [ ] Handle or reject emoji
- [ ] Optional live/on submit toggle
- [ ] Mandatory on submit for slow async steps (e.g. BCrypt)
- [ ] Support for server-side steps (e.g. SCrypt, minification) with security warning
- [ ] Link to references for encryption steps, encourage best practice

### To do: Other

- [ ] Thorough unit tests
- [x] Local fonts only
- [ ] Confirm no cross-domain requests can be made by npm libraries
- [ ] Favicons
- [ ] GitHub link
- [ ] Intro, help
- [ ] Minimal icon font
