import { describe, expect, it } from 'vitest';
import { EventBus } from '../events';

type E = {
  'user.signedUp': { userId: string };
  'user.loggedIn': { userId: string };
  'user.loggedOut': { userId: string };
};

describe('core/events', () => {
  it('handlers run in order; errors isolated', async () => {
    const bus = new EventBus<E>();
    const calls: string[] = [];
    bus.on('user.signedUp', ({ userId }) => {
      calls.push('a:' + userId);
    });
    bus.on('user.signedUp', () => {
      throw new Error('boom');
    });
    bus.on('user.signedUp', ({ userId }) => {
      calls.push('c:' + userId);
    });
    await bus.emit('user.signedUp', { userId: '1' });
    expect(calls).toEqual(['a:1', 'c:1']);
  });

  it('once: unsubscribes after first call', async () => {
    const bus = new EventBus<E>();
    let n = 0;
    bus.once('user.signedUp', () => {
      n++;
    });

    await bus.emit('user.signedUp', { userId: '1' });
    await bus.emit('user.signedUp', { userId: '2' });

    expect(n).toBe(1);
  });

  it('off: remove one handler or all from event', async () => {
    const bus = new EventBus<E>();
    const calls: number[] = [];
    const h1 = () => {
      calls.push(1);
    };
    const h2 = () => {
      calls.push(2);
    };

    const unsub1 = bus.on('user.loggedIn', h1);
    bus.on('user.loggedIn', h2);

    unsub1();

    await bus.emit('user.loggedIn', { userId: 'x' });

    expect(calls).toEqual([2]);

    bus.off('user.loggedIn');
    await bus.emit('user.loggedIn', { userId: 'x' });
    expect(calls).toEqual([2]);
  });
});
