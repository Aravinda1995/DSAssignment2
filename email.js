var sendemail  = require('sendemail').email; // no api key
var email = sendemail.email;
sendemail.set_template_directory('./template');

var person = {
    amount : "200",
    email: "araroxs@gmail.com", // person.email can also accept an array of emails
    subject:"Thank you for your payment"
}

email('Thank You', person, function(error, result){
    console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
    console.log(result);
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -')
})