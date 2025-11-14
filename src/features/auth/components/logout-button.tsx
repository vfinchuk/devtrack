import { Button } from '@/components/ui/button';
import { logout } from '@/features/auth/actions/logout.action';

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Button variant="destructive">Log out</Button>
    </form>
  );
}
