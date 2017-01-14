import fs from 'fs';
import path from 'path';
import isJpg from 'is-jpg';
import pify from 'pify';
import test from 'ava';
import m from './';

const fsP = pify(fs);

test('optimize a PNG', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures/bees.png'));
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
	const buf1 = await fsP.readFile(path.join(__dirname, 'fixtures/bees.png'));
	const data1 = await m({quality: 84})(buf1);
	const data2 = await m({quality: 95})(buf1);

	t.true(data1.length < data2.length);
});
