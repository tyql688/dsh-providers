/** Human text for a failure, without leaking a stack into a UI or an HTTP body. */
export declare function errorMessage(error: unknown): string;
/**
 * A refusal the client caused. The HTTP layer answers it 400 rather than 500,
 * so a validation message reads as "fix the input", not "the Host broke".
 */
export declare class BadRequest extends Error {
}
