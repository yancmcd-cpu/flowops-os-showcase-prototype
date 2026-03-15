import Hero from '@/components/Hero';
import Team from '@/components/Team';
import Workflows from '@/components/Workflows';
import Operations from '@/components/Operations';
import Radar from '@/components/Radar';
import Integrations from '@/components/Integrations';

export default function Home() {
  return (
    <>
      <Hero />
      <Radar />
      <Workflows />
      <Team />
      <Operations />
      <Integrations />
    </>
  );
}
