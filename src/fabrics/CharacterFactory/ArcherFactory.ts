import { Archer } from "../../classes";
import { AbilityBehavior } from "../../Ability/AbilityBehavior";
import { randomArrayElement } from "../../utils/randomization";
import { WeaponBehavior } from "../../Weapon/WeaponBehavior";
import { AbilityFactory } from "../AbilityFactory/AbilityFactory";

export class ArcherFactory {
  private abilityFactory = new AbilityFactory();

  public createArcher(
    names: string[],
    playerHealth: number,
    playerStrength: number,
    playerWeapon: WeaponBehavior,
    playerSkills: AbilityBehavior[] | null = null
  ) {
    const name: string = randomArrayElement(names)!;
    const health: number = playerHealth;
    const strength: number = playerStrength;
    const weapon: WeaponBehavior = playerWeapon;

    if (playerSkills !== null) {
      return new Archer(health, strength, name, weapon, playerSkills);
    } else {
      const firstSkill =
        this.abilityFactory.createSkillFromTemplate("ледяные стрелы")!;
      firstSkill.usingCount = 2;
      firstSkill.startUsingCount = 2;
      const skills: AbilityBehavior[] = [
        firstSkill,
        this.abilityFactory.createSkillFromTemplate("огненные стрелы")!,
      ];
      return new Archer(health, strength, name, weapon, skills);
    }
  }
}
