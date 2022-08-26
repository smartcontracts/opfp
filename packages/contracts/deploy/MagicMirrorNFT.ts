/* Imports: External */
import { DeployFunction } from 'hardhat-deploy/dist/types'

const deployFn: DeployFunction = async (hre) => {
  const { deployer } = await hre.getNamedAccounts()

  const { deploy } = await hre.deployments.deterministic('MagicMirrorNFT', {
    contract: 'MagicMirrorNFT',
    salt: hre.ethers.utils.solidityKeccak256(['string'], ['MagicMirrorNFT']),
    from: deployer,
    args: [
      '0x68108902De3A5031197a6eB3b74b3b033e8E8e4d',
      'https://opfp.art/api/mirror/uri/',
      10,
    ],
    log: true,
  })

  await deploy()
}

deployFn.tags = ['MagicMirrorNFT']

export default deployFn
