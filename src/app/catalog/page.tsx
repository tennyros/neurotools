import CatalogView from '@/features/catalog/ui/CatalogView';
import { getToolsList } from '@/lib/api/tools';

export default async function CatalogPage() {
  const tools = await getToolsList();

  return <CatalogView tools={tools} />;
}
