import { logout } from '@/features/auth/actions/logout.action';
import { LoadingButton } from '@/shared/ui/loading-button';
import { useActionState } from 'react';

export default function LogoutButton() {
  const [_, formAction, isPending] = useActionState<void, FormData>(
    logout,
    undefined,
  );

  return (
    <form action={formAction}>
      <LoadingButton type="submit" variant="destructive" isLoading={isPending}>
        Logout
      </LoadingButton>
    </form>
  );
}
