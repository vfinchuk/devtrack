'use client';

import { closeDialog } from '@/features/dialogs/dialog.slice';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useAppDispatch } from '@/store/hooks';
import { useActionState } from 'react';

type CreateState =
  | { ok: true; value: { id: string } }
  | { ok: false; error: Record<string, string[] | undefined> }
  | null;

export type AddCompanyDialogProps = {
  defaultName?: string;
};

export function AddCompanyDialog(props: AddCompanyDialogProps) {
  const dispatch = useAppDispatch();
  const [state, formAction, pending] = useActionState<CreateState, FormData>(
    async (_prev, formData) => {
      //   const res = await createCompany(_prev, formData);
      //   if (res.ok) {
      //     dispatch(closeDialog());
      //   }
      //   return res;
      return null;
    },
    null,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={props.defaultName}
          placeholder="Acme Inc"
          required
        />
        {state && !state.ok && state.error?.name && (
          <p className="text-sm text-red-600">{state.error.name.join(', ')}</p>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(closeDialog())}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? 'Creating…' : 'Create'}
        </Button>
      </div>
    </form>
  );
}
