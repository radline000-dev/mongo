const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./database/db");
const colors = require("colors");
const fileupload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const { generateFakeData } = require("./faker2");
// Load Env var : 환경 설정 적용
dotenv.config({ path: "./config/config.env" });
// Clear Security import
//Import NoSQL Injection Depender
const mongoSanitize = require("express-mongo-sanitize");

// Header security
const helmet = require("helmet");
// Xss Script Depender
const xss = require("xss-clean");
// Speend limit
const rateLimit = require("express-rate-limit");

//HTTP Param 변조 방지
const hpp = require("hpp");

// 전체 도메인 허용
const cors = require("cors");

// Clear Database
// Connect to Database
connectDB();

// Settings Route Files Import
const user = require("./routes/user");
const blog = require("./routes/blog");

// Clear express 생성 Server 설정
const app = express();
// Request Json Body Parser

app.use(express.json());

//Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  // app.use(morgan("dev"));
}
//Cookie-Parser
app.use(cookieParser());
//File Uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Clear Security headers
// app.use(helmet());
app.use(helmet({ contentSecurityPolicy: false }));

// Prevent XSS attacked
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000, // 10 mins
  max: 120000,
});
app.use(limiter);

//prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

// Clear static Folder
app.use(express.static(path.join(__dirname, "public")));

// Settings Mount routers Use
app.use("/user", user);
app.use("/blog", blog);

/** Error Handler */
app.use(errorHandler);

//PORT Setting
const PORT = process.env.PORT || 3000;

//Server Open
const server = app.listen(PORT, async () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
  // for (let i = 0; i < 20; i++) {
  //   await generateFakeData(10, 1, 10);
  // }
});

//handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});
