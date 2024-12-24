import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { join } from 'path';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import resolvers from './resolvers/resolvers.js';

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/travelquester')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

// Read schema
const typeDefs = readFileSync(join(process.cwd(), 'src/server/schema/schema.graphql'), 'utf-8');

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    try {
      const user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      return { user };
    } catch (err) {
      return { user: null };
    }
  },
});

await server.start();
server.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});