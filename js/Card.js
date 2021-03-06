//  KANBAN CARD CLASS

function Card(id, name, bootcamp_kanban_column_id) {
	var self = this;
	this.bootcamp_kanban_column_id = bootcamp_kanban_column_id;

	this.id = id;
	this.name = name;
this.$element = createCard();

	function createCard() {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDeleteBtn = $('<div>').addClass('btn-delete-wrapper').html('<button class="card-btn-delete"><i class="fa fa-trash" aria-hidden="true"></i></button>');
		var $cardChangeBtn = $('<button>').addClass('card-btn-change').text('Change name');
		var $changeWrapper = $('<div>').addClass('btn-change-wrapper');

			$cardDeleteBtn.click(function(){
				$card.effect("drop", "slow");
				self.removeCard();
				$(".ui-effects-wrapper").children().unwrap();
			});

			$cardChangeBtn.click(function(event){
				self.changeCardName();
				event.preventDefault();
			});
			/*console.log(self.id);
			console.log(Column.bootcamp_kanban_column_id);*/
			$changeWrapper.append($cardChangeBtn);

			$card.append($cardDeleteBtn);
			$cardDescription.text(self.name);
			$card.append($cardDescription);
			$card.append($changeWrapper);

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


			if ((newCardName === null) || (newCardName ==="")) {
				alert("You have to enter a new name in order to change the card's name.");
			} else {
				$.ajax({
						url: baseUrl + '/card/' + self.id,
						data: {
									id: self.id,
									name: newCardName,
									bootcamp_kanban_column_id: self.bootcamp_kanban_column_id
						},
						method: 'PUT',
						success: function(response) {
							self.$element.find('.card-description').text(self.description).text(newCardName).effect("slide", "slow");
						}
				});
			}
		}

	};
