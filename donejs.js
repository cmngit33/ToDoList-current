//Initialize app: Start the todo list add text//
//http://www.w3schools.com/js/js_examples.asp//

var app = {
	init: function() {
		$('.todo').keypress(app.newKeypress);
		$('.todo-list').on('click', '.toggle', app.toggleStatus);
		$('.todo').on('focus', app.checkListCount);
		
	$('.todo-list').on('dblclick', '.todo-item label', app.beginEdit);
		$('.todo-list').on('blur', '.todo-item input', app.endEdit);
		$('.todo-list').on('keypress', '.todo-item input', app.editKeypress);
		$('.todo-list').on('click', '.todo-item .delete-item', app.deleteRow);

		$('.show-all').click(app.showAll);
		$('.show-active').click(app.showActive);
        $('.show-complete').click(app.showComplete);
 		

// Clear Complete Button //
	$('#clearcompleted').on('click',function(){
		app.deleteContents();
})		

	app.loadList();
  },
	

	
//Delete Row Buttom on Right//
deleteRow: function(ev) {
	$(ev.target).closest('.todo-item').remove();
	app.updateRemaining();	
},

	
	//Todo List Count//
checkListCount: function(ev) {		
	if($('.todo-item').length === 14) {
       // app.$('.input')disabled = true;  
		alert('MEOW!!! too many todos');
    }
},

	

//Doing the Function//
addNewItem: function(label, status) {
	//Creates new todo item and append//
		var newItem = $('.templates .todo-item').clone();
	
//Update label//
newItem.find('label').text(label)		
	//Complete new item if needed//
	if(status === 'complete') {
		newItem.addClass('complete');
} 

//Append to List//
newItem.appendTo('.todo-list');
	//Reset todo input
	$('.todo').val(' ');
		//Update remaining
		app.updateRemaining();
},
			
// When Keypress is entered
newKeypress: function(ev) {
	if(ev.which === 13) {
		app.addNewItem($('.todo').val());
	}
},
	
toggleStatus: function(ev) {
	$(ev.target).closest('.todo-item').toggleClass('complete');
		app.updateRemaining();
},
beginEdit: function(ev) {
	var todo = $(ev.target).closest('.todo-item');
//Adding a class to display//
	todo.addClass('edit');
//Set value of input to the current label//
	todo.find('input').val($(ev.target).text())
//Focus the input//
	.focus();
	return false;	
},
	
endEdit: function() {
	//Get value of the input
	var todo = $('.todo-item.edit');
	var value = todo.find('input').val();
		//Update the label to the new value
		todo.find('label').text(value);
		//Hide the input
		todo.removeClass('edit');
		
		app.storeList();
	},
	editKeypress: function(ev) {
		//End edit if keypress is entered//
	if(ev.which === 13) {
		 app.endEdit();
		}
},	
	
deleteContents: function(cb) {
			//Load into todolist from LocalStorage
	var todolist = JSON.parse(localStorage.getItem('todos'));			
			for (var i=0; i<todolist.length; i++) {
				//if current item in the array is set to complete
				if (todolist[i].status === 'complete') {
					//delete it from list
					todolist.splice(i, 1);
	}
} 				


//write the new (edited) data back to localStorage	
	localStorage.setItem('todos',JSON.stringify(todolist));
		app.removeCompletedFromList();
	},
	removeCompletedFromList: function() {						
			$('.todo-list').children().each(function(item) {
				console.log($(this).hasClass('complete'))
		
		if ($(this).hasClass('complete')) {
			$(this).remove();
		}
	});
},

	
updateRemaining: function() {
			var remaining = $('.todo-list .todo-item').not('.complete');
			$('.remaining').text(remaining.length + ' remaining');

    app.storeList();
  },
		

showAll: function() {
    $('.todo-item').show('showActive showComplete');
  },
  showActive: function() {
    //$('.todo-list').removeClass('show-complete');
    //$('.todo-list').addClass('show-active');
		$('.todo-item').not('.complete').show();
    $('.todo-item.complete').hide();
  },
  showComplete: function() {
    //$('.todo-list').removeClass('show-active');
    //$('.todo-list').addClass('show-complete');
		$('.todo-item').not('.complete').hide();
    $('.todo-item.complete').show();
  },

	//To Store List: Local Storage
  storeList: function() {
    var listItems = $('.todo-list .todo-item');
    var storeList = [];
    listItems.each(function() {
      var item = {
        label: $(this).find('label').text(),
        status: $(this).hasClass('complete') ? 'complete' : 'active'
      };
      storeList.push(item);
	});
    localStorage.setItem('todos', JSON.stringify(storeList));
  },
  loadList: function() {
    var todos = JSON.parse(localStorage.getItem('todos'));
    if(todos) {
      for(var index = 0; index < todos.length; index++) {
        var item = todos[index];
        app.addNewItem(item.label, item.status);
      }
    }
  }	
}
