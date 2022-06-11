### About this project

First of all, don't forget to install the dependencies `npm i`.

This project needs:
 - Typescript
 - Jest for testing (@types/jest and ts-jest also)
 - Typedoc for docs

After installing the dependencies you can run the tests with `npm run test`.

### Docs

This project has a CI workflow to update docs and serve it with GitHub pages,
[check it out](https://izquiratops.github.io/unblur-deliverable/classes/Grid.html).

### How to use

Grids can be used like this:

``` javascript
import { Grid } from 'src/index';

// Inits a grid with 3 columns (2 by default)
const myGrid = new Grid(3);

myGrid.numberOfColumns = 2;
grid.onSlotSelected(0);
grid.onSlotSelected(1);
grid.onSlotSelected(2);

grid.print();

/* output:
 * BUSY   BUSY
 * BUSY   EMPTY
 * EMPTY  EMPTY
*/

```