pragma solidity ^0.6.0;

import "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract MangoToken is ERC20PresetMinterPauser {
    struct User {
      uint256 amount;
    }
    
    mapping (uint256 => mapping (address => User)) public users;

    constructor() public ERC20PresetMinterPauser("Mango", "MNGO") {
        _mint(msg.sender, 10000000000000000000000);
    }
    
    function stake(uint256 _amount) public {
      User storage user = users[0][msg.sender];

      if (_amount > 0) {
        user.amount = user.amount.add(_amount);
        approve(msg.sender, _amount);
        allowance(address(this), msg.sender);
        transferFrom(msg.sender, address(this), _amount);
      }
    }
    
    function unstake(uint256 _amount) public {
      User storage user = users[0][msg.sender];
      
      require(user.amount >= _amount, "Insufficient funds to unstake");
      
      if (_amount > 0) {
        user.amount = user.amount.sub(_amount);
        transferFrom(address(this), msg.sender, _amount);
      }
    }
    
    function stakedBalance() public view returns (uint256) {
      User storage user = users[0][msg.sender];

      return user.amount;
    }
}