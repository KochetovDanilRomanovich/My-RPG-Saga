import { AbilityBehavior } from "../src/Ability/AbilityBehavior";
import { Archer, Wizard } from "../src/classes";
import { AbilityFactory } from "../src/fabrics/AbilityFactory/AbilityFactory";
import { WeaponFactory } from "../src/fabrics/WeaponFactory/WeaponFactory";

describe("AbilityBehavior tests", () => {
  const weaponFactory = new WeaponFactory();
  const abilityFactory = new AbilityFactory();

  const createArcher = (skills: AbilityBehavior[]) => {
    return new Archer(
      75,
      25,
      "Ibragim",
      weaponFactory.createRandomWeapon("bow"),
      skills
    );
  };

  const createWizard = () => {
    return new Wizard(
      86,
      26,
      "Mustafa",
      weaponFactory.createRandomWeapon("stick"),
      [abilityFactory.createSkillFromTemplate("заворожение")!]
    );
  };

  describe("Fire Arrows Ability tests", () => {
    let skill: AbilityBehavior;
    let archer: Archer;
    let wizard: Wizard;

    beforeEach(() => {
      skill = abilityFactory.createSkillFromTemplate("огненные стрелы")!;
      archer = createArcher([skill]);
      wizard = createWizard();
    });

    it("Should increase strength by buff", () => {
      skill.effectOfAbility!(archer, wizard);
      expect(archer.strength).toBe(archer.initialStrength + 2);
    });

    it("Should reduce using count after use", () => {
      const initialUsingCount = skill.usingCount;

      archer.useSkill(wizard);
      expect(skill.usingCount).toBe(initialUsingCount);
    });
  });

  describe("Ice Arrows Ability tests", () => {
    let skill: AbilityBehavior;
    let archer: Archer;
    let wizard: Wizard;

    beforeEach(() => {
      skill = abilityFactory.createSkillFromTemplate("ледяные стрелы")!;
      archer = createArcher([skill]);
      wizard = createWizard();
    });

    it("Should increase strength by buff", () => {
      skill.effectOfAbility!(archer, wizard);
      expect(archer.strength).toBe(archer.initialStrength + 3);
    });

    it("Should reduce using count after use", () => {
      const initialUsingCount = skill.usingCount;

      archer.useSkill(wizard);
      expect(skill.usingCount).toBe(initialUsingCount);
    });
  });
});
