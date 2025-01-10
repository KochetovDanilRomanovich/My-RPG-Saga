import { AbilityBehavior } from "../src/Ability/AbilityBehavior";
import { Player } from "../src/abstract/Player";
import { Logger } from "../src/utils/output/Logger";
import { WeaponBehavior } from "../src/Weapon/WeaponBehavior";

describe('Logger', () => {
    let logger: Logger;
  
    beforeEach(() => {
      logger = new Logger();
      jest.spyOn(console, 'log').mockImplementation();
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('should log a message', () => {
      const message = 'Test message';
      logger.logMessage(message);
      expect(console.log).toHaveBeenCalledWith(`${message}\n`);
    });
  
    it('should log an attack', () => {
      const weapon: WeaponBehavior = {
          damage: 5,
          name: ""
      }; 
      const attacker: Player = new class extends Player {
        constructor() {
          super(100, 10, 'Aragorn', weapon, []);
        }
      }();
      const target: Player = new class extends Player {
        constructor() {
          super(80, 8, 'Gorbag', {
              damage: 3,
              name: ""
          }, []);
        }
      }();
      
      attacker.attack(target); 
      logger.logAttack(attacker, target);
      expect(console.log).toHaveBeenCalledWith(`(${attacker.className}) ${attacker.name} наносит урон 15 на ${target.name} (${target.className})\n`);
    });
  
    it('should log a death', () => {
      const weapon: WeaponBehavior = {
          damage: 3,
          name: ""
      };
      const fallenWarrior: Player = new class extends Player {
        constructor() {
          super(70, 8, 'Boromir', weapon, []);
        }
      }();
      const attacker: Player = new class extends Player {
        constructor() {
          super(100, 10, 'Aragorn', weapon, []);
        }
      }();
      
      fallenWarrior.takeDamage(fallenWarrior.health, attacker); 
      logger.logDeath(fallenWarrior);
      expect(console.log).toHaveBeenCalledWith(`(${fallenWarrior.className}) ${fallenWarrior.name} умирает\n`);
    });
  });