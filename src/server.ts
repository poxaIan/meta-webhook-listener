import { setMetaConsumers } from './modules/meta/infra/amqp/setMetaConsumers';
import { app } from './shared/infra/http/app';

// Inicialização do app e dos consumers
(async () => {
  try {
    console.log('[Bootstrap] Inicializando consumidores Meta...');
    await setMetaConsumers();
    console.log('[Bootstrap] ✅ Consumers inicializados com sucesso');

    const PORT = process.env.PORT || 3000;
    await app.listen({ port: +PORT, host: '0.0.0.0' });

    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  } catch (err) {
    console.error('[Bootstrap] ❌ Erro ao inicializar aplicação:', err);
    process.exit(1);
  }
})();
