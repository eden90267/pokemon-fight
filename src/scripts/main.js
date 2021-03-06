import Monster from './Monster'; // 把Monster.js引入進來

const charmander = new Monster('小火龍', './dist/img/charmander.png', 100, '火系');
const squirtle = new Monster('傑尼龜', './dist/img/squirtle.png', 100, '水系');
const bulbasaur = new Monster('妙蛙種子', './dist/img/bulbasaur.png', 100, '草系');

const cyndaquil = new Monster('火球鼠', './dist/img/cyndaquil.png', 100, '火系');
const totodile = new Monster('小鋸鱷', './dist/img/totodile.png', 100, '水系');
const chikorita = new Monster('菊草葉', './dist/img/chikorita.png', 100, '草系');

const monsters = [charmander, squirtle, bulbasaur];
const competitors = [cyndaquil, totodile, chikorita];

let myHP = 3; // 觀察還有幾隻神奇寶貝
let cpHP = 3;

document.querySelector('#play').addEventListener('click', function() {
	let isFight = true;
	let choice = parseInt(prompt('小智，請問你要派出哪隻神奇寶貝呢 (請輸入數字) ? ---------- 0 小火龍 1 傑尼龜 2 妙蛙種子'));
	let competitorChoice = Math.floor(Math.random() * 3);

	const winner = checkWinner();

	if (winner) {
		alert(`勝負已分，獲勝的是${winner}選手`);
	} else {
		// 隨機決定一個還存活的對方神奇寶貝
		while(!competitors[competitorChoice].isAlive()) {
			competitorChoice = Math.floor(Math.random() * 3);
		}

		// 驗證使用者輸入的數字是否正確
		if (!(choice < 3) || !(choice >= 0)) {
			alert('請輸入正確數字喔!');
			return 0;
		}

		if (monsters[choice].isAlive()) {
			let type;
			switch (choice) {
				case 0:
				    if (competitorChoice === 0) {
				    	type = 'tie';
				    } else if (competitorChoice === 1) {
				    	type = 'lost';
				    } else {
				    	type = 'win';
				    }
				    break;
				case 1:
				    if (competitorChoice === 0) {
				    	type = 'win';
				    } else if (competitorChoice === 1) {
				    	type = 'tie';
				    } else {
				    	type = 'lost';
				    }
				    break;
				case 2:
				    if (competitorChoice === 0) {
				    	type = 'lost';
				    } else if (competitorChoice === 1) {
				    	type = 'win';
				    } else {
				    	type = 'tie';
				    }
				    break;
			}
			pk(choice, competitorChoice, type);
			showView(choice, competitorChoice);
		} else {
			alert(`${monsters[choice].getName()} 已失去戰鬥能力！`);
			choice = -1;
		}
	}
});

function checkWinner() {
	if (myHP === 0 && cpHP === 0) {
		return '小智和小茂';
	} else if (cpHP === 0) {
		return '小智';
	} else if (myHP === 0) {
		return '小茂';
	} else {
		return false;
	}
}

function checkAlive(choice, competitorChoice) {
	if (!monsters[choice].isAlive()) {
		myHP -= 1;
	}
	if (!competitors[competitorChoice].isAlive()) {
		cpHP -= 1;
	}
}

function pk(choice, competitorChoice, type) {
	switch(type) {
		case 'win':  // 我們剋對方
		    monsters[choice].setHurt(5);
		    competitors[competitorChoice].setHurt(50);
		    checkAlive(choice, competitorChoice);
		    alert(`就決定是你了！${monsters[choice].getName()} ------ 對方派出${competitors[competitorChoice].getName()}，太好了，抓住對方弱點！ HP -5，${monsters[choice].getName()} HP 還剩 ${monsters[choice].getHP()}`);
		    break;
		case 'lost': // 對方剋我們
		    monsters[choice].setHurt(50);
		    competitors[competitorChoice].setHurt(5);
		    checkAlive(choice, competitorChoice);
		    alert(`就決定是你了！${monsters[choice].getName()} ------ 對方派出${competitors[competitorChoice].getName()}，不好，屬性相剋！ HP -50，${monsters[choice].getName()} HP 還剩 ${monsters[choice].getHP()}`);
		    break;
		case 'tie':  // 互相不剋，勢均力敵
		    monsters[choice].setHurt(30);
		    competitors[competitorChoice].setHurt(30);
		    checkAlive(choice, competitorChoice);
		    alert(`就決定是你了！${monsters[choice].getName()} ------ 對方派出${competitors[competitorChoice].getName()}，雙方勢均力敵！ HP -30，${monsters[choice].getName()} HP 還剩 ${monsters[choice].getHP()}`);
		    break;
	}
}

function showView(choice, competitorChoice) {
	document.querySelector('#player1-list').innerHTML = genViewHTML(monsters[choice]);
	document.querySelector('#player2-list').innerHTML = genViewHTML(competitors[competitorChoice]);
}

function genViewHTML(pokemon) {
	return `
	  <li class="list-group-item">
	    <img class="monster-img" src="${pokemon.getImage()}">
	  </li>
	  <li class="list-group-item">
	    <div class="progress">
	      <div class="progress-bar" role="progressbar" aria-valuenow="${pokemon.getHP()}" aria-valuemin="0" aria-valuemax="100" style="width: ${pokemon.getHP()}%;">
	        ${pokemon.getHP()}%
	      </div>
	    </div>
	  </li>
	  <li class="list-group-item">${pokemon.getName()}</li>
	  <li class="list-group-item">屬性：${pokemon.getType()}</li>
	`;
}