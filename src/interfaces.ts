export interface GameType {
    id: 'mini' | 'beginner' | 'intermediate' | 'expert',
    numberOfRows: number,
    numberOfColumns: number,
    numberOfMines: number,
    state: GameState
}

export enum GameState {
    WON = 'won',
    LOST = 'lost',
    PLAYING = 'playing',
    START = 'start'
}

export type TileStateValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'M';
export interface Place { rowIndex: number, columnIndex: number }
export interface TileState {
    id: string,
    // value: number,
    value: TileStateValue, // null value corrosponds to a mine
    isShown: boolean,
    isMarked: boolean,
}
