
interface TileProps {
    pieceCode: string;
}

function Tile({pieceCode}: TileProps){
    if(pieceCode != "  " && pieceCode != null){
        return(
            <img src={`${process.env.PUBLIC_URL}/pieces/${pieceCode}.png`} />
        )
    }
    return(
        null
    )
}

export default Tile;