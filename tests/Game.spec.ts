import { Knight, Archer } from "../src/classes";
import { AbilityFactory } from "../src/fabrics/AbilityFactory/AbilityFactory";
import { WeaponFactory } from "../src/fabrics/WeaponFactory/WeaponFactory";
import { Game } from "../src/gameplay/Game";
import { WeaponBehavior } from "../src/Weapon/WeaponBehavior";

describe('Game', () => {
    let game: Game;
    let abilityFactory: AbilityFactory;
  
    beforeEach(() => {
      game = new Game();
      abilityFactory = new AbilityFactory();
    });
  
    it('should initialize with no players', () => {
      expect(game['players']).toHaveLength(0);
    });
  
    it('should validate player count correctly', () => {
      expect(game['isInvalidPlayerCount'](0)).toBe(true);
      expect(game['isInvalidPlayerCount'](1)).toBe(true);
      expect(game['isInvalidPlayerCount'](5)).toBe(true);
      expect(game['isInvalidPlayerCount'](8)).toBe(false);
      expect(game['isInvalidPlayerCount'](12)).toBe(false);
    });
  
    it('should validate skill choice correctly', () => {
      expect(game['isInvalidSkillChoice'](0)).toBe(true);
      expect(game['isInvalidSkillChoice'](7)).toBe(true);
      expect(game['isInvalidSkillChoice'](3)).toBe(false);
      expect(game['isInvalidSkillChoice'](5)).toBe(false);
    });
  
    it('should create a Knight player and add to players array', async () => {
      const weaponFactory = new WeaponFactory();
      const weapon: WeaponBehavior = weaponFactory.createRandomWeapon('sword');
  
      const knight = new Knight(130, 12, 'Герой', weapon, []);
      game['players'].push(knight);
  
      expect(game['players']).toHaveLength(1);
      expect(game['players'][0]).toBe(knight);
    });
  
    it('should reset players after a battle', async () => {
        const weaponFactory = new WeaponFactory();
        const weapon1: WeaponBehavior = weaponFactory.createRandomWeapon('sword');
        const weapon2: WeaponBehavior = weaponFactory.createRandomWeapon('bow');
      
        const player1 = new Knight(130, 12, 'Рыцарь', weapon1, []);
        const player2 = new Archer(125, 10, 'Лучник', weapon2, []);
      
        const fireArrow = abilityFactory.createSkillFromTemplate('огненные стрелы');
        const iceArrow = abilityFactory.createSkillFromTemplate('ледяные стрелы');
      
        if (fireArrow) player1.skills.push(fireArrow);
        if (iceArrow) player2.skills.push(iceArrow);
      
        game['players'].push(player1, player2);
        
        player1.choseSkill();
        player2.choseSkill();
      
        await game['battle']([player1, player2]);
      
        // Проверка, что здоровье игроков изменилось после боя
        expect(player1.health).toBeLessThan(player1.initialHealth);
        expect(player2.health).toBeLessThan(player2.initialHealth);
      
        // Сброс состояния игроков
        player1.reset();
        player2.reset();
      
        // Проверка, что здоровье игроков восстановилось
        expect(player1.health).toBe(player1.initialHealth);
        expect(player2.health).toBe(player2.initialHealth);
      });
  });