import Board from './Board';
import { client } from '../App';
import { useState } from 'react';

var isStarted: boolean = false;
var sessionId: string = "";

type GamePageProps = {
    joinCode?: string;
}

function OnlineMultiplayer(props: GamePageProps){
    const [gameStarted, setGameStarted] = useState(false);    
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
    const [displayJoinCode, setJoinCode] = useState("");

    function startGame(){
        setGameStarted(true);
        isStarted = true;

        client.activate();

        client.onWebSocketError = () => {
            console.log("Failed to connect");
        };
        
        client.onConnect = () => {
            console.log("Connected");

            // client.publish({
            //     destination: '/app/connect'
            // });

            var connectionFeedback = client.subscribe("/app/serverCommands", connectionMsg);
            

            var subscription = client.subscribe("/user/topic/serverCommands", receiveSelections);


                function connectionMsg(message: { body: string }) {
                    sessionId = message.body.substring(0, 36);
                    let currentBoard = message.body.substring(36);
                    updateBoard(decodeString(currentBoard));
                    setSelections([""]);

                    console.log(sessionId);
                    console.log(currentBoard);
                    // console.log("Joincode="+props.joinCode);
                    // console.log(props.joinCode == null);

                    if(props.joinCode == null){
                         setJoinCode(sessionId);
                    }
                    else{
                        setJoinCode(props.joinCode);
                    }

                }
            
                function receiveSelections(message: { body: string }) {
                    // console.log("From Server: "+message.body);
                    if(message.body.charAt(0) == "1"){
                        setSelections(decodeString(message.body.substring(1)));
                    }
                    else if(message.body.charAt(0) == "2"){
                        updateBoard(decodeString(message.body.substring(1)));
                        setSelections([""]);
                        setTurn((prevTurn) => !prevTurn); // react passes the current value of currentTurn as the argument to any function inside of setTurn
                    }
                    
            };

        }
    }

    
    return(
        <div id="game">
            {!gameStarted && <button className="startButton" onClick={startGame} key="startButton">Start Game</button>}
            <Board onTileClick={onTileClick} selectedTiles={tileSelectedList} board={board}/> 
            <div id="infoPanel">
                <h2>Online Multiplayer:</h2>
                <h2>Current Turn:</h2>
                <h1>{currentTurn ? "White" : "Black"}</h1>
                <h2>Join Code:</h2>
                <h3>{displayJoinCode}</h3>
            </div>
        </div>
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


export {OnlineMultiplayer, onTileClick};
