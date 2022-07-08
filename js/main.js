let  ul = document.getElementsByClassName("pizza")[0];
let button = document.getElementsByClassName("meat")[0];
let available = [];
let available_= [];
let selectedPizza;
let countPizza = 0;
class Pizza {
	constructor(name, descrip, type, filling, veget, sauce, price, img) {
		this.name = name;
		this.descrip = descrip;
		this.type = type;
		this.filling = filling;
		this.veget = veget;
		this.sauce = sauce;
		this.price = price;
		this.img = img
	}
}
let order = new Pizza('заказ','','',[],[],[]);	
const menu = [new Pizza('Чоризо фреш', //имя
	'Томатный соус, моцарелла, острая чоризо, сладкий перец', //описание
	'мясная', //тип
	['Острая чоризо'], //начинка
	['Сладкий перец'], //овощи
	['Томатный соус'],//соус
	[123,234,567], //цена
	'чоризо_фреш.jpeg'), //картинка 
			  new Pizza('Домашняя',
	'Пикантная пепперони, ветчина, маринованные огурчики, томаты, моцарелла, томатный соус',
	'мясная', 
	['Пепперони','Ветчина'],
	['Маринованные огурчики', 'Томаты'],
	['Томатный соус'],
	[169, 270, 322],
	'домашняя.jpeg'),
			  new Pizza('Ветчина и сыр',
	'Ветчина, моцарелла, соус альфредо',
	'мясная',
	['Ветчина'],
	[],
	['Соус альфредо'],
	[350, 450, 550],
	'ветчина_и_сыр.jpeg'),
			  new Pizza('Сырная',
	'Моцарелла, сыры чеддер и пармезан, соус альфредо',
	'без мяса',
	['Сыр чеддер'],
	[],
	['Соус альфредо'],
	[360, 480, 600],
	'сырная.jpeg'),
			  new Pizza ('Карбонара',
	'Бекон, сыры чеддер и пармезан, моцарелла, томаты, красный лук, чеснок, соус альфредо, итальянские травы',
	'мясная',
	['Бекон'],
	['Томаты', 'Красный лук'],
	['Соус альфредо'],
	[290, 340, 600],
	'карбонара.jpeg'),
			  new Pizza('Ветчина и грибы',
	'Ветчина, шампиньоны, увеличенная порция моцареллы, томатный соус',
	'мясная',
	['Ветчина', 'Шампиньоны'],
	[],
	['Томатный соус'],
	[129, 229,339],
	'ветчина и грибы.jpeg'),
			  new Pizza('Маргарита',
	'Увеличенная порция моцареллы, томаты, итальянские травы, томатный соус',
	'без мяса',
	[],
	['Томаты'], 
	['Томатный соус'],
	[123,214,415],
	'маргарита.jpeg'),
			  new Pizza('Цыпленок ранч',
	'Цыпленок, ветчина, соус ранч, моцарелла, томаты, чеснок',
	'мясная',
	['Цыпленок', 'Ветчина'],
	['Томаты'],
	['Соус ранч'],
	[132, 432, 576],
	'цыпленок_ранч.jpeg'),
			  new Pizza('Четыре сыра',
	'Сыр блю чиз, сыры чеддер и пармезан, моцарелла, соус альфредо',
	'без мяса',
	['Сыр блю чиз', 'Сыр чеддер', 'Сыр пармезан'],
	[], 
	['Соус альфредо'],
	[237, 421, 674],
	'четыре_сыра.jpeg')];

function nextPizza(){
	$('.finish').fadeTo('slow', 0);
	let e = menu[available[countPizza]];
	$('.app__header').html('Тебе точно нужно попробовать пиццу \n"' + e.name + '"');
	setTimeout(function(){
		$('.finish').css('display', 'block');
		$('.finish').fadeTo('slow', 1);
		$('#pic').attr('src',"./img/"+e.img);
		let sizeArray = $('.size');
		sizeArray.each(function(){
			this.classList.remove('active');
		})
		$(sizeArray[0]).toggleClass('active');
		$('.finish .descrip').html(e.descrip);
		$('.finish .button').html(e.price[0] + '₽');
		countPizza++;
		if (countPizza == available.length) {
			countPizza = 0;
		}
	}, 500);
		
}			  

