import { ethers } from "hardhat";

async function main() {
  const token = await ethers.deployContract('MyERC20', { gasLimit: 1000000 });
  await token.waitForDeployment();
  console.log(`MyToken contract deployed at ${token.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});