import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  defender: {
    apiKey: process.env.DEFENDER_KEY as string,
    apiSecret: process.env.DEFENDER_SECRET as string,
  },
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia.publicnode.com",
      chainId: 11155111
    },
    'lumio-testnet': {
      url: 'https://testnet.lumio.io',
      accounts: [process.env.WALLET_KEY as string],
      gasPrice: 3000000000,
    },
    },
  defaultNetwork: 'hardhat',
};

export default config;