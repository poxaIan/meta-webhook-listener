import { app } from './app';
import 'dotenv/config';

app.listen({ port: Number(process.env.PORT) || 3333, host: '0.0.0.0' }, () => {
  console.log(`[HTTP] Server rodando na porta ${process.env.PORT || 3333}`);
});
