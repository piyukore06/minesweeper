import { GameState, GameType, Place, TileState } from '../interfaces';

export const Games: GameType[] = [
  {
    id: 'mini',
    numberOfRows: 4,
    numberOfColumns: 4,
    numberOfMines: 3,
    state: GameState.START,
  },
  {
    id: 'beginner',
    numberOfRows: 9,
    numberOfColumns: 9,
    numberOfMines: 10,
    state: GameState.START,
  },
  {
    id: 'intermediate',
    numberOfRows: 16,
    numberOfColumns: 16,
    numberOfMines: 40,
    state: GameState.START,
  },
  {
    id: 'expert',
    numberOfRows: 16,
    numberOfColumns: 30,
    numberOfMines: 99,
    state: GameState.START,
  },
];

export const createInitialState = ({
  numberOfRows,
  numberOfColumns,
  numberOfMines,
}: GameType): TileState[][] => {
  const allMines = getUniqueMines(
    numberOfMines,
    numberOfColumns * numberOfRows - 1,
    numberOfColumns
  );
  return Array(numberOfRows)
    .fill(0)
    .map((_, rowIndex) => {
      return Array(numberOfColumns)
        .fill(0)
        .map((__, columnIndex) => {
          const current = { rowIndex, columnIndex };
          const id = getTileId({ rowIndex, columnIndex });
          return {
            id,
            value: allMines[id]
              ? 'M'
              : getTileValue(allMines, current, {
                  numberOfRows,
                  numberOfColumns,
                }),
            isShown: false,
            isMarked: false,
          };
        });
    });
};

const getUniqueMines = (
  numberOfMines: number,
  totalTiles: number,
  numberOfColumns: number
): any => {
  const mines: any = {};
  while (true) {
    if (Object.keys(mines).length === numberOfMines) {
      return Object.keys(mines).reduce((acc, cur) => {
        let row = 0;
        let val = Number(cur);
        while (val >= numberOfColumns) {
          row++;
          val = val - numberOfColumns;
        }
        return {
          ...acc,
          [getTileId({ rowIndex: row, columnIndex: val })]: 'M',
        };
      }, {});
    }
    const radomMinePlace = Math.floor(Math.random() * totalTiles);
    mines[radomMinePlace + ''] = 'M';
  }
};

const getTileValue = (
  allMines: any,
  current: Place,
  max: { numberOfRows: number; numberOfColumns: number }
): any => {
  const { columnIndex, rowIndex } = current;

  const lastRowIndex = current.rowIndex - 1;
  const nextRowIndex = current.rowIndex + 1;
  const lastColumnIndex = current.columnIndex - 1;
  const nextColumnIndex = current.columnIndex + 1;

  const topLeftPlace = ifPlaceHasMine(
    allMines,
    { rowIndex: lastRowIndex, columnIndex: lastColumnIndex },
    max
  );
  const topPlace = ifPlaceHasMine(
    allMines,
    { rowIndex: lastRowIndex, columnIndex },
    max
  );
  const topRightPlace = ifPlaceHasMine(
    allMines,
    { rowIndex: lastRowIndex, columnIndex: nextColumnIndex },
    max
  );

  const leftPlace = ifPlaceHasMine(
    allMines,
    { rowIndex, columnIndex: lastColumnIndex },
    max
  );
  const rightPlace = ifPlaceHasMine(
    allMines,
    { rowIndex, columnIndex: nextColumnIndex },
    max
  );

  const bottomLeftPlace = ifPlaceHasMine(
    allMines,
    { rowIndex: nextRowIndex, columnIndex: lastColumnIndex },
    max
  );
  const bottomPlace = ifPlaceHasMine(
    allMines,
    { rowIndex: nextRowIndex, columnIndex },
    max
  );
  const bottomRightPlace = ifPlaceHasMine(
    allMines,
    { rowIndex: nextRowIndex, columnIndex: nextColumnIndex },
    max
  );

  return [
    // check rowIndex - 1, columnIndex - 1
    topLeftPlace,
    // check rowIndex - 1, columnIndex
    topPlace,
    // check rowIndex - 1, columnIndex + 1
    topRightPlace,

    // check rowIndex, columnIndex - 1
    leftPlace,
    // check rowIndex, columnIndex + 1
    rightPlace,

    // check rowIndex + 1, columnIndex - 1
    bottomLeftPlace,
    // check rowIndex + 1, columnIndex
    bottomPlace,
    // check rowIndex + 1, columnIndex + 1
    bottomRightPlace,
  ].filter(Boolean).length;
};

const isIndexValid = (index: number, maxIndex: number) => {
  return !(index < 0 || index >= maxIndex);
};

const isIndexDefined = (index: number | undefined | false): index is number =>
  index !== false && index !== undefined;

const ifPlaceHasMine = (
  allMines: any,
  place: Place,
  max: { numberOfRows: number; numberOfColumns: number }
) => {
  return isPlaceValid(place, max) && allMines[getTileId(place)];
};
const isPlaceValid = (
  place: Place,
  max: { numberOfRows: number; numberOfColumns: number }
) => {
  return (
    !(place.rowIndex < 0 || place.rowIndex === max.numberOfRows) &&
    !(place.columnIndex < 0 || place.columnIndex === max.numberOfColumns)
  );
};
const getTileId = (current: Place) =>
  current.rowIndex + '_' + current.columnIndex;
