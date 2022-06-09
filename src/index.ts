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
        this._updateGridContent();
    }

    // This method has a ColumnRange type, this way any number other than
    // 1, 2 or 3 will be rejected.
    setNumberOfColumns(value: ColumnRange): void {
        this._numberOfColumns = value;

        this._updateGridContent();
    }

    onSlotSelected(index: number): void {
        const slot = this._fetchSlot(index);
        slot.state = 'BUSY';

        this._updateGridContent();
    }

    onSlotClosed(index: number): void {
        const slot = this._fetchSlot(index);
        slot.state = 'EMPTY';

        this._purgeEmptySlots();
    }

    private _updateGridContent(): void {
        // Makes sure to have *at least* 2 empty slots
        while (this.numberOfEmptySlots < this.MIN_EMPTY_SLOT_SIZE) {
            this._insertEmptySlot();
        }

        while (true) {
            const rows = this.numberOfSlots / this._numberOfColumns;
            // Do we have at least 2 rows?
            const isAboveMinRowSize = rows >= this.MIN_ROW_SIZE;
            // Is the last row filled with slots?
            const slotsFitsColumnSize = Number.isInteger(rows);

            // console.debug(rows, isAboveMinRowSize, slotsFitsColumnSize);
            if (isAboveMinRowSize && slotsFitsColumnSize) {
                // Everything is fine, getting out of the loop
                break;
            } else {
                this._insertEmptySlot();
            }
        }
    }

    // TODO: this isn't tested yet
    private _purgeEmptySlots(): void {
        const rows = this.numberOfSlots / this._numberOfColumns;
        const lastRowIdx = (rows - 1) * this._numberOfColumns;
        const lastRow = this._currentSlots.slice(-lastRowIdx);
        const emptyLength = lastRow.reduce((acc, curr) =>
            curr.state === 'EMPTY'
                ? acc++
                : acc
            , 0);

        const isAboveMinRowSize = (rows - 1) >= this.MIN_ROW_SIZE;
        const isAboveMinEmptySlots = (this.numberOfSlots - emptyLength) >= this.MIN_EMPTY_SLOT_SIZE;
        const lastRowIsAllEmpty = emptyLength === this._numberOfColumns;

        if (isAboveMinRowSize && isAboveMinEmptySlots && lastRowIsAllEmpty) {
            this._currentSlots.splice(-lastRowIdx);
        }
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
