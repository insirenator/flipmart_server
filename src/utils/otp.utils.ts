export function generateOTP(len: number) {
  let randomOTP = new Array(len).fill(0);

  return randomOTP.map((_) => Math.floor(Math.random() * 10)).join("");
}

/*
  NOTE: You were using round before, that's why it was not working properly
*/
