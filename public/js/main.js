
var form = $('#search-form');

var search = $('#searchProducts');
let searchedForText;

form.submit(function(ev) {
  ev.preventDefault();
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

      $.each(result, function(index) {
        $('.content').append(`
        <div class="card col-xs-12 col-ms-4 col-md-4">
          <img class="card-img-top tam" src=${result[index].thumbnail}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${result[index].title}</h5>
            <p class="card-text">S/.${result[index].price}</p>
            <p class="card-text">Cantidad: ${result[index].available_quantity}</p>            
          </div>
          <div class="card-footer">
            <small class="text-muted"><i class="fa  fa-2x fa-cart-plus" aria-hidden="true"></i></small>
            <input class="btn btn-outline-info producto" type="button" titulo="${result[index].title}" precio="${result[index].price}" value="Comprar">
          </div>
        </div>`);
        console.log(result[index].title);
        
        //  carro de compras
        paypal.minicart.render({
          strings: {
            button: 'Pagar'
            , buttonAlt: 'Total'
            , subtotal: 'Total:'
            , empty: 'No hay productos en el carrito'
          }
        });

        $('#viewcart').click(function(ev) {
          ev.stopPropagation();
          paypal.minicart.view.show();
        });

        $('.producto').click(function(ev) {
          ev.stopPropagation();
          paypal.minicart.cart.add({
            business: 'test@gmail.com', 
            item_name: $(this).attr('titulo'),
            amount: $(this).attr('precio'),
            currency_code: 'PEN',
          });
        });
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


