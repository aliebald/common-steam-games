/**
 * Constructs an image url.
 *
 * @param appid Steam AppId
 * @param hash Steam Image Hash
 * @returns Image url
 */
export function getImage(appid: number | string, hash: number | string): string {
  return `https://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`;
}

/**
 * Converts an steam appId to its corresponding steam store url.
 *
 * @param appid Steam appId
 * @returns Steam store url for given appId
 */
export function getStorePage(appid: number | string): string {
  return `https://store.steampowered.com/app/${appid}`;
}

/**
 * Converts a number between 0 and 1 to an percentage with zero to two decimals, removing trailing zeros.
 *
 * @param weight weight between 0 and 1
 * @returns Percentage with max two decimals
 */
export function convertWeightToPercentage(weight: number): string {
  // Get weight as rounded percentage with 2 trailing decimals
  const num = (Math.round(weight * 10000) / 100).toFixed(2);
  // remove trailing zeros using parseFloat
  return `${parseFloat(num)}%`;
}
