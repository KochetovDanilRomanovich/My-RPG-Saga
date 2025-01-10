import inquirer from 'inquirer';
import { PlayerFactory } from "../fabrics/CharacterFactory";
import { Logger } from "../utils/output/Logger";
import { Player } from "../abstract/Player";
import { WeaponFactory } from "../fabrics/WeaponFactory/WeaponFactory";
import { AbilityFactory } from "../fabrics/AbilityFactory/AbilityFactory";
import { WeaponBehavior } from "../Weapon/WeaponBehavior";
import { AbilityBehavior } from "../Ability/AbilityBehavior";

export class Game {
  private playerFabric = new PlayerFactory();
  private players: Player[] = [];
  private logger: Logger = new Logger();
  private createdPlayer: Player | null = null;

  constructor() {}

  public async start(): Promise<void> {
    console.log("Добро пожаловать в игру RPG Saga");
    await this.askForPlayers();
  }

  private async askForPlayers(): Promise<void> {
    const { inputNumber } = await inquirer.prompt([{
      type: "input",
      name: "inputNumber",
      message: "Выберите число игроков (должно делиться на 4): ",
    }]);
    
    const number = parseInt(inputNumber);
    if (this.isInvalidPlayerCount(number)) {
      console.log("Некорректный ввод. Пожалуйста, попробуйте снова.");
      return this.askForPlayers();
    }
    await this.askForCreating(number);
  }

  private isInvalidPlayerCount(number: number): boolean {
    return isNaN(number) || number < 1 || number % 4 !== 0;
  }

  private async askForCreating(number: number): Promise<void> {
    const { inputString } = await inquirer.prompt([{
      type: "input",
      name: "inputString",
      message: "Выберите режим игры:\n 1. Обычный режим\n 2. Рандомный режим\n Ваш выбор:",
    }]);
    
    if (inputString.toLowerCase() === "1") {
      await this.createCharacter(number);
    } else if (inputString.toLowerCase() === "2") {
      this.players = this.playerFabric.createRandomPlayers(number);
      await this.startGame();
    } else {
      console.log("Некорректный ввод. Пожалуйста, попробуйте снова.");
      await this.askForCreating(number);
    }
  }

  private async createCharacter(numberOfPlayers: number): Promise<void> {
    const weaponFabric = new WeaponFactory();
    const skillFabric = new AbilityFactory();

    let playerType: string;
    let playerHealth = 0, playerStrength = 0;
    let playerWeapon: WeaponBehavior;
    let playerSkills: AbilityBehavior[] = [];

    const types = ["Knight", "Archer", "Wizard"];
    const weapons = ["bow", "sword", "stick"];
    const skillNames = ["огненные стрелы", "ледяные стрелы", "удар возмездия", "заворожение"];

    const ask = async (message: string, validator: (input: string) => boolean, processInput: (input: string) => void): Promise<void> => {
      const { response } = await inquirer.prompt([{ type: "input", name: "response", message }]);
      if (validator(response)) {
        processInput(response);
      } else {
        console.log("Некорректный ввод. Пожалуйста, попробуйте снова.");
        return ask(message, validator, processInput);
      }
    };

    await ask("Выберите класс своего героя:\n 1. Рыцарь\n 2. Лучник\n 3. Маг\n Ваш выбор:", 
      input => !isNaN(+input) && +input >= 1 && +input <= 3, 
      input => { playerType = types[+input - 1]; });

    await ask("Напишите количество здоровья для своего героя (от 125 до 150): ", 
      input => !isNaN(+input) && +input >= 125 && +input <= 150, 
      input => { playerHealth = +input; });

    await ask("Напишите количество силы для своего героя (от 10 до 15): ", 
      input => !isNaN(+input) && +input >= 10 && +input <= 15, 
      input => { playerStrength = +input; });

    await ask("Выберите оружие своего героя:\n 1. Меч\n 2. Лук\n 3. Посох\n Ваш выбор:", 
      input => !isNaN(+input) && +input >= 1 && +input <= 3, 
      input => { playerWeapon = weaponFabric.createRandomWeapon(weapons[+input - 1]); });

    await this.askForSkills(playerSkills, skillFabric, skillNames);

    const newPlayer = this.playerFabric.createPlayer(
      playerType!, playerHealth, playerStrength, playerWeapon!, 
      playerSkills.length > 0 ? playerSkills : undefined
    );
    
    if (newPlayer) {
        this.createdPlayer = newPlayer; 
        this.players.push(newPlayer); 
        const randomPlayersCount = numberOfPlayers - 1; 
        this.players.push(...this.playerFabric.createRandomPlayers(randomPlayersCount)); 
      } else {
        console.log("Ошибка при создании персонажа.");
      }
  
      await this.startGame(); 
    }
  
    private async askForSkills(playerSkills: AbilityBehavior[], skillFabric: AbilityFactory, skillNames: string[]): Promise<void> {
      const askSkills = async (): Promise<void> => {
        const { skillInput } = await inquirer.prompt([{
          type: "input",
          name: "skillInput",
          message: "Выберите способности для своего героя:\n 1. Огненные стрелы\n 2. Ледяные стрелы\n 3. Удар возмездия\n 4. Заворожение\n Для старта со стандартными навыками класса, напишите 5\n Для выхода напишите 6\n Ваш выбор:",
        }]);
  
        const number = parseInt(skillInput);
        if (this.isInvalidSkillChoice(number)) {
          console.log("Некорректный ввод. Пожалуйста, попробуйте снова.");
          return askSkills();
        } else if (number < 5 && number > 0) {
          if (playerSkills.length < 3) {
            playerSkills.push(skillFabric.createSkillFromTemplate(skillNames[number - 1])!);
          } else {
            console.log("У вас уже максимальное количество скиллов");
          }
          return askSkills();
        } else if (number === 6 && playerSkills.length === 0) {
          console.log("Выберите хотя бы один скилл");
          return askSkills();
        }
      };
  
      await askSkills();
    }
  
    private isInvalidSkillChoice(number: number): boolean {
      return isNaN(number) || number < 1 || number > 6;
    }
  
    private async startGame(): Promise<void> {
      this.logger.logMessage("Игра началась!");
      const listOfPlayers = this.players.map(player => 
        player === this.createdPlayer ? `(твой персонаж) (${player.className}) ${player.name}` : `(${player.className}) ${player.name}`
      ).join("\n\n");
      
      this.logger.logMessage(`Список участников: \n\n${listOfPlayers}`);
      await this.tournament(this.players);
      this.logger.logMessage(`Победитель: (${this.players[0].className}) ${this.players[0].name}`);
    }
  
    private async tournament(players: Player[]): Promise<Player> {
      if (players.length === 1) return players[0];
  
      const nextRoundPlayers: Player[] = [];
      for (let i = 0; i < players.length; i += 2) {
        const [player1, player2] = [players[i], players[i + 1]];
        const winner = await this.battle([player1, player2]);
        nextRoundPlayers.push(winner);
        player1.reset();
        player2.reset();
      }
  
      return this.tournament(nextRoundPlayers);
    }
  
    private async battle(fighters: Player[]): Promise<Player> {
      this.logger.logMessage(`(${fighters[0].name}) vs (${fighters[1].name})`);
  
      let turn = 0;
      while (fighters[0].health > 0 && fighters[1].health > 0) {
        const [attacker, defender] = [fighters[turn % 2], fighters[(turn + 1) % 2]];
  
        if (defender.isAlive) {
          attacker.attack(defender);
          this.logger.logAttack(attacker, defender);
          if (!defender.isAlive) {
            this.logger.logDeath(defender);
            break;
          }
        }
  
        if (Math.random() < 0.5 && attacker.isAlive && defender.isAlive) {
          attacker.choseSkill();
          if (attacker.currentSkill!.usingCount! > 0) {
            attacker.useSkill(defender);
            this.logger.logSkillUsage(attacker, defender);
          }
        }
  
        await this.delay(200);
        turn++;
      }
  
      this.updatePlayersArray();
      return fighters.find(player => player.health > 0)!;
    }
  
    private delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    private updatePlayersArray(): void {
      this.players = this.players.filter(player => player.isAlive);
    }
  }
