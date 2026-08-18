import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚗 Auto Elite Carz API running on port ${PORT}`);
});
