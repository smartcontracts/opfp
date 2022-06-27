/* Imports: External */
import { DeployFunction } from 'hardhat-deploy/dist/types'

const deployFn: DeployFunction = async (hre) => {
  const { deployer } = await hre.getNamedAccounts()

  const { deploy } = await hre.deployments.deterministic('MirrorFactory', {
    contract: 'MirrorFactory',
    salt: hre.ethers.utils.solidityKeccak256(['string'], ['MirrorFactory']),
    from: deployer,
    args: [],
    log: true,
  })

  await deploy()
}

deployFn.tags = ['MirrorFactory']

export default deployFn
