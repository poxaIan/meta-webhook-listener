import { app } from './app';

app.listen({ port: 3333 }).then(() => {
  console.log('[HTTP] Server rodando em http://localhost:3333');
});
