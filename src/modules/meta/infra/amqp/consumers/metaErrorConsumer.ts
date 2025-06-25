export async function metaErrorConsumer(message: any): Promise<void> {
  console.log('[Consumer] Processando erro Meta:');
  console.log(message);
}
