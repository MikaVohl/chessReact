import Board from './Board';
import { client } from '../App';
import { useState } from 'react';

var isStarted = false;

function LocalMultiplayer(){
    const [gameStarted, setGameStarted] = useState(false);
    

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

            function callback(message: { body: string; }) {
                console.log("From Server: "+message.body);
            };

            var subscription = client.subscribe("/topic/receivedInstruction", callback);

        }
    }

    
    return(
        <div id="game">
            {!gameStarted && <button className="startButton" onClick={startGame} key="startButton">Start Game</button>}
            <Board onTileClick={onTileClick}/> 
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



export {LocalMultiplayer, onTileClick};
