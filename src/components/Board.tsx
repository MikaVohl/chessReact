import Tile from './Tile';

// TO-DO: Add an updateboard function that calls updatetile functions on whatever tiles changed

interface BoardProps {
    onTileClick: (key: string) => void;
}

const BOARD_DIMENSION = 8;
const chessboardSetup = generateBoard();

function Board({onTileClick}: BoardProps){

    const columnLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    return(
        <div id="chessboard">
            {chessboardSetup.map((row, rowIndex) => (
                <div className="tileRow" key={rowIndex}>
                    <h2 className="sideLabel" id="rowLabel">{8-rowIndex}</h2>
                    {row.map((cell, cellIndex) => (
                        <div onClick={() => onTileClick(rowIndex+""+cellIndex)} className={"square "+( (rowIndex+cellIndex)%2 == 0 ? "white" : "black" )} key={cellIndex}>{cell}</div>
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


// function Board(){
//     return(
//         <div class="game">
//             <div class="chessboard">
//                 <script>
//                     alert("Hello world");
//                     createBoard();
//                     defineClickBehaviours();
//                 </script>
//             </div>
//         </div>
//     );
// }

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

// function addPiece(pieceName: string, row: number, col: number){
//     const rowColId = String.fromCharCode(row+97)+""+String.fromCharCode(col+97);
//     const selectedSquare = document.querySelector("#"+rowColId);
//     if(selectedSquare == null) return;
//     const imagePath = "pieces/"+pieceName+".png";
//     const imgElement = document.createElement('img');

//     imgElement.src = imagePath;

//     selectedSquare.appendChild(imgElement);
    
// }

// function createBoard(){
//     console.log("Starting creating board");
//     const chessboardContainer = document.querySelector('.chessboard');
//     if(chessboardContainer == null) return;
//     for(var i=0; i<8; i++){
//         for(var j=0; j<8; j++){
//             const square = document.createElement("div");
//             square.className = ((i+j) % 2 ? "white" : "black")+" square";
//             square.id = String.fromCharCode(97 + i)+""+String.fromCharCode(97 + j);
//             chessboardContainer.appendChild(square);

//             if(i <= 1 || i >= 6){
//                 addStartingPiece(i, j);
//             }
//         }
//     }
//     console.log("Finshed creating board");
// }

// function addStartingPiece(row: number, col: number){
//     var pieceName = "";
//     if(row <= 1){
//         pieceName += "b";
//     }else{
//         pieceName += "w";
//     }

//     if(row == 1 || row == 6){
//         pieceName += "p";
//     }
//     else if(col == 0 || col == 7){
//         pieceName += "r";
//     }
//     else if(col == 1 || col == 6){
//         pieceName += "n";
//     }
//     else if(col == 2 || col == 5){
//         pieceName += "b";
//     }
//     else if(col == 3){
//         pieceName += "q";
//     }
//     else if(col == 4){
//         pieceName += "k";
//     }
//     addPiece(pieceName, row, col);
// }

// function onTileClick(rowColId: string){
//     const tile = document.getElementById(rowColId);
//     if(tile == null) return;
//     if(tile.classList.contains('selected')){
//         removeHighlight(tile);
//         clearSelected();
//     }else{
//         clearSelected();
//         highlightTile(tile);
//     }
// }

// function highlightTile(selectedTile: HTMLElement){
//     selectedTile.className = selectedTile.className + ' selected';
// }

// function removeHighlight(selectedTile: HTMLElement){
//     selectedTile.className = selectedTile.className.replace(' selected', '');
// }

// function clearSelected(){
//     const squares = document.getElementsByClassName("square") as HTMLCollectionOf<HTMLElement>;
//     for (let i=0; i<squares.length; i++) {
//         if(squares[i].classList.contains('selected')){
//             removeHighlight(squares[i]);
//         }
//     }
// }


// function defineClickBehaviours(){
//     const squares = document.getElementsByClassName("square") as HTMLCollectionOf<HTMLElement>;

//     for (let i=0; i<squares.length; i++) {
//         squares[i].onclick = function () {onTileClick(squares[i].id)}
//     }
// }