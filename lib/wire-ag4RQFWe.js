//#region src/wire.ts
/**
* The HTTP contract between this plugin's Host half and its browser half.
*
* dsh's API gateway method table is closed to out-of-tree plugins, so the Host
* registers its own routes on `ctx.webServer` and the browser half fetches
* them same-origin. Both halves ship from this package and inline this file,
* so the contract has one source instead of two kept in sync.
*/
/**
* Prefix every route of this plugin lives under.
*
* Deliberately NOT under `/plugins/<package>`: the client-module registry owns
* `/plugins` and serves this package's browser bundle at
* `/plugins/dsh-providers/client.js`. The webserver matches the longest
* prefix, so a route there would capture that request and answer JS with JSON.
*/
const PROVIDERS_ROUTE_PREFIX = "/dsh-providers";

//#endregion
export { PROVIDERS_ROUTE_PREFIX as t };
//# sourceMappingURL=wire-ag4RQFWe.js.map