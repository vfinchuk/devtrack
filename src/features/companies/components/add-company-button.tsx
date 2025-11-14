'use client';

import { Button } from '@/components/ui/button';
import { openDialog } from '@/features/dialogs/dialog.slice';
import { useAppDispatch } from '@/store/hooks';

export function AddCompanyButton() {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() =>
        dispatch(openDialog({ id: 'add-company', props: { defaultName: '' } }))
      }
    >
      Add company
    </Button>
  );
}
