import { position } from '@chakra-ui/react';
import { LocalMultiplayer } from '../components/LocalMultiplayer';
// import { OnlineMultiplayer } from '../components/OnlineMultiplayer';
// import { Singleplayer } from '../components/Singleplayer';

type GamePageProps = {
  local?: boolean | true;
  multi?: boolean | true;
  single?: boolean | true;
  online?: boolean | true;
  host?: boolean | true;
}

function GamePage(props: GamePageProps) {
  let game;
  game = <LocalMultiplayer />;
  // if(props.local) {
  //   if(props.single){
  //     game = <Singleplayer />;
  //   }
  //   else{
  //     game = <LocalMultiplayer />;
  //   }
  // }
  // else if(props.online){
  //   if(props.host){
  //     game = <OnlineMultiplayer />;
  //   }
  //   else{
  //     let code = prompt("Enter your joincode");
  //     if(code == null){
  //       code = "";
  //     }
  //     game = <OnlineMultiplayer joinCode={code}/>;
  //   }
  // }
  // else {
  //   game = <LocalMultiplayer />;
  // }

  return (
      game
  );
}

export { GamePage };