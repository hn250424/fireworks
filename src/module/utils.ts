const sleep = (ms: number): Promise<void> => { return new Promise((resolve) => setTimeout(resolve, ms)) }
function getRandomNumberInRange(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min }

export { sleep, getRandomNumberInRange }