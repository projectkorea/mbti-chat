import app from "./app";

const handleListening = () =>
  console.log(`✅Listening on: http://localhost:3000`);

app.listen(3000, handleListening);
