import fs from 'fs';
import path from 'path';
import isJpg from 'is-jpg';
import pify from 'pify';
import test from 'ava';
import m from '.';

const fsP = pify(fs);
let buf;

test.before(async () => {
	buf = await fsP.readFile(path.join(__dirname, 'fixtures/test.jpg'));
});

test('optimize a JPG', async t => {
	const data = await m()(buf);

	t.true(data.length < buf.length);
	t.true(isJpg(data));
});

test('skip optimizing a non-PNG/JPG file', async t => {
	const buf = await fsP.readFile(__filename);
	const data = await m()(buf);

	t.deepEqual(data, buf);
});

test('check if --quality flag works', async t => {
	await t.notThrowsAsync(async () => {
		await m({quality: 85})(buf);
	});
});
