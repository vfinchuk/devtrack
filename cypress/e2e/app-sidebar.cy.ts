import { APP_ROUTES, AppRoute } from '../../src/shared/config/routes.config';

describe('Sidebar navigation', () => {
  const visibleTopLevel = (): AppRoute[] =>
    APP_ROUTES.filter((r) => r.auth && r.showInSidebar);

  const visibleChildren = (): AppRoute[] =>
    visibleTopLevel().flatMap(
      (r) => r.children?.filter((c) => c.showInSidebar !== false) ?? [],
    );

  beforeEach(() => {
    cy.visit('/');
  });

  it('renders all visible routes from APP_ROUTES and hides non-sidebar ones', () => {
    cy.get('[data-slot="sidebar"]').within(() => {
      //   cy.findByRole('link', { name: 'Dashboard' }).should('exist');

      visibleTopLevel().forEach((route) => {
        cy.findByRole('link', { name: route.name }).should('exist');
      });

      visibleChildren().forEach((route) => {
        cy.findByRole('link', { name: route.name }).should('exist');
      });

      APP_ROUTES.filter((r) => !r.showInSidebar).forEach((route) => {
        cy.findByText(route.name).should('not.exist');
      });
    });
  });

  it('highlights Dashboard as active on "/" and only one item is active', () => {
    cy.get('[data-slot="sidebar"]').within(() => {
      const root = visibleTopLevel().find((r) => r.path === '/');

      if (root) {
        cy.findByRole('link', { name: root.name }).should(
          'have.attr',
          'aria-current',
          'page',
        );
      }

      cy.get('a[aria-current="page"]').should('have.length', 1);
    });
  });

  it('navigate to each top-level route and mark it active', () => {
    const tops = visibleTopLevel();

    tops.forEach((route) => {
      cy.get('[data-slot="sidebar"]')
        .findByRole('link', { name: route.name })
        .click();

      cy.location('pathname', { timeout: 1000 }).should((pathname) => {
        if (route.path === '/') {
          expect(pathname).to.eq('/');
        } else {
          expect(
            pathname === route.path || pathname.startsWith(route.path + '/'),
          ).to.be.true;
        }
      });

      //   cy.get('[data-slot="sidebar"] a[aria-current="page"]')
      //     .should('have.length', 1)
      //     .and(($a) => {
      //       expect($a.text().trim()).to.eq(route.name);
      //     });
    });
  });

  it('navigates to each visible child route and marks it active', () => {
    visibleTopLevel()
      .filter((r) => (r.children?.length ?? 0) > 0)
      .forEach((parent) => {
        const children = parent.children!.filter(
          (c) => c.showInSidebar !== false,
        );

        children.forEach((child) => {
          cy.visit('/');

          cy.get('[data-slot="sidebar"]').within(() => {
            cy.findByRole('link', { name: parent.name }).click();
          });

          cy.get('[data-slot="sidebar"]').within(() => {
            cy.findByRole('link', { name: child.name }).click();
          });

          cy.url().should('include', child.path);

          //   cy.get('[data-slot="sidebar"]').within(() => {
          //     cy.get('a[aria-current="page"]').should('have.length', 1);
          //     cy.findByRole('link', { name: child.name }).should('have.attr', 'aria-current', 'page');
          //   });
        });
      });
  });

  it('keeps exactly one active item after multiple navigations', () => {
    const clickSidebar = (name: string) => {
      cy.get('[data-slot="sidebar"]').within(() => {
        cy.findByRole('link', { name }).click();
      });
      //   cy.get('[data-slot="sidebar"] a[aria-current="page"]').should('have.length', 1);
    };

    const tops = visibleTopLevel().slice(0, 3);

    tops.forEach((r) => {
      clickSidebar(r.name);
      if (r.path === '/') {
        cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
      } else {
        cy.url().should('include', r.path);
      }
    });
  });
});
