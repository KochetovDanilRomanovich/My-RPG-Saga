import { randomNumber } from "../src/utils/randomization";

describe('randomNumber', () => {
  
    it('should return -1 when minValue is greater than maxValue', () => {
      const result = randomNumber(10, 5);
      expect(result).toBe(-1);
    });
  
    it('should return minValue when minValue equals maxValue', () => {
      const result = randomNumber(5, 5);
      expect(result).toBe(5);
    });
  
    it('should return a number within the specified range', () => {
      const min = 1;
      const max = 10;
      const result = randomNumber(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    });
  
    it('should return a number within the specified range for negative values', () => {
      const min = -5;
      const max = -1;
      const result = randomNumber(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    });
  
    it('should return numbers within the range multiple times', () => {
      const min = 1;
      const max = 5;
      const results: number[] = [];
  
      for (let i = 0; i < 100; i++) {
        results.push(randomNumber(min, max));
      }
  
      results.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(min);
        expect(num).toBeLessThanOrEqual(max);
      });
    });
});