import { useLocalStorage } from '@mantine/hooks';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useNewAssistant() {
  const [assistantID, setAssistantID] = useLocalStorage({ key: 'assistantID', defaultValue: null });
  const { data, error, isLoading } = useSWR(
    assistantID ? null : '/api/openai/create-assistant',
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      onSuccess: (data) => {
        // Only set the thread ID if we fetched a new one
        if (data?.id && !assistantID) {
          setAssistantID(data.id);
        }
      },
    }
  );
  return {
    assistantID,
    assistant: data,
    isLoading,
    isError: error,
  };
}
