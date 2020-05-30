'use strict';
const execBuffer = require('exec-buffer');
const isPng = require('is-png');
const isJpg = require('is-jpg');
const guetzli = require('guetzli');

module.exports = options => buf => {
	options = {...options};

	if (!Buffer.isBuffer(buf)) {
		return Promise.reject(new TypeError('Expected a buffer'));
	}

	if (!isPng(buf) && !isJpg(buf)) {
		return Promise.resolve(buf);
	}

	const args = [];

	if (Number.isInteger(options.quality) && options.quality >= 0 && options.quality <= 100) {
		args.push('--quality', options.quality);
	}

	if (Number.isInteger(options.memlimit) && options.memlimit > 0) {
		args.push('--memlimit', options.memlimit);
	}

	if (options.nomemlimit) {
		args.push('--nomemlimit');
	}

	args.push(execBuffer.input, execBuffer.output);

	return execBuffer({
		input: buf,
		bin: guetzli,
		args
	}).catch(error => {
		error.message = error.stderr || error.message;
		throw error;
	});
};
