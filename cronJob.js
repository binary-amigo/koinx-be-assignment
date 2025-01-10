const cron = require("node-cron");
const Crypto = require("./models/Crypto");

const getCryptoData = async (coin) => {
  const url = `https://api.coingecko.com/api/v3/coins/${coin}`;
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.COIN_GECKO_API_KEY,
      },
    };

    const data = await fetch(url, options)
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return {
      coin: data.id,
      price: data.market_data.current_price.usd,
      marketCap: data.market_data.market_cap.usd,
      change24h: data.market_data.price_change_24h,
    };
  } catch (error) {
    console.error(`Error fetching data for ${coin}:`, error);
    return null;  // If error occurs, return null
  }
};

const saveCryptoData = async () => {
  try {
    // Fetch data for all coins
    const coins = ["bitcoin", "matic-network", "ethereum"];
    const dataPromises = coins.map((coin) => getCryptoData(coin));
    
    // Wait for all data to be fetched
    const dataResults = await Promise.all(dataPromises);

    // Filter out any null results in case of errors
    const validData = dataResults.filter((data) => data !== null);

    // Insert all valid data in one bulk operation
    if (validData.length > 0) {
      await Crypto.insertMany(validData);
      console.log(`Data for ${validData.length} coins saved to database`);
    } else {
      console.log('No valid data to save');
    }
  } catch (error) {
    console.error('Error saving data to database:', error);
  }
};

// Run the save function for the first time
saveCryptoData();

// Background job to fetch and save data every 2 hours
cron.schedule('0 */2 * * *', saveCryptoData);
