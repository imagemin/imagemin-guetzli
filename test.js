const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const isJpg = require('is-jpg');
const test = require('ava');
const m = require('.');

const readFile = promisify(fs.readFile);
let buf;

test.before(async () => {
	buf = await readFile(path.join(__dirname, 'fixtures/test.jpg'));
});

test('optimize a JPG', async t => {
	const data = await m()(buf);

	t.true(data.length < buf.length);
	t.true(isJpg(data));
});

test('skip optimizing a non-PNG/JPG file', async t => {
	const buf = await readFile(__filename);
	const data = await m()(buf);

	t.deepEqual(data, buf);
});

test('check if --quality flag works', async t => {
	await t.notThrowsAsync(async () => {
		await m({quality: 85})(buf);
	});
});
