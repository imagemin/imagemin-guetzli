'use strict';
const execBuffer = require('exec-buffer');
const isPng = require('is-png');
const isJpg = require('is-jpg');
const guetzli = require('guetzli');

module.exports = opts => buf => {
	opts = Object.assign({}, opts);

	if (!Buffer.isBuffer(buf)) {
		return Promise.reject(new TypeError('Expected a buffer'));
	}

	if (!isPng(buf) && !isJpg(buf)) {
		return Promise.resolve(buf);
	}

	const args = [];

	if (opts.quality) {
		args.push('--quality', opts.quality);
	}

	args.push(execBuffer.input, execBuffer.output);

	return execBuffer({
		input: buf,
		bin: guetzli,
		args
	}).catch(err => {
		err.message = err.stderr || err.message;
		throw err;
	});
};
