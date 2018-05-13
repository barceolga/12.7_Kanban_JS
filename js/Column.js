function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name;
	this.$element = createColumn(); //Here the created column is allocated and saved.

	function createColumn() {

		// CEARTING NEWS NODS

		var column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('column-btn-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

		// BINDING EVENTS TO THE CONCRETE NODS

		$columnDelete.click(function() {
			self.removeColumn();
		});

		$columnAddCard.click(function(event) {

			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			//self.createCard(new Card(cardName));

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
							self.addCard(card);
					}
			}); //end of AJAX request

		});

			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append($columnTitle)
			.append($columnDelete)
			.append($columnAddCard)
			.append($columnCardList);
			return column;
		}
	}

Column.prototype = {
	addCard: function(card) {
	  	this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		  var self = this;

			$.ajax({
					url: baseUrl + '/column/' + self.id,
					method: 'DELETE',
					succes: function(response) {
						self.$element.remove();
					}
			});
	}
};
