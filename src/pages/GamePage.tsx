import { LocalMultiplayer } from '../components/LocalMultiplayer';
import { OnlineMultiplayer } from '../components/OnlineMultiplayer';

type GamePageProps = {
  local?: boolean | true;
  multi?: boolean | true;
  single?: boolean | true;
  online?: boolean | true;
  host?: boolean | true;
}

function GamePage(props: GamePageProps) {
  let game;
  if(props.local) {
    game = <LocalMultiplayer />;
  }
  else if(props.online){
    if(props.host){
      game = <OnlineMultiplayer />;
    }
    else{
      let code = prompt("Enter your joincode");
      if(code == null){
        code = "";
      }
      game = <OnlineMultiplayer joinCode={code}/>;
    }
  }
  else {
    game = <LocalMultiplayer />;
  }

  return (
    game
  );
}

export { GamePage };