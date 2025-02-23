// const express = require('express');
// const { MongoClient, ObjectId } = require('mongodb');

// const app = express();
// app.use(express.json());

// const MONGO_URI = 'mongodb://127.0.0.1:27017';
// const DB_NAME = 'blogdb';

// let db;

// app.use(express.static('public'));

// // Подключение к MongoDB
// MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(client => {
//         db = client.db(DB_NAME);
//         console.log('MongoDB Connected');
//     })
//     .catch(err => console.error(err));

// // ✅ Создать пост
// app.post('/api/blogs', async (req, res) => {
//     const { title, body, author } = req.body;

//     if (!title || !body) {
//         return res.status(400).json({ error: 'Title and body are required' });
//     }

//     try {
//         const result = await db.collection('blogs').insertOne({
//             title,
//             body,
//             author,
//             createdAt: new Date()
//         });

//         res.status(201).json({ 
//             _id: result.insertedId,
//             title,
//             body,
//             author,
//             createdAt: new Date()
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create post' });
//     }
// });

// // ✅ Получить все посты
// app.get('/api/blogs', async (req, res) => {
//     try {
//         const posts = await db.collection('blogs').find().toArray();
//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch posts' });
//     }
// });

// // ✅ Получить один пост по ID
// app.get('/api/blogs/:id', async (req, res) => {
//     try {
//         const post = await db.collection('blogs').findOne({ _id: new ObjectId(req.params.id) });

//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         res.json(post);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch post' });
//     }
// });

// // ✅ Обновить пост
// app.put('/api/blogs/:id', async (req, res) => {
//     const { title, body } = req.body;

//     if (!title || !body) {
//         return res.status(400).json({ error: 'Title and body are required' });
//     }

//     try {
//         const result = await db.collection('blogs').updateOne(
//             { _id: new ObjectId(req.params.id) },
//             { $set: { title, body, updatedAt: new Date() } }
//         );

//         if (result.matchedCount === 0) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         res.json({ message: 'Post updated' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to update post' });
//     }
// });

// // ✅ Удалить пост
// app.delete('/api/blogs/:id', async (req, res) => {
//     try {
//         const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(req.params.id) });

//         if (result.deletedCount === 0) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         res.json({ message: 'Post deleted' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to delete post' });
//     }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// //http://localhost:5000/api/blogs



const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const MONGO_URI = 'mongodb://127.0.0.1:27017/blogdb';

// Подключение к MongoDB через Mongoose
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Подключение маршрутов
app.use('/api', blogRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//http://localhost:5000/api/blogs
