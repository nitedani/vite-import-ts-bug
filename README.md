# vite-import-ts-bug

This is a pnpm workspace, related: https://turborepo.com/posts/you-might-not-need-typescript-project-references
With vite2, the method in the article works. With vite3, we get an error, but we can make it work. This repository contains experiments to reproduce the error.

In the packages/package folder, there is a minimal, internal typescript dependency, meant to be consumed by other applications in the workspace. 
The dependency is not transpiled/bundled, it is imported in the apps/app application as typescript code.

The dependency is imported in the apps/app application, on the server side, in the default page render function.

To reproduce the error:
1. go to the "vavite-vite3-not-working" branch
2. cd /apps/app
3. pnpm install
4. pnpm dev
5. open in the browser to get

`TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"`

It seems that replacing a few things in the package.json fixes the issue:
 - In case we are using vite3 as a middleware:
    - replacing `ts-node ./server` in the dev script with `node --loader ts-node/esm ./server` fixes the issue.
 - In case we are using vavite with vite3:
    - replacing `vite --open` in the dev script with `node --loader ts-node/esm node_modules/vite/bin/vite --open` fixes the issue.

Branches:
---
vite2:
---
  With vite2, there are 2 working branches. The imported depencency is working as expected with vite2:
  - vavite-vite2-working - uses [this](https://github.com/cyco130/vavite/tree/main/examples/vite-plugin-ssr) example, with a few modifications:
    1. modified two dependency versions(`vite@3`->`vite@2`, `@vitejs/plugin-react@2`->`@vitejs/plugin-react@1`)
  - vps-working-vite2 - uses [this](https://github.com/brillout/vite-plugin-ssr/blob/main/boilerplates/boilerplate-react-ts) example
  
vite3:
---
  What's working:  
   - vite3-working - a minimal example using vite ssr and react, with a few modifications:
      1. replaced `ts-node server"` in the dev script with `node --loader ts-node/esm server.ts`
   - vps-working-vite3 - uses [this](https://github.com/brillout/vite-plugin-ssr/blob/main/boilerplates/boilerplate-react-ts) example, with a few modifications:
      1. modified two dependency versions(`vite@2`->`vite@3`, `@vitejs/plugin-react@1`->`@vitejs/plugin-react@2`)
      2. replaced the "server" script from `ts-node ./server` to `node --loader ts-node/esm ./server`   
   - vavite-vite3-working - uses [this](https://github.com/cyco130/vavite/tree/main/examples/vite-plugin-ssr) example, with a few modifications:
      1. replaced `vite --open` in the dev script with `node --loader ts-node/esm node_modules/vite/bin/vite --open`
   
  What's not working:  
   - vite3-not-working - a minimal example using vite ssr and react
   - vavite-vite3-not-working - uses [this](https://github.com/cyco130/vavite/tree/main/examples/vite-plugin-ssr) example
   - vps-not-working-vite3 - uses [this](https://github.com/brillout/vite-plugin-ssr/blob/main/boilerplates/boilerplate-react-ts) example, with a few modifications:
      1. modified two dependency versions(`vite@2`->`vite@3`, `@vitejs/plugin-react@1`->`@vitejs/plugin-react@2`)
  
