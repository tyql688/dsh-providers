//#region src/errors.ts
/** Human text for a failure, without leaking a stack into a UI or an HTTP body. */
function errorMessage(error) {
	return error instanceof Error ? error.message : String(error);
}

//#endregion
export { errorMessage as t };
//# sourceMappingURL=errors-CHMfc6Mk.js.map