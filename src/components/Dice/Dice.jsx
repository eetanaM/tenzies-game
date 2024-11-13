import "./Dice.css"

export default function Dice({value, isHeld, holdDice}) {
    const diceDots = [];
    for(let i = 0; i < value; i++) {
        diceDots.push(<li className="dice-point" key={i}></li>)
    }

    let diceStyle;

    switch(value) {
        case 1: diceStyle = "dice_one"
            break;
        case 2: diceStyle = "dice_two"
            break;
        case 3: diceStyle = "dice_three"
            break;
        case 4: diceStyle = "dice_four"
            break;
        case 5: diceStyle = "dice_five"
            break;
        case 6: diceStyle = "dice_six"
            break;
    }

    return (
        <ul className={isHeld ? `dice-held ${diceStyle}` : `dice ${diceStyle}`} onClick={holdDice}>
            {diceDots}
        </ul>
    )
}
