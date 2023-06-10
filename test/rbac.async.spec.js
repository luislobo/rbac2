const RBAC = require('..');
const rules = require('./fixtures/rules');

describe('RBAC', () => {
  let rbac;

  describe('w/o caching (promises/async/await)', () => {
    beforeEach(() => {
      rbac = new RBAC(rules);
    });

    it('should return true when a path is found', async () => {
      const result = await rbac.check('admin', 'read articles');
      expect(result).toBe(true);
    });

    it('should return false when a path is not found', async () => {
      const result = await rbac.check('user', 'delete user');
      expect(result).toBe(false);
    });

    it('should return false when a conditional is not satisfied', async () => {
      const result = await rbac.check('user', 'edit article');
      expect(result).toBe(false);
    });

    it(
      'should return false when a conditional is not satisfied w/params',
      async () => {
        const result = await rbac.check('user', 'edit article', { userId: 1 });
        expect(result).toBe(false);
      }
    );

    it('should work when a callback conditional is satisfied', async () => {
      const result = await rbac.check('user', 'edit article', { userId: 2 });
      expect(result).toBe(true);
    });

    it('should work an async conditional is satisfied', async () => {
      const result = await rbac.check('user', 'delete article', { userId: 3 });
      expect(result).toBe(true);
    });

    it(
      'should allow a higher node to ignore conditionals based on "checkFullPath"',
      async () => {
        const result = await rbac.check('superadmin', 'delete article');
        expect(result).toBe(!rbac.checkFullPath);
      }
    );

    it('should propagate conditional errors from callbacks', async () => {
      try {
        await rbac.check('user', 'do nothing with callbacks');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it('should propagate conditional errors from promises', async () => {
      try {
        await rbac.check('user', 'do nothing with promises');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });

  describe('when checking full trees (promises/async/await)', () => {
    beforeEach(() => {
      rbac = new RBAC(rules, true, true);
    });

    it('should return true when a path is found', async () => {
      const result = await rbac.check('admin', 'read articles');
      expect(result).toBe(true);
    });

    it('should return false when a path is not found', async () => {
      const result = await rbac.check('user', 'delete user');
      expect(result).toBe(false);
    });

    it('should return false when a conditional is not satisfied', async () => {
      const result = await rbac.check('user', 'edit article');
      expect(result).toBe(false);
    });

    it(
      'should return false when a conditional is not satisfied w/params',
      async () => {
        const result = await rbac.check('user', 'edit article', { userId: 1 });
        expect(result).toBe(false);
      }
    );

    it('should work when a callback conditional is satisfied', async () => {
      const result = await rbac.check('user', 'edit article', { userId: 2 });
      expect(result).toBe(true);
    });

    it('should work an async conditional is satisfied', async () => {
      const result = await rbac.check('user', 'delete article', { userId: 3 });
      expect(result).toBe(true);
    });

    it(
      'should allow a higher node to ignore conditionals based on "checkFullPath"',
      async () => {
        const result = await rbac.check('superadmin', 'delete article');
        expect(result).toBe(!rbac.checkFullPath);
      }
    );

    it('should propagate conditional errors from callbacks', async () => {
      try {
        await rbac.check('user', 'do nothing with callbacks');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it('should propagate conditional errors from promises', async () => {
      try {
        await rbac.check('user', 'do nothing with promises');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });

  describe('w/caching (promises/async/await)', () => {
    beforeEach(() => {
      rbac = new RBAC(rules, false, true);
    });

    it('should return true when a path is found', async () => {
      const result = await rbac.check('admin', 'read articles');
      expect(result).toBe(true);
    });

    it('should return false when a path is not found', async () => {
      const result = await rbac.check('user', 'delete user');
      expect(result).toBe(false);
    });

    it('should return false when a conditional is not satisfied', async () => {
      const result = await rbac.check('user', 'edit article');
      expect(result).toBe(false);
    });

    it(
      'should return false when a conditional is not satisfied w/params',
      async () => {
        const result = await rbac.check('user', 'edit article', { userId: 1 });
        expect(result).toBe(false);
      }
    );

    it('should work when a callback conditional is satisfied', async () => {
      const result = await rbac.check('user', 'edit article', { userId: 2 });
      expect(result).toBe(true);
    });

    it('should work an async conditional is satisfied', async () => {
      const result = await rbac.check('user', 'delete article', { userId: 3 });
      expect(result).toBe(true);
    });

    it(
      'should allow a higher node to ignore conditionals based on "checkFullPath"',
      async () => {
        const result = await rbac.check('superadmin', 'delete article');
        expect(result).toBe(!rbac.checkFullPath);
      }
    );

    it('should propagate conditional errors from callbacks', async () => {
      try {
        await rbac.check('user', 'do nothing with callbacks');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it('should propagate conditional errors from promises', async () => {
      try {
        await rbac.check('user', 'do nothing with promises');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });
});
