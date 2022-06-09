interface Slot {
    state: 'EMPTY' | 'BUSY',
}

// There's no such a thing as interval types yet :(
// https://github.com/microsoft/TypeScript/issues/43505
type ColumnRange = 1 | 2 | 3;

export class Grid {

    private readonly MIN_ROW_SIZE = 2;
    private readonly MIN_EMPTY_SLOT_SIZE = 2;

    private _currentSlots: Array<Slot>;
    private _numberOfColumns: ColumnRange;

    constructor(numberOfColumns: ColumnRange = 2) {
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

    onInit() {
        this._updateSlots();
    }

    // This method has a ColumnRange type, this way any number other than
    // 1, 2 or 3 will be rejected.
    setNumberOfColumns(value: ColumnRange): void {
        this._numberOfColumns = value;

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

    debugGrid(): void {
        let message = '';

        const states = this._currentSlots.map(el => el.state);
        for (let row = 0; row < this.numberOfSlots; row = row + this._numberOfColumns) {
            for (let col = 0; col < this._numberOfColumns; col++) {
                message += states[row + col] + '\t';
            }
            message += '\n';
        }

        console.debug(message);
    }

    private _updateSlots(): void {
        const rows = this.numberOfSlots / this._numberOfColumns;

        if (rows >= this.MIN_ROW_SIZE) {
            // Checks if all slots from last row are EMPTY
            const lastRow = this._currentSlots.slice(-this._numberOfColumns);
            const busyCount = lastRow.filter(el => el.state === 'BUSY').length;

            const restOfGrid = this._currentSlots.slice(0, this._numberOfColumns);
            const emptyCount = restOfGrid.filter(el => el.state === 'EMPTY').length;

            if (busyCount && emptyCount < this.MIN_EMPTY_SLOT_SIZE) {
                // Add padding slots
                const targetSlotSize = (rows + 1) * this._numberOfColumns;
                const count = targetSlotSize - this.numberOfSlots;
                this._addEmptySlots(count);
            } else {
                // Remove empty slots from last row
                this._removeEmptySlots(this._numberOfColumns);
            }
        } else {
            const targetSlotSize = this.MIN_ROW_SIZE * this._numberOfColumns;
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
