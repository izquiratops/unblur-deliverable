/**
 * Every possible {@link Slot} state.
 */
export type SlotState = 'EMPTY' | 'BUSY';

/**
 * Smallest unit of the {@link Grid}. Represents the content on every cell.
 * @typedef Slot
 */
export interface Slot {
    /**
     * @param state {SlotState} Current state of the Slot.
     */
    state: SlotState,
}

/**
 * The Grid is a collection of Slots `_currentSlots` distributed in different rows and columns indicated
 * by the variable `_numberOfColumns`.
 * 
 * A Grid has the following aspect:
 * ```
 *         Col1   Col2   Col3
 * Row1    EMPTY  BUSY   EMPTY
 * Row2    EMPTY  EMPTY  BUSY
 * ```
 * 
 * The current slot stack is: ['EMPTY', 'BUSY', 'EMPTY', 'EMPTY', 'EMPTY', 'BUSY']
 * 
 * @author Jordi Izquierdo Casares
 * @class
 */
export class Grid {

    private readonly MIN_ROW_SIZE: number = 2;
    private readonly MIN_EMPTY_SLOT_SIZE: number = 2;

    private _currentSlots: Array<Slot>;
    private _numberOfColumns: number;

    constructor(numberOfColumns: number = 2) {
        this._currentSlots = [];
        this._numberOfColumns = numberOfColumns;

        this.onInit();
    }

    /**
     * @return {number} Slot count
     */
    get numberOfSlots(): number {
        return this._currentSlots.length;
    }

    /**
     * @return {number} 'BUSY' slot count
     */
    get numberOfBusySlots(): number {
        const busySlots = this._currentSlots.filter(
            slot => slot.state === 'BUSY'
        );

        return busySlots.length;
    }

    /**
     * @return {number} 'EMPTY' slot count
     */
    get numberOfEmptySlots(): number {
        const emptySlots = this._currentSlots.filter(
            slot => slot.state === 'EMPTY'
        );

        return emptySlots.length;
    }

    /**
     * @return {number} Row grid size
     */
    get numberOfRows(): number {
        return this.numberOfSlots / this.numberOfColumns;
    }

    /**
     * @return {number} Column grid size
     */
    get numberOfColumns(): number {
        return this._numberOfColumns;
    }

    /**
     * Sets the number of columns.
     * 
     * @throws If the number is outside the range 1 to 3.
     */
    set numberOfColumns(value: number) {
        if (value > 0 && value <= 3) {
            this._numberOfColumns = value;
            this.updateSlots();
        } else {
            throw Error('out of range!');
        }
    }

    /**
     * Sets the state of the target slot to Busy.
     * @param {number} index Position of the target slot
     */
    onSlotSelected(index: number): void {
        const slot = this.fetchSlot(index);
        slot.state = 'BUSY';

        this.updateSlots();
    }

    /**
     * Sets the state of the target slot to Empty.
     * @param {number} index Position of the target slot
     */
    onSlotClosed(index: number): void {
        const slot = this.fetchSlot(index);
        slot.state = 'EMPTY';

        this.updateSlots();
    }

    /**
     * Debugging method to see the current state of the grid.
     * @param {string | null} title Name of the figure. It's optional, provides additional context.
     */
    print(title: string | null = null): void {
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

    /**
     * Runs the initial instructions to build the grid.
     * It's called only once on startup. 
     * @private
     */
    private onInit() {
        this.updateSlots();
    }

    /**
     * It's fired everytime the user changes the grid state.
     * 
     * Takes care of:
     *  - Getting rid of useless rows.
     *  - Fit the last row to match the column size.
     * @private
     */
    private updateSlots(): void {
        while (true) {
            if (
                this.numberOfRows % 1 === 0 &&
                this.numberOfRows >= this.MIN_ROW_SIZE &&
                this.numberOfEmptySlots >= this.MIN_EMPTY_SLOT_SIZE
            ) { break; }

            this.addEmptySlots(1);

            // Debug step by step
            this.print();
        }

        while (true) {
            const lastRow = this._currentSlots.slice(-this.numberOfColumns);
            const busyCount = lastRow.reduce((acc, curr) =>
                curr.state === 'BUSY' ? ++acc : acc, 0
            );
            const emptyCount = this.numberOfColumns - busyCount;

            if (
                busyCount === 0 &&
                this.numberOfRows - 1 >= this.MIN_ROW_SIZE &&
                this.numberOfEmptySlots - emptyCount >= this.MIN_EMPTY_SLOT_SIZE
            ) {
                // It's OK to get rid of the last row if:
                //  - There's no Busy slots there
                //  - The grid keeps meeting the min row size restriction
                //  - The grid keeps meeting the min Empty slot size restriction
                this.removeEmptySlots(this.numberOfColumns);
            } else {
                break;
            }
        }
    }

    /**
     * Pushes a number of 'EMPTY' slots into the slot stack.
     * @private
     * @param count Number of slots to be added
     */
    private addEmptySlots(count: number): void {
        while (count) {
            const emptySlot: Slot = {
                state: 'EMPTY'
            };

            this._currentSlots.push(emptySlot);
            count--;
        }
    }

    /**
     * Pops a number of 'EMPTY' slots from the slot stack.
     * @private
     * @param count Number of slots to be removed
     */
    private removeEmptySlots(count: number): void {
        this._currentSlots.splice(-count);
    }

    /**
     * Returns the {@link Slot} object that belongs to the index position.
     * @private
     * @param index Stack position
     * @returns The {@link Slot} object
     * @throws Will throw if the index is out of range
     */
    private fetchSlot(index: number): Slot {
        const slot = this._currentSlots[index];

        if (slot) {
            return slot;
        } else {
            throw Error('bad index!');
        }
    }
}
