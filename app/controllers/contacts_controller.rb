class ContactsController < ApplicationController
  
    #Get request to /contact-us
    #Show new contact form
    def new
      @contact = Contact.new
    end 
    
    #POST request /contacts
    def create
      #Mass asssignement of form fields into Contact Object
      @contact = Contact.new(contact_params)
      #Save the contact object to the database
      if @contact.save
        #Store form fields via parameters, into variables
        name = params[:contact][:name]
        email = params[:contact][:email]
        body = params[:contact][:comments]
        #Plug variables into the Contact Mailer email methode
        #Send email
        ContactMailer.contact_email(name, email, body).deliver
        # Store success message in flash hash
        #redirect to new action
        flash[:success] = "Message sent!"
        redirect_to new_contact_path
      else
        #If contact object doesn't save
        #Store error in flash hash
        #Redirect to the new action
        flash[:danger] = @contact.errors.full_messages.join(", ")
        redirect_to new_contact_path
      end 
    end
    
    private
      #To collect data from form
      #we use strong paramaters
      #and whitelist the form field
      def contact_params
        params.require(:contact).permit(:name, :email, :comments)
      end 
end