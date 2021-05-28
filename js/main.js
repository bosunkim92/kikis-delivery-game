
const startButton = document.getElementById('start-game');

console.log(bgImg.style.backgroundImage);


Pseudocode

//define constant variable:

const people = {
	tombo: {
		  name: ‘Tombo’,
		  imgUrl: ‘someUrl.png’
		},
	ursula: {
		name:,
		imgUrl:
		},
	ket: {
		name:,
		imgUrl:
		},
	osono: {
		name:,
		imgUrl:
		},
	maki: {
		name:,
		imgUrl:
		},
	police: {
		name:,
		imgUrl:
		}
	}

const items = {
	hamburger: {},
	mail: {},
	bread: {},
	milk: {},
	secretDocument: {},
	magicPotion: {},
	newsPaper: {},
	flowers: {},
	present: {},
	toy: {},
	key: {},
	bentoBox: {}
}

const cardDeck = [ ‘tombo’, ‘ursula’, ‘ket’, ‘osono’, ‘maki’, ‘police’, ‘hamburger’, ‘mail’, ‘bread’, ‘milk’, ‘secretDocument’, ‘magicPotion’, ‘newsPaper’, ‘flowers’, ‘present’, ‘toy’, ‘key’, ‘bentoBox’];





//define state variable:
let currentLocation = {
	//when the game is newly generated, this variable needs to be updated
	};

let targetList = {
	// the target needs to be generated each time the game restarts.
	first: {
	    people: ‘name’,
	    item: ‘name’
	},
	second: {
	    people:,
	    item:
	},
	third: {
	    people:,
	    item:
	}
}

let currentPlayerChoice= {
	//when player clicks card, this variable needs to be updated
	//only one set of target (a person, an item) can be stored 
	//once the set is correct, this value needs to be pushed(or other object method similar to array.push*) to matchedList
	}  //is object better? or array better in this case?

let matchedList = {}; //starts as empty object, will be updated as the new match happens
	
let level; //shows current level. Once all the objects in the targetList are matched, this value will increase by 1.

let chances: //shows how many chances left. Each time mismatch happens, this value decreases by 1.




	
//cached element reference:



cardDeck; front and back. When the game starts, all the cardDeck should show the ‘back’ side image
when the player choice is matching any of targetList, then highlight (box-shadow) the cards on the DOM - this will stay showing ‘face’ side up until the next game
chances - (either heart or star) 
level
delivery list comment (targetList)
check mark image

*extra = will provide extra (possibly pop-up page) document to show people’s face and name - for the reference


//event listeners:

cardDeck -> when it’s clicked then it will trigger the matching function & winning condition
*extra help-icon which will generate pop-up for the reference

//functions:

function init() {
	// invoke mixingCard() function when the game resets
	// generate target by targetGenerator()
	// invoke render()
	// invoke successMatch() function
}

function render() {
	// alter the DOM element

}

function mixingCard() {
	//randomly rearrange cardDeck array

}

function targetGenerator() {
	//iterate over people object and choose one person
	//iterate over items object and choose one item
	//people and objects cannot be listed more than once in the targetList
	//generates targetList
}

function commentGenerator() {
	//based on target generated, create comment that will be posted on the DOM
}


function successMatch() {
	//if the currentPlayerChoice matches any of the targetList inner objects, push the object to the matchedList 
	// once matchedList get updated, render a image of check mark on the side of the targetList 
		//possible code to include to render(): 
			// let p (comment) = document.getElementById(‘comment’).textContent = `${person} needs ${item} <img scr=’/img/check.png’>`;        something like this ..

	// needs another function that checks if all the targetLis are found(matched). (array method like .every) might work … but will that work the same way to object? 
	// need another function that controls  
	
}

function everyTargetMatched() {
	// check if all the matchedList targetList objects
}
