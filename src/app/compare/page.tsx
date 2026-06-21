import CompareView from './CompareView';
import { getToolsList } from '@/data/api';

export default async function ComparePage() {
  const tools = await getToolsList();

  return <CompareView tools={tools} />;
}
