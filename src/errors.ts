/** Human text for a failure, without leaking a stack into a UI or an HTTP body. */
export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}
