import { Grid } from './index';

describe("Grid instance", () => {
  it("Initialize properly", () => {
	expect(new Grid().numberOfSlots).toBe(0);
  });
});
