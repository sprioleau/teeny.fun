const pickRandomElement = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

export default pickRandomElement;
