import mod from './mod';

describe('mod', () => {
    it('should return the correct modulus for positive numbers', () => {
        expect(mod(10, 3)).toBe(1);
        expect(mod(14, 5)).toBe(4);
        expect(mod(25, 7)).toBe(4);
    });

    it('should return the correct modulus for negative numbers', () => {
        expect(mod(-10, 3)).toBe(2);
        expect(mod(-14, 5)).toBe(1);
        expect(mod(-25, 7)).toBe(3);
    });

    it('should return 0 when the number is divisible by the divisor', () => {
        expect(mod(9, 3)).toBe(0);
        expect(mod(20, 5)).toBe(0);
        expect(mod(-14, 7)).toBe(0);
    });

    it('should return the correct result when the number is zero', () => {
        expect(mod(0, 5)).toBe(0);
        expect(mod(0, 7)).toBe(0);
    });

    it('should return the correct modulus for large numbers', () => {
        expect(mod(123456789, 7)).toBe(1);
        expect(mod(987654321, 9)).toBe(0);
    });

    it('should return the correct modulus when the divisor is larger than the number', () => {
        expect(mod(3, 10)).toBe(3);
        expect(mod(-3, 10)).toBe(7);
    });

    it('should return the correct modulus when both the number and divisor are negative', () => {
        expect(mod(-10, -3)).toBe(-1);
        expect(mod(-14, -5)).toBe(-4);
    });

    it('should handle floating-point numbers correctly', () => {
        expect(mod(5.5, 2)).toBe(1.5);
        expect(mod(-5.5, 2)).toBe(0.5);
        expect(mod(5.5, -2)).toBe(-0.5);
    });
});
