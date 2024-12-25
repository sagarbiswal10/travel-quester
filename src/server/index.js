import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import resolvers from './resolvers/resolvers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/travelquester')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

const typeDefs = readFileSync(join(__dirname, 'schema', 'schema.graphql'), 'utf-8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    try {
      if (token) {
        const cleanToken = token.replace('Bearer ', '');
        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET || 'your-secret-key');
        return { user: decoded };
      }
    } catch (err) {
      console.error('Token verification error:', err);
    }
    return { user: null };
  },
});

await server.start();
server.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});