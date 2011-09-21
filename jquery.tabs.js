/*
	Copyright (c) 2011 Manyakhin Valentine

	Данная лицензия разрешает лицам, получившим копию данного программного 
	обеспечения и сопутствующей документации (в дальнейшем именуемыми 
	«Программное Обеспечение»), безвозмездно использовать Программное 
	Обеспечение без ограничений, включая неограниченное право на 
	использование, копирование, изменение, добавление, публикацию, 
	распространение, сублицензирование и/или продажу копий Программного 
	Обеспечения, также как и лицам, которым предоставляется данное 
	Программное Обеспечение, при соблюдении следующих условий:

	Указанное выше уведомление об авторском праве и данные условия должны 
	быть включены во все копии или значимые части данного Программного 
	Обеспечения.

	ДАННОЕ ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ КАКИХ-ЛИБО 
	ГАРАНТИЙ, ЯВНО ВЫРАЖЕННЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ, НО НЕ 
	ОГРАНИЧИВАЯСЬ ГАРАНТИЯМИ ТОВАРНОЙ ПРИГОДНОСТИ, СООТВЕТСТВИЯ ПО ЕГО 
	КОНКРЕТНОМУ НАЗНАЧЕНИЮ И ОТСУТСТВИЯ НАРУШЕНИЙ ПРАВ. НИ В КАКОМ СЛУЧАЕ 
	АВТОРЫ ИЛИ ПРАВООБЛАДАТЕЛИ НЕ НЕСУТ ОТВЕТСТВЕННОСТИ ПО ИСКАМ О ВОЗМЕЩЕНИИ 
	УЩЕРБА, УБЫТКОВ ИЛИ ДРУГИХ ТРЕБОВАНИЙ ПО ДЕЙСТВУЮЩИМ КОНТРАКТАМ, ДЕЛИКТАМ 
	ИЛИ ИНОМУ, ВОЗНИКШИМ ИЗ, ИМЕЮЩИМ ПРИЧИНОЙ ИЛИ СВЯЗАННЫМ С ПРОГРАММНЫМ 
	ОБЕСПЕЧЕНИЕМ ИЛИ ИСПОЛЬЗОВАНИЕМ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ ИЛИ ИНЫМИ 
	ДЕЙСТВИЯМИ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ.
*/

/*
	Плагин управления переключением кладок.
	
	Пример использования.
	
	HTML:
	--------------------------------------------------------------------------
	<div class="tabs">
		<ul class="tabs">
			<li class="switch">Переключатель 1</li>
			<li class="switch">Переключатель 2</li>
			<li class="switch">Переключатель 3</li>
			<li class="switch">Переключатель 4</li>
		</ul>
		<ul>
			<li class="tab">Вкладка 1</li>
			<li class="tab">Вкладка 2</li>
			<li class="tab">Вкладка 3</li>
			<li class="tab">Вкладка 4</li>
		</ul>
	</div>
	
	CSS:
	--------------------------------------------------------------------------
	.tab{
		display:none;
	}
	.tab.current{
		display:block;
	}

	JS:
	--------------------------------------------------------------------------
	$('.tabs').tabs({
		switchTabsClass:'switch', 
		tabClass: 'tab',
		onTabSwitch : function( $switch, $tab ) {
			var channel = $tab.find('.channel').data('channel');
			(new Chat).setChannel( channel );
			$tab.find('.channel').data('jsp').reinitialise();
			$tab.find('.channel').data('jsp').scrollToBottom(false);
			
		}
	});
*/
(function( $ ){
	$.fn.tabs =  function( options ) {
		// настройки по умолчанию
		var defaults = {
			switchTabsClass : 'switch',
			tabClass : 'tab',
			currentClass : 'current',
			onTabSwitch : function( $switch, $tab ){},
			context : this,
			tabPositionDataAttribute : 'tabs-position'
		};
	
		// подмешиваем настройки пользователя
		var options = $.extend( defaults, options );
	

		// Проход по элементам в которых необходимо отобразить вкладки
		return this.each(function() {
			var $tabBlock = $(this);
			var $switchers = $tabBlock.find( '.' + options.switchTabsClass );
			var $tabs = $tabBlock.find( '.' + options.tabClass );
		
			// Найдем первый элемент переключателя
			// Установим его текущим элементом
			$switchers.first().addClass( options.currentClass );
		
			// Найдем первую вкладку
			// Установим ее текущей
			$tabs.first().addClass( options.currentClass );
		
			//Для каждого переключателя
			$switchers.each( function( index ) {
				// Установим data аттрибут с его позицией в списке
				$(this).data( options.tabPositionDataAttribute, index );
			
				// Назначим событие по клику
				$(this).bind( 'click', function(e) {
					// Узнаем позицию выбранного переключателя
					var position = $(this).data( options.tabPositionDataAttribute );
				
					// Найдем активный переключатель и уберем флаг "текущий"
					$switchers.filter( '.' + options.currentClass ).removeClass( options.currentClass );
				
					// Добавим флаг "текущий" к выбранному переключателю
					$(this).addClass(options.currentClass);
				
					// Найдем активную вкладку и уберем флаг "текущий"
					$tabs.filter( '.' + options.currentClass ).removeClass( options.currentClass );
				
					// Добавим флаг "текущий" ко вкладке с позицией соответствующей позиции текущего переключателя
					$tabs.eq(position).addClass(options.currentClass);
				
					// Вызовем обработчик события переключение вкладки, если он назначен
					if( Object.isFunction(options.onTabSwitch)){
						options.onTabSwitch.call( options.context, $(this), $tabs.eq(position) );
					}
				});
			});
		});
	}
})(jQuery);