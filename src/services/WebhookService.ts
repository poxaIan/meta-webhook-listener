export class WebhookService {
  execute(data: any) {
    console.log('[Service] Processando webhook...');
    console.log(data);
  }
}
