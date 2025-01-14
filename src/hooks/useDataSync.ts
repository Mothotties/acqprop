import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { errorLogger } from '@/utils/errorLogger';

export const useDataSync = (tableName: string, queryKey: string[]) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`${tableName}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName,
        },
        (payload) => {
          console.info(`Received ${payload.eventType} event from ${tableName}`);
          
          // Invalidate queries to refresh data
          queryClient.invalidateQueries({ queryKey });
          
          // Notify user of changes
          toast({
            title: 'Data Updated',
            description: `The ${tableName} data has been updated.`,
          });
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.info(`Subscribed to ${tableName} changes`);
        } else if (status === 'CHANNEL_ERROR') {
          const error = new Error(`Failed to subscribe to ${tableName} changes`);
          errorLogger.log(error, 'medium', { table: tableName });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [tableName, queryKey, queryClient]);
};