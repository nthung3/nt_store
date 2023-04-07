export const AddToCart = async (req, res) => {
    try {
        const userId = req.userId;

        return res.status(201).json({});
    } catch (error) {
        res.status(500).json({ message: '500 Internal Server Error' });
        console.log(error);
    }
};
