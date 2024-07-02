export default function mod(number: number, divisor: number) {
    return ((number % divisor) + divisor) % divisor;
}
