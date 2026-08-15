//#region src/errors.ts
/** Human text for a failure, without leaking a stack into a UI or an HTTP body. */
function errorMessage(error) {
	return error instanceof Error ? error.message : String(error);
}
/**
* A refusal the client caused. The HTTP layer answers it 400 rather than 500,
* so a validation message reads as "fix the input", not "the Host broke".
*/
var BadRequest = class extends Error {};

//#endregion
export { errorMessage as n, BadRequest as t };
//# sourceMappingURL=errors-J0NwkhsH.js.map