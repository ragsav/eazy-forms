require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./config/mongodb");
const { configureFirebase } = require("./config/firebase");
const { configureViewEngine } = require("./config/viewEngine");
const { startKeepAlive } = require("./helpers/keepAliveService");
const rateLimit = require("express-rate-limit");
var helmet = require("helmet");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

configureFirebase();
const app = express();
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(helmet());
app.use(express.static(__dirname + "/public"));
configureViewEngine(app);

app.use(function (req, res, next) {
  console.log({ params: req.params, body: req.body, query: req.query });
  next();
});
//global middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

app.use(cors());
app.use(express.json({ extended: false }));

app.locals.stylePath = "css/style.css";

connectMongoDB(app);

app.use("/internal/user", require("./routes/user.route"));
app.use("/internal/form", require("./routes/form.route"));
app.use("/internal/survey", require("./routes/survey.route"));
app.use("/internal/response", require("./routes/response.route"));
app.use("/api/submit", require("./routes/exposed/submit.api.route"));
app.use("/api/form", require("./routes/exposed/form.api.route"));

app.use("/", require("./routes/site.route"));

//error handling
app.use(require("./routes/site.route"));
app.use((req, res, next) => {
  return res.status(403).render("api-access-error-page");
});

//start server
const port = process.env.PORT || 4000;
// startKeepAlive();
app.listen(port, () => console.log(`server started on port ${port}`));
