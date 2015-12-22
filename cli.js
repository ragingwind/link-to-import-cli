#!/usr/bin/env node

'use strict';

var meow = require('meow');
var linkToImport = require('link-to-import');
var path = require('path');
var fs = require('fs');

var cli = meow([
	'Usage',
	'  $ link-to-import-cli [input] <output> <options>',
	'',
	'',
	'Options',
	'  --overwrite Overwrite a file. input file will be overwritten if ouput is not set',
	'',
	'Examples',
	'  $ link-to-import app/bower_components/font-roboto/roboto.html > roboto.html',
	'  $ link-to-import app/bower_components/font-roboto/roboto.html roboto.html',
	'  $ link-to-import app/bower_components/font-roboto/roboto.html --overwrite'
]);

if (cli.input.length < 0) {
	cli.showHelp(-1);
}

function readFile(file) {
	return fs.readFileSync(path.resolve(process.cwd(), file), 'utf8');
}

function writeFile(file, data) {
	return fs.writeFileSync(path.resolve(process.cwd(), file), data, 'utf8');
}

function existFile(file) {
	return fs.lstatSync(path.resolve(process.cwd(), file)).isFile();
}

var tack = linkToImport(readFile(cli.input[0]));

if (tack) {
	if (!cli.input[1] && cli.flags.overwrite) {
		writeFile(cli.input[0], tack.html);
	} else if (cli.input[1] && (!existFile(cli.input[1]) || cli.flags.overwrite)) {
		writeFile(cli.input[1], tack.html);
	} else {
		console.log(tack.html);
	}
}
