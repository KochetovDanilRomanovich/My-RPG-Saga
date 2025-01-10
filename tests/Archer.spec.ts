import { Archer, Wizard } from "../src/classes";
import { AbilityFactory } from "../src/fabrics/AbilityFactory/AbilityFactory";
import { WeaponFactory } from "../src/fabrics/WeaponFactory/WeaponFactory";

describe("Archer class methods tests", () => {
  it("Constructor test", () => {
    const weaponFabric = new WeaponFactory();
    const skillFabric = new AbilityFactory();
    const newArcher = new Archer(
      75,
      25,
      "Ibragim",
      weaponFabric.createRandomWeapon("bow"),
      [
        skillFabric.createSkillFromTemplate("огненные стрелы")!,
        skillFabric.createSkillFromTemplate("ледяные стрелы")!,
      ]
    );
    expect(newArcher.health).toEqual(75);
    expect(newArcher.strength).toBe(25);
    expect(newArcher.name).toBe("Ibragim");
  });
  describe("Get methods tests", () => {
    const weaponFabric = new WeaponFactory();
    const skillFabric = new AbilityFactory();
    const newArcher = new Archer(
      75,
      25,
      "Ibragim",
      weaponFabric.createRandomWeapon("bow"),
      [
        skillFabric.createSkillFromTemplate("огненные стрелы")!,
        skillFabric.createSkillFromTemplate("ледяные стрелы")!,
      ]
    );
    it("Health get test", () => {
      expect(newArcher.health).toEqual(75);
    });
    it("Strength get test", () => {
      expect(newArcher.strength).toBe(25);
    });
    it("Name get test", () => {
      expect(newArcher.name).toBe("Ibragim");
    });
    it("ClassName get test", () => {
      expect(newArcher.className).toBe("Лучник");
    });
    it("IsAlive get test", () => {
      expect(newArcher.isAlive).toBe(true);
    });
    it("IsSkillUsed get test", () => {
      expect(newArcher.isSkillUsed).toBe(false);
    });
    it("IsSkillUsed get test after using skill", () => {
      newArcher.choseSkill();
      newArcher.useSkill(newArcher);
      expect(newArcher.isSkillUsed).toBe(true);
    });
    it("InitialHealth get test", () => {
      expect(newArcher.initialHealth).toEqual(75);
    });
    it("InitialStrength get test", () => {
      expect(newArcher.initialStrength).toBe(25);
    });
    it("CountOfSkippingTurns get test", () => {
      expect(newArcher.countOfSkipingTurns).toBe(0);
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
      opponent.useSkill(newArcher, "заворожение");
      expect(newArcher.countOfSkipingTurns).toBe(1);
    });
  });
  describe("Archer methods tests", () => {
    const weaponFabric = new WeaponFactory();
    const skillFabric = new AbilityFactory();
    const newArcher = new Archer(
      75,
      25,
      "Ibragim",
      weaponFabric.createRandomWeapon("bow"),
      [
        skillFabric.createSkillFromTemplate("огненные стрелы")!,
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
    it('Should change the propertie "skillUsed" to true', () => {
      newArcher.choseSkill();
      newArcher.useSkill(opponent);
      expect(newArcher.isSkillUsed).toEqual(true);
    });
  });
  describe("Archer methods tests", () => {
    const weaponFabric = new WeaponFactory();
    const skillFabric = new AbilityFactory();
    const newArcher = new Archer(
      75,
      25,
      "Ibragim",
      weaponFabric.createRandomWeapon("bow"),
      [
        skillFabric.createSkillFromTemplate("огненные стрелы")!,
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
      newArcher.attack(opponent);
      expect(opponent.health).toEqual(
        86 - (newArcher.strength + newArcher.weapon.damage)
      );
    });
    it("Health should decrease by the number of damage units", () => {
      newArcher.takeDamage(45, opponent, opponent.currentSkill);
      expect(newArcher.health).toEqual(75 - 45);
    });
    it("Strength should icnrease", () => {
      newArcher.damageUp(2);
      expect(newArcher.strength).toEqual(27);
    });
    it("Health should icnrease", () => {
      newArcher.heal(10);
      expect(newArcher.health).toEqual(40);
    });
    it("Health should be equal initialHealth", () => {
      newArcher.heal(100);
      expect(newArcher.health).toEqual(newArcher.initialHealth);
    });
    it("Ibragim should DIE.", () => {
      newArcher.takeDamage(
        newArcher.initialHealth,
        opponent,
        opponent.currentSkill
      );
      expect(newArcher.isAlive).toEqual(false);
    });
    it("Ibragim health should be equal 0.", () => {
      newArcher.takeDamage(1000, opponent, opponent.currentSkill);
      expect(newArcher.health).toEqual(0);
    });
    it("Ibragim should reset.", () => {
      newArcher.reset();
      expect(newArcher.health).toEqual(newArcher.initialHealth);
      expect(newArcher.strength).toEqual(newArcher.initialStrength);
      expect(newArcher.isSkillUsed).toEqual(false);
      newArcher.skills!.forEach((skill) => {
        expect(skill.usingCount).toBe(skill.startUsingCount);
        expect(skill.usingAbility).toBe(false);
        expect(skill.usingTime).toBe(skill.startUsingTime);
      });
    });
    it("Ibragim strength should be equal initialStrength.", () => {
      newArcher.useSkill(opponent, "ледяные стрелы");
      newArcher.attack(opponent);
      newArcher.useSkill(opponent, "огненные стрелы");
      newArcher.attack(opponent);
      newArcher.attack(opponent);
      expect(newArcher.strength).toEqual(27);
    });
  });
});
