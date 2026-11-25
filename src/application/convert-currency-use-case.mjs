export function createConvertCurrencyUseCase({ fetchExchangeRate }) {
  return async function convertCurrency(amountInput, fromInput, toInput) {
    const amount = Number(amountInput);
    const from = String(fromInput ?? '').trim().toUpperCase();
    const to = String(toInput ?? '').trim().toUpperCase();

    if (!Number.isFinite(amount) || amount <= 0 || !/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to)) {
      return { message: '⚠️ Usage: /convert <amount> <from currency> <to currency> (e.g. /convert 10 USD EUR).', isUserError: true };
    }

    try {
      const rate = from === to ? 1 : (await fetchExchangeRate(from, to)).rate;
      if (!Number.isFinite(rate)) throw new Error('Exchange rate is unavailable');
      return {
        message: `💱 ${amount} ${from} = ${(amount * rate).toFixed(2)} ${to}`,
        isUserError: false,
      };
    } catch {
      return { message: `⚠️ Could not get an exchange rate for ${from} to ${to}.`, isUserError: true };
    }
  };
}
