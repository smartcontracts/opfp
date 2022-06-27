// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { ERC721Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract MirrorNFT is OwnableUpgradeable, ERC721Upgradeable {
    struct MirroringParams {
        uint256 chain;
        address token;
        uint256[] ids;
    }

    mapping (uint256 => uint256) public nfts;

    function init(
        address _owner
    )
        public
        initializer
    {
        __ERC721_init("Mirror NFT", "OPFP");
        _transferOwnership(_owner);
    }

    function mirror(
        MirroringParams[] memory _params
    )
        public
        onlyOwner
    {
        address owner = owner();
        uint256 index = balanceOf(owner);
        for (uint256 i = 0; i < _params.length; i++) {
            MirroringParams memory params = _params[i];
            uint256 chain = params.chain;
            address token = params.token;
            for (uint256 j = 0; j < params.ids.length; j++) {
                uint256 id;
                assembly {
                    id := index
                    id := or(id, shl(64,  token))
                    id := or(id, shl(224, chain))
                }

                nfts[id] = params.ids[j];
                _mint(owner, id);
                index++;
            }
        }
    }

    function tokenURI(
        uint256 _tokenId
    )
        public
        override
        view
        returns (
            string memory
        )
    {
        uint256 id = nfts[_tokenId];
        uint256 token;
        uint256 chain;
        assembly {
            token := and(shr(64,  _tokenId), 0x000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF)
            chain := and(shr(224, _tokenId), 0x000000000000000000000000000000000000000000000000FFFFFFFFFFFFFFFF)
        }

        return string(
            abi.encodePacked(
                "https://opfp.ngrok.io/api/mirror/uri/",
                Strings.toString(chain),
                "/",
                Strings.toHexString(uint160(token)),
                "/",
                Strings.toHexString(uint160(owner())),
                "/",
                Strings.toString(id)
            )
        );
    }

    function _transfer(
        address,
        address,
        uint256
    )
        internal
        override
        pure
    {
        revert("MirrorNFT: mirrored NFTs cannot be transferred");
    }
}
