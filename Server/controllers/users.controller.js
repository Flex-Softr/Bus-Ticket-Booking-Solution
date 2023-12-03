(req, res) => {
    const result =  dailyBlogCollection.find().toArray();
    res.send(result);
}