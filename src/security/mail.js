/**
 * Takes an "encrypted" mail address, converts it to a real mail address
 * and opens the mailto link if possible
 * @param {string} encrypted - encrypted mail address written in
 *   lower-case mathematical double struck letters (𝕒-𝕫) and "normal"
 *   characters (all characters with character codes under 122)
 * @returns {void}
 * @author Leonard Goldstein
 * @see {@link https://github.com/goldst/goldst.github.io/blob/7d7e3c3c5eb9563fe83a47f62460e4536b9a3159/js/safety/safety.js}
 */
export default function toMail(encrypted) {
  let decrypted = "";
  for (let i = 0; i < encrypted.length; i++) {
    if (encrypted.charCodeAt(i) > 122) {
      decrypted += String.fromCharCode(
        encrypted.charCodeAt(i + 1) - 56561
      );

      i++;
    } else {
      decrypted += encrypted.charAt(i);
    }
  }
  window.open("mailto:" + decrypted, "_self");
};
