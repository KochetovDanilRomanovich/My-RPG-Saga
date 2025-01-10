import { Player } from "../../abstract/Player";

export class Logger {
  constructor() {}

  public logMessage(msg: string): void {
    const entry: string = `${msg}\n`;
    console.log(entry);
  }

  public logAttack(attacker: Player, target: Player): void {
    const attackMsg: string = `(${attacker.className}) ${attacker.name} наносит урон ${
      attacker.strength + attacker.weapon!.damage!
    } на ${target.name} (${target.className})`;
    const entry: string = `${attackMsg}\n`;
    console.log(entry);
  }

  public logSkillUsage(attacker: Player, target: Player): void {
    let skillMsg: string = `(${attacker.className}) ${attacker.name} использует ${attacker.currentSkill?.name} на ${target.name} (${target.className}) `;
    if (attacker.currentSkill?.damage) {
      skillMsg += `и наносит урон ${attacker.currentSkill.damage(attacker)}`;
    }
    const entry: string = `${skillMsg}\n`;
    console.log(entry);
  }

  public logTurnSkip(attacker: Player, target: Player): void {
    const skipMsg: string = `(${attacker.className}) ${attacker.name} пропускает ход из-за ${target.currentSkill!.name}`;
    const entry: string = `${skipMsg}\n`;
    console.log(entry);
  }

  public logDeath(fallenWarrior: Player): void {
    const deathMsg: string = `(${fallenWarrior.className}) ${fallenWarrior.name} умирает`;
    const entry: string = `${deathMsg}\n`;
    console.log(entry);
  }
}
