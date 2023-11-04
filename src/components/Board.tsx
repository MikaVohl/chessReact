import Tile from './Tile';
import { useState, useEffect } from 'react';


interface BoardProps {
    onTileClick: (key: string) => void;
}

const BOARD_DIMENSION = 8;
const chessboardSetup = generateBoard();


function Board({onTileClick}: BoardProps){
    const [selectedTiles, setSelectedTiles] = useState<string[]>(["00", "12", "54"]);
    const columnLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


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

function generateBoard(){
    const board = [];
    for(let i=0; i<BOARD_DIMENSION; i++){
        board.push(generateRow(i));
    }
    return board;
}

function generateRow(rowNumber: number){
    const currentRow = [];
    for(let i=0; i<BOARD_DIMENSION; i++){
        currentRow.push(<Tile row={rowNumber} col={i}/>)
    }
    return currentRow;
}

export default Board;