/* Imports: External */
import { DeployFunction } from 'hardhat-deploy/dist/types'

const deployFn: DeployFunction = async (hre) => {
  const { deployer } = await hre.getNamedAccounts()

  const { deploy } = await hre.deployments.deterministic('MagicMirrorNFT', {
    contract: 'MagicMirrorNFT',
    salt: hre.ethers.utils.solidityKeccak256(['string'], ['MagicMirrorNFT']),
    from: deployer,
    args: ['https://opfp.art', 10],
    log: true,
  })

  await deploy()
}

deployFn.tags = ['MagicMirrorNFT']

export default deployFn
