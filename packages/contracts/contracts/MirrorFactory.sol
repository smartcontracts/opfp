// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";
import { MirrorNFT } from "./MirrorNFT.sol";

contract MirrorFactory {
    function create(
        address _implementation
    )
        public
        returns (
            MirrorNFT
        )
    {
        MirrorNFT mirror = MirrorNFT(
            Clones.cloneDeterministic(
                _implementation,
                keccak256(abi.encodePacked(msg.sender))
            )
        );
        mirror.init(msg.sender);
        return mirror;
    }
}
