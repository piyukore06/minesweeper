import { GameType, Place, TileState } from "../interfaces";

export const Games: GameType[] = [
    { id: 'beginner', numberOfRows: 9, numberOfColumns: 9, numberOfMines: 10 },
    { id: 'intermediate', numberOfRows: 16, numberOfColumns: 16, numberOfMines: 40 },
    { id: 'expert', numberOfRows: 16, numberOfColumns: 30, numberOfMines: 99 },
];

export const createInitialState = ({ numberOfRows, numberOfColumns, numberOfMines }: GameType): TileState[][] => {
    const allMines = getUniqueMines(numberOfMines, numberOfColumns * numberOfRows - 1, numberOfColumns);
    return Array(numberOfRows).fill(0).map((_, rowIndex) => {
        return Array(numberOfColumns).fill(0).map((_, columnIndex) => {
            const current = { rowIndex, columnIndex };
            const max = { rowIndex: numberOfRows - 1, columnIndex: numberOfColumns - 1 };
            const id = getTileId({ rowIndex, columnIndex });
            return {
                id,
                value: allMines[id] ? 'M' : getTileValue(allMines, current, max),
                isShown: false,
            }
        })
    });
}

const getUniqueMines = (numberOfMines: number, totalTiles: number, numberOfColumns: number): any => {
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
                return { ...acc, [getTileId({ rowIndex: row, columnIndex: val })]: 'M' }
            }, {});
        }
        const radomMinePlace = Math.floor(Math.random() * totalTiles);
        mines[radomMinePlace + ''] = 'M';
    }
}

const getTileValue = (
    allMines: any,
    current: Place,
    max: Place
): any => {
    const { columnIndex, rowIndex } = current;

    const lastRowIndex = isIndexValid(current.rowIndex - 1, max.rowIndex) && current.rowIndex - 1;
    const nextRowIndex = isIndexValid(current.rowIndex + 1, max.rowIndex) && current.rowIndex + 1;
    const lastColumnIndex = isIndexValid(current.columnIndex - 1, max.columnIndex) && current.columnIndex - 1;
    const nextColumnIndex = isIndexValid(current.columnIndex + 1, max.columnIndex) && current.columnIndex + 1;

    return [
        // check rowIndex - 1, columnIndex - 1
        isIndexDefined(lastRowIndex) && isIndexDefined(lastColumnIndex) && allMines[getTileId({ rowIndex: lastRowIndex, columnIndex: lastColumnIndex })],
        // check rowIndex - 1, columnIndex
        isIndexDefined(lastRowIndex) && allMines[getTileId({ rowIndex: lastRowIndex, columnIndex })],
        // check rowIndex - 1, columnIndex + 1
        isIndexDefined(lastRowIndex) && isIndexDefined(nextColumnIndex) && allMines[getTileId({ rowIndex: lastRowIndex, columnIndex: nextColumnIndex })],

        // check rowIndex, columnIndex - 1
        isIndexDefined(lastColumnIndex) && allMines[getTileId({ rowIndex, columnIndex: lastColumnIndex })],
        // check rowIndex, columnIndex + 1
        isIndexDefined(nextColumnIndex) && allMines[getTileId({ rowIndex, columnIndex: nextColumnIndex })],

        // check rowIndex + 1, columnIndex - 1
        isIndexDefined(nextRowIndex) && isIndexDefined(lastColumnIndex) && allMines[getTileId({ rowIndex: nextRowIndex, columnIndex: lastColumnIndex })],
        // check rowIndex + 1, columnIndex
        isIndexDefined(nextRowIndex) && allMines[getTileId({ rowIndex: nextRowIndex, columnIndex })],
        // check rowIndex + 1, columnIndex + 1
        isIndexDefined(nextRowIndex) && isIndexDefined(nextColumnIndex) && allMines[getTileId({ rowIndex: nextRowIndex, columnIndex: nextColumnIndex })],
    ].filter(Boolean).length;
}

const isIndexValid = (index: number, maxIndex: number) => {
    return !
        (index < 0 || index >= maxIndex);
}

const isIndexDefined = (index: number | undefined | false): index is number => index !== false && index !== undefined;
const getTileId = (current: Place) => current.rowIndex + '_' + current.columnIndex;