function finish(){
	let count = 0;
	menu.some(function(e) {
		if (e.type == order.type){
			let pizza = e.sauce
			let found1 = order.filling.every( ai => e.filling.includes(ai));
			let found2 = order.veget.every( ai => e.veget.includes(ai));
			let found3 = order.sauce.every( ai => e.sauce.includes(ai));
			let found1_= e.filling.every( ai => order.filling.includes(ai));
			let found2_= e.sauce.every( ai => order.sauce.includes(ai));
			let found3_= e.veget.every( ai => order.veget.includes(ai));
			if (found1_  == true && found2_ == true && found3_ == true){
				available.push(menu.indexOf(e));
			} else if (found1  == true && found2 == true && found3 == true) {
				available_.push(menu.indexOf(e));
			}
		}
	})
	available_.forEach(function(e){
		available.push(e);
	})
	if (available.length == 1){
		$('.next_pizza').remove();
	}
	nextPizza();
}

function filling(ul, num) {
	let li = $(ul).find('li');
		let count = 0;
		li.each(function(){
			if (count > 0){
				this.remove();
			}
			count++;
		})
	if (num == 0){
		$('.app__header').html('Выбери основной ингредиент');
	}else {
		$('.app__header').html('С твоим выбором хорошо сочетается👍');
	}
	let alredyFilling = [];
	menu.forEach(function(e) {
		if (e.type == order.type){
			let pizza = e.filling;
			let found = order.filling.every( ai => pizza.includes(ai));
			if (found){
				pizza.forEach(function(el){
				let pizzaFilling = el
				if (alredyFilling.indexOf(pizzaFilling)  == -1 && pizzaFilling != '' ){
					alredyFilling.push(pizzaFilling);
				}
			})
			}
		}
	})
	$('#filling').css('display', 'block');
			$('#filling').fadeTo('slow', 1);
			let count_cool = 0;
			alredyFilling.forEach(function(e){
				if (order.filling.includes(e) == false){
					count_cool++;
				}
			})
			if (count_cool > 0){
				alredyFilling.forEach(function(e){
					if (order.filling.includes(e) == false && count_cool > 0){
						$('#filling').append('<li>'+
						'<h1>'+e+'</h1>'+
						'<p class="descrip"></p>'+
						'</li>');
					}
				})
			}
			else {
				$('#filling').fadeTo('slow', 0);
				$('#filling').remove();
				veget(ul, 0);
			}

}

function veget(ul, num){
	let li = $(ul).find('li');
		let count = 0;
		li.each(function(){
			if (count > 0){
				this.remove();
			}
			count++;
		})
	if (num == 0){
		$('.app__header').html('Время сочных овощей🥦');
	}else {
		$('.app__header').html('Также можем добавить🙌');
	}
	let alredyFilling = [];
	menu.forEach(function(e) {
		if (e.type == order.type){
			let pizza = e.veget
			let found1 = order.filling.every( ai => e.filling.includes(ai));
			let found2 = order.veget.every( ai => e.veget.includes(ai));
			if (found1 && found2){
				pizza.forEach(function(el){
				let pizzaFilling = el;
				if (alredyFilling.indexOf(pizzaFilling)  == -1 && pizzaFilling != '' ){
					alredyFilling.push(pizzaFilling);
				}
			})
			}
		}
	})
	$('#veget').css('display', 'block');
			$('#veget').fadeTo('slow', 1);
			let count_cool = 0;
			alredyFilling.forEach(function(e){
				if (order.veget.includes(e) == false){
					count_cool++;
				}
			})
			if (count_cool > 0){
				alredyFilling.forEach(function(e){
					if (order.veget.includes(e) == false && count_cool > 0){
						$('#veget').append('<li>'+
						'<h1>'+e+'</h1>'+
						'<p class="descrip"></p>'+
						'</li>');
					}
				})
			}
			else {
				$('#veget').fadeTo('slow', 0);
				console.log(ul);
				$('#veget').remove();
				sauce(ul, 0);
			}
			
		};

function sauce(ul, num) {
	let li = $(ul).find('li');
		let count = 0;
		li.each(function(){
			if (count > 0){
				this.remove();
			}
			count++;
		})
	if (num == 0){
		$('.app__header').html('Под все эти ингредиенты подходит');
	}else {
		$('.app__header').html('Можем и еще один добавить😉');
	}
	let alredyFilling = [];
	menu.forEach(function(e) {
		if (e.type == order.type){
			let pizza = e.sauce
			let found1 = order.filling.every( ai => e.filling.includes(ai));
			let found2 = order.veget.every( ai => e.veget.includes(ai));
			let found3 = order.sauce.every( ai => e.sauce.includes(ai));
			if (found1 && found2 && found3){
				pizza.forEach(function(el){
				let pizzaFilling = el;
				if (alredyFilling.indexOf(pizzaFilling)  == -1 && pizzaFilling != '' ){
					alredyFilling.push(pizzaFilling);
				}
			})
			}
		}
	})
	$('#sauce').css('display', 'block');
			$('#sauce').fadeTo('slow', 1);
			let count_cool = 0;
			alredyFilling.forEach(function(e){
				if (order.sauce.includes(e) == false){
					count_cool++;
				}
			})
			if (count_cool > 0){
				alredyFilling.forEach(function(e){
					if (order.sauce.includes(e) == false && count_cool > 0){
						$('#sauce').append('<li>'+
						'<h1>'+e+'</h1>'+
						'<p class="descrip"></p>'+
						'</li>');
					}
				})
			}
			else {
				$('#sauce').fadeTo('slow', 0);
				$('#sauce').remove();
				finish(ul, 0);
			}
}

