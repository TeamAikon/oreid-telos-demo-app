
/** pads an amount string with decimal places (specified by precision) as needed by EOS chain
/*   e.g. amount:'1', precision:4 = '1.0000'  */
export function toEosAssetPaddedAmount(amount: string, precision?: number): string {
  let amountWithPadding = amount
  if (precision) {
    amountWithPadding = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: precision,
      useGrouping: false,
    }).format(parseFloat(amount))
  }
  return amountWithPadding
}

/** Construct a well-formatted EOS Asset string
 *  amount is a string that must contain the number of precision digits that the token was created with
 *  e.g. '1.0000 EOS' for EOS (4 digits of precision) or '1.00 MYSM' for a token created with 2 decimals of precision */
export function toEosAsset(amount: string, symbol: string, precision?: number): string {
  const amountWithPadding = toEosAssetPaddedAmount(amount, precision)
  const asset = `${amountWithPadding} ${symbol.toUpperCase()}`
  return asset
}
