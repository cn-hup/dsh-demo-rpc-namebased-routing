const deepstream = require( 'deepstream.io-client-js' );
const ds = deepstream( 'localhost:6020' );
const argv = require('minimist')(process.argv.slice(2));

if( !argv.username ) {
	throw new Error( 'Missing option username' );
}

if( !argv.password ) {
	throw new Error( 'Missing option password' );
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

ds.rpc.provide( `rpc-a/${argv.username}`, ( data, response ) => {

});