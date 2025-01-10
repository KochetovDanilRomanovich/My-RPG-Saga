import { AbilityBehavior } from "../Ability/AbilityBehavior";
import { randomArrayElement } from "../utils/randomization";
import { WeaponBehavior } from "../Weapon/WeaponBehavior";

export abstract class Player {
  protected _name: string;
  protected _className?: string;
  protected _initialHealth: number;
  protected _health: number;
  protected _initialStrength: number;
  protected _strength: number;
  protected _skills: AbilityBehavior[];
  protected _currentSkill?: AbilityBehavior;
  protected skillBuff: number = 0;
  protected _isSkillUsed: boolean = false;
  protected _isAlive: boolean = true;
  protected _countOfSkipingTurns: number = 0;
  protected _weapon: WeaponBehavior;

  constructor(
    playerHealth: number,
    playerStrength: number,
    playerName: string,
    playerWeapon: WeaponBehavior,
    playerSkills: AbilityBehavior[]
  ) {
    this._initialHealth = playerHealth;
    this._health = this._initialHealth;
    this._initialStrength = playerStrength;
    this._strength = this._initialStrength;
    this._name = playerName;
    this._weapon = playerWeapon;
    this._skills = playerSkills;
  }

  public get className(): string | undefined {
    return this._className;
  }

  public get name(): string {
    return this._name;
  }

  public get isAlive(): boolean {
    return this._isAlive;
  }

  public get isSkillUsed(): boolean {
    return this._isSkillUsed;
  }

  public get health(): number {
    return this._health;
  }

  public get strength(): number {
    return this._strength;
  }

  public get initialHealth(): number {
    return this._initialHealth;
  }

  public get initialStrength(): number {
    return this._initialStrength;
  }

  public get countOfSkipingTurns(): number {
    return this._countOfSkipingTurns;
  }

  public get weapon(): WeaponBehavior {
    return this._weapon;
  }

  public get currentSkill(): AbilityBehavior | undefined {
    return this._currentSkill;
  }

  public get skills(): AbilityBehavior[] {
    return this._skills;
  }

  public choseSkill(): void {
    this._currentSkill = randomArrayElement(this.skills);
  }

  public useSkill(opponent: Player, skillName: string | null = null): void {
    if (this.skills.length === 0) return;

    if (skillName) {
      this.skills.forEach(skill => {
        if (skill.name === skillName.toLowerCase()) {
          this._currentSkill = skill;
        }
      });
    }

    if (this._currentSkill) {
      this._currentSkill.effectOfAbility!(this, opponent);
      this._currentSkill.usingCount--;
      this.skills.forEach(skill => {
        if (skill.name === this._currentSkill!.name) {
          skill.usingCount--;
        }
      });
      this._isSkillUsed = true;
    }
  }

  public attack(opponent: Player): void {
    if (this.countOfSkipingTurns > 0) {
      this._countOfSkipingTurns--;
      return;
    }

    const damage = this._strength + this._weapon.damage;

    if (this._currentSkill) {
      const skillIndex = this._skills.findIndex(skill => skill.name === this._currentSkill!.name);
      if (skillIndex !== -1) {
        this._skills[skillIndex].usingAbility = true;
        this._updateSkills();
      }
      opponent.takeDamage(damage, this, this._currentSkill);
    } else {
      opponent.takeDamage(damage, this);
    }
  }

  protected _updateSkills(): void {
    for (const skill of this._skills) {
      if (skill.usingAbility) {
        if (skill.usingTime! <= 0 && skill.buff) {
          this._strength -= skill.buff.strength;
        }
        skill.usingTime!--;
        this._currentSkill!.usingTime!--;
      }
    }
  }

  public damageUp(buff: number): void {
    this._strength += buff;
  }

  public takeDamage(damage: number, attacker: Player, skill?: AbilityBehavior): void {
    this._health -= damage;
    if (this._health <= 0) {
      this._health = 0;
      this._isAlive = false;
    }
  }

  public heal(amount: number): void {
    this._health = Math.min(this._health + amount, this.initialHealth);
  }

  public reset(): void {
    this._health = this.initialHealth;
    this._strength = this.initialStrength;
    this._isSkillUsed = false;
    this._skills.forEach(skill => {
      skill.usingCount = skill.startUsingCount;
      skill.usingAbility = false;
      skill.usingTime = skill.startUsingTime;
    });
  }

  public skipTurns(value: number): void {
    this._countOfSkipingTurns += value;
  }
}
