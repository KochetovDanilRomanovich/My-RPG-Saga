import { Knight } from "../../classes";
import { AbilityBehavior } from "../../Ability/AbilityBehavior";
import { randomArrayElement } from "../../utils/randomization";
import { WeaponBehavior } from "../../Weapon/WeaponBehavior";
import { AbilityFactory } from "../AbilityFactory/AbilityFactory";

export class KnightFactory {
  private skillFabric = new AbilityFactory();

  public createKnight(
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
      return new Knight(health, strength, name, weapon, playerSkills);
    } else {
      const skills: AbilityBehavior[] = [
        this.skillFabric.createSkillFromTemplate("удар возмездия")!,
        this.skillFabric.createSkillFromTemplate("ледяные стрелы")!,
      ];
      return new Knight(health, strength, name, weapon, skills);
    }
  }
}
