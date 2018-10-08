var board = {
	name: 'ToDo list',
	createColumn: function(column) {
		  this.$element.append(column.$element);
		  initSortable();
	},
	$element: $('#board .column-container')
};

		var maxColumns = 2;
		function isAllowedToCreateColumn() {
			var columnsList = $('.column').toArray();
			console.log(columnsList.length);
			return columnsList.length <= maxColumns;
		}

$('.create-column')
	.click(function(){

		if (!isAllowedToCreateColumn()) {
					$('.create-column').prop('disabled', true);
					alert("You can create only 3 columns at most.");
					return;
		}
		var columnName = prompt('Enter a column name.');

  if ((columnName === null || columnName ==="")) {

		alert("You need to enter a column name in order to create the column.");

	} else {

				$.ajax({

						url: baseUrl + '/column',
						method: 'POST',
						data: {
							name: columnName
						},
						success: function(response){
							var column = new Column(response.id, columnName); //creating a new instance of the class Column
							board.createColumn(column);
						}

				}); //end of AJAX request
		}
	});

	function initSortable() {
	//	var self = this;
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder',
			forcePlaceHolderSize: true,
			dropOnEmpty: true/*,
			update: function(event, ui) {
					var data = $(this).sortable('serialize' );

					$.ajax({
						url: baseUrl + '/card',
						type: 'POST',
						data: data,
						success: function(data) {
							data.sort(function(a, b) {
									return a < b ? -1 : 1;
							})
						}
					});
			}*/
		}).disableSelection();
	}
