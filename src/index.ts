// There's no such a thing as interval types yet :(
// https://github.com/microsoft/TypeScript/issues/43505
// type ColumnRange = 1 | 2 | 3;

interface Slot {
    state: 'EMPTY' | 'BUSY',
}

export class Grid {

    private readonly MIN_ROW_SIZE = 2;
    private readonly MIN_EMPTY_SLOT_SIZE = 2;

    private _currentSlots: Array<Slot>;
    private _numberOfColumns: number;

    constructor(numberOfColumns: number = 2) {
        this._currentSlots = [];
        this._numberOfColumns = numberOfColumns;

        this.onInit();
    }

    get numberOfSlots(): number {
        return this._currentSlots.length;
    }

    get numberOfBusySlots(): number {
        const busySlots = this._currentSlots.filter(
            slot => slot.state === 'BUSY'
        );

        return busySlots.length;
    }

    get numberOfEmptySlots(): number {
        const emptySlots = this._currentSlots.filter(
            slot => slot.state === 'EMPTY'
        );

        return emptySlots.length;
    }

    get numberOfColumns(): number {
        return this._numberOfColumns;
    }

    set numberOfColumns(value: number) {
        if (value > 0 && value <= 3) {
            this._numberOfColumns = value;
            this._updateSlots();
        } else {
            throw Error('out of range!');
        }
    }

    onInit() {
        this._updateSlots();
    }

    onSlotSelected(index: number): void {
        const slot = this._fetchSlot(index);
        slot.state = 'BUSY';

        this._updateSlots();
    }

    onSlotClosed(index: number): void {
        const slot = this._fetchSlot(index);
        slot.state = 'EMPTY';

        this._updateSlots();
    }

    print(title: string): void {
        let message = title
            ? title + '\n'
            : '';

        const states = this._currentSlots.map(el => el.state);
        for (let idx = 0; idx < this.numberOfSlots; idx++) {
            message += states[idx];
            if ((idx + 1) % this.numberOfColumns === 0) {
                message += '\n';
            } else {
                message += '\t';
            }
        }

        console.debug(message);
    }

    private _updateSlots(): void {
        const rows = this.numberOfSlots / this.numberOfColumns;

        if (rows >= this.MIN_ROW_SIZE) {
            // Get number of Busy slots on the last row
            const lastRow = this._currentSlots.slice(-this.numberOfColumns);
            const busyCount = lastRow.filter(el => el.state === 'BUSY').length;

            // Get number of Empty slots on every row but the last one
            const restOfGrid = this._currentSlots.slice(0, this.numberOfColumns);
            const emptyCount = restOfGrid.filter(el => el.state === 'EMPTY').length;

            /* Condition to fill the last row:
             * - There's a busy slot (can't be deleted)
             * - Without the last row there's not enough empty slots
             */
            if (busyCount && emptyCount < this.MIN_EMPTY_SLOT_SIZE) {
                const targetSlotSize = (rows + 1) * this.numberOfColumns;
                const count = targetSlotSize - this.numberOfSlots;
                this._addEmptySlots(count);
            } else {
                this._removeEmptySlots(this.numberOfColumns);
            }
        } else {
            const targetSlotSize = this.MIN_ROW_SIZE * this.numberOfColumns;
            const count = targetSlotSize - this.numberOfSlots;
            this._addEmptySlots(count);
        }
    }

    private _addEmptySlots(count: number): void {
        while (count) { this._insertEmptySlot(); count--; }
    }

    private _removeEmptySlots(count: number): void {
        this._currentSlots.splice(-count);
    }

    private _fetchSlot(index: number): Slot {
        const slot = this._currentSlots[index];

        if (slot) {
            return slot;
        } else {
            throw Error('bad index!');
        }
    }

    private _insertEmptySlot(): void {
        const emptySlot: Slot = {
            state: 'EMPTY'
        };

        this._currentSlots.push(emptySlot);
    }
}
