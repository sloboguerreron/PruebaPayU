var request = new XMLHttpRequest();
request.open('POST', 'https://api.paymentsos.com/payments');
request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('api-version', '1.3.0');
request.setRequestHeader('x-payments-os-env', 'test');
request.setRequestHeader('app-id', 'prueba.wolfbusinesscompany.wolfbusinesscompany');
request.setRequestHeader('private-key', '63b34924-559d-4a51-b56f-ffe3c2a52874');
request.setRequestHeader('idempotency-key', 'cust-34532-trans-001356-p');
var body = {
  'amount': 34800,
  'currency': 'EUR',
  'statement_soft_descriptor': 'Oil lamp'};
request.send(JSON.stringify(body));


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
    'token': '0919e5fd-ed93-4fde-817e-8be7691d5560'}};
request.send(JSON.stringify(body));

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
    'token': '9640e09b-85d0-4509-a19c-90aa65eb386a',
    'credit_card_cvv': '1231'},
  'reconciliation_id': '23434534534'};
request.send(JSON.stringify(body));

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


document.getElementById('payment-form').addEventListener('submit', async(event) => {
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

const cardNumber = formElements.create('cardNumber', {
  classes,
})

const cardNumber = formElements.create('cardNumber', {
  style,
})

