import Board from './Board';
import { client } from '../App';

function LocalMultiplayer(){

    client.activate();

    client.onWebSocketError = () => {
        console.log("Failed to connect");
    };
    
    client.onConnect = () => {
        console.log("Connected");

        function callback(message: { body: string; }) {
            console.log("From Server: "+message.body);
        };

        console.log(client.brokerURL);
        var subscription = client.subscribe("/topic/receivedInstruction", callback);

    }


    return(
        <Board onTileClick={onTileClick}/> 
    );
}

function onTileClick(tileKey: string){
    // console.log(tileKey);
    client.publish({
        destination: '/app/incomingInfo',
        body: tileKey
    });
    // console.log("Sent")
}

export {LocalMultiplayer, onTileClick};
