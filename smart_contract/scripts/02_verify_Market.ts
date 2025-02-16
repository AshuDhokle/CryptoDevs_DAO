import { run } from "hardhat";
import { deployments } from "hardhat";
export const verify = async()=>{
    const address = (await deployments.get('FakeNFTMarketplace')).address
    console.log(`Verifying Market at: ${address}`);
    const args : string[] = [];
    try {
        await run('verify:verify', {
         address: address,
         constructorArguments: args,
        })
    } catch (error) {
        console.log(error);
    }
}

verify()
.then(()=>process.exit(1))
.catch((e:any)=>{
    console.log(e)
    process.exit(1)
})