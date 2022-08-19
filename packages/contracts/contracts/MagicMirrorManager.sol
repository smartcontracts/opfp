// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title MagicMirrorManager
 * @notice MagicMirrorManager is a contract meant to be deployed on the network where the NFTs to
 *         be mirrored currently exist. Users can select one NFT to act as the mirrored NFT and can
 *         update this NFT by sending a transaction to the MagicMirrorManager.
 */
contract MagicMirrorManager {
    /**
     * @notice Token and token ID to mirror.
     */
    struct MirroredNFT {
        ERC721 token;
        uint256 id;
    }

    /**
     * @notice Mapping of addresses to their mirrored NFTs.
     */
    mapping (address => MirroredNFT) mirror;

    /**
     * @notice Updates the sender's mirrored NFT.
     *
     * @param _nft New NFT to mirror.
     */
    function setMirroredNFT(MirroredNFT memory _nft) public {
        require(
            address(_nft.token) != address(0),
            "MagicMirrorManager: token cannot be address(0)"
        );

        require(
            _nft.token.ownerOf(_nft.id) == msg.sender,
            "MagicMirrorManager: sender does not own this NFT"
        );

        mirror[msg.sender] = _nft;
    }

    /**
     * @notice Retrieves the mirrored NFT for a given address.
     *
     * @param _owner Address to retrieve a mirrored NFT for.
     *
     * @return Mirrored NFT for the given address.
     */
    function getMirroredNFT(address _owner) public view returns (MirroredNFT memory) {
        MirroredNFT memory nft = mirror[_owner];

        require(
            address(nft.token) != address(0),
            "MagicMirrorManager: sender has not set a mirrored NFT"
        );

        require(
            nft.token.ownerOf(nft.id) == _owner,
            "MagicMirrorManager: sender does not own this NFT"
        );

        return nft;
    }
}
