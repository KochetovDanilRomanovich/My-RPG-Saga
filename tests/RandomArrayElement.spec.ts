import { randomArrayElement } from "../src/utils/randomization";

describe('randomArrayElement', () => {
  
    it('should return undefined for an empty array', () => {
      const result = randomArrayElement([]);
      expect(result).toBeUndefined();
    });
  
    it('should return a value from a non-empty array', () => {
      const array = [1, 2, 3, 4, 5];
      const result = randomArrayElement(array);
      expect(array).toContain(result); 
    });
  
    it('should return the only element for a single-element array', () => {
      const array = [42];
      const result = randomArrayElement(array);
      expect(result).toBe(42); 
    });
  
    it('should return a random element multiple times', () => {
      const array = ['a', 'b', 'c', 'd'];
      const results: string[] = [];
  
      for (let i = 0; i < 100; i++) {
        results.push(randomArrayElement(array)!);
      }

      expect(results).toEqual(expect.arrayContaining(array));
    });
  
    it('should handle arrays of different types', () => {
      const array = [1, 'two', { three: 3 }];
      const result = randomArrayElement(array);
      expect(array).toContain(result); 
    });
  });