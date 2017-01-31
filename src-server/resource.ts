import { main as main_inner } from '@told/azure-functions-server/lib/src-server/resource';

export async function main(context: any, request: any) {
    return await main_inner(context, request);
}
