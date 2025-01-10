import {
  randomArrayElement,
  randomNumber,
} from "../../utils/randomization";
import { WeaponBehavior } from "../../Weapon/WeaponBehavior";

export class WeaponFactory implements WeaponBehavior {
  private weaponNames: Record<string, string[]> = {
    sword: ["Dragonsbane", "Stormbringer", "Aethelred"],
    stick: ["Oak Staff", "Elderwood Branch", "Shepherd's Crook"],
    bow: ["Hunter's Bow", "Longbow", "Shortbow"],
  };

  private _weaponName: string = "";
  private _weaponDamage: number = 0;

  public get name(): string {
    return this._weaponName;
  }

  public get damage(): number {
    return this._weaponDamage;
  }

  public createWeapon(
    type: string,
    name: string,
    damage: number
  ): WeaponBehavior {
    let weapon: WeaponBehavior;
    this._weaponName = name;
    this._weaponDamage = damage;

    switch (type.toLowerCase()) {
      case "sword":
      case "stick":
      case "bow":
        weapon = {
          name: this.name,
          damage: this.damage,
        };
        break;
      default:
        weapon = {
          name: "fists",
          damage: 3,
        };
    }
    return weapon;
  }

  public createRandomWeapon(type: string): WeaponBehavior {
    const namesArray: string[] =
      this.weaponNames[type.toLowerCase() as keyof typeof this.weaponNames];
    const randomName =
      namesArray[Math.floor(Math.random() * namesArray.length)];
    const randomDamage = randomNumber(5, 10);
    return this.createWeapon(type, randomName, randomDamage);
  }
}
