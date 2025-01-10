import { Player } from "../../abstract/Player";
import { AbilityBehavior } from "../../Ability/AbilityBehavior";
import {
  randomArrayElement,
  randomNumber,
} from "../../utils/randomization";
import { WeaponBehavior } from "../../Weapon/WeaponBehavior";
import { WeaponFactory } from "../WeaponFactory/WeaponFactory";
import { ArcherFactory } from "./ArcherFactory";
import { KnightFactory } from "./KnightFactory";
import { WizardFactory } from "./WizardFactory";

export class PlayerFactory {
  private weaponFabric = new WeaponFactory();
  private archerFabric = new ArcherFactory();
  private knightFabric = new KnightFactory();
  private wizardFabric = new WizardFactory();

  public createPlayer(
    playerClass: string,
    playerHealth: number,
    playerStrength: number,
    playerWeapon: WeaponBehavior,
    playerSkills: AbilityBehavior[] | null = null
  ): Player | undefined {
    const names: string[] = [
      "Эльдар",
      "Артур",
      "Гэндальф",
      "Вильямс",
      "Агатон",
      "Аполлон",
      "Артемида",
      "Зевс",
      "Персей",
      "Феникс",
      "Элита",
      "Ирида",
      "Медея",
      "Орион",
      "Рафаэль",
      "Себастиан",
      "Эмиль",
      "Аврора",
      "Веста",
      "Лилия",
      "Мира",
    ];
    switch (playerClass) {
      case "Knight":
        return this.knightFabric.createKnight(
          names,
          playerHealth,
          playerStrength,
          playerWeapon,
          playerSkills
        );
      case "Archer":
        return this.archerFabric.createArcher(
          names,
          playerHealth,
          playerStrength,
          playerWeapon,
          playerSkills
        );
      case "Wizard":
        return this.wizardFabric.createWizard(
          names,
          playerHealth,
          playerStrength,
          playerWeapon,
          playerSkills
        );
    }
  }

  createRandomPlayer(): Player {
    const playerFabric = new PlayerFactory();
    const classes: string[] = ["Knight", "Archer", "Wizard"];
    const weapons: string[] = ["bow", "sword", "stick"];
    const playerClass: string = randomArrayElement(classes)!;
    const playerWeapon: WeaponBehavior = this.weaponFabric.createRandomWeapon(
      randomArrayElement(weapons)!
    );
    const health: number = randomNumber(125, 150);
    const strength: number = randomNumber(10, 15);
    return playerFabric.createPlayer(
      playerClass,
      health,
      strength,
      playerWeapon
    )!;
  }

  createRandomPlayers(playersCount: number): Player[] {
    const players: Player[] = [];
    for (let i = 0; i < playersCount; i++) {
      players.push(this.createRandomPlayer());
    }
    return players;
  }
}
