const fonts = [
  {
    src: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
  }
]
const formElements = new POS.Fields("c4d96738-5325-488b-bbc1-54272f0c10cd", {
  fonts
})

const placeholders = {
  cardNumber: '1234 1234 1234 1234',
  expDate: 'MM / YY'
}

// Instantiate the fields you want to show and mount them to the DOM.
const cardNumber = formElements.create('cardNumber', {
  placeholders
})
cardNumber.mount('#card-number')

const expiry = formElements.create('creditCardExpiry', {
  placeholders
})
expiry.mount('#exp-date')


document.getElementById('payment-form').addEventListener('submit', async (event) => {
  event.preventDefault()
  const additionalData = {
    holder_name: document.getElementById('cardholder-name').value // This field is mandatory
  }
  const result = await POS.createToken(cardNumber, {
    additionalData,
    environment: 'test' // Set the PaymentsOS environment you're connecting to
  })
  console.log(`The response is ${JSON.stringify(result)}`)
})

cardNumber.on('change', (event) => {
  console.log(event)
})

cardNumber.on('focus', (event) => {
  console.log(event)
})

cardNumber.on('blur', (event) => {
  console.log(event)
})

const classes = {
  invalid: 'my-own-invalid-class'
}

/*const cardNumber = formElements.create('cardNumber', {
  classes,
})*/

/*const cardNumber = formElements.create('cardNumber', {
  style,
})*/

function prueba() {

  let holder_name = document.getElementById("cardholder-name").value;
  let card_number = document.getElementById("card-number").value;
  let exp_date = document.getElementById("exp-date").value;
  let cvv = document.getElementById("cvv").value;
  let valor = document.getElementById("valor").value;
  let nom_Producto = document.getElementById("nom-producto").value;

  //payment
  var request = new XMLHttpRequest();
  request.open('POST', 'https://api.paymentsos.com/payments');
  request.withCredentials = true;
  request.setRequestHeader('api-version', '1.3.0');
  request.setRequestHeader('x-payments-os-env', 'test');
  request.setRequestHeader('app-id', 'prueba.wolfbusinesscompany.wolfbusinesscompany');
  request.setRequestHeader('private-key', '63b34924-559d-4a51-b56f-ffe3c2a52874');
  request.setRequestHeader('idempotency-key', 'cust-34532-trans-001356-p');

  var body = {
    'amount': valor,
    'currency': 'USD',
    'statement_soft_descriptor': nom_Producto
  };
  request.send(JSON.stringify(body));

  //tokenizar

  let holder_name = document.getElementById("cardholder-name").value;

  console.log(holder_name);

  POS.tokenize({
    "token_type": "credit_card",
    "holder_name": holder_name,
    "expiration_date": exp_date,
    "card_number": card_number
  },
    function (result) {

      console.log("result obtained" + result);
      let json = JSON.parse(result);
      token = json["token"];
      // Check for errors, if all is good, then proceed!
    }
  );

  //autorizacion
  var request = new XMLHttpRequest();
  request.open('POST', 'https://api.paymentsos.com/payments/{payment_id}/authorizations');
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('api-version', '1.3.0');
  request.setRequestHeader('x-payments-os-env', 'test');
  request.setRequestHeader('app-id', 'prueba.wolfbusinesscompany.wolfbusinesscompany');
  request.setRequestHeader('private-key', '63b34924-559d-4a51-b56f-ffe3c2a52874');
  request.setRequestHeader('idempotency-key', 'cust-34532-trans-001356-a');
  var body = {
    'payment_method': {
      'type': 'tokenized',
      'token': token,
      'credit_card_cvv': cvv
    },
    'reconciliation_id': '23434534534'
  };
  request.send(JSON.stringify(body));


  var request = new XMLHttpRequest();
  request.open('POST', 'https://api.paymentsos.com/payments/{payment_id}/captures');
  request.open('POST', url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('api-version', '1.3.0');
  request.setRequestHeader('x-payments-os-env', 'test');
  request.setRequestHeader('app-id', 'prueba.wolfbusinesscompany.wolfbusinesscompany');
  request.setRequestHeader('private-key', '63b34924-559d-4a51-b56f-ffe3c2a52874');
  request.setRequestHeader('idempotency-key', 'cust-34532-trans-001356-cap');
  request.send();

  //cargar
  var request = new XMLHttpRequest();
  request.open('POST', 'https://api.paymentsos.com/payments/{payment_id}/charges');
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('api-version', '1.3.0');
  request.setRequestHeader('x-payments-os-env', 'test');
  request.setRequestHeader('app-id', 'prueba.wolfbusinesscompany.wolfbusinesscompany');
  request.setRequestHeader('private-key', '63b34924-559d-4a51-b56f-ffe3c2a52874');
  request.setRequestHeader('idempotency-key', 'cust-34532-trans-001356-c');
  var body = {
    'payment_method': {
      'type': 'tokenized',
      'token': token
    }
  };
  request.send(JSON.stringify(body));


}