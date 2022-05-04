# Board-Games-Results

Saving your results for 7 Wonders games in a simple web based application

[![Build Status](https://travis-ci.org/GorlifSense/Board-Games-Results.svg?branch=master)](https://travis-ci.org/GorlifSense/Board-Games-Results)
[![codecov](https://codecov.io/gh/GorlifSense/Board-Games-Results/branch/master/graph/badge.svg)](https://codecov.io/gh/GorlifSense/Board-Games-Results)
[![Dependency Status](https://www.versioneye.com/user/projects/5797b61474848d002b4b9572/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/5797b61474848d002b4b9572)

## Quickstart

Set `MONGO` environment variable to access your MongoDB.
Instead, default `mongodb://localhost/boardgamesresults` is used.

`npm install`  
`npm start`  

Here it is. You should have running it locally on `http://localhost:3001`

### Demo

You can view application in development mode launched
[here…](https://boardgamesresults.herokuapp.com)

## Development

[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/Fleischers/board-games-results)

Project has guidelines to follow.
Be ready to check output of pre-commit hooks
to keep consistency throughout all files.

We have Continuos Deployment enabled and to avoid broken commits,
`master` branch will be frozen
and all code should be committed to feature branches
or `development`. We would like to follow here common practices
[More on Github Flow…](https://guides.github.com/introduction/flow/)

### Code Quality

[![Issue Count](https://codeclimate.com/github/GorlifSense/Board-Games-Results/badges/issue_count.svg)](https://codeclimate.com/github/GorlifSense/Board-Games-Results)

Use `.editorconfig` for your Code Editor to keep code style.  

Use `npm run beautify -- <filename> -r --type <js|html|css>`
for auto format code.
Replace `<filename>` with file to beautify
and pick `<js|html|css>` language type.
[Read more options…](https://www.npmjs.com/package/js-beautify)

Run `npm run eslint` to check common javascript mistakes.  

Run `npm run csslint` to check common css mistakes.  

Run `npm run remark-lint` to check markdown.
[Read more about rules…](https://github.com/wooorm/remark-lint/blob/master/doc/rules.md)

### API

View `spec/` directory for most recent RAML specification.
[HTML generated version available…](http://gorlifsense.com/Board-Games-Results/)

#### Basic routes

Current routes state are unsecured
and not all error messages included in response

| PATH                       | Description        |
| :-------------             | :-------------     |
| GET /tables                | List of tables     |
| POST /tables               | Create new table   |
| GET /tables/:tableId       | Find table by id   |
| PUT /tables/:tableId       | Edit table by id   |
| DELETE /tables/:tableId    | Delete table by id |

### Tests

`npm test` - to run tests  
Look into `open coverage/lcov-report/index.html` to check coverage report

## Contributing

1. Fork and clone it
2. Install dependencies: `npm install`
3. Create a feature branch: `git checkout -b new-feature`
4. Commit changes: `git commit -am 'Added a feature'`
5. Run unit tests: `npm test`
6. Run static code analysis `npm run eslint`
7. Push to the remote branch: `git push origin new-feature`
8. Create a new [Pull Request](https://github.com/GorlifSense/Board-Games-Results/pull/new/master)

### TODO 

[ ] remove bitHound

## License

Code released under the [ISC license](https://github.com/GorlifSense/Board-Games-Results/blob/master/LICENSE).
