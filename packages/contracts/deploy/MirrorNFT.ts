/* Imports: External */
import { DeployFunction } from 'hardhat-deploy/dist/types'

const deployFn: DeployFunction = async (hre) => {
  const { deployer } = await hre.getNamedAccounts()

  const { deploy } = await hre.deployments.deterministic('MirrorNFT', {
    contract: 'MirrorNFT',
    salt: hre.ethers.utils.solidityKeccak256(['string'], ['MirrorNFT']),
    from: deployer,
    args: [],
    log: true,
  })

  await deploy()
}

deployFn.tags = ['MirrorNFT']

export default deployFn
