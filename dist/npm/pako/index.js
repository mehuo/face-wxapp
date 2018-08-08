// Top level file is just a mixin of submodules & constants
'use strict';

var assign    = require('./lib/utils/common.js').assign;

var deflate   = require('./lib/deflate.js');
var inflate   = require('./lib/inflate.js');
var constants = require('./lib/zlib/constants.js');

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;
