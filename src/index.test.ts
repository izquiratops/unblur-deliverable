import { Grid } from './index';

describe("Grid", () => {
  describe("Init new instances", () => {
    it("Grid with 1 col per row", () => {
      const grid = new Grid(1);

      // Column number: 1
      //      Col1
      // Row1 EMPTY
      // Row2 EMPTY
      grid.debugGrid();

      expect(grid.numberOfSlots).toBe(2);
      expect(grid.numberOfEmptySlots).toBe(2);
      expect(grid.numberOfBusySlots).toBe(0);
    });

    it("Grid with 2 col per row", () => {
      const grid = new Grid();

      // Default column number: 2
      //      Col1   Col2
      // Row1 EMPTY  EMPTY
      // Row2 EMPTY  EMPTY
      grid.debugGrid();

      expect(grid.numberOfSlots).toBe(4);
      expect(grid.numberOfEmptySlots).toBe(4);
      expect(grid.numberOfBusySlots).toBe(0);
    });
  });

  describe("Change number of columns value", () => {
    it("Grid with 3 col per row", () => {
      const grid = new Grid();

      // Set column number: 3
      grid.setNumberOfColumns(3);

      //      Col1   Col2   Col3
      // Row1 EMPTY  EMPTY  EMPTY
      // Row2 EMPTY  EMPTY  EMPTY
      grid.debugGrid();

      expect(grid.numberOfSlots).toBe(6);
      expect(grid.numberOfEmptySlots).toBe(6);
      expect(grid.numberOfBusySlots).toBe(0);
    });
  });

  describe("Add BUSY slots", () => {
    it("Force to add another Row", () => {
      const grid = new Grid();

      grid.onSlotSelected(0);
      grid.onSlotSelected(1);
      grid.onSlotSelected(2);

      //      Col1   Col2
      // Row1 BUSY   BUSY
      // Row2 BUSY   EMPTY
      // Row3 EMPTY  EMPTY
      grid.debugGrid();

      expect(grid.numberOfSlots).toBe(6);
      expect(grid.numberOfEmptySlots).toBe(3);
      expect(grid.numberOfBusySlots).toBe(3);
    });
  });


  describe("Remove BUSY slots", () => {
    it("Force to remove last Row", () => {
      const grid = new Grid();

      grid.onSlotSelected(0);
      grid.onSlotSelected(1);
      grid.onSlotSelected(2);
      grid.onSlotClosed(1);

      //      Col1   Col2
      // Row1 BUSY   EMPTY
      // Row2 BUSY   EMPTY
      grid.debugGrid();

      expect(grid.numberOfSlots).toBe(4);
      expect(grid.numberOfEmptySlots).toBe(2);
      expect(grid.numberOfBusySlots).toBe(2);
    });
  });
});
