"use server"

export const serverFn = async (data: unknown) => {
  // should use usecase here
  console.log('from server...', data)
}
