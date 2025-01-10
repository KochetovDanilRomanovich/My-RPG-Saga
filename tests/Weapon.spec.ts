import { WeaponFactory } from "../src/fabrics/WeaponFactory/WeaponFactory";
import { WeaponBehavior } from "../src/Weapon/WeaponBehavior";

describe("WeaponFactory tests", () => {
  let weaponFactory: WeaponFactory;

  beforeEach(() => {
    weaponFactory = new WeaponFactory();
  });

  describe("createWeapon method tests", () => {
    it("should create a sword with correct name and damage", () => {
      const weapon: WeaponBehavior = weaponFactory.createWeapon("sword", "Dragonsbane", 10);
      expect(weapon.name).toBe("Dragonsbane");
      expect(weapon.damage).toBe(10);
    });

    it("should create a stick with correct name and damage", () => {
      const weapon: WeaponBehavior = weaponFactory.createWeapon("stick", "Oak Staff", 8);
      expect(weapon.name).toBe("Oak Staff");
      expect(weapon.damage).toBe(8);
    });

    it("should create a bow with correct name and damage", () => {
      const weapon: WeaponBehavior = weaponFactory.createWeapon("bow", "Hunter's Bow", 7);
      expect(weapon.name).toBe("Hunter's Bow");
      expect(weapon.damage).toBe(7);
    });

    it("should create fists with default values if type is unknown", () => {
      const weapon: WeaponBehavior = weaponFactory.createWeapon("unknown", "Unknown", 0);
      expect(weapon.name).toBe("fists");
      expect(weapon.damage).toBe(3);
    });
  });

  describe("createRandomWeapon method tests", () => {
    it("should create a random sword", () => {
      const weapon: WeaponBehavior = weaponFactory.createRandomWeapon("sword");
      expect(["Dragonsbane", "Stormbringer", "Aethelred"]).toContain(weapon.name);
      expect(weapon.damage).toBeGreaterThanOrEqual(5);
      expect(weapon.damage).toBeLessThanOrEqual(10);
    });

    it("should create a random stick", () => {
      const weapon: WeaponBehavior = weaponFactory.createRandomWeapon("stick");
      expect(["Oak Staff", "Elderwood Branch", "Shepherd's Crook"]).toContain(weapon.name);
      expect(weapon.damage).toBeGreaterThanOrEqual(5);
      expect(weapon.damage).toBeLessThanOrEqual(10);
    });

    it("should create a random bow", () => {
      const weapon: WeaponBehavior = weaponFactory.createRandomWeapon("bow");
      expect(["Hunter's Bow", "Longbow", "Shortbow"]).toContain(weapon.name);
      expect(weapon.damage).toBeGreaterThanOrEqual(5);
      expect(weapon.damage).toBeLessThanOrEqual(10);
    });
  });
});