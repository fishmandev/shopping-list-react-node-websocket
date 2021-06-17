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
  },
  search: async (query) => {
    // Removes wildcards from the query
    query = query.replace(/%|_/g, '');
    
    let { session, table } = await getSessionTable();
    let result = await table
      .select('id', 'name')
      .where('name LIKE :query')
      .bind('query', `${query}%`)
      .execute();
    session.close();

    return result.fetchAll().map(value => (
      { 'id': value[0], 'name': value[1] }
    ));
  }
}