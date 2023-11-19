import Board from './Board';
import { client } from '../App';
import { useState } from 'react';
import { start } from 'repl';

var isStarted: boolean = false;
var sessionId: string = "";

function LocalMultiplayer(){
    const [gameStarted, setGameStarted] = useState(false);
    const [checkmate, setCheckmate] = useState(false);
    const [currentTurn, setTurn] = useState(true);
    const [tileSelectedList, setSelections] = useState([""]);
    const [board, updateBoard] = useState([
        "br","bn","bb","bq","bk","bb","bn","br"
        ,"bp","bp","bp","bp","bp","bp","bp","bp"
        ,"  ","  ","  ","  ","  ","  ","  ","  "
        ,"  ","  ","  ","  ","  ","  ","  ","  "
        ,"  ","  ","  ","  ","  ","  ","  ","  "
        ,"  ","  ","  ","  ","  ","  ","  ","  "
        ,"wp","wp","wp","wp","wp","wp","wp","wp"
        ,"wr","wn","wb","wq","wk","wb","wn","wr"
    ]);

    function startGame(){
        
        

        client.activate();

        // client.onWebSocketError = () => {
        //     console.log("Failed to connect");
        // };
        
        client.onConnect = () => {
            setGameStarted(true);
            isStarted = true;

            var connectionFeedback = client.subscribe("/app/serverCommands", connectionMsg);
            

            var subscription = client.subscribe("/user/topic/serverCommands", receiveSelections);


                function connectionMsg(message: { body: string }) {
                    sessionId = message.body.substring(4, 40);
                    let currentBoard = message.body.substring(40);
                    updateBoard(decodeString(currentBoard));
                    setSelections([""]);
                }
            
                function receiveSelections(message: { body: string }) {
                    if(message.body.charAt(0) == "1"){ // first click
                        setSelections(decodeString(message.body.substring(1)));
                    }
                    else if(message.body.charAt(0) == "2"){ // second click
                        updateBoard(decodeString(message.body.substring(1)));
                        setSelections([""]);
                        setTurn((prevTurn) => !prevTurn); // react passes the current value of currentTurn as the argument to any function inside of setTurn
                    }
                    else if(message.body.charAt(0) == "3"){ // checkmate
                        updateBoard(decodeString(message.body.substring(1)));
                        setSelections([""]);
                        setCheckmate(true);
                        client.deactivate();
                    }
            };

        }
    }

    function checkmateAction(){
        setCheckmate(false);
    }
    function restartGame(){
        client.deactivate();
        setTurn(true);
        setGameStarted(false);
    }
    return(
        <>
            <div id="titlebar">
                <h1 id="title"><em>Chasing</em><b> Checkmates</b></h1>
            </div>
            <div id="game">
                {(!gameStarted || checkmate) && <div id="overlay"></div>}
                {checkmate && <button className="startButton" onClick={checkmateAction} key="checkmateButton">Checkmate!!<br></br>{currentTurn ? "White" : "Black"} Wins</button>}
                {!gameStarted && <button className="startButton" onClick={startGame} key="startButton">Start Game</button>}
                <Board onTileClick={onTileClick} selectedTiles={tileSelectedList} board={board}/> 
                {gameStarted && <div id="infoPanel">
                    <h2>Current Turn:</h2>
                    <h1>{currentTurn ? "White" : "Black"}</h1>
                </div>}
                {(gameStarted || checkmate) && <button className="restartButton" onClick={restartGame} key="restartButton">Restart Game</button>}
            </div>
        </>
        
    );
}

function onTileClick(tileKey: string){
    if(isStarted){
        client.publish({
            destination: '/app/incomingInfo',
            body: tileKey,
            headers: {id: sessionId}
        });
    }
}

function decodeString(encoded: string){
    let output = [];
    for(let i=0; i<=encoded.length+1/2; i+=2){
        output.push(encoded.charAt(i)+""+encoded.charAt(i+1));
    }
    return output;
}


export {LocalMultiplayer, onTileClick};
