import { Grid } from './index';

describe("Grid instance", () => {
  const grid = new Grid(1);

  it("Check slot size with 1 col per row", () => {
    // Should be 2 slots: 2 of 2 empty
    expect(grid.numberOfSlots).toBe(2);
    expect(grid.numberOfEmptySlots).toBe(2);
    expect(grid.numberOfBusySlots).toBe(0);
  });

  it("Check slot size with 2 cols per row", () => {
    // Current number of slots: 2
    // 2 cols means 1 row! This is under the minimum number of rows allowed
    grid.setNumberOfColumns(2);

    // Should be 4 slots: 4 of 4 empty
    expect(grid.numberOfSlots).toBe(4);
    expect(grid.numberOfEmptySlots).toBe(4);
    expect(grid.numberOfBusySlots).toBe(0);
  });

  it("Check slot size when adding busy slots", () => {
    grid.onSlotSelected(0);
    expect(grid.numberOfEmptySlots).toBe(3);
    expect(grid.numberOfBusySlots).toBe(1);

    grid.onSlotSelected(1);
    expect(grid.numberOfEmptySlots).toBe(2);
    expect(grid.numberOfBusySlots).toBe(2);
  });

  it("Check slot size increase when not enough empty slots", () => {
    grid.onSlotSelected(2);
    expect(grid.numberOfSlots).toBe(6);
  });
});
