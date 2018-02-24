
  var form = $('#search-form')
  
  var search = $('#searchProducts');
  let searchedForText;

form.submit(function (e) {
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
        $('.content').append(`<div><p>Title: ${result[index].title}</p></div>`)
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


