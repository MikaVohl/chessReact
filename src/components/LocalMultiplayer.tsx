import Board from './Board';
import { client } from '../App';

function LocalMultiplayer(){

    client.activate();

    client.onWebSocketError = () => {
        console.log("Failed to connect");
    };
    client.onConnect = () => {
        console.log("Connected");
    }

    return(
        <Board onTileClick={onTileClick}/> 
    );
}

function onTileClick(tileKey: string){
    console.log(tileKey);
}

export {LocalMultiplayer, onTileClick};