function flipSlides(ul, h1){
	if (ul.id == 'type'){
		order.type = h1.toLowerCase();
		$(ul).fadeTo('slow', 0);
		setTimeout(function() {
			$(ul).remove();
			filling(ul, 0);
		}, 1000);

	} else if (ul.id == 'filling'){
		if (h1 == 'Продолжить'){
			$(ul).fadeTo('slow', 0);
			setTimeout(function() {
				$(ul).remove();
				veget(ul, 0);
			}, 1000);
		} else {
			order.filling.push(h1);
			$(ul).fadeTo('slow', 0);
			setTimeout(function() {
				filling(ul, 1);
			}, 1000);
		}	
	} else if (ul.id == 'veget'){
		if (h1 == 'Продолжить'){
			$(ul).fadeTo('slow', 0);
			setTimeout(function() {
				$(ul).remove();
				sauce(ul, 0);
			}, 1000);
		}else {
			order.veget.push(h1);
			$(ul).fadeTo('slow', 0);
			setTimeout(function() {
				veget(ul, 1);
			}, 1000);
		}
	} else {
		if (h1 == 'Завершить'){
			$(ul).fadeTo('slow', 0);
			setTimeout(function() {
				$(ul).remove();
				finish();
			}, 1000);
		}else {
			order.sauce.push(h1);
			$(ul).fadeTo('slow', 0);
			setTimeout(function() {
				sauce(ul, 1);
			}, 1000);
		}
	}
}

$('.quiz').click(function(e){
	let eTarget = e.target;
		if (eTarget.tagName != 'LI'){
			flipSlides(eTarget.parentNode.parentNode, $(eTarget).parent().find('h1')[0].innerText);
		}else {
			flipSlides(e.target.parentNode, $(eTarget).find('h1')[0].innerText);
		}
		
	console.log(order);
})
$('.next_pizza').click(function(e) {
	if (available.length == 1){
		
	}else {
		nextPizza();
	}
})
$('.size').click(function(){
	let localCount = countPizza;
	$('.active').toggleClass('active');
	$(this).toggleClass('active');
	console.log($('.active').attr('id'));
	if (localCount - 1 < 0){
		localCount = available.length;
	}
	console.log(menu[available[localCount - 1]].price);
	$('.finish .button').html(menu[available[localCount - 1]].price[$('.active').attr('id') - 1] + '₽');

})
$('.button').click(function(){
	$('.pop__up').fadeTo('fast', 1);
	$('.pop__up').css('display', 'flex');
	$('body').css('overflow', 'hidden');
})
$('.pop__up').click(function(e){
	if ($(e.target).hasClass('pop__up')){
		$('.pop__up').fadeTo('fast', 0);
		setTimeout(function(){
			$('.pop__up').css('display','none');
			$('body').css('overflow', 'visible');
		}, 500);
	}
})
$('.burger__menu').click(function(){
	if ($('.header__menu').css('opacity') == 0){
		$('.header__menu').css('display', 'flex');
		$('.header__menu').fadeTo('fast', 1);
		$('body').css('overflow', 'hidden');
		$('.burger__menu').fadeTo('fast', 0);
		setTimeout(function(){
			$('.burger__menu').attr('src', './img/cross.png');
		}, 200)
		$('.burger__menu').fadeTo('fast', 1);
	} else {
		$('.header__menu').fadeTo('fast', 0);
		$('.burger__menu').fadeTo('fast', 0);
		setTimeout(function(){
			$('.burger__menu').attr('src', './img/burger.png');
		}, 200)
		$('.burger__menu').fadeTo('fast', 1);
		setTimeout(function(){
			$('.header__menu').css('display', 'none');
			$('body').css('overflow', 'visible');
		}, 200)
		
	}
	
})
let kek = [];
let kek_ = [];
console.log(kek);
console.log(kek_);
let test= kek.every( ai => kek_.includes(ai));
console.log('test' + test);
