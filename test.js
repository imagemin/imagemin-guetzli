import fs from 'fs';
import path from 'path';
import isJpg from 'is-jpg';
import pify from 'pify';
import test from 'ava';
import m from './';

const fsP = pify(fs);

test('optimize a PNG', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures/test.png'));
	const data = await m()(buf);

	t.true(data.length < buf.length);
	t.true(isJpg(data));
});

test('skip optimizing a non-PNG/JPG file', async t => {
	const buf1 = await fsP.readFile(__filename);
	const data1 = await m()(buf1);

	t.deepEqual(data1, buf1);
});

test('check if --quality flag works', async t => {
	const buf2 = await fsP.readFile(path.join(__dirname, 'fixtures/test.png'));
	const data2 = await m({quality: 84})(buf2);
	const data3 = await m({quality: 95})(buf2);

	t.true(data2.length < data3.length);
});
