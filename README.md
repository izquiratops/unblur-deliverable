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

const myGrid = new Grid();

myGrid.onSlotSelected(0);
myGrid.onSlotSelected(1);
myGrid.onSlotSelected(2);

myGrid.print();

/* output:
 * BUSY   BUSY
 * BUSY   EMPTY
 * EMPTY  EMPTY
*/

```
