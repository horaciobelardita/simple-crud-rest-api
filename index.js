import app from "./app.js";
import { PORT } from "./utils/config.js";
import { connectToDatabase } from "./utils/db.js";

async function main() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
