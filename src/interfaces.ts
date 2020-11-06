export interface GameState {
    id: 'beginner' | 'intermediate' | 'expert' | 'beg',
    numberOfRows: number,
    numberOfColumns: number,
    numberOfMines: number
}

export type TileStateValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'M';
export interface Place { rowIndex: number, columnIndex: number }
export interface TileState {
    id: string,
    // value: number,
    value: TileStateValue, // null value corrosponds to a mine
    isShown: boolean,
}
