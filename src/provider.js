const ds = require( './shared' ).ds;
const username = require( './shared' ).username;
const rpcname = require( './shared' ).rpcname;

ds.rpc.provide( `${rpcname}/${username}`, ( data, response ) => {
	response.send( `this response is from ${username}` );
});