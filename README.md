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

The features planned for MVP can be found on the [MVP project page](https://github.com/string-o-matic/string-o-matic/projects/1).

The [After MVP](https://github.com/string-o-matic/string-o-matic/projects/2) project lists planned future features. If
you have a feature request that isn't on either project board, please open an issue!

### Development setup

This project is bootstrapped with [create-react-app](https://github.com/facebook/create-react-app) so all you need to
run it is Node >= 8. Earlier versions may also work but haven't been tested.

Clone the project and run `npm install` then `npm start` to start developing locally. SCSS files are watched and
compiled as you work, and new styles loaded by the browser without refreshing the page.

Please refer to the documentation for create-react-app for more details.

Run in development mode with live reload:

    npm start

Run tests:

    npm test

Run SASS-lint:

    npm run lint-css

Run webpack bundle analyzer:

    npm run analyze

Run a production build including all tests:

    npm run build

### Test production build

To test the site with production nginx configuration and ensure that minification does not break anything, use Docker
to wrap the production build. The following steps will compile the app, then build and launch an nginx Docker container
that serves it with all the security and caching headers required. Self-signed certificates for localhost are provided.

    npm run build
    docker build --tag string-o-matic .
    docker run --name string-o-matic --rm -p 8000:80 -p 8443:443 string-o-matic

Now browse to https://localhost:8443/ and click through the security warning. If necessary, change the port mappings to
avoid conflicts with other services you have running.

### License

MIT

Copyright (c) 2018 David Morrissey