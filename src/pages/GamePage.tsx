import { LocalMultiplayer } from '../components/LocalMultiplayer';

type GamePageProps = {
  local?: boolean | true;
  multi?: boolean | true;
  single?: boolean | true;
}

function GamePage(props: GamePageProps) {
  let game;
  game = <LocalMultiplayer />;

  return (
    game
  );
}

export { GamePage };