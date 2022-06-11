import { Grid } from './index';

describe("Grid", () => {
  let grid: Grid;

  describe("New instances with init values", () => {
    it("1 Column should have 2 slots", () => {
      grid = new Grid(1);

      // Column number: 1
      //      Col1
      // Row1 EMPTY
      // Row2 EMPTY

      expect(grid.numberOfSlots).toBe(2);
      expect(grid.numberOfEmptySlots).toBe(2);
      expect(grid.numberOfBusySlots).toBe(0);
    });

    it("2 Columns should have 4 slots", () => {
      grid = new Grid(2); // It's the default value

      // Column number: 2
      //      Col1   Col2
      // Row1 EMPTY  EMPTY
      // Row2 EMPTY  EMPTY

      expect(grid.numberOfSlots).toBe(4);
      expect(grid.numberOfEmptySlots).toBe(4);
      expect(grid.numberOfBusySlots).toBe(0);
    });
  });

  describe("Change number of columns", () => {
    beforeAll(async () => {
      grid = new Grid();
    });

    it("3 Columns should have 6 slots", () => {
      // Set column number: 3
      grid.numberOfColumns = 3;

      //      Col1   Col2   Col3
      // Row1 EMPTY  EMPTY  EMPTY
      // Row2 EMPTY  EMPTY  EMPTY

      expect(grid.numberOfSlots).toBe(6);
      expect(grid.numberOfEmptySlots).toBe(6);
      expect(grid.numberOfBusySlots).toBe(0);
    });

    it("Error thrown if Column size > 3", () => {
      expect(() => {
        grid.numberOfColumns = 5
      }).toThrow();
    });

    it("Error thrown if Column size is 0", () => {
      expect(() => {
        grid.numberOfColumns = 0
      }).toThrow();
    });

    it("Error thrown if Column size < 0", () => {
      expect(() => {
        grid.numberOfColumns = -3
      }).toThrow();
    });
  });

  describe("Set busy slots", () => {
    it("Grid expands when there's less than 2 empty slots", () => {
      grid = new Grid();

      // After:
      //      Col1   Col2
      // Row1 EMPTY  EMPTY
      // Row2 EMPTY  EMPTY

      [0, 1, 2].forEach(idx => {
        grid.onSlotSelected(idx);
      });

      // Before:
      //      Col1   Col2
      // Row1 BUSY   BUSY
      // Row2 BUSY   EMPTY
      // Row3 EMPTY  EMPTY

      expect(grid.numberOfSlots).toBe(6);
      expect(grid.numberOfEmptySlots).toBe(3);
      expect(grid.numberOfBusySlots).toBe(3);
    });
  });

  describe("Check correct behavior of updateSlots()", () => {
    it("Test 1", () => {
      grid = new Grid();

      // After:
      //      Col1   Col2
      // Row1 EMPTY  EMPTY
      // Row2 EMPTY  EMPTY

      grid.onSlotSelected(0);
      grid.onSlotSelected(1);
      grid.onSlotSelected(2);
      grid.onSlotClosed(1);

      //      Col1   Col2
      // Row1 BUSY   EMPTY
      // Row2 BUSY   EMPTY

      expect(grid.numberOfSlots).toBe(4);
      expect(grid.numberOfEmptySlots).toBe(2);
      expect(grid.numberOfBusySlots).toBe(2);
    });

    it("Test 2", () => {
      grid = new Grid(1);

      [0, 1, 2, 3, 4, 5, 6, 7].forEach(idx => {
        grid.onSlotSelected(idx);
      });

      [1, 2, 6].forEach(idx => {
         grid.onSlotClosed(idx);
      });

      // grid.print('Before change of columns');
      // Before:
      //      Col1
      // Row1 BUSY
      // Row2 EMPTY
      // Row3 EMPTY
      // Row4 BUSY
      // Row5 BUSY
      // Row6 BUSY
      // Row7 EMPTY
      // Row8 BUSY

      grid.numberOfColumns = 3;

      // grid.print('After change of columns');
      // After:
      //      Col1   Col2   Col3
      // Row1 BUSY   EMPTY  EMPTY
      // Row2 BUSY   BUSY   BUSY
      // Row3 EMPTY  BUSY   EMPTY

      expect(grid.numberOfSlots).toBe(9);
      expect(grid.numberOfEmptySlots).toBe(4);
      expect(grid.numberOfBusySlots).toBe(5);
    });
  });
});
