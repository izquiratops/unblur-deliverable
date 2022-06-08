interface Slot {
    state: 'EMPTY' | 'BUSY',
    content: string
}

// There's no such a thing as interval types yet :(
// https://github.com/microsoft/TypeScript/issues/43505
type ColumnRange = 1 | 2 | 3

export class Grid {

    // TODO: The Grid MUST always have AT LEAST 2 rows of slots.
    // TODO: The Grid MUST always have AT LEAST 2 slots in EMPTY status
    private _currentSlots: Array<Slot> = [];
    private _numberOfColumns: ColumnRange = 2;

    constructor() {
        this.onInit();
    }

    get totalNumberOfSlots(): number {
        return this._currentSlots.length;
    }
    
    get numberOfBusySlots(): number {
        const busySlots = this._currentSlots.filter(
            slot => slot.state === 'BUSY'
        );

        return busySlots.length;
    }

    get numberOfEmpty(): number {
        const emptySlots = this._currentSlots.filter(
            slot => slot.state === 'EMPTY'
        );

        return emptySlots.length;
    }

    // TODO: The Grid NEVER has an incompleted row
    // When the number of columns change the grid must fit the content properly
    set numberOfColumns(value: ColumnRange) {
        this._numberOfColumns = value;
    }

    onInit() {
        console.log('👽');
    }

    onSlotSelected(index: number) {
        const slot = this.fetchSlot(index);
        slot.state = 'BUSY';
    }

    onSlotClosed(index: number) {
        const slot = this.fetchSlot(index);
        slot.state = 'EMPTY';
    }

    private fetchSlot(index: number): Slot {
        const slot = this._currentSlots[index];
        if (slot) {
            return slot;
        } else {
            throw Error('oh no');
        }
    }
    

}
