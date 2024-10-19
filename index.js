const getID = element => document.getElementById(element);

const gameBox = getID("gameBox");
const turn = getID("turn");
const winnerBox = getID("winnerBox");
const startBtn = getID("startBtn");
let gameOver = false;
let turnNumber = 0;

const winCombos = [
  [1, 2, 3],
  [1, 4, 7],
  [4, 5, 6],
  [7, 8, 9],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [1, 5, 9],
];


function player(name, marker) {
    let position = []

    
    function newPosition(place) {
        // console.log(place === 'three')
        switch (place) {
            case 'one':
                position.push(1)
                break;
            
            case 'two':
                position.push(2)
                break;
            
            case 'three':
                position.push(3)
                break;
            
            case 'four':
                position.push(4)
                break;
            
            case 'five':
                position.push(5)
                break;
            
            case 'six':
                position.push(6)
                break;
            
            case 'seven':
                position.push(7)
                break;
            
            case 'eight':
                position.push(8)
                break;
            
            case 'nine':
                position.push(9)
                break;
        
            default:
                break;
        }
    }

    return {
        name: name,
        pinter: marker,
        newPosition: newPosition,
        'position': position
    }
}

const firstPlayer = player("Jack", 'X')
const secondPlayer = player("Jones", 'O')


const checkArray = (array,name) => {
  // Each of the nested arrays in winningArray
    for (const winningCombination of winCombos) {
    // console.log(winningCombination)
    // Every number in the winningCombination is also in the provided array
    if (winningCombination.every((element) => array.sort().includes(element))) {
        console.log(array)
        winnerBox.style.display = 'block'
        winnerBox.textContent = `Player ${name} Win's`
        turn.style.display = 'none'
        gameBox.style.pointerEvents = "none";
        gameOver = true
        return true;
    }
  }

  // No complete match
  return false;
};

const x = setInterval(() => {
    console.log("in X")
    if (firstPlayer.position.length >= 3 || secondPlayer.position.length >= 3) {
        const a = setInterval(() => {
            console.log("First Player : ", firstPlayer.position)
            console.log("Second Player : ", secondPlayer.position)
            console.log(checkArray(firstPlayer.position,"X"))
            console.log(checkArray(secondPlayer.position, "O"))
            if (gameOver) {
                clearInterval(x);
                clearInterval(a);
            }
        }, 100)
    }
},500)


gameBox.addEventListener('click', (event) => {
    console.log(event.target.id)
    console.log(turnNumber)
    let id = event.target.id;
    // startBtn.textContent = 'Reset'
    


    for (let index = turnNumber; index < 9; index++) {

        if ((turnNumber % 2) === 0) {
            turn.textContent = "Player O's Turn";
            firstPlayer.newPosition(id)
            const item1 = document.getElementById(id)
            console.log(item1)
            console.log(item1.textContent);
            item1.innerHTML = 'X'
            console.log(firstPlayer.position)
        } else {
            turn.textContent = "Player X's Turn";
            secondPlayer.newPosition(id)
            const item1 = document.getElementById(id)
            console.log(item1)
            console.log(item1.textContent);
            item1.innerHTML = 'O'
            console.log(secondPlayer.position)
        }
        
        if (turnNumber === 9) {
            (turn.style.visibility = 'hidden')
        }

        turnNumber++;
        break;
    }


})

startBtn.addEventListener("click", () => {
  location.reload(); // Simple way to reset
});
