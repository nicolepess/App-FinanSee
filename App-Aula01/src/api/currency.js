const API_KEY = process.env.EXPO_PUBLIC_CURRENCY_API_KEY;

export async function buscarCotacao() {
  try {
    const response = await fetch(
      `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&currencies=USD,EUR&base_currency=BRL`
    );

    const data = await response.json();

    return {
      dolar: data.data.USD.value,
      euro: data.data.EUR.value,
    };
  } catch (error) {
    console.log(error);
  }
}