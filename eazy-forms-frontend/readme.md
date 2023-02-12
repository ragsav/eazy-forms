# Ezforms

**You design the forms, we handle the responses**
No need to maintain a server for your forms now, just use our endpoint in your form action and get all your responses in your dashboard

 1. First step is to sign in. Its simple and free. Sign is required in order to verify user. This gives a unique secret token for each form you create which will be used to protect from spams.
 2. Second step is to create a new form. Just add a title to create a new form. Further you can edit the form title and also the form status either active or inactive. After a form is generated a unique id is provided for each form which is used while integrating the endpoint.
 3. The final step is to integrate the endpoint in your form's **action** attribute. You view the integration guide for each form. And you are done. As soon as the form is live, you can see the responses in response section. 

#### Simple example
Set your form's action-attribute to our server **url** with your **form_id**. Add a field named `"_secret"` to identify that response is coming from your trusted source. If this field is present or the value is not the same as provided, Ezforms will reject the submission & mark it as spam. The input should be hidden.

    <form id="form_id" action="${CONSTANTS.HOST}/api/submit/form_id"method="POST" >
	    <input name="_secret" type="hidden" value="your_secret" >
	    <input name="name" type="text" id="name" >
	    <input name="email" type="email" id="email" >
	    <input value="Submit" type="submit" >
    </form>


