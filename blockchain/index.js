require("dotenv").config();
const app = require("./src/app");

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});
