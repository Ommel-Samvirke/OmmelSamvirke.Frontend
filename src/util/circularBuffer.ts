export class CircularBuffer<T> {
    private storage: T[] = [];

    constructor(private capacity: number = 20) {}

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
}
