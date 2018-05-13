// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || "No name given";
this.$element = createCard();

	function createCard() {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDeleteBtn = $('<button>').addClass('card-btn-delete').text('x');

			$cardDeleteBtn.click(function(){
				self.removeCard();
			});

			$card.append($cardDeleteBtn);
			$cardDescription.text(self.name);
			$card.append($cardDescription);
			return $card;
		}
}
Card.prototype = {
		removeCard: function() {
		  var self = this;

			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'DELETE',
				succes: function(){
					self.$element.remove();
				}
			});
		}
	};
