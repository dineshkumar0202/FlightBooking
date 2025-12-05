export const isEmail = (value) =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(String(value).toLowerCase())
