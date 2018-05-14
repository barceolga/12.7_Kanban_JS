//DEFINING VARIABLES

var baseUrl = "https://kodilla.com/pl/bootcamp-api";
var myHeaders = {
	'X-Client-Id': '3218',
 	'X-Auth-Token': '4bb08edbc4639c39ee15d95c48a12dc3'
};

// Function for adding headers to any request we'll make to API

$.ajaxSetup({
	headers: myHeaders
});

// Function for getting resources from API's endpoint board

$.ajax({
		url: baseUrl + '/board',
		method: 'GET',
		success: function(response) {
			setupColumns(response.columns);
		}
});

// Function for setting up columns

function setupColumns(columns) {
		columns.forEach(function(column) {
			var col = new Column(column.id, column.name);
			board.createColumn(col);
			setupCards(col, column.cards);
	});
}

// Function for setting up cards

function setupCards(col, cards) {
		cards.forEach(function(card) {
		var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		col.addCard(cardObj);
	});
}
