import Board from './Board';
import { client } from '../App';
import { useState } from 'react';

var isStarted = false;

function LocalMultiplayer(){
    const [gameStarted, setGameStarted] = useState(false);    
    const [tileSelectedList, setSelections] = useState([""]);


    function startGame(){
        setGameStarted(true);
        isStarted = true;

        client.activate();

        client.onWebSocketError = () => {
            console.log("Failed to connect");
        };
        
        client.onConnect = () => {
            console.log("Connected");

            client.publish({
                destination: '/app/connect'
            });


            var subscription = client.subscribe("/topic/possibleMoves", receiveSelections);

            
                function receiveSelections(message: { body: string; }) {
                console.log("From Server: "+message.body);
                setSelections(decodeString(message.body));
            };

        }
    }

    
    return(
        <div id="game">
            {!gameStarted && <button className="startButton" onClick={startGame} key="startButton">Start Game</button>}
            <Board onTileClick={onTileClick} selectedTiles={tileSelectedList}/> 
        </div>
    );
}

function onTileClick(tileKey: string){
    if(isStarted){
        client.publish({
            destination: '/app/incomingInfo',
            body: tileKey
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
