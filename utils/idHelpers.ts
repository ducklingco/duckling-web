import { customAlphabet } from "nanoid";

export const generateIdWithPrepend = (
  prepend: string,
  totalLength: number,
): string => {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const remainingLength = totalLength - prepend.length;
  const nanoId = customAlphabet(alphabet, remainingLength);
  return `${prepend}${nanoId(remainingLength)}`;
};
