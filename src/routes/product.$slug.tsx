121 lines

3
03:47:53 

transforming...✓ 222 modules transformed.
03:47:53 
✗ Build failed in 371ms
03:47:53 
error during build:
03:47:53 
Build failed with 1 error:
03:47:53 
03:47:53 
[plugin tanstack-start:route-tree-client-plugin]
03:47:53 
Error: Crawling result not available
03:47:53 
    at LoadPluginContextImpl.handler (file:///vercel/path0/node_modules/@tanstack/start-plugin-core/dist/esm/vite/start-router-plugin/plugin.js:69:32)
03:47:53 
    at async plugin (file:///vercel/path0/node_modules/vite/node_modules/rolldown/dist/shared/bindingify-input-options-ClrST5Xx.mjs:1219:16)
03:47:53 
    at async plugin.<computed> (file:///vercel/path0/node_modules/vite/node_modules/rolldown/dist/shared/bindingify-input-options-ClrST5Xx.mjs:1625:12)
03:47:53 
    at aggregateBindingErrorsIntoJsError (file:///vercel/path0/node_modules/vite/node_modules/rolldown/dist/shared/error-BuvQYXuZ.mjs:48:18)
03:47:53 
    at unwrapBindingResult (file:///vercel/path0/node_modules/vite/node_modules/rolldown/dist/shared/error-BuvQYXuZ.mjs:18:128)
03:47:53 
    at #build (file:///vercel/path0/node_modules/vite/node_modules/rolldown/dist/shared/rolldown-build-CrPk_lZe.mjs:3246:34)
03:47:53 
    at async buildEnvironment (file:///vercel/path0/node_modules/vite/dist/node/chunks/node.js:33253:64)
03:47:53 
    at async Object.build (file:///vercel/path0/node_modules/vite/dist/node/chunks/node.js:33675:19)
03:47:53 
    at async buildStartViteEnvironments (file:///vercel/path0/node_modules/@tanstack/start-plugin-core/dist/esm/vite/planning.js:95:23)
03:47:53 
    at async Object.buildApp (file:///vercel/path0/node_modules/@tanstack/start-plugin-core/dist/esm/vite/plugin.js:113:8)
03:47:53 
    at async Object.buildApp (file:///vercel/path0/node_modules/vite/dist/node/chunks/node.js:33667:6)
03:47:53 
    at async CAC.<anonymous> (file:///vercel/path0/node_modules/vite/dist/node/cli.js:777:3) {
03:47:53 
  errors: [Getter/Setter]
03:47:53 
}
03:47:53 
error: script "build" exited with code 1
03:47:53 
Error: Command "bun run build" exited with 1
