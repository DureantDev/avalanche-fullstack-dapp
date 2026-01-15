// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    address public owner;
    uint256 private value;

    // Event
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    event ValueUpdated(uint256 oldValue, uint256 newValue);

    // Constructor → dijalankan saat deploy
    constructor() {
        owner = msg.sender;
        emit OwnerSet(address(0), owner);
    }

    // Modifier hanya owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // Set value (hanya owner)
    function setValue(uint256 _value) public onlyOwner {
        uint256 oldValue = value;
        value = _value;
        emit ValueUpdated(oldValue, _value);
    }

    // Get value
    function getValue() public view returns (uint256) {
        return value;
    }
}
