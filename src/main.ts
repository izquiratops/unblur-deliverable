interface Slot {
    state: 'EMPTY' | 'BUSY',
    content: string
}

interface Grid {
    currentSlots: Array<Slot>,
    numberOfColumns: 1 | 2 | 3
}

class GridManager {

    constructor() {
        this.onInit();
    }


    onInit() {
        console.log('👽');
    }

}
