const mysql = require('../mysql');

const getSessionTable = async () => {
  let session = await mysql.getSession();
  let table = session.getDefaultSchema().getTable('list');

  return { session, table };
}

module.exports = {
  fetchAll: async () => {
    let { session, table } = await getSessionTable();
    let result = await table.select().orderBy('isBought').execute();
    session.close();

    return result.fetchAll().map(value => (
      { 'id': value[0], 'name': value[1], 'isBought': value[2] }
    ));
  },
  create: async (name) => {
    let { session, table } = await getSessionTable();
    let result = await table.insert(['name', 'isBought']).values(name, false).execute();
    session.close();

    return result.getAutoIncrementValue();
  },
  delete: async (id) => {
    let { session, table } = await getSessionTable();
    let result = await table.delete().where('id=:id').bind('id', parseInt(id)).execute();
    session.close();

    return result.getAffectedItemsCount();
  },
  update: async (id, isBought) => {
    let { session, table } = await getSessionTable();
    let result = await table
      .update()
      .where('id=:id')
      .set('isBought', !!isBought)
      .bind('id', parseInt(id))
      .execute();
    session.close();

    return result.getAffectedItemsCount();
  }
};