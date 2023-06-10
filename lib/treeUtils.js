function toTree(role, rules) {
  return rules.reduce((arr, { a, can, when }) => {
    if (a === role) {
      arr.push({
        value: can,
        when,
        children: toTree(can, rules)
      });
    }
    return arr;
  }, []);
}

function findPaths(root, permission) {
  const paths = [];
  if (root.value === permission) {
    paths.push([root]);
  } else if (root.children) {
    root.children.forEach((child) => {
      const childpaths = findPaths(child, permission);
      childpaths.forEach(cpath => paths.push([root, ...cpath]));
    });
  }
  return paths;
}

async function checkPath(path, params = {}, checkFullPath) {
  for (let i = 1; i < path.length; i++) {
    const node = path[i];
    if (node.when) {
      const result = await new Promise((resolve, reject) => {
        const prom = node.when(params, (err, res) => err ? reject(err) : resolve(res));
        if (prom && prom.then) {
          prom.then(resolve, reject);
        }
      });
      if (!result) {
        return false;
      }
    } else if (!checkFullPath) {
      return true;
    }
  }
  return true;
}


const treeUtils = {
  toTree,
  findPaths,
  checkPath
};

module.exports = treeUtils;
