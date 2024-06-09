// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {
    uint constant _initial_supply = 100000000 * (10**18);
    constructor() ERC20("MyToken", "TOKEN") {
        _mint(msg.sender, _initial_supply);
    }
}