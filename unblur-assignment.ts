// @ts-nocheck

/*****************************
 *  In this assignment you will be coding a set of functions that are needed to manage a Grid.
 * 
 *  This Grid is a collection of Slots ('currentSlots') distributed in different rows and columns indicated
 * by the variable 'numberOfColumns'.
 * 
 *  The goal of this challenge is to fill the functionality of the declared functions bellow following the
 * RULES described in this section.
 * 
 *  For this task you won't need to worry about the User Interface. You can assume that after onInit function
 * is called, the Grid layout will look exactly as the 'Grid' object describes at every moment and for every 
 * modification of the object. Also assume that this object can not be modified anywhere else.
 * 
 * 
 *  RULES:
 *  1- The elements/items in the 'currentSlots' array of the 'Grid' object will be the corresponding slots shown
 *  in the UI at any moment in the same order starting from the top left until bottom right. 
 * (eg. if Grid.currentSlots.length = 6 and Grid.numberOfColumns = 2 this will be the display
 *      Slot1   Slot2
 *      Slot3   Slot4
 *      Slot5   Slot6
 * )
 * 
 *  2- The existing slots can have two different statuses, that are EMPTY or BUSY. And you should keep this 
 *  information of every slot of the 'currentSlots' array. The way to do it is entirely up to you.
 * 
 *  3- The User has the ability to change the Status of the slots, when a user 'selects' a slot, this should
 *  be set to Busy status and when the user 'closes' a slot, the slot should be set to Empty status.
 * 
 *  4- The User also has the ability of changing the number of columns of the Grid by calling the function
 *  setNumberOfColumns().
 * 
 *  5- The Grid MUST always have AT LEAST 2 rows of slots.
 * 
 *  6- The Grid MUST always have AT LEAST 2 slots in EMPTY status, so new empty slots needs to be added when 
 *  there are too many busy ones.
 * 
 *  7- The Grid NEVER has an incompleted row. (eg. if numberOfColumns = 3 all rows of the Grid must contain 
 *  3 slots)
 * 
 *  8- If the rules above are respected, there shouldn't be unneeded slots in the Grid. So when user closes
 *  slots, system should check if any slot can be deleted.
 * 
 *  9- The User CAN NOT add or delete slots directly, it can only be modified through changing slots status
 *  or the number of rows.
 * 
 *  10- Busy slots can NEVER be deleted.
 * 
 *  11- The slots can only be added at the end of the array and can only be deleted from the end as well.
 * 
 *  12- The number of columns of the Grid will always be 1, 2 or 3 and its default value is 2.
 * 
 *  12- You can add any other code that you want outside the declared functions.
 * 
 *  13- You can also modify existing code as you wish.
 * 
 *              Thank you and good luck !!!
 * 
 *  PS: For any question please contact sergi.serra@unblur.co 
 ******************************/

var Grid: {
    currentSlots: Array<any>,
    numberOfColumns: number  //the only admitted values are 1, 2 or 3 
}


let onInit = () => {
    // This function is called at the beginning for initializing the grid
};

let setNumberOfColumns = (newValue) => {
    // This function is called when the user wants to change the number of slots per row shown in the grid
}

let onSlotSelected = (index) => {
    // This function is called when a slot is selected by the user and needs to be set to busy.
    // The input variable 'index' is the position in the array of the selected slot.
}

let onSlotClosed = (index) => {
    // This function is called when the user 'closes' a slot meaning that it won't be busy anymore
    // until gets selected again. The input variable 'index' is the position in the array of the closed slot.
}

let getTotalNumberOfSlots = () => {
    // This function should compute and return the total number of existing slots in the grid
};

let gettingNumberOfBusySlots = () => {
    // This function should compute and return the total number of existing busy slots in the grid
};

let getNumberOfEmpty = () => {
    // This function should compute and return the total number of existing empty slots in the grid
};
