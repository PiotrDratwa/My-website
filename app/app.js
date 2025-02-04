const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('client'));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });