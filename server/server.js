import app from './src/app.js';
import mongoose from 'mongoose';

app.get('/', (req, res) => {
    res.send('Pizza! Hello Welcome');
});
// MongoDB Conection

const port = process.env.PORT || 8888;
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((error) => console.log(`${error} did not connect`));
