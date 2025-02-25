import type { ExchangeRatesToDKK } from "~/types/Currency";
import type { ExchangeRatesAPIBase } from "~/types/ExternalApi";

export const findToDKKFromToEUR = (
  base: string,
  exchangeRates: ExchangeRatesAPIBase["rates"],
): ExchangeRatesToDKK | null => {
  if (base === "EUR") {
    const EURToDKK = exchangeRates.DKK;
    const USDToDKK = EURToDKK / exchangeRates.USD;
    const GBPToDKK = EURToDKK / exchangeRates.GBP;
    return {
      USD: USDToDKK,
      GBP: GBPToDKK,
      EUR: EURToDKK,
    };
  } else {
    return null;
  }
};
/* 
"USD": 1.047554, 7,1184206256
"DKK": 7.459693,
"GBP": 0.828762, 8,9976736385 */
