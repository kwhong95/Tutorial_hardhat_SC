import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { contracts } from '../typechain-types';

const name = "MyToken";
const symbol = "MTK";
const decimals = 18;

describe("Start Example ERC20 test", async () => {
  let exErc20: contracts.MyERC20;

  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let amount: number;

  it('Set data for exampleERC20 test', async () => {
    amount = 100;
    [owner, addr1, addr2] = await ethers.getSigners(); // get a test address
    });

  describe('Test Example ERC20 Metadata', () => {
    it('Should get correct name, symbol, decimal for the Example ERC20 Contract', async () => {
      const ExampleERC20Factory = await ethers.getContractFactory('MyERC20');
      exErc20 = await ExampleERC20Factory.deploy();
      await exErc20.waitForDeployment();
      expect(await exErc20.name()).to.equal(name);
      expect(await exErc20.symbol()).to.equal(symbol);
      expect(await exErc20.decimals()).to.equal(decimals);
    });
  });

  
  describe('Test Transfer exampleERC20', () => {
    it('Should get correct MetaData for the Example ERC20 Contract', async () => {
      await expect(exErc20.mint(addr1.address, ethers.toBigInt(amount)))
        .to.emit(exErc20, 'Transfer')
        .withArgs(ethers.ZeroAddress, addr1.address, ethers.toBigInt(amount));
      expect(await exErc20.totalSupply()).to.equal(ethers.toBigInt(amount));
      expect(await exErc20.balanceOf(addr1.address)).to.equal(ethers.toBigInt(amount));
    });
  });

  describe('Test Approval exampleERC20', () => {
    it('should get approved for the Example ERC20 Contract', async () => {
      await expect(exErc20.connect(addr1).approve(addr2.address, ethers.toBigInt(amount)))
        .to.emit(exErc20, 'Approval')
        .withArgs(addr1.address, addr2.address, ethers.toBigInt(amount));
      expect(await exErc20.allowance(addr1.address, addr2.address)).to.equal(ethers.toBigInt(amount));
    });
  });

  describe('Test TransferFrom ExampleERC20', () => {
    it('Example ERC20 Contract should have erc20 token after TransferFrom', async () => {
      await expect(exErc20.connect(addr2).transferFrom(addr1.address, owner.address, ethers.toBigInt(amount)))
        .to.emit(exErc20, 'Transfer')
        .withArgs(addr1.address, owner.address, ethers.toBigInt(amount));
      expect(await exErc20.balanceOf(owner.address)).to.equal(ethers.toBigInt(amount));
    });
  });

  describe('Test burn exampleERC20', () => {
    it('Example ERC20 Contract should burn erc20 token clearly', async () => {
      await expect(exErc20.burn(owner, ethers.toBigInt(amount)))
        .to.emit(exErc20, 'Transfer')
        .withArgs(owner.address, ethers.ZeroAddress, ethers.toBigInt(amount));
      expect(await exErc20.balanceOf(owner.address)).to.equal(0);
    });
  });
})