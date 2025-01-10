import { Player } from "../../abstract/Player";
import { AbilityBehavior } from "../../Ability/AbilityBehavior";

export class AbilityFactory {
  private abilitiesTemplate: AbilityBehavior[] = [
    {
      name: "огненные стрелы",
      usingAbility: false,
      usingCount: 1,
      startUsingCount: 1,
      effectOfAbility: (caster: Player, opponent: Player) => {
        caster.damageUp(2);
      },
      buff: {
        strength: 2,
      },
    },
    {
      name: "ледяные стрелы",
      usingAbility: false,
      usingCount: 1,
      startUsingCount: 1,
      usingTime: 3,
      startUsingTime: 3,
      effectOfAbility: (caster: Player, opponent: Player) => {
        caster.damageUp(3);
      },
      buff: {
        strength: 3,
      },
    },
    {
      name: "удар возмездия",
      usingAbility: false,
      usingCount: 1,
      startUsingCount: 1,
      damage: (caster: Player) => caster.strength * 1.3 + caster.weapon.damage,
      effectOfAbility: (caster: Player, opponent: Player) => {
        const weaponDamage = caster.weapon ? caster.weapon.damage : 0;
        opponent.takeDamage(caster.strength * 1.3 + weaponDamage, caster);
      },
    },
    {
      name: "заворожение",
      usingAbility: false,
      usingCount: 1,
      startUsingCount: 1,
      effectOfAbility: (caster: Player, opponent: Player) => {
        opponent.skipTurns(1);
      },
    },
  ];

  public createAbility(
    abilityName: string,
    abilityDamage: (caster: Player) => number | undefined,
    isUsingAbility: boolean,
    abilityUsingCount: number,
    abilityStartUsingCount: number,
    abilityUsingTime: number | undefined = undefined,
    abilityStartUsingTime: number | undefined = undefined,
    effectOfThisAbility: (caster: Player, opponent: Player) => void,
    abilityBuff: { strength: number } | undefined
  ) {
    const ability: AbilityBehavior = {
      name: abilityName,
      damage: abilityDamage,
      usingAbility: isUsingAbility,
      usingCount: abilityUsingCount,
      startUsingCount: abilityStartUsingCount,
      usingTime: abilityUsingTime,
      startUsingTime: abilityStartUsingTime,
      effectOfAbility: effectOfThisAbility,
      buff: abilityBuff,
    };
    return ability;
  }

  public createSkillFromTemplate(templateName: string): AbilityBehavior | null {
    const skillTemplate = this.abilitiesTemplate.find(
      (skill) => skill.name === templateName
    );
    if (!skillTemplate) {
      return null;
    }

    return this.createAbility(
      skillTemplate.name,
      skillTemplate.damage!,
      skillTemplate.usingAbility,
      skillTemplate.usingCount,
      skillTemplate.startUsingCount,
      skillTemplate.usingTime,
      skillTemplate.startUsingTime,
      skillTemplate.effectOfAbility!,
      skillTemplate.buff
    );
  }
}
