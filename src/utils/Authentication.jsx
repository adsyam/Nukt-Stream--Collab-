//custom validation function for email and password
export const isValidEmail = (input) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(input)) {
    return false
  }
  return true
}

export const isValidPassword = (input) => {
  if (input.length < 8) {
    return false
  }
  return true
}