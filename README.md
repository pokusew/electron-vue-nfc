# electron-vue-nfc

[Electron](https://electronjs.org/) + [Vue](https://vuejs.org/) + [nfc-pcsc](https://github.com/pokusew/nfc-pcsc)

**Note**: requires Node.js >= 9 and [Yarn](https://yarnpkg.com/)


## Install

First, clone the repo via git:

```bash
git clone https://github.com/pokusew/electron-vue-nfc.git
```

Then, cd into repo dir and install dependencies with Yarn:

```bash
cd electron-vue-nfc && yarn
```

Finally, rebuild  Note Native Modules (nfc-pcsc) using this command:
```bash
yarn run rebuild
```


## Run

Run this two commands __simultaneously__ in different console tabs.

```bash
yarn run hot-server
yarn run start-hot
```

**If you install new dependencies,
you have to rebuild Note Native Modules (nfc-pcsc) against Electron's Node.js version.**  
Run the following command:
```bash
yarn run rebuild
```

## Build

Build main and renderer with:
```bash
yarn run build
```

Start built version:
```bash
yarn run start
```


## Package and release

TODO
