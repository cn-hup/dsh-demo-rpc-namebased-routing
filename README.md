# Secure namebased routing for Remote Procedure Calls
The following shows an example of how the same RPC can be securely provided by multiple endpoints distuingished by their name. It allows for two RPCs (`rpc-a` and `rpc-b` ) provided by three providers ( `providerA`, `providerB` and `providerC` ). A client requests them as.

```javascript
ds.rpc.make( 'rpc-a/providerA', {}, ( error, data ) => {/*...*/})
ds.rpc.make( 'rpc-b/providerC', {}, ( error, data ) => {/*...*/})
//...etc
```

Which provider can specify which RPC is specified in the [users.yml file](conf/users.yml):

```yaml
providerA:
  password: "aaa"
  serverData:
    isProvider: true
    allowedRpcs:
      - "rpc-a"
providerB:
  password: "bbb"
  serverData:
    isProvider: true
    allowedRpcs:
      - "rpc-b"
providerC:
  password: "ccc"
  serverData:
    isProvider: true
    allowedRpcs:
      - "rpc-a"
      - "rpc-b"
clientA:
  password: "ccc"
  serverData:
    isProvider: false
```

This configuration is enforced by [file based authentication](https://deepstream.io/tutorials/core/auth-file/) using a single [Valve](https://deepstream.io/tutorials/core/permission-conf-simple/) rule stored in [permissions.yml](conf/permissions.yml)

```yaml
  "*":
    provide: false
    request: false
  "$rpcName/$endpointId":
    provide: "
      user.data.isProvider === true &&
      user.data.allowedRpcs.indexOf( $rpcName ) > -1 &&
      $endpointId === user.id"
    request: true
```

The first entry denies all RPCs by default. The second rule specifies three requirements for a process to provde an RPC:

- `user.data.isProvider === true` the `isProvider` flag in the serverData section needs to be true for any RPC to be provided
- `user.data.allowedRpcs.indexOf( $rpcName ) > -1` the rpc needs to be in the list of allowedRpcs
- `$endpointId === user.id` the endpointId needs to be the name the provider is logged in as

Running these examples results in the following:

![Console Output](https://raw.githubusercontent.com/deepstreamIO/dsh-demo-rpc-namebased-routing/master/console-outout.jpg)

## Running the examples: Server

### Windows
[Download the latest windows executable for deepstream.io](https://deepstream.io/install/windows/) and unzip it in a folder called `deepstream` in this directory, then run:
```bash
.\deepstream\deepstream.exe start -c conf\config.yml
```

### Linux
Follow the [installation instructions for your Linux distribution](https://deepstream.io/install/) and run

```bash
deepstream start -c ./conf/config.yml
```

## Running the examples: Client
Clone this repository and run `npm install`.

To run a provider:

```bash
node src/provider.js --username=providerA --password=aaa --rpcname=rpc-a
```

To run a client

```bash
node src/client.js --username=clientA --password=ccc --rpcname=rpc-b --target=providerB
```
