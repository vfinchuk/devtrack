import { logout } from '@/features/auth/actions/logout.action';
import { Button } from '@/shared/ui/button';

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Button variant="destructive">Log out</Button>
    </form>
  );
}
