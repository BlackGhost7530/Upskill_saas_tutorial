/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function(){
    var theForm = $('#pro_form');
    var submitBtn = $('#form-signup-btn');
    
    //Set Stripe public key
    Stripe.setPublishableKey( $( 'meta[name="stripe-key"]').attr('content') );
    
    
    //When user clicks form submit btn prevent default submission behavior
    submitBtn.click(function(event){
        //prevent default submission behavior
        event.preventDefault();
        submitBtn.val("Processing").prop('disable', true);
        
        //Collect the credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
            
        //Use Strip JS Library to check for card errors.
        var error = false;
        
        //Validate Card number
        if (!Stripe.card.validateCardNumber(ccNum)) {
           error = true;
           alert('The credit card number is invalid!');
        }
        
        //Validate CVC number
        if (!Stripe.card.validateCVC(cvcNum)) {
           error = true;
           alert('The CVC number is invalid!');
        }
        
        //Validate Exploration date
        if (!Stripe.card.validateExpiry(expMonth, expYear)) {
           error = true;
           alert('The exploration date is invalid!');
        }
        
        if (error) {
            //If there are card errors, don't send to Stripe
            submitBtn.val("Sign Up").prop('disable', false);
        } else {
            //Send the card info to Stripe
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);
        }
    });
    
    //Stripe will return a card token
    function stripeResponseHandler(status, response) {
        //Get the token from the response
        var token = response.id;
        
        //Inject card token as hidden field into form
        theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
        
        //Submit form to our rails app
        theForm.get(0).submit();
    }
});