export const assert: (value: unknown) => asserts value = (value) => {
  if (!value) {
    throw new Error('Asserted falsy value')
  }
}
