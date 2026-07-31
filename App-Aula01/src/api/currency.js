const API_KEY = process.env.EXPO_PUBLIC_EXCHANGE_API_KEY;

export async function buscarCotacao() {
  try {
    if (!API_KEY) {
      throw new Error(
        "EXPO_PUBLIC_EXCHANGE_API_KEY não foi encontrada no arquivo .env"
      );
    }

    const response = await fetch(
      `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&currencies=USD,EUR&base_currency=BRL`
    );

    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }

    const data = await response.json();

    return {
      dolar: data.data.USD.value,
      euro: data.data.EUR.value,
    };
  } catch (error) {
    console.error("Erro ao buscar cotação:", error);
    return {
      dolar: "--",
      euro: "--",
    };
  }
}