import { Player } from "../abstract/Player";

export interface AbilityBehavior {
  name: string;
  damage?: (caster: Player) => number | undefined;
  usingAbility: boolean;
  usingCount: number;
  startUsingCount: number;
  usingTime?: number;
  startUsingTime?: number;
  effectOfAbility?: (user: Player, enemy: Player) => void;
  buff?: {
    strength: number;
  };
}
