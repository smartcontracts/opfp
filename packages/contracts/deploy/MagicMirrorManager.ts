/* Imports: External */
import { DeployFunction } from 'hardhat-deploy/dist/types'

const deployFn: DeployFunction = async (hre) => {
  const { deployer } = await hre.getNamedAccounts()

  const { deploy } = await hre.deployments.deterministic('MagicMirrorManager', {
    contract: 'MagicMirrorManager',
    salt: hre.ethers.utils.solidityKeccak256(
      ['string'],
      ['MagicMirrorManager']
    ),
    from: deployer,
    args: [],
    log: true,
  })

  await deploy()
}

deployFn.tags = ['MagicMirrorManager']

export default deployFn
