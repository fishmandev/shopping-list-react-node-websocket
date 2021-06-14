const mysql = require('../mysql');

const getSessionTable = async () => {
  let session = await mysql.getSession();
  let table = session.getDefaultSchema().getTable('product');

  return { session, table };
}

module.exports = {
  getIdByName: async (name) => {
    let { session, table } = await getSessionTable();
    let result = await table.select('id').where('name=:name').bind('name', name).execute();
    session.close();

    let row = result.fetchOne();
    if (row)
      return row[0];
    return null;
  },
  create: async (name) => {
    let { session, table } = await getSessionTable();
    let result = await table.insert(['name']).values(name).execute();
    session.close();

    return result.getAutoIncrementValue();
  }
}