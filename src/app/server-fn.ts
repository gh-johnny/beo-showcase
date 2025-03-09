"use server"

export const serverFn = async (data: boolean) => {
  // should use usecase here
  console.log('from server...', data)
  // service
  // filtraria
  // retornaria
  // {dado1, dado2, dado3}
  return !data
}
