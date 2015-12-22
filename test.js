import test from 'ava';
import tempWrite from 'temp-write';
import execa from 'execa';
import fs from 'fs';

test(async t => {
	const data = "<html><link href='//fonts.googleapis.com/css?family=RobotoDraft:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en' rel='stylesheet' type='text/css'></html>";
	const input = tempWrite.sync(data);
	const output = tempWrite.sync('');

	var std = await execa('./cli.js', [input]);
	t.ok(std.stdout.indexOf('@import') > -1);

	await execa('./cli.js', [input, output]);
	t.is(fs.readFileSync(output, 'utf8'), '');

	await execa('./cli.js', [input, output, '--overwrite']);
	t.ok(fs.readFileSync(output, 'utf8').indexOf('@import') > -1);

	await execa('./cli.js', [input, '--overwrite']);
	t.ok(fs.readFileSync(input, 'utf8').indexOf('@import') > -1);
});
