# Magic Mirror NFT

Magic Mirror NFT is a system for mirroring NFTs on one Ethereum-based blockchain to another Ethereum-based blockchain.
We originally built Magic Mirror as a way to mirror Optimism NFTs to Ethereum so that people could display their NFTs on Twitter, but Magic Mirror can be deployed to bridge any two Ethereum-based blockchains.
Magic Mirror is a trusted system meant to make NFTs on chains other than Ethereum more accessible and is not meant to be a trustless bridge between various different chains.

## Architecture Overview

Magic Mirror is designed to be as simple as possible and consists of only two smart contracts and a backend server.

### MagicMirrorNFT

The `MagicMirrorNFT` contract lives on the chain where you want NFTs to be mirrored **to**.
Users can call a public `mint` function to mint a non-transferrable NFT with a token ID equal to the user's address.
This means that users can only mirror one NFT at a time.
In the future, we may add the ability to manage multiple mirrored NFTs at the same time.

### MagicMirrorManager

The `MagicMirrorManager` contract lives on the chain where you want to mirror NFTs **from**.
Users can update the NFT that will be mirrored by sending a transaction to the `MagicMirrorManager`.
We made this design decision with the assumption that the secondary chain where NFTs are being mirrored from will generally be cheaper than the primary chain where NFTs are being mirrored to.

### Magic Mirror Server

The Magic Mirror Server is a trusted rendering server that will return the token URI data for the mirrored NFT on the secondary chain.
The Magic Mirror Server will not render an image if the user does not own the asset they are trying to mirror.

## Architecture Diagram

![Magic Mirror architecture diagram](https://user-images.githubusercontent.com/14298799/185703628-47a0f4db-aa84-4f05-b96d-c671845c7b88.png)
