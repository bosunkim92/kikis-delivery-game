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

let targetLists = [];
let currentPlayerChoice= [];
let matchedList = []; 
let successNumber;
let level = 1;
let chances = 10;
let currentMatchedListIdx = 0;

//cached element reference:
const startButton = document.getElementById('start-game');
const logo = document.getElementById('logo');
const landing = document.querySelector('.landing');
const commentBox = document.querySelector('.comment-box');
const gameBoard = document.querySelector('.game-board');
const hintDiv = document.querySelector('.hint');

// check mark image
// *extra = will provide extra (possibly pop-up page) document to show people’s face and name - for the reference


//event listeners:

startButton.addEventListener('click', function(e) {
	logo.style.display = 'none';
	startButton.style.display = 'none';
	init();
})

gameBoard.addEventListener('click', function(e){
	if(e.target.className !== 'game-board'){
		if(currentPlayerChoice.length < 2){
			console.log(e.target);
			console.log(e.target.firstElementChild);
			e.target.firstElementChild.style.display = 'block';
			currentPlayerChoiceGenerator(e.target);
			if(currentPlayerChoice.length === 2){
				successMatch();
				console.log(`this is current length of matchedList ${matchedList.length}`);
			}
		} else {
			return;
		}
	}
})
// *extra help-icon which will generate pop-up for the reference
hintDiv.addEventListener('click', function(){
	console.log('hi there');
})
//functions:

function init() {
	if(targetLists != ""){
		targetLists = [];
	}
	if(chances === 0){
		chances = 10;
	}
	if(matchedList != ""){
		matchedList = [];
	}
	targetGenerator();
	shuffle(cardDeck);
	render();
}

function render() {
	if(level >= 1){
		clearDOM();
	}
	commentGenerator();
	generateCardDeck(cardDeck);
	const hint = document.createElement('button');
	hint.textContent = 'hint';
	hint.id = 'hint';
	hintDiv.appendChild(hint);
}

function generateCardDeck(cardDeckArr) {
	for(elem in cardDeckArr){
		const cardDeckDiv = document.createElement('div');
		cardDeckDiv.textContent = `${cardDeckArr[elem]}`;
		cardDeckDiv.className = `card-deck ${cardDeckArr[elem]}`;
		gameBoard.appendChild(cardDeckDiv);
		let idvCard = cardDeckArr[elem];
		const cardImg = document.createElement('img');

		function imgSrcUrl(idvCard) {
			if (Object.keys(people).includes(idvCard)) {
				cardImg.src = `${people[idvCard].imgUrl}`;
			} else if (Object.keys(items).includes(idvCard)) {
				cardImg.src = `${items[idvCard].imgUrl}`;
			}
		}

		imgSrcUrl(idvCard);
		const card_deck = document.querySelector(`.${idvCard}`);
		card_deck.appendChild(cardImg)
	}
	const cardDeckImg = document.querySelectorAll('.card-deck img');
	for(elem of cardDeckImg){
		elem.style.display = 'none';
	}
	//room for improvement: add backside image for the cards
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

	if (level >= 1){
		for(let i = 0; i < 3; i++) {
			let idvTargetList = [deliveryTarget[i], deliveryItem[i]];
			targetLists.push(idvTargetList);
		}
	}
}

function commentGenerator() {
	//based on target generated, create comment that will be posted on the DOM
	commentBox.style.border = 'thick solid #ffd900';
	commentBox.style.boxShadow = '1px 1px 1px 1px #bd9700';
	const kiki = document.createElement('img');
	kiki.src = 'img/kiki.png';
	kiki.style.width = '200px';
	kiki.style.height = 'auto';
	commentBox.appendChild(kiki);
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
	const currentLevel = document.createElement('h3');
	currentLevel.textContent = `Level: ${level}`;
	commentBox.appendChild(currentLevel);
	const currentChances = document.createElement('h2');
	commentBox.appendChild(currentChances);
	const currentChancesImg = document.querySelector('h2');
	for(let i = 0; i < chances; i++){
		const heartColumn = document.createElement('div');
		heartColumn.className = 'hearts-column';
		currentChancesImg.appendChild(heartColumn); 
		const heartImg = document.createElement('img');
		heartImg.className = 'hearts';
		heartImg.src = 'img/heart.png';
		heartColumn.appendChild(heartImg);
	}
}

function currentPlayerChoiceGenerator(clickedElement) {
	let cardSelected = clickedElement.textContent;
	if (currentPlayerChoice.length < 2){
		currentPlayerChoice.push(cardSelected);
	}
}

function successMatch() {
	successNumber = matchedList.length;
	for(elem in targetLists){
		let idvTargetList = targetLists[elem];
		if(idvTargetList.includes(currentPlayerChoice[0]) && idvTargetList.includes(currentPlayerChoice[1])){
			matchedList.push([]);
			matchedList[currentMatchedListIdx].push(currentPlayerChoice[0]);
			matchedList[currentMatchedListIdx].push(currentPlayerChoice[1]);
			currentMatchedListIdx++;
			for(elem of currentPlayerChoice){
				let eachCard = document.querySelector(`.${elem}`);
				console.log(eachCard);
				eachCard.firstElementChild.style.boxShadow = '0px 0px 4px 6px rgba(0, 255, 98, 0.9)';
			}
			console.log(`you have delivered correct item to person!`);
			console.log(`this is matched List ${matchedList}`);
		} else if(!idvTargetList.includes(currentPlayerChoice[0]) || !idvTargetList.includes(currentPlayerChoice[1])){
		}
	}
	//failed try handler:
	if(successNumber === matchedList.length){
		console.log('it is in the failure handler function');
		setTimeout(function(){
			chances--;
			if (chances === 0){
				startButton.textContent = "replay";
				startButton.style.display = 'block';
			}
			let updateChances = document.querySelector('h2');
			updateChances.removeChild(updateChances.firstChild);
			for(elem of currentPlayerChoice){
				let firstEl = document.querySelector(`.${elem}`).firstElementChild;
				firstEl.style.display = 'none';
			}			
		}, 300);
	}
//clearing memory of currentPlayerChoice after each set of cards selection
	setTimeout(function(){
		if(currentPlayerChoice.length === 2){
			for(let i = 0; i < 2; i++){
				currentPlayerChoice.pop();
			}
		}
	}, 700);

	setTimeout(function(){
		if(matchedList.length === targetLists.length){
			levelUp();
			return;
		}
	}, 1000);
}

	// once matchedList get updated, render a image of check mark on the side of the targetList 
		//possible code to include to render(): 
			// let p (comment) = document.getElementById(‘comment’).textContent = `${person} needs ${item} <img scr=’/img/check.png’>`;        something like this ..

function levelUp() {
	// check if all the matchedList targetList objects
	level++;
	let updateLevel = document.querySelector('h3');
	updateLevel.textContent = `Level: ${level}`;
	successNumber = 0;
	currentMatchedListIdx = 0;
	matchedList = [];
	alert(`You have successfully delivered all items to the neighbors! Now your level is ${level}`);
	init();
}

function clearDOM() {
	while(commentBox.firstChild){
		commentBox.removeChild(commentBox.firstChild);
	}
	while(gameBoard.firstChild){
		gameBoard.removeChild(gameBoard.firstChild);
	}

}

function generateHint(peopleArr) {
	for(person in peopleArr){
		const cardDeckDiv = document.createElement('div');
		cardDeckDiv.textContent = `${person}`;
		cardDeckDiv.classNAme = `hint person-name`;
	}
}
//room for improvement = greeting comment can include player's input name;