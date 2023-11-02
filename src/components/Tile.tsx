
interface TileProps {
    row: number;
    col: number;
}

function Tile({row, col}: TileProps){
    let imgPath = ''
    if(row <= 1) imgPath += 'b';
    else if(row >= 6) imgPath += 'w';

    if(row <= 1 || row >= 6){
        if(row == 1 || row == 6) imgPath += 'p';
        else if(col == 0 || col == 7) imgPath += 'r';
        else if(col == 1 || col == 6) imgPath += 'n';
        else if(col == 2 || col == 5) imgPath += 'b';
        else if(col == 3) imgPath += 'q';
        else if(col == 4) imgPath += 'k';

        return(
            <img src={`${process.env.PUBLIC_URL}/pieces/${imgPath}.png`} />
        )
    }
    return(
        null
    )
}

export default Tile;