import { SimpleGrid } from '@mantine/core';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useEffect } from 'react';
import useAssistant from '@/hooks/useAssistant';
import Chat from '@/components/Chat';
import Map from '@/components/Map';
import { cssMainSize } from '@/theme';

export default function HomePage() {
  const { messages, sendMessageAndRun, isRunning, resetThread, isConfetti, setIsConfetti } =
    useAssistant();

  const { width, height } = useWindowSize();

  useEffect(() => {
    if (isConfetti) {
      const timer = setTimeout(() => setIsConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isConfetti]);
  return (
    <SimpleGrid m="xl" cols={{ base: 1, sm: 2 }} h={cssMainSize}>
      <Chat
        messages={messages}
        sendMessageAndRun={sendMessageAndRun}
        isRunning={isRunning}
        resetThread={resetThread}
      />
      <Map />
      {isConfetti && <Confetti width={width} height={height} recycle={false} />}
    </SimpleGrid>
  );
}
