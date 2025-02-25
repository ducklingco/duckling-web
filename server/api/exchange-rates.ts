import destr from "destr";
import type { ExchangeRatesToDKK } from "~/types/Currency";
import type { ExchangeRatesAPIBase } from "~/types/ExternalApi";
import { findToDKKFromToEUR } from "~/utils/currencyHelpers";

let lastFetch = new Date();
const exchangeRates: ExchangeRatesToDKK = { USD: 7.12, EUR: 7.45, GBP: 9.01 };

const checkIf12HoursHasPassed = () => {
  const now = new Date();
  const diff = now.getTime() - lastFetch.getTime();
  const diffHours = diff / (1000 * 60 * 60);
  return diffHours >= 12;
};
export default defineEventHandler(async (_) => {
  if (checkIf12HoursHasPassed()) {
    return exchangeRates;
  }

  const exchangeRatesApiKey = "23506bde665328ea6486da27c74f0dac";
  const exchangeRatesApiURL = `http://api.exchangeratesapi.io/v1/latest`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const params = new URLSearchParams({
    access_key: exchangeRatesApiKey,
  });

  try {
    const response = await fetch(
      `${exchangeRatesApiURL}?${params.toString()}`,
      options,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const apiResponse = destr<ExchangeRatesAPIBase>(await response.json());
    if (apiResponse.success) {
      const convertedRates = findToDKKFromToEUR(
        apiResponse.base,
        apiResponse.rates,
      );
      if (convertedRates !== null) {
        exchangeRates.USD = convertedRates.USD;
        exchangeRates.EUR = convertedRates.EUR;
        exchangeRates.GBP = convertedRates.GBP;
      }
    }
    lastFetch = new Date();
    return exchangeRates;
  } catch (error) {
    console.error(
      "An error occurred while fetching the exchange rates:",
      error,
    );
    return exchangeRates;
  }
});
