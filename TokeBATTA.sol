/* Token ERC1155 - Smart Contract - Created by Sebastián Battagliola */
/* SPDX-License-Identifier: GPL-3.0 */
    
/* Compilar en 0.8.19 desde remix por version cancun */
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Token is ERC1155 {
    address public owner;           
    string public name;             
    string public symbol;           
    uint256 public decimals;        
    uint256 private _totalSupply;   

    mapping (address => uint256) private _balances;                         
    mapping (address => mapping (address => uint256)) private _allowed;     
    
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint128 _initialTotalSupply) ERC1155("https://imgur.com/a/fpYv3N8/{id}.json") {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        _totalSupply = _initialTotalSupply;
        _balances[owner] = _totalSupply;
        emit TransferSingle(msg.sender, address(0), owner, 1, _totalSupply);
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return _balances[_owner];
    }

    function allowance(address _owner, address spender) public view returns (uint256) {
        return _allowed[_owner][spender];
    }

    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    function transfer(address to, uint256 value) public returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        _transfer(from, to, value);
        _approve(from, msg.sender, _allowed[from][msg.sender] - value);
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowed[msg.sender][spender] + addedValue);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowed[msg.sender][spender] - subtractedValue);
        return true;
    }

    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0));

        _balances[from] -= value;
        _balances[to] += value;
        emit TransferSingle(msg.sender, from, to, 1, value);
    }

    function _approve(address _owner, address spender, uint256 value) internal {
        require(spender != address(0));
        require(owner != address(0));

        _allowed[_owner][spender] = value;
        emit ApprovalForAll(_owner, spender, true);
    }
}
