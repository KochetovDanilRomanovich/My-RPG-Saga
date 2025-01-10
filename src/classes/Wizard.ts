import { Player } from "../abstract/Player";
import { AbilityBehavior } from "../Ability/AbilityBehavior";
import { WeaponBehavior } from "../Weapon/WeaponBehavior";

export class Wizard extends Player {
  public _className: string = "Маг";

  constructor(
    playerHealth: number,
    playerStrength: number,
    playerName: string,
    playerWeapon: WeaponBehavior,
    playerSkills: AbilityBehavior[]
  ) {
    super(playerHealth, playerStrength, playerName, playerWeapon, playerSkills);
  }
}
