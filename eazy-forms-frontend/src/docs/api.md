Ezforms APIs are very predictive and simple to use.

### **GET : Form by id**

&nbsp;  
You can get information about a form by providing its form_id along with the secret of this form.

    https://ezforms-server.herokuapp.com/api/form/{your_secret}/{form_id}

&nbsp;
&nbsp;  
&nbsp;

### **GET : All responses**

&nbsp;  
If you want all the responses of a particular form send a GET request in the below format.

    https://ezforms-server.herokuapp.com/api/form/{your_secret}/{form_id}/responses

&nbsp;
&nbsp;  
&nbsp;

### **GET : Response by id**

&nbsp;  
You can also get a specific response by sending a GET request in the below format.

    https://ezforms-server.herokuapp.com/api/form/{your_secret}/{form_id}/responses/{response_id}

&nbsp;
