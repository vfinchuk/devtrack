/**
 * Map your domain events to their payload types.
 * Extend with new events as needed.
 */
export type DomainEvents = {
  // "company.created": { id: string; name?: string };
  // "company.updated": { id: string; changes: Record<string, unknown> };
  'user.signedUp': { userId: string; email: string };
  'user.loggedIn': { userId: string };
  'user.loggedOut': { userId: string };
};

type Handler<P> = (payload: P) => void | Promise<void>;
type EventsMap = Record<string, unknown>;

/**
 * Minimal, strongly-typed domain Event Bus.
 * Handlers run sequentially; errors are caught and logged so one faulty
 * handler won't block others.
 */
export class EventBus<Events extends EventsMap> {
  private map = new Map<keyof Events, Set<Handler<any>>>();

  /**
   * Subscribe to a domain event.
   * Returns an unsubscribe function that removes this handler.
   */
  on<K extends keyof Events>(
    event: K,
    handler: Handler<Events[K]>,
  ): () => void {
    if (!this.map.has(event)) this.map.set(event, new Set());
    this.map.get(event)!.add(handler as Handler<any>);
    return () => this.off(event, handler);
  }

  /**
   * Subscribe to a domain event only once.
   * The handler is automatically unsubscribed after the first emit.
   */
  once<K extends keyof Events>(
    event: K,
    handler: Handler<Events[K]>,
  ): () => void {
    const off = this.on(event, async (payload) => {
      try {
        await handler(payload);
      } finally {
        off();
      }
    });
    return off;
  }

  /**
   * Remove a specific handler for an event.
   * If no handler is provided, all handlers for this event are removed.
   */
  off<K extends keyof Events>(event: K, handler?: Handler<Events[K]>): void {
    const set = this.map.get(event);
    if (!set) return;
    if (!handler) {
      this.map.delete(event);
      return;
    }
    set.delete(handler as Handler<any>);
  }

  /** Remove all listeners (useful for tests/teardown). */
  clear(): void {
    this.map.clear();
  }

  /**
   * Emit a domain event and execute all subscribed handlers sequentially.
   * Errors inside handlers are caught and logged.
   */
  async emit<K extends keyof Events>(
    event: K,
    payload: Events[K],
  ): Promise<void> {
    const handlers = [...(this.map.get(event) ?? [])];
    for (const h of handlers) {
      try {
        await h(payload);
      } catch (e) {
        console.error('Event handler failed', {
          event: String(event),
          error: e,
        });
      }
    }
  }
}

/** Global singleton for domain events. Import listeners once in app/_init.ts. */
export const events = new EventBus<DomainEvents>();
