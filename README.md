# Board-Games-Results

Saving results for 7 Wonders games

[![Build Status](https://travis-ci.org/GorlifSense/Board-Games-Results.svg?branch=master)](https://travis-ci.org/GorlifSense/Board-Games-Results)
[![bitHound Overall Score](https://www.bithound.io/github/GorlifSense/Board-Games-Results/badges/score.svg)](https://www.bithound.io/github/GorlifSense/Board-Games-Results)
[![Issue Count](https://codeclimate.com/github/GorlifSense/Board-Games-Results/badges/issue_count.svg)](https://codeclimate.com/github/GorlifSense/Board-Games-Results)
[![codecov](https://codecov.io/gh/GorlifSense/Board-Games-Results/branch/master/graph/badge.svg)](https://codecov.io/gh/GorlifSense/Board-Games-Results)

## Quickstart

Set `MONGO` environment variable to access MongoDB.
Instead, default `mongodb://localhost/boardgamesresults` is used.

`npm install`  
`npm start`  

Here it is. You should have running it locally on `http://localhost:3000`

### Demo

You can view application in development mode launched
[here...](https://boardgamesresults.herokuapp.com)

## Development

Project has guidelines to follow.
Be ready to check output of pre-commit hooks
to keep consistency throughout all files.

We have Continuos Deployment enabled and to avoid broken commits,
`master` branch will be frozen
and all code should be committed to feature branches
or `development`. We would like to follow here common practices
[More on Github Flow...](https://guides.github.com/introduction/flow/)

## Code Quality

Use `.editorconfig` for your Code Editor to keep code style.  

Use `npm run beautify -- <filename> -r --type <js|html|css>`
for auto format code.
Replace `<filename>` with file to beautify
and pick `<js|html|css>` language type.
[Read more options...](https://www.npmjs.com/package/js-beautify)

Run `npm run eslint` to check common javascript mistakes.  

Run `npm run csslint` to check common css mistakes.  

Run `npm run remark-lint` to check markdown.
[Read more about rules](https://github.com/wooorm/remark-lint/blob/master/doc/rules.md)

### API

View `spec/` directory for RAML specification

### Tests

`npm test` - to run tests  
Look into `open coverage/lcov-report/index.html` to check coverage report
