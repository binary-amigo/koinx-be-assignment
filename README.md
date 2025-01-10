# Cryptocurrency Tracker  

A Node.js application that fetches, stores, and provides data on cryptocurrencies like Bitcoin, Ethereum, and Matic.  

## Features  

- **Background Job**: Fetches current price, market cap, and 24-hour change of cryptocurrencies every 2 hours using CoinGecko API.  
- **Stats API**: Provides the latest cryptocurrency details upon request.  
- **Deviation API**: Calculates and returns the standard deviation of the cryptocurrency prices from the last 100 records.  

---

## Installation  

### 1. Clone the Repository  

```bash  
git clone https://github.com/yourusername/crypto-tracker.git  
cd crypto-tracker  
```  

### 2. Install Dependencies  

Run the following command to install all required Node.js dependencies:  

```bash  
npm install  
```  

---

## Environment Setup  

### 3. Set Up `.env` File  

Create a `.env` file in the root directory of your project and add the following environment variables:  

```plaintext  
MONGODB_URI=<Your MongoDB Connection String>  
COINGECKO_API=<Your CoinGecko API Key>  
PORT=<Port Number (Optional, default is 5000)>  
```  

Replace `<Your MongoDB Connection String>` with the URI to your MongoDB database.  
You can get CoinGecko API key from [CoinGecko API](https://docs.coingecko.com/v3.0.1/reference/introduction)

---

## Usage  

### 4. Start the Application  

To start the application in development mode, run:  

```bash  
npm run dev  
```  

---

## Endpoints  

### 1. **Stats API**  

- **URL**: `/api/stats`  
- **Method**: `GET`  
- **Query Parameters**:  

  ```json  
  {  
    "coin": "bitcoin" // (Required) Could be one of: bitcoin, matic-network, ethereum  
  }  
  ```  

- **Response Example**:  

  ```json  
  {  
    "price": 40000,  
    "marketCap": 800000000,  
    "change24h": 3.4  
  }  
  ```  

### 2. **Deviation API**  

- **URL**: `/api/deviation`  
- **Method**: `GET`  
- **Query Parameters**:  

  ```json  
  {  
    "coin": "bitcoin" // (Required) Could be one of: bitcoin, matic-network, ethereum  
  }  
  ```  

- **Response Example**:  

  ```json  
  {  
    "deviation": 4082.48  
  }  
  ```  

---

## Folder Structure  

```plaintext  
├── controllers/        # Contains request handling logic  
├── models/             # Contains MongoDB schema definitions  
├── routes/             # Defines application routes  
├── jobs/               # Background job logic for fetching cryptocurrency data  
├── .env                # Environment variables (not included in the repository)  
├── server.js           # Application entry point
├── cronJob.js          # Cron Job Logic  
```  

---
