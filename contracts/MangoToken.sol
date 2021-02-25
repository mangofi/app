pragma solidity ^0.6.0;

import "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract MangoToken is ERC20PresetMinterPauser {
    constructor() public ERC20PresetMinterPauser("Mango", "MNGO") {
        _mint(msg.sender, 10000000000000000000000);
    }
    
    function _mintMinerReward() internal {
        _mint(block.coinbase, 1000000000000000000);
    }

    function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual override {
        if (from != address(0)) {
          _mintMinerReward();
        }
        super._beforeTokenTransfer(from, to, value);
    }
    
    function stake(uint256 amount) public {
      transferFrom(msg.sender, address(this), amount)
    }
}