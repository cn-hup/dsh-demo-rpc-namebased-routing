const ds = require( './shared' );

ds.rpc.make( `${ds.rpcname}/${ds.username}`, {}, ( err, data ) => {
	if( err ) {
		console.log( 'received error', err );
	} else {
		console.log( 'received response', data );
	}
});