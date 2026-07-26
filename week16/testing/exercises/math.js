export function isEven(n) {
    if (typeof n !== "number") {
        throw new Error("Input must be a number");
    }
    return n % 2 == 0;
};

export function max(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("Inputs must be numbers");
    }
    return a > b ? a : b;
};

export function average(numbers) {  
    if (numbers.length === 0) {
        throw new Error("The array must not be empty");
    }
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
};

export function toTitleCase(str) {
    if (typeof str !== "string") {
        throw new Error("Input must be a string");
    }
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export function filterEven(numbers) {
    return numbers.filter(n => n % 2 == 0);
};