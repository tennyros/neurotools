import CatalogView from './CatalogView';
import { getToolsList } from '@/data/api';

export default async function CatalogPage() {
  const tools = await getToolsList();

  return <CatalogView tools={tools} />;
}
