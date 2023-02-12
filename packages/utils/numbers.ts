const _currencyFormatters: any = {};
export const STILL_LOADING_SIGN = "-";
/**
 *
 * getCurrencyFormatter
 *
 * generates currency string from number
 * USAGE: currencyFormatter(<currency eg USD>).format(<amount>)
 *
 * @param currency amount ie. 10000
 * @param maxDigits
 * @return currency string ie. $10,000
 **/
export const getCurrencyFormatter = (
  currency: "USD",
  maximumFractionDigits?: number
) => {
  const key =
    maximumFractionDigits !== undefined
      ? `${currency}-${maximumFractionDigits}`
      : currency;
  if (!_currencyFormatters[key]) {
    _currencyFormatters[key] = new Intl.NumberFormat("en-US", {
      style: "currency",
      minimumFractionDigits: 0,
      currency,
      maximumFractionDigits,
    });
  }
  return _currencyFormatters[key];
};

/**
 *
 * formatUsd
 *
 * description: formats number as USD
 * @param amount
 * @return string
 */
export const formatUsd = (amount: string | number) => {
  return getCurrencyFormatter("USD").format(amount);
};

/**
 *
 * formatUsdSafe
 *
 * description: formats number as USD if exists, if not returns STILL_LOADING_SIGN
 * @param amount
 * @return string
 */
export const formatUsdSafe = (amount: string | number | undefined | null) => {
  if (amount === undefined || amount === null) {
    return STILL_LOADING_SIGN;
  }
  return formatUsd(amount);
};

/**
 *
 * formatWithThousandsSeparators
 *
 * returns number sting with thousand serators
 *
 * @param val value ie. 100000000
 * @return string 100,000,000
 **/
export const formatWithThousandsSeparators = (
  val: number | string,
  maxDigits: number = 8
): string => {
  return Number(val).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDigits,
  });
};

/**
 *
 * formatPercentageTwoDecimals
 *
 * returns number sting with thousand serators
 *
 * @param val number or string (0.4235)
 * @return (0.42%)
 **/
export const formatPercentageTwoDecimals = (
  val: string | number | null | undefined
) => {
  if (val === null || val === undefined) {
    return STILL_LOADING_SIGN;
  }
  return `${Number(val).toFixed(2)}%`;
};

/**
 *
 * formatInteger
 *
 * Takes a number, returns formatted it as a string without decimal points
 *
 * @param val number
 * @return string
 */
export const formatInteger = (val: number) => {
  return val.toFixed();
};

/**
 *
 * bytesToSize
 *
 * Takes a number of bytes, returns human readable size
 *
 * @param bytes number
 * @return string
 *
 */
export function bytesToSize(bytes: number): string {
  const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i: number = parseInt(
    Math.floor(Math.log(bytes) / Math.log(1024)).toString()
  );
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}
