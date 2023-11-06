import Tile from './Tile';
import { useState, useEffect } from 'react';


interface BoardProps {
    onTileClick: (key: string) => void;
    selectedTiles: string[];
    board: string[];
}

const BOARD_DIMENSION = 8;


function Board({onTileClick, selectedTiles, board}: BoardProps){
    // const [selectedTiles, setSelectedTiles] = useState<string[]>(["00", "12", "54"]);
    const columnLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const chessboardSetup = generateBoard(board);


    return(
        <div id="chessboard">
            {chessboardSetup.map((row, rowIndex) => (
                <div className="tileRow" key={rowIndex}>
                    <h2 className="sideLabel" id="rowLabel">{8-rowIndex}</h2>
                    {row.map((cell, cellIndex) => (
                        <div onClick={() => onTileClick(rowIndex+""+cellIndex)} className={
                            "square "+
                            ( (rowIndex+cellIndex)%2 == 0 ? "white" : "black" )
                            +( selectedTiles.includes(rowIndex+""+cellIndex) ? " selected" : "" )
                        } key={cellIndex}>{cell}</div>
                    ))}
                </div>
            ))}
            <div className="tileRow">
                {columnLabels.map((label) => (
                    <h2 key={label} className="sideLabel" id="colLabel">{label}</h2>
                ))}
            </div>
        </div>
    )
}

function generateBoard(backendBoard: string[]){
    const board = [];
    for(let i=0; i<BOARD_DIMENSION; i++){
        board.push(generateRow(i, backendBoard));
    }
    return board;
}

// decode backend chessBoard to be 2d array of names ex. "bk", "wr"
// iterate over each row of the decoded chess board, pass the value as a prop for the tile component
// on subscribe -> pass initial board array

// each board array will be sent as a json



function generateRow(rowNumber: number, board: string[]){
    const currentRow = [];
    for(let i=0; i<BOARD_DIMENSION; i++){
        currentRow.push(<Tile pieceCode={board[rowNumber*8+i]}/>)
    }
    return currentRow;
}

export default Board;