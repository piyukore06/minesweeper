import React from 'react';
import { createInitialState } from '../Constants/Game';
import { GameType, TileState, Place, GameState } from '../interfaces';

type Props = { gameType: GameType };
type State = { tiles: TileState[][], gameState: GameState };
class Playground extends React.Component<Props, State> {

    componentDidMount() {
        const { gameType } = this.props;
        if (gameType) {
            this.updateGameType(gameType);
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.gameType.id !== prevProps.gameType.id) {
            this.updateGameType(this.props.gameType);
        }
    }

    updateGameType(gameType: GameType) {
        document.documentElement.style.setProperty('--number-of-rows', gameType.numberOfRows + '');
        document.documentElement.style.setProperty('--number-of-columns', gameType.numberOfColumns + '');
        const tiles = createInitialState(gameType);
        this.setState({ tiles, gameState: GameState.PLAYING });
    }

    showOrExplode = (tile: TileState) => {
        const [rowIndex, columnIndex] = tile.id.split('_').map(Number);
        const { tiles } = this.state;
        if (tile.value === 'M') {
            // Expode
            this.setState({ gameState: GameState.LOST });
        } else if (tile.value === 0) {
            // const newTiles = this.getAdjecentTiles(tiles, { rowIndex, columnIndex });
        } else {
            this.setState({
                tiles: this.showTile(tiles, rowIndex, columnIndex)
            });
        }
        // get adjecent tiles, mark adjecent tiles 
        // find tiles which have zero value
        // find next adjecfent times, except the ones covered by last iteration, recursively
        // if tile value is not zero stop
    }

    isPlaceValid = ({ rowIndex, columnIndex }: Place) => {
        return !(rowIndex < 0 || rowIndex >= this.props.gameType!.numberOfRows) && !(columnIndex < 0 || columnIndex >= this.props.gameType!.numberOfColumns);
    }
    getTileValue = (rowIndex: number, columnIndex: number) => {
        if (this.isPlaceValid({ rowIndex, columnIndex })) {
            return this.state.tiles[rowIndex][columnIndex];
        }
        return false;
    }

    showTile = (tiles: TileState[][], rowIndex: number, columnIndex: number) => {
        return [
            ...tiles.slice(0, rowIndex),
            [...tiles[rowIndex].slice(0, columnIndex), { ...tiles[rowIndex][columnIndex], isShown: true }, ...tiles[rowIndex].slice(columnIndex + 1)],
            ...tiles.slice(rowIndex + 1),
        ]
    }

    render() {
        if (this.state) {
            const { gameState, tiles } = this.state;
            return <div className="playground">
                {tiles.map((row) =>
                    row.map(
                        (tile) => {
                            const exploded = gameState === GameState.LOST && tile.value === 'M';
                            const backgroundColor = exploded ? 'red' : tile.isShown ? 'blue' : 'gray'
                            return (<button
                                key={tile.id}
                                className="tile"
                                style={{ backgroundColor }}
                                onClick={() => { this.showOrExplode(tile) }}
                            >
                                {tile.value || ''}
                            </button>)
                        }
                    )
                )}
            </div>
        }
        return null;
    }
}

export default Playground;
