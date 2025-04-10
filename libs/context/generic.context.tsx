import { Context, useContext } from "react";

/**
 * Generic Context handler to be used in all contexts
 * @param givenContext Context to be used
 * @param contextType Context type
 * @returns Context
 */
export function handleUseContext<T>(givenContext: Context<T>, contextType: string) {
  const context = useContext(givenContext);
  if (!context) {
    throw new Error(`${contextType} must be used within a ${contextType}Provider`);
  }
  return context;
}