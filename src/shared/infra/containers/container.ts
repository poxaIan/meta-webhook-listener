import { createContainer, asClass } from 'awilix';
import { FakeMessageQueueProvider } from '../../../shared/providers/fakes/FakeMessageQueueProvider';

console.log('[Container] Inicializando container de dependências...');

const container = createContainer({
  injectionMode: 'CLASSIC',
});

container.register({
  messageQueueProvider: asClass(FakeMessageQueueProvider).singleton(),
});

console.log('[Container] Provider "messageQueueProvider" registrado com FakeMessageQueueProvider');

export { container };
