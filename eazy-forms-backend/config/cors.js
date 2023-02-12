var whitelist = ["http://localhost:4000","http://localhost:5000", "https://eazy-forms.web.app"]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
      console.log({origin})
    }
    // callback(null, true);
  },
};