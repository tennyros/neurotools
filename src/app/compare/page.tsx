import CompareView from '@/features/compare/ui/CompareView';
import { getToolsList } from '@/lib/api/tools';

export default async function ComparePage() {
  const tools = await getToolsList();

  return <CompareView tools={tools} />;
}
