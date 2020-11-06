import { GameState, Place, TileState } from "../interfaces";

export const Games: GameState[] = [
    { id: 'beg', numberOfRows: 5, numberOfColumns: 5, numberOfMines: 6 },
    { id: 'beginner', numberOfRows: 9, numberOfColumns: 9, numberOfMines: 10 },
    { id: 'intermediate', numberOfRows: 16, numberOfColumns: 16, numberOfMines: 40 },
    { id: 'expert', numberOfRows: 16, numberOfColumns: 30, numberOfMines: 99 },
];

export const createInitialState = ({ numberOfRows, numberOfColumns, numberOfMines }: GameState): TileState[][] => {
    const allMines = getUniqueMines(numberOfMines, numberOfColumns * numberOfRows - 1);
    return Array(numberOfRows).fill(0).map((_, rowIndex) => {
        return Array(numberOfColumns).fill(0).map((_, columnIndex) => {
            const current = { rowIndex, columnIndex };
            const max = { rowIndex: numberOfRows - 1, columnIndex: numberOfColumns - 1 };
            const numberOfTile = getTileNumber(current, numberOfColumns);
            return {
                id: `${rowIndex}_${columnIndex}`,
                value: allMines[numberOfTile] ? 'M' : getTileValue(allMines, current, max),
                isShown: false,
            }
        })
    });
}

const getUniqueMines = (numberOfMines: number, totalTiles: number) => {
    const mines: any = {};
    while (true) {
        if (Object.keys(mines).length === numberOfMines) {
            return mines;
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

    const getTileNumberr = (pl: Place) => getTileNumber(pl, max.columnIndex + 1);

    const value = [
        // check rowIndex - 1, columnIndex
        isIndexDefined(lastRowIndex) && allMines[getTileNumberr({ rowIndex: lastRowIndex, columnIndex })],
        // check rowIndex - 1, columnIndex - 1
        isIndexDefined(lastRowIndex) && isIndexDefined(lastColumnIndex) && allMines[getTileNumberr({ rowIndex: lastRowIndex, columnIndex: lastColumnIndex })],
        // check rowIndex - 1, columnIndex + 1
        isIndexDefined(lastRowIndex) && isIndexDefined(nextColumnIndex) && allMines[getTileNumberr({ rowIndex: lastRowIndex, columnIndex: nextColumnIndex })],

        // check rowIndex, columnIndex - 1
        isIndexDefined(lastColumnIndex) && allMines[getTileNumberr({ rowIndex, columnIndex: lastColumnIndex })],
        // check rowIndex, columnIndex + 1
        isIndexDefined(nextColumnIndex) && allMines[getTileNumberr({ rowIndex, columnIndex: nextColumnIndex })],

        // check rowIndex + 1, columnIndex - 1
        isIndexDefined(nextRowIndex) && isIndexDefined(lastColumnIndex) && allMines[getTileNumberr({ rowIndex: nextRowIndex, columnIndex: lastColumnIndex })],
        // check rowIndex + 1, columnIndex
        isIndexDefined(nextRowIndex) && allMines[getTileNumberr({ rowIndex: nextRowIndex, columnIndex })],
        // check rowIndex + 1, columnIndex + 1
        isIndexDefined(nextRowIndex) && isIndexDefined(nextColumnIndex) && allMines[getTileNumberr({ rowIndex: nextRowIndex, columnIndex: nextColumnIndex })],
    ];
    return value.filter(Boolean).length;
}

const isIndexValid = (index: number, maxIndex: number) => {
    return !
        (index < 0 || index >= maxIndex);
}
const isIndexDefined = (index: number | undefined | false): index is number => index !== false && index !== undefined;
const getTileNumber = (current: Place, numberOfColumns: number) => current.rowIndex * numberOfColumns + current.columnIndex;
