import React from 'react';
import { createInitialState } from '../Constants/Game';
import { GameType, TileState, Place, GameState } from '../interfaces';

type Props = { gameType: GameType, onGameStateChange: any };
type State = { tiles: TileState[][], gameState: GameState };
type Key = 'top' | 'left' | 'bottom' | 'right';

class Playground extends React.Component<Props, State> {

    componentDidMount() {
        const { gameType } = this.props;
        if (gameType) {
            this.updateGameType(gameType);
        }
    }

    componentDidUpdate(prevProps: Props) {
        if ((this.props.gameType.id !== prevProps.gameType.id) || (this.props.gameType.state !== prevProps.gameType.state)) {
            this.updateGameType(this.props.gameType);
        }
    }

    updateGameType(gameType: GameType) {
        document.documentElement.style.setProperty('--number-of-rows', gameType.numberOfRows + '');
        document.documentElement.style.setProperty('--number-of-columns', gameType.numberOfColumns + '');
        const tiles = createInitialState(gameType);
        this.setState({ tiles, gameState: GameState.PLAYING });
    }

    onRightClick = (tile: TileState, e: React.MouseEvent) => {
        const [rowIndex, columnIndex] = tile.id.split('_').map(Number);
        const place = { rowIndex, columnIndex }
        const { tiles } = this.state;
        if (e.type === 'contextmenu') {
            e.preventDefault();
            this.setState({ tiles: this.markTile(tiles, place) });
        }
    }

    showOrExplode = (tile: TileState) => {
        const [rowIndex, columnIndex] = tile.id.split('_').map(Number);
        const place = { rowIndex, columnIndex }
        const { tiles } = this.state;
        if (tile.value === 'M') {
            // Expode
            this.setState({ gameState: GameState.LOST });
            this.props.onGameStateChange(':(')
        } else if (tile.value === 0) {
            const sNewTiles = this.pointer('top', tiles, place)
            const t = this.pointer('left', sNewTiles, place);
            const b = this.pointer('bottom', t, place);
            const r = this.pointer('right', b, place);
            this.setState({ tiles: r });
        } else {
            this.setState({
                tiles: this.showTile(tiles, place)
            });
        }
    }
    
    getLeftPlace = ({ rowIndex, columnIndex }: Place) => ({ rowIndex, columnIndex: columnIndex - 1 });
    getTopPlace = ({ rowIndex, columnIndex }: Place) => ({ rowIndex: rowIndex - 1, columnIndex: columnIndex });
    getBottomPlace = ({ rowIndex, columnIndex }: Place) => ({ rowIndex: rowIndex + 1, columnIndex: columnIndex });
    getRightPlace = ({ rowIndex, columnIndex }: Place) => ({ rowIndex, columnIndex: columnIndex + 1 });

    pointer = (key: Key, tiles: TileState[][], place: Place, flag = true): TileState[][] => {
        if (this.isPlaceValid(place)) {
            if (tiles[place.rowIndex][place.columnIndex].value === 0) {
                const newTiles = this.showTile(tiles, place);
                const fn = this.getFn(key);
                let neww = newTiles;
                if (flag) {
                    neww = this.startNewPointers(key, newTiles, place, fn);
                }
                return this.pointer(key, neww, fn(place), flag);
            } else if (tiles[place.rowIndex][place.columnIndex].value !== 'M') {
                return this.showTile(tiles, place);
            }
        }
        return tiles;
    }

    getFn = (key: Key): ((x: Place) => Place) => {
        switch (key) {
            case 'bottom':
                return this.getBottomPlace;
            case 'left':
                return this.getLeftPlace;
            case 'right':
                return this.getRightPlace;
            case 'top':
                return this.getTopPlace;
        }
    }

    startNewPointers = (key: Key, tiles: TileState[][], place: Place, fn: ((x: Place) => Place)) => {
        switch (key) {
            case 'top':
            case 'bottom':
                const a = this.pointer('left', tiles, this.getLeftPlace(place), false);
                return this.pointer('right', a, this.getRightPlace(place), false);
            case 'left':
            case 'right':
                const b = this.pointer('top', tiles, this.getTopPlace(place), false);
                return this.pointer('bottom', b, this.getBottomPlace(place), false);
        }
    }

    isPlaceValid = (place: Place) => {
        return !(place.rowIndex < 0 || place.rowIndex === this.props.gameType.numberOfRows) &&
        !(place.columnIndex < 0 || place.columnIndex === this.props.gameType.numberOfColumns);
    };

    showTile = (tiles: TileState[][], { rowIndex, columnIndex }: Place) => {
        if (tiles[rowIndex][columnIndex].isShown) {
            return tiles;
        }
        return [
            ...tiles.slice(0, rowIndex),
            [...tiles[rowIndex].slice(0, columnIndex), { ...tiles[rowIndex][columnIndex], isShown: true }, ...tiles[rowIndex].slice(columnIndex + 1)],
            ...tiles.slice(rowIndex + 1),
        ]
    }

    markTile = (tiles: TileState[][], { rowIndex, columnIndex }: Place) => {
        if (tiles[rowIndex][columnIndex].isShown) {
            return tiles;
        }
        return [
            ...tiles.slice(0, rowIndex),
            [...tiles[rowIndex].slice(0, columnIndex), { ...tiles[rowIndex][columnIndex], isMarked: true }, ...tiles[rowIndex].slice(columnIndex + 1)],
            ...tiles.slice(rowIndex + 1),
        ]
    }

    getImage = (tile: TileState, explode: boolean) => {
        if (explode) {
            return this.getMineImage();
        }
        if (tile.isMarked) {
            return <img className='tile-image' src={ '/images/flag.svg'} alt="flag" />
        }
        const { isShown } = tile;
        const value = isShown ? tile.value : 'unopened';
        return <img className='tile-image' src={ '/images/' + value + '.svg'} alt={value + ''} />
    }
    getMineImage = () => {
        return <img className='tile-image' src={ '/images/M.png'} alt={'mine'} />
    }
    render() {
        if (this.state) {
            const { gameState, tiles } = this.state;
            return <div className="playground">
                {tiles.map((row) =>
                    row.map(
                        (tile) => {
                            const lost = gameState === GameState.LOST;
                            const explode = lost && tile.value === 'M';
                            const backgroundColor = tile.isShown ? explode ? 'crimson' : '' : 'blue';
                            return (<button
                                key={tile.id}
                                className="tile"
                                style={{ backgroundColor }}
                                disabled={lost}
                                onClick={(e) => { this.showOrExplode(tile) }}
                                onContextMenu={(e) => { this.onRightClick(tile, e) }}
                            >
                                { this.getImage(tile, explode) }
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
