const ds = require( './shared' ).ds;
const username = require( './shared' ).username;
const rpcname = require( './shared' ).rpcname;
const target = require( './shared' ).target;

ds.rpc.make( `${rpcname}/${target}`, {}, ( err, data ) => {
	if( err ) {
		console.log( 'received error', err );
	} else {
		console.log( 'received response', data );
	}
});