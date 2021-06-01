//Pseudocode
//define constant variable:
const people = {
	tombo: {
		name: 'Tombo',
		imgUrl: 'img/Tombo.png'
	},
	ursula: {
		name: 'Ursula',
		imgUrl: 'img/Ursula.png'
	},
	ket: {
		name: 'Ket',
		imgUrl: 'img/Ket.png'
	},
	osono: {
		name: 'Osono',
		imgUrl: 'img/Osono.png'
	},
	maki: {
		name: 'Maki',
		imgUrl: 'img/Maki.png'
	},
	police: {
		name: 'Police',
		imgUrl: 'img/Police.png'
	}
}

const items = {
	hamburger: {
		name: 'Hamburger',
		imgUrl: 'img/hamburger.png'
	},
	mail: {
		name: 'Mail',
		imgUrl: 'img/Mail.png'
	},
	bread: {
		name: 'Bread',
		imgUrl: 'img/Bread.png'
	},
	milk: {
		name: 'Milk',
		imgUrl: 'img/Milk.png'
	},
	secretDocument: {
		name: 'Secret Document',
		imgUrl: 'img/SecretDocument.png'
	},
	magicPotion: {
		name: 'Magic Potion',
		imgUrl: 'img/MagicPotion.png'
	},
	newspaper: {
		name: 'Newspaper',
		imgUrl: 'img/NewsPaper.png'
	},
	flowers: {
		name: 'Flowers',
		imgUrl: 'img/Flowers.png'
	},
	present: {
		name: 'Present',
		imgUrl: 'img/Present.png'
	},
	toy: {
		name: 'Toy',
		imgUrl: 'img/Toy.png'
	},
	key: {
		name: 'Key',
		imgUrl: 'img/Key.png'
	},
	bentoBox: {
		name: 'Bento Box',
		imgUrl: 'img/BentoBox.png'
	}
}

const cardDeck = ['tombo', 'ursula', 'ket',
'osono', 'maki', 'police',
'hamburger', 'mail', 'bread',
'milk', 'secretDocument', 'magicPotion',
'newspaper', 'flowers', 'present',
'toy', 'key', 'bentoBox'];



//define state variable:
let currentLocation = {
	//when the game is newly generated, this variable needs to be updated
};

// the target needs to be generated each time the game restarts.
let targetLists = [];

//let currentPlayerChoice= {
	//when player clicks card, this variable needs to be updated
	//only one set of target (a person, an item) can be stored 
	//once the set is correct, this value needs to be pushed(or other object method similar to array.push*) to matchedList
//}  //is object better? or array better in this case?

let matchedList = {}; //starts as empty object, will be updated as the new match happens

let level = 1; //shows current level. Once all the objects in the targetList are matched, this value will increase by 1.

let chances; //shows how many chances left. Each time mismatch happens, this value decreases by 1.




//cached element reference:


const startButton = document.getElementById('start-game');
const logo = document.getElementById('logo');
const landing = document.querySelector('.landing');
const commentBox = document.querySelector('.comment-box');
const gameBoard = document.querySelector('.game-board');

// cardDeck; front and back. When the game starts, all the cardDeck should show the ‘back’ side image
// when the player choice is matching any of targetList, then highlight (box-shadow) the cards on the DOM - this will stay showing ‘face’ side up until the next game
// chances - (either heart or star) 
// level
// delivery list comment (targetList)
// check mark image

// *extra = will provide extra (possibly pop-up page) document to show people’s face and name - for the reference


//event listeners:

// cardDeck -> when it’s clicked then it will trigger the matching function & winning condition
// *extra help-icon which will generate pop-up for the reference

//functions:

startButton.addEventListener('click', function(e) {
	logo.style.display = 'none';
	startButton.style.display = 'none';
	init();
	render();
})




function init() {
	// invoke mixingCard() function when the game resets
	targetGenerator();
	shuffle(cardDeck);
	// console.log('this is init function working');
	// generate target by targetGenerator()
	// invoke render()
	// invoke successMatch() function
}

function render() {
	// alter the DOM element
	commentGenerator();
	generateCardDeck(cardDeck);
	// console.log('this is render function working');

}

function generateCardDeck(cardDeckArr) {
	for(elem in cardDeckArr){
		const cardDeckDiv = document.createElement('div');
		cardDeckDiv.className = `card-deck ${cardDeckArr[elem]}`;
		gameBoard.appendChild(cardDeckDiv);
		let idvCard = cardDeckArr[elem];
		const cardImg = document.createElement('img');
		// let imgSrcUrl = people.tombo.imgUrl;
		// console.log(imgSrcUrl);
		function imgSrcUrl(idvCard) {
		if (Object.keys(people).includes(idvCard)) {
			cardImg.src = `${people[idvCard].imgUrl}`;
		} else if (Object.keys(items).includes(idvCard)) {
			cardImg.src = `${items[idvCard].imgUrl}`;
		}
		}
		// cardDeckDiv.style.backgroundImage = `url('${imgSrcUrl}')`;
		imgSrcUrl(idvCard);
		const card_deck = document.querySelector(`.${idvCard}`);
		card_deck.appendChild(cardImg)
	}
	// cardDeckDiv.innerText = idvCard;
}



function shuffle(arr) {
	//randomly rearrange cardDeck array- used Fisher-Yates Shuffle
	let len = arr.length;
	let temp;
	let randomIdx;

	//while there remain element to shuffle...
	while(len){
	//pick a random element's index within remaining array element
	randomIdx = Math.floor(Math.random() * len--);

	//and swap it with the current (temporary) element (from the back side)
	temp = arr[len];
	arr[len] = arr[randomIdx];
	arr[randomIdx] = temp; 
	}

	return arr;

}

function targetGenerator() {
	//iterate over people object and choose one person
	//iterate over items object and choose one item
	//people and objects cannot be listed more than once in the targetList
	//generates targetList
	let deliveryTarget = Object.keys(people);
	let deliveryItem = Object.keys(items);

	shuffle(deliveryTarget);
	shuffle(deliveryItem);

	if (level === 1){
		for(let i = 0; i < 3; i++) {
			let idvTargetList = [deliveryTarget[i], deliveryItem[i]];
			targetLists.push(idvTargetList);
		}
	}
}

function commentGenerator() {
	//based on target generated, create comment that will be posted on the DOM
	const greeting = document.createElement('p');
	greeting.textContent = 'Good Morning! Here are today\'s delivery lists!';
	commentBox.appendChild(greeting);
	for(elem in targetLists){
		const deliveryList = document.createElement('p');
		let idvTarget = targetLists[elem]
		let targetListComment = `${people[idvTarget[0]].name} needs ${items[idvTarget[1]].name}`;
		deliveryList.textContent = targetListComment;
		commentBox.appendChild(deliveryList);
	}
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


//room for improvement = greeting comment can include player's input name;