const ds = require( './shared' );

ds.rpc.provide( `${ds.rpcname}/${ds.username}`, ( data, response ) => {
	response.send( `this response is from ${ds.username}` );
});