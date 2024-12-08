"use server"

export const serverFn = async (data: boolean) => {
  // should use usecase here
  console.log('from server...', data)
  return !data
}
