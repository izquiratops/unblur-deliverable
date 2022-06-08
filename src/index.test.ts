import { Grid } from './index';

describe("Grid instance", () => {
  it("Initialize properly", () => {
    const grid = new Grid();
	  expect(grid.numberOfSlots).toBe(4);
    expect(grid.numberOfBusySlots).toBe(0);
    expect(grid.numberOfEmptySlots).toBe(4);
  });
});
