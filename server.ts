import app from "./src/app";
import createTables from "./src/db/createTables";

//Create table before starting server
createTables();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
