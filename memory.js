var cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];
var cards_flipped = 0;
var memory_values = [];
var memory_card_ids = [];

Array.prototype.shuffle = function() {
  var i = this.length,
    pos, temp;
  
  while (--i > 0) {
    pos = Math.floor(Math.random() * (i + 1));
    temp = this[pos];
    this[pos] = this[i];
    this[i] = temp;
  }
}

function newBoard() {
  var output = '';
  
  cards_flipped = 0;
  
  cards.shuffle();
  
  for (var i = 0; i < cards.length; i++) {
    output += '<div id="card_' + i + '" onclick="flipCard(this,\'' + cards[i] + '\')"></div>';
  }
  
  document.getElementById('memory_board').innerHTML = output;
}

function flipCard(card, val) {
	if (card.innerHTML == "" && memory_values.length < 2) {

    card.style.background = '#FFF';
    card.innerHTML = val;
    
    if (memory_values.length == 0) {

      memory_values.push(val);
      memory_card_ids.push(card.id);

    } else if (memory_values.length == 1) {
      
      memory_values.push(val);
      memory_card_ids.push(card.id);
      
      if (memory_values[0] == memory_values[1]) {
        cards_flipped += 2;
        
        // Clear both arrays
        memory_values = [];
        memory_card_ids = [];
        
        // Check to see if the whole board is cleared
        if (cards_flipped == cards.length) {
          alert("Board cleared... generating new board");
          document.getElementById('memory_board').innerHTML = "";
          newBoard();
        }

      } else {

        function flipBack() {
          // Flip the 2 cards back over
          var card_1 = document.getElementById(memory_card_ids[0]);
          var card_2 = document.getElementById(memory_card_ids[1]);
          card_1.style.background = 'url(tile_bg.jpg) no-repeat';
          card_1.innerHTML = "";
          card_2.style.background = 'url(tile_bg.jpg) no-repeat';
          card_2.innerHTML = "";
          
          // Clear both arrays
          memory_values = [];
          memory_card_ids = [];
        }

        setTimeout(flipBack, 700);
      }
    }
	}
}
