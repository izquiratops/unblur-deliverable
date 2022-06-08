// TODO: Ask about --> 9 - The User CAN NOT add or delete slots directly,
// it can only be modified through changing slots status or the number of ROWS??
// Should be columns ¿right?

// TODO: Ask: ¿there's a way that a slot could be deleted?

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

    set numberOfColumns(value: ColumnRange) {
        this._numberOfColumns = value;
    }

    onInit() {
        this.fitRowContent();
    }

    onSlotSelected(index: number) {
        const slot = this._fetchSlot(index);
        slot.state = 'BUSY';
    }

    onSlotClosed(index: number) {
        const slot = this._fetchSlot(index);
        slot.state = 'EMPTY';
    }

    private fitRowContent() {
        // Make sure to have at least 2 empty slots
        while(this.numberOfEmptySlots < this.MIN_EMPTY_SLOT_SIZE) {
            this._insertEmptySlot();
        }

        // With the specified number of columns AND current number of slots,
        // set the properly padding to get a minimum size of 2 rows.
        while ((this.numberOfSlots / this._numberOfColumns) < this.MIN_ROW_SIZE) {
            this._insertEmptySlot();
        }
    }

    private _fetchSlot(index: number): Slot {
        const slot = this._currentSlots[index];
        if (slot) {
            return slot;
        } else {
            throw Error('oh no');
        }
    }

    private _insertEmptySlot(): void {
        const emptySlot: Slot = {
            state: 'EMPTY'
        };

        this._currentSlots.push(emptySlot);
    }

}
