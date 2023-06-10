const treeUtils = require('../lib/treeUtils');
const assert = require('assert');

const rules = require('./fixtures/rules');

describe.skip('treeUtils', () => {
  describe('toTree', () => {
    it('should return a tree of permissions for a given role', () => {
      const tree = treeUtils.toTree('visitor', rules);
      assert.strictEqual(tree.length, 1);
      assert.strictEqual(tree[0].value, 'read articles');
    });

    it('should return an empty array if the role has no permissions', () => {
      const tree = treeUtils.toTree('unknown', rules);
      assert.strictEqual(tree.length, 0);
    });
  });

  describe('findPaths', () => {
    it('should return all paths from the root to a given permission', () => {
      const tree = treeUtils.toTree('admin', rules);
      const paths = treeUtils.findPaths(tree, 'delete articles'); // Ensure 'admin' has 'delete articles' permission
      assert.strictEqual(paths.length, 1);
    });

    it('should return the path from admin to vote on articles', () => {
      const tree = treeUtils.toTree('admin', rules);
      const paths = treeUtils.findPaths(tree, 'vote on articles');
      assert.strictEqual(paths.length, 1);
    });
  });

  describe('checkPath', () => {
    it(
      'should return true if all conditionals in the path are satisfied',
      async () => {
        const tree = treeUtils.toTree('visitor', rules);
        const paths = treeUtils.findPaths(tree, 'read articles');
        if (paths.length > 0) {
          const result = await treeUtils.checkPath(paths[0], {});
          assert.strictEqual(result, true);
        } else {
          assert.fail('No paths found');
        }
      }
    );

    it(
      'should return false if any conditional in the path is not satisfied',
      async () => {
        const tree = treeUtils.toTree('admin', rules);
        const paths = treeUtils.findPaths(tree, 'delete articles'); // Ensure 'admin' has 'delete articles' permission
        if (paths.length > 0) {
          const result = await treeUtils.checkPath(paths[0], {}, true);
          assert.strictEqual(result, false);
        } else {
          assert.fail('No paths found');
        }
      }
    );
  });
});

