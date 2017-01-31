var functions = [
    {name: 'default', main: require('./../../lib/src-server/default').main },
	{name: 'resource', main: require('./../../lib/src-server/resource').main }
];

module.exports = require('@told/azure-functions-server/lib/src-server/test-main').setDirName(__dirname).serve(functions);