
var form = $('#search-form');
  
var search = $('#searchProducts');
let searchedForText;

form.submit(function(e) {
  e.preventDefault();
  searchedForText = search.val();
  getData();
});

function getData() {
  $.ajax({
    url: `https://api.mercadolibre.com/sites/MLA/search?q=${searchedForText}`,
    contentType: 'application/json',
    method: 'GET',
    success: function(response) {
      console.log(response.results);
      var result = response.results;

      $.each(result, function(index, obj) {
        $('.content').append(`<div class="card col-4">
        <img class="card-img-top img-responsive" src="${result[index].thumbnail}" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">${result[index].title}</p>
          <p class="card-text">S/.${result[index].price}</p>
        </div>
      </div>`);
        console.log(result[index].title);
      });
    },
    fail: function(request) {
      if (request) {
        alert(request.message);
      }
    }
  });
}

$('#categorias').click(function() {
  getCategories();
});

function getCategories() {
  $.ajax({
    url: 'https://api.mercadolibre.com/sites/MLA/search?category=MLA1273',
    contentType: 'application/json',
    method: 'GET',
    success: function(response) {
      console.log(response);
    },
    fail: function(request) {
      if (request) {
        alert(request.message);
      }
    }
  });
}


