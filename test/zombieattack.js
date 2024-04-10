import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { MSG_NOT_OWNER } from "./shared/constants";

describe("ZombieAttack", () => {
  async function deployContract() {
    const [owner, notOwner] = await hre.ethers.getSigners();
    const ZombieAttack = await hre.ethers.getContractFactory("ZombieAttack");
    const zombieAttack = await ZombieAttack.deploy();

    return { owner, notOwner, zombieAttack };
  }

  describe("for onlyOwner", async () => {
    const { zombieAttack, notOwner } = await loadFixture(deployContract);

    it("Should fail to attack", async () => {
      await expect(zombieAttack.connect(notOwner).attack()).to.be.revertedWith(
        MSG_NOT_OWNER
      );
    });
  });
});
