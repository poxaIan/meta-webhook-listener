import { setMetaConsumers } from './modules/meta/infra/amqp/setMetaConsumers';

(async () => {
  try {
    console.log('[Bootstrap] Inicializando consumidores Meta...');
    await setMetaConsumers();
    console.log('[Bootstrap] ✅ Consumers inicializados com sucesso');
  } catch (err) {
    console.error('[Bootstrap] ❌ Erro ao inicializar consumers:', err);
  }
})();
