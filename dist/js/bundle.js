(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pokomo = function () {
	function Pokomo() {
		_classCallCheck(this, Pokomo);
	}

	_createClass(Pokomo, [{
		key: 'wow',
		value: function wow() {
			alert('wow! wow!');
		}
	}]);

	return Pokomo;
}();

var Monster = function (_Pokomo) {
	_inherits(Monster, _Pokomo);

	function Monster(name, image, hp, type) {
		_classCallCheck(this, Monster);

		var _this = _possibleConstructorReturn(this, (Monster.__proto__ || Object.getPrototypeOf(Monster)).call(this));

		_this.name = name;
		_this.image = image;
		_this.hp = hp;
		_this.type = type;
		return _this;
	}

	_createClass(Monster, [{
		key: 'getName',
		value: function getName() {
			return this.name;
		}
	}, {
		key: 'getImage',
		value: function getImage() {
			return this.image;
		}
	}, {
		key: 'getHP',
		value: function getHP() {
			return this.hp;
		}
	}, {
		key: 'getType',
		value: function getType() {
			return this.type;
		}
	}, {
		key: 'setHurt',
		value: function setHurt(value) {
			this.hp -= value;
		}
	}, {
		key: 'isAlive',
		value: function isAlive() {
			if (this.hp > 0) {
				return true;
			} else {
				return false;
			}
		}
	}]);

	return Monster;
}(Pokomo);

exports.default = Monster; // ES6 模組化方法

},{}],2:[function(require,module,exports){
'use strict';

var _Monster = require('./Monster');

var _Monster2 = _interopRequireDefault(_Monster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 把Monster.js引入進來

var charmander = new _Monster2.default('小火龍', './dist/img/charmander.png', 100, '火系');
var squirtle = new _Monster2.default('傑尼龜', './dist/img/squirtle.png', 100, '水系');
var bulbasaur = new _Monster2.default('妙蛙種子', './dist/img/bulbasaur.png', 100, '草系');

var cyndaquil = new _Monster2.default('火球鼠', './dist/img/cyndaquil.png', 100, '火系');
var totodile = new _Monster2.default('小鋸鱷', './dist/img/totodile.png', 100, '水系');
var chikorita = new _Monster2.default('菊草葉', './dist/img/chikorita.png', 100, '草系');

var monsters = [charmander, squirtle, bulbasaur];
var competitors = [cyndaquil, totodile, chikorita];

var myHP = 3; // 觀察還有幾隻神奇寶貝
var cpHP = 3;

document.querySelector('#play').addEventListener('click', function () {
	var isFight = true;
	var choice = parseInt(prompt('小智，請問你要派出哪隻神奇寶貝呢 (請輸入數字) ? ---------- 0 小火龍 1 傑尼龜 2 妙蛙種子'));
	var competitorChoice = Math.floor(Math.random() * 3);

	var winner = checkWinner();

	if (winner) {
		alert('\u52DD\u8CA0\u5DF2\u5206\uFF0C\u7372\u52DD\u7684\u662F' + winner + '\u9078\u624B');
	} else {
		// 隨機決定一個還存活的對方神奇寶貝
		while (!competitors[competitorChoice].isAlive()) {
			competitorChoice = Math.floor(Math.random() * 3);
		}

		// 驗證使用者輸入的數字是否正確
		if (!(choice < 3) || !(choice >= 0)) {
			alert('請輸入正確數字喔!');
			return 0;
		}

		if (monsters[choice].isAlive()) {
			var type = void 0;
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
			alert(monsters[choice].getName() + ' \u5DF2\u5931\u53BB\u6230\u9B25\u80FD\u529B\uFF01');
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
	switch (type) {
		case 'win':
			// 我們剋對方
			monsters[choice].setHurt(5);
			competitors[competitorChoice].setHurt(50);
			checkAlive(choice, competitorChoice);
			alert('\u5C31\u6C7A\u5B9A\u662F\u4F60\u4E86\uFF01' + monsters[choice].getName() + ' ------ \u5C0D\u65B9\u6D3E\u51FA' + competitors[competitorChoice].getName() + '\uFF0C\u592A\u597D\u4E86\uFF0C\u6293\u4F4F\u5C0D\u65B9\u5F31\u9EDE\uFF01 HP -5\uFF0C' + monsters[choice].getName() + ' HP \u9084\u5269 ' + monsters[choice].getHP());
			break;
		case 'lost':
			// 對方剋我們
			monsters[choice].setHurt(50);
			competitors[competitorChoice].setHurt(5);
			checkAlive(choice, competitorChoice);
			alert('\u5C31\u6C7A\u5B9A\u662F\u4F60\u4E86\uFF01' + monsters[choice].getName() + ' ------ \u5C0D\u65B9\u6D3E\u51FA' + competitors[competitorChoice].getName() + '\uFF0C\u4E0D\u597D\uFF0C\u5C6C\u6027\u76F8\u524B\uFF01 HP -50\uFF0C' + monsters[choice].getName() + ' HP \u9084\u5269 ' + monsters[choice].getHP());
			break;
		case 'tie':
			// 互相不剋，勢均力敵
			monsters[choice].setHurt(30);
			competitors[competitorChoice].setHurt(30);
			checkAlive(choice, competitorChoice);
			alert('\u5C31\u6C7A\u5B9A\u662F\u4F60\u4E86\uFF01' + monsters[choice].getName() + ' ------ \u5C0D\u65B9\u6D3E\u51FA' + competitors[competitorChoice].getName() + '\uFF0C\u96D9\u65B9\u52E2\u5747\u529B\u6575\uFF01 HP -30\uFF0C' + monsters[choice].getName() + ' HP \u9084\u5269 ' + monsters[choice].getHP());
			break;
	}
}

function showView(choice, competitorChoice) {
	document.querySelector('#player1-list').innerHTML = genViewHTML(monsters[choice]);
	document.querySelector('#player2-list').innerHTML = genViewHTML(competitors[competitorChoice]);
}

function genViewHTML(pokemon) {
	return '\n\t  <li class="list-group-item">\n\t    <img class="monster-img" src="' + pokemon.getImage() + '">\n\t  </li>\n\t  <li class="list-group-item">\n\t    <div class="progress">\n\t      <div class="progress-bar" role="progressbar" aria-valuenow="' + pokemon.getHP() + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + pokemon.getHP() + '%;">\n\t        ' + pokemon.getHP() + '%\n\t      </div>\n\t    </div>\n\t  </li>\n\t  <li class="list-group-item">' + pokemon.getName() + '</li>\n\t  <li class="list-group-item">\u5C6C\u6027\uFF1A' + pokemon.getType() + '</li>\n\t';
}

},{"./Monster":1}]},{},[2]);
