var board = {
	name: 'Kanban board',
	createColumn: function(column) {
		  this.$element.append(column.$element);
		  initSortable();
	},
	$element: $('#board .column-container')
};

$('.create-column')
	.click(function(){
		var columnName = prompt('Enter a column name', 'Column\'\s name');
  if (columnName !== null) {

		$.ajax({

				url: baseUrl + '/column',
				method: 'POST',
				data: {
					name: columnName
				},
				succes: function(response){
					var column = new Column(response.id, columnName); //creating a new instance of the class Column
					board.createColumn(column);
				}

		}); //end of AJAX request

	}

	});

	function initSortable() {
		var self = this;
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}
