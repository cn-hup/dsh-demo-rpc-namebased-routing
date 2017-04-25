const deepstream = require( 'deepstream.io-client-js' );
const ds = deepstream( 'localhost:6020' );
const argv = require('minimist')(process.argv.slice(2));

if( !argv.username ) { missingOption( 'username' ); }
if( !argv.password ) { missingOption( 'password' ); }
if( !argv.rpcname ) { missingOption( 'rpcname' ); }

function missingOption( name ) {
	throw new Error( `Missing option ${name}
		example call:

		node provider.js --username=providerA --password=aaa --rpcname=rpc-a 
	` );
}

console.log( `Logging in as ${argv.username}` );

ds.on( 'error', error => {
	console.log( `client error: ${error}` );
});

ds.login({
	username: argv.username,
	password: argv.password
}, function( success, data ) {
	if( !success ) {
		console.log( 'Failed to login to deepstream server', arguments );
	} else {
		console.log( 'Connected to deepstream server' );
	}
});

exports.username = argv.username;
exports.ds = ds;
exports.rpcname = argv.rpcname;