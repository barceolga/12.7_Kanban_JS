//  KANBAN CARD CLASS

function Card(id, name, bootcamp_kanban_column_id) {
	var self = this;
	Column.bootcamp_kanban_column_id = bootcamp_kanban_column_id;

	this.id = id;
	this.name = name;
this.$element = createCard();

	function createCard() {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDeleteBtn = $('<button>').addClass('card-btn-delete').text('x');
		var $cardChangeBtn = $('<button>').addClass('card-btn-change').text('Change name');

			$cardDeleteBtn.click(function(){
				self.removeCard();
			});

			$cardChangeBtn.click(function(){
				self.changeCardName();
				//event.preventDefault();
			});

			console.log(self.id);
			console.log(Column.bootcamp_kanban_column_id);
			
			$card.append($cardDeleteBtn);
			$cardDescription.text(self.name);
			$card.append($cardDescription);
			$card.append($cardChangeBtn);
			return $card;
		}
}
Card.prototype = {

		removeCard: function() {
		  var self = this;

			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'DELETE',
				success: function(){
					self.$element.remove();
				}
			});
		},
		changeCardName: function() {
			var self = this;
			var newCardName = prompt("Modify the name of the card");
			//event.preventDefault();

			if ((newCardName === null) || (newCardName ==="")) {
				alert("You have to enter a new name in order to change the card's name.");
			} else {
				$.ajax({
						url: baseUrl + '/card/' + self.id,
						data: {
									id: self.id,
									name: newCardName,
									bootcamp_kanban_column_id: Column.bootcamp_kanban_column_id
						},
						method: 'PUT',
						success: function(response) {
							var newCard = new Card(response.id, newCardName, Column.bootcamp_kanban_column_id);
							self.$element.find($('.card-description').text(self.description).text(newCardName));
						}
				});
			}
		}

	};
