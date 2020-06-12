export function randomStr(length: number = 11) {
  let str = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    str += characters.charAt(Math.round(Math.random() * charactersLength));
  }

  return str;
}
