function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name || "No name given";
	this.$element = createColumn();

	function createColumn() {

		// TWORZENIE NOWYCH WĘZŁÓW
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('column-btn-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		$columnDelete.click(function() {
			self.deleteColumn();
		});

		$columnAddCard.click(function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			self.createCard(new Card(cardName));

			$.ajaxSetup({
				headers: myHeaders
			});

			$.ajax({
					url: baseUrl + '/card',
					method: 'POST',
					data: {
								name: cardName,
								bootcamp_kanban_column_id: self.id
					},
					succes: function(response) {
						// create a new client side card
						var card = new Card(response.id, cardName);
						self.createCard(card);
					}
			});

		});

			// KONSTRUOWANIE ELEMENTU KOLUMNY
		$column.append($columnTitle)
			.append($columnDelete)
			.append($columnAddCard)
			.append($columnCardList);
			return $column;
		}
	}

Column.prototype = {
	createCard: function(card) {
	  this.$element.children('ul').append(card.$element);
	},
	deleteColumn: function() {
	  var self = this;

		$.ajaxSetup({
			headers: myHeaders
		});
		
		$.ajax({
				url: baseUrl + '/column' + self.id,
				method: 'DELETE',
				succes: function(response) {
					self.$element.remove();
				}
		});
	}
};
