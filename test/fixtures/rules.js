
module.exports = [
  {
    a: 'visitor',
    can: 'read articles'
  },
  {
    a: 'user',
    can: 'vote on articles'
  },
  {
    a: 'article editor',
    can: 'edit article'
  },
  {
    a: 'user',
    can: 'article editor',
    when(params, cb) {
      return cb(null, params.userId === 2);
    }
  },
  {
    a: 'user',
    can: 'delete article',
    when: async params => params.userId === 3
  },
  {
    a: 'user',
    can: 'do nothing with callbacks',
    when: (params, cb) => {
      cb(new Error());
    }
  },
  {
    a: 'user',
    can: 'do nothing with promises',
    when: () => Promise.reject(new Error())
  },
  {
    a: 'admin',
    can: 'user'
  },
  {
    a: 'admin',
    can: 'article editor'
  },
  {
    a: 'superadmin',
    can: 'delete user'
  },
  {
    a: 'superadmin',
    can: 'admin'
  },
  {
    a: 'user',
    can: 'visitor'
  },
  {
    a: 'user',
    can: 'read articles'
  }
];
