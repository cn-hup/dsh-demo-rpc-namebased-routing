# rpc-namebased-routing

node src/provider.js --username=providerA --password=aaa --rpcname=rpc-a

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

```bash
node src/provider.js --username=providerA --password=aaa --rpcname=rpc-a
```
