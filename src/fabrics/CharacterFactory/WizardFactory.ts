import { Wizard } from "../../classes";
import { AbilityBehavior } from "../../Ability/AbilityBehavior";
import { randomArrayElement } from "../../utils/randomization";
import { WeaponBehavior } from "../../Weapon/WeaponBehavior";
import { AbilityFactory } from "../AbilityFactory/AbilityFactory";

export class WizardFactory {
  private skillFabric = new AbilityFactory();

  public createWizard(
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
      return new Wizard(health, strength, name, weapon, playerSkills);
    } else {
      const skills: AbilityBehavior[] = [
        this.skillFabric.createSkillFromTemplate("заворожение")!,
        this.skillFabric.createSkillFromTemplate("ледяные стрелы")!,
      ];
      return new Wizard(health, strength, name, weapon, skills);
    }
  }
}
