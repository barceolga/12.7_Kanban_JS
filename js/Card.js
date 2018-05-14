// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;

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

			$cardChangeBtn.click(function(event){
				var newCardName = prompt("Modify the name of the card");
				event.preventDefault();

				if ((newCardName === null) || (newCardName ==="")) {
					alert("You have to enter a new name in order to change the card's name.");
				} else {
					$.ajax({
							url: baseUrl + '/card/' + self.id,
							data: {
										id: self.id,
										name: newCardName
							},
							method: 'PUT',
							success: function(response) {
								var card = new Card(response.id, newCardName);
								self.$element.find($('.card-description').text(self.name).text(newCardName));
								//console.log(self.find($('.card-description')));
							}
					}); //end of AJAX request
				}
			});

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
		}

	};
