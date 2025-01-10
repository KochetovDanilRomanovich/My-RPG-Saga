import { Player } from "../abstract/Player";
import { AbilityBehavior } from "../Ability/AbilityBehavior";
import { WeaponBehavior } from "../Weapon/WeaponBehavior";

export class Knight extends Player {
  protected _className: string = "Рыцарь";

  constructor(
    playerHealth: number,
    playerStrength: number,
    playerName: string,
    playerWeapon: WeaponBehavior,
    playerSkills: AbilityBehavior[]
  ) {
    super(playerHealth, playerStrength, playerName, playerWeapon, playerSkills);
  }

  public takeDamage(
    damage: number,
    attacker: Player,
    skill: AbilityBehavior | undefined = undefined
  ): void {
    let currentDamage: number = damage;
    if (skill !== undefined && skill.name === "ледяные стрелы") {
      currentDamage -= skill.buff!.strength;
    }
    this._health -= currentDamage;
    if (this._health <= 0) {
      this._health = 0;
      this._isAlive = false;
    }
  }
}
