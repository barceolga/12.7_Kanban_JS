function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name;
	this.$element = createColumn(); //Here the created column is allocated and saved.

	function createColumn() {

		// CREATING NEWS NODS

		var column = $('<div>').addClass('column');

		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('column-btn-delete').html('<i class="fa fa-trash" aria-hidden="true"></i>');
		var $changeName = $('<button>').addClass('column-btn-change').text('Change name');
		var $columnAddCard = $('<button>').addClass('add-card').html('<i class="fa fa-plus" aria-hidden="true"></i>');
		var $columnButtons = $('<div>').addClass('column-buttons');
		// BINDING EVENTS TO THE CONCRETE NODS

		$columnDelete.click(function() {
			$columnCardList.effect("drop", "slow");
			$columnTitle.effect("drop", "slow");
			self.removeColumn();
		});

		$changeName.click(function(event) {
			self.changeColumnName();
				event.preventDefault();
		});

		$columnAddCard.click(function(event) {

			var cardName = prompt("Enter the name of the card");
			//event.preventDefault();

			if ((cardName === null) || (cardName ==="")) {
				alert("You have to enter a card name in order to create a card.");
			} else {
				$.ajax({
						url: baseUrl + '/card',
						method: 'POST',
						data: {
									name: cardName,
									bootcamp_kanban_column_id: self.id
						},
						success: function(response) {
							// create a new client side card
								var card = new Card(response.id, cardName);
								self.addCard(card);
						}
				}); //end of AJAX request
			}
		});

			// Building the column's element
		$columnButtons.append($columnAddCard)
			.append($changeName)
			.append($columnDelete);

		column.append($columnTitle)
			.append($columnButtons)
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
					success: function(response) {
						self.$element.remove();
					}
			});
			//console.log(self.id);
	},
		changeColumnName: function() {
			var self = this;
						var newColumnName = prompt("Modify the name of the column");

						if ((newColumnName === null) || (newColumnName ==="")) {
							alert("You have to enter a new name in order to change column's name.");
						} else {
							$.ajax({
									url: baseUrl + '/column/' + self.id,
									data: {
										id: self.id,
										name: newColumnName
									},
									method: 'PUT',
									success: function(response) {
										self.$element.find('.column-title').text(self.name).text(newColumnName).effect("slide", "slow");
									}
							}); //end of AJAX request
						}
		}
};
