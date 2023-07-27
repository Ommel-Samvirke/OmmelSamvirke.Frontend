export class CircularBuffer<T> {
    storage: T[] = [];

    constructor(public capacity: number = 100) {}

    push(item: T): void {
        if (this.size() === this.capacity) {
            this.storage.shift();
        }
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }

    size(): number {
        return this.storage.length;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }
    
    clear(): void {
        this.storage = [];
    }
}
