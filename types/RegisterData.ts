export type registerInfo = {
  name: string,
  email: string,
  password: string,
}

export type loginInfo = {
  email: string,
  password: string,
}

export type imageResponse = {
  id: number, 
  height: number,
  width: number, 
  encodedData: string 
}