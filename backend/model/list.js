const mysql = require('../mysql');

const getSessionTable = async () => {
  let session = await mysql.getSession();
  let table = session.getDefaultSchema().getTable('list');

  return { session, table };
}

module.exports = {
  fetchAll: async () => {
    let { session, table } = await getSessionTable();
    let result = await table.select().execute();
    session.close();

    return result.fetchAll().map(value => (
      { 'id': value[0], 'name': value[1], 'isBought': value[2] }
    ));
  },
};