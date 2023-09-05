const express = require('express');
const dotenv = require('dotenv');
const app = express();

//express json middleware
app.use(express.json());

app.get('/api/', (req, res) => {
  return res.status(200).json({
    message: 'server is working',
  });
});

dotenv.config({ path: './config/env/config.env' });
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is started on PORT:${PORT}`);
});
