### About this project

First of all, don't forget to install the dependencies `npm i`. 
This project needs just Typescript and Jest (for testing).

After installing the dependencies you can run the tests with `npm run test`.

### How to use

Grids can be used like this:

``` javascript
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