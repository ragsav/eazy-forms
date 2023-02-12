const htmlResponseTemplate = (success, response) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
                      "http://www.w3.org/TR/html4/strict.dtd">

                    <html lang="en">
                    <head>
                      <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
                      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                      <title>Eazyforms response</title>
                      <meta name="author" content="Eazyforms">
                    </head>
                    <body>
                        <div id="body" class="wrapper">
                            <fieldset>
                                <legend>Response</legend>
                                <p>success:${true}</p>
                                <pre class="prettyprint" ><code>response:${JSON.stringify(
                                  response,
                                  null,
                                  4
                                )}</code></pre>
                            </fieldset>
                            
                        </div>
                    </body>
                    </html>`;
};

const htmlTelegramMessageTemplate = (success, response) => {
  try {
    return JSON.stringify(response);
  } catch (error) {
    console.log(error);
    return "server error!";
  }
};
module.exports = { htmlResponseTemplate, htmlTelegramMessageTemplate };
