const client = redis.createClient();

// Use the multer middleware to handle file uploads
app.use(multer().array());

// Use bcryptjs to hash passwords
const saltRounds = 10;
const password = 'mypassword';
bcryptjs.hash(password, saltRounds, (err, hash) => {
    console.log(hash);
});

// Use JWT to authenticate users
const secret = 'mysecret';
const token = jwt.sign({ userId: 123 }, secret);
console.log(token);

// Use Cloudinary to store and serve images
cloudinary.config({
    cloud_name: 'mycloud',
    api_key: 'mykey',
    api_secret: 'mysecret',
});

// Use Moment to format dates
console.log(moment().format('YYYY-MM-DD'));

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
