import { Archer, Knight, Wizard } from "../src/classes";
import { AbilityFactory } from "../src/fabrics/AbilityFactory/AbilityFactory";
import { WeaponFactory } from "../src/fabrics/WeaponFactory/WeaponFactory";

describe("Knight class methods tests", () => {
  it("Constructor test", () => {
    const weaponFabric = new WeaponFactory();
    const skillFabric = new AbilityFactory();
    const newKnight = new Knight(
      75,
      25,
      "Ibragim",
      weaponFabric.createRandomWeapon("sword"),
      [
        skillFabric.createSkillFromTemplate("удар возмездия")!,
        skillFabric.createSkillFromTemplate("ледяные стрелы")!,
      ]
    );
    expect(newKnight.health).toEqual(75);
    expect(newKnight.strength).toBe(25);
    expect(newKnight.name).toBe("Ibragim");
  });
  describe("Get methods tests", () => {
    const weaponFabric = new WeaponFactory();
    const skillFabric = new AbilityFactory();
    const newKnight = new Knight(
      75,
      25,
      "Ibragim",
      weaponFabric.createRandomWeapon("sword"),
      [
        skillFabric.createSkillFromTemplate("удар возмездия")!,
        skillFabric.createSkillFromTemplate("ледяные стрелы")!,
      ]
    );
    it("Health get test", () => {
      expect(newKnight.health).toEqual(75);
    });
    it("Strength get test", () => {
      expect(newKnight.strength).toBe(25);
    });
    it("Name get test", () => {
      expect(newKnight.name).toBe("Ibragim");
    });
    it("ClassName get test", () => {
      expect(newKnight.className).toBe("Рыцарь");
    });
    it("IsAlive get test", () => {
      expect(newKnight.isAlive).toBe(true);
    });
    it("IsSkillUsed get test", () => {
      expect(newKnight.isSkillUsed).toBe(false);
    });
    it("IsSkillUsed get test after using skill", () => {
      newKnight.choseSkill();
      newKnight.useSkill(newKnight);
      expect(newKnight.isSkillUsed).toBe(true);
    });
    it("InitialHealth get test", () => {
      expect(newKnight.initialHealth).toEqual(75);
    });
    it("InitialStrength get test", () => {
      expect(newKnight.initialStrength).toBe(25);
    });
    it("CountOfSkippingTurns get test", () => {
      expect(newKnight.countOfSkipingTurns).toBe(0);
    });
    it("CountOfSkippingTurns get test after using skipping spell", () => {
      const opponent = new Wizard(
        86,
        26,
        "Mustafa",
        weaponFabric.createRandomWeapon("stick"),
        [
          skillFabric.createSkillFromTemplate("заворожение")!,
          skillFabric.createSkillFromTemplate("ледяные стрелы")!,
        ]
      );
      opponent.useSkill(newKnight, "заворожение");
      expect(newKnight.countOfSkipingTurns).toBe(1);
    });
  });
  describe("Knight methods tests", () => {
    const weaponFabric = new WeaponFactory();
    const skillFabric = new AbilityFactory();
    const newKnight = new Knight(
      75,
      25,
      "Ibragim",
      weaponFabric.createRandomWeapon("sword"),
      [
        skillFabric.createSkillFromTemplate("удар возмездия")!,
        skillFabric.createSkillFromTemplate("ледяные стрелы")!,
      ]
    );
    const opponent = new Knight(
      86,
      26,
      "Mustafa",
      weaponFabric.createRandomWeapon("sword"),
      [
        skillFabric.createSkillFromTemplate("удар возмездия")!,
        skillFabric.createSkillFromTemplate("ледяные стрелы")!,
      ]
    );
    it('Should change the propertie "skillUsed" to true', () => {
      newKnight.choseSkill();
      newKnight.useSkill(opponent);
      expect(newKnight.isSkillUsed).toEqual(true);
    });
  });
  describe("Knight methods tests", () => {
    const weaponFabric = new WeaponFactory();
    const skillFabric = new AbilityFactory();
    const newKnight = new Knight(
      75,
      25,
      "Ibragim",
      weaponFabric.createRandomWeapon("sword"),
      [
        skillFabric.createSkillFromTemplate("удар возмездия")!,
        skillFabric.createSkillFromTemplate("ледяные стрелы")!,
      ]
    );
    const opponent = new Archer(
      86,
      26,
      "Mustafa",
      weaponFabric.createRandomWeapon("bow"),
      [
        skillFabric.createSkillFromTemplate("огненные стрелы")!,
        skillFabric.createSkillFromTemplate("ледяные стрелы")!,
      ]
    );
    it("Should return health after an attack whithout using a skill", () => {
      newKnight.attack(opponent);
      expect(opponent.health).toEqual(
        86 - (newKnight.strength + newKnight.weapon.damage)
      );
    });
    it("Health should decrease by the number of damage units", () => {
      newKnight.takeDamage(45, opponent, opponent.currentSkill);
      expect(newKnight.health).toEqual(75 - 45);
    });
    it("Health should decrease by the number of damage units without skill buff", () => {
      newKnight.heal(100);
      opponent.useSkill(newKnight, "ледяные стрелы");
      opponent.attack(newKnight);
      expect(newKnight.health).toEqual(
        75 -
          (opponent.strength -
            opponent.currentSkill!.buff!.strength +
            opponent.weapon.damage)
      );
    });
    it("Strength should icnrease", () => {
      newKnight.damageUp(2);
      expect(newKnight.strength).toEqual(27);
    });
    it("Health should icnrease", () => {
      newKnight.heal(10);
      expect(newKnight.health).toEqual(
        75 -
          (opponent.strength -
            opponent.currentSkill!.buff!.strength +
            opponent.weapon.damage) +
          10
      );
    });
    it("Health should be equal initialHealth", () => {
      newKnight.heal(100);
      expect(newKnight.health).toEqual(newKnight.initialHealth);
    });
    it("Ibragim should DIE.", () => {
      newKnight.takeDamage(newKnight.initialHealth, opponent);
      expect(newKnight.isAlive).toEqual(false);
    });
    it("Ibragim health should be equal 0.", () => {
      newKnight.takeDamage(1000, opponent, opponent.currentSkill);
      expect(newKnight.health).toEqual(0);
    });
    it("Ibragim should reset.", () => {
      newKnight.reset();
      expect(newKnight.health).toEqual(newKnight.initialHealth);
      expect(newKnight.strength).toEqual(newKnight.initialStrength);
      expect(newKnight.isSkillUsed).toEqual(false);
      newKnight.skills!.forEach((skill) => {
        expect(skill.usingCount).toBe(skill.startUsingCount);
        expect(skill.usingAbility).toBe(false);
        expect(skill.usingTime).toBe(skill.startUsingTime);
      });
    });
  });
});
