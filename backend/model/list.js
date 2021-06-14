const mysql = require('../mysql');

const getSessionTable = async () => {
  let session = await mysql.getSession();
  let table = session.getDefaultSchema().getTable('list');

  return { session, table };
}

module.exports = {
  fetchAll: async () => {
    let session = await mysql.getSession();
    let schemaName = session.getDefaultSchema().getName();
    console.log(schemaName);
    let result = await session
      .sql(
        `
        SELECT l.id, p.name, l.isBought 
        FROM \`${schemaName}\`.list AS l 
        INNER JOIN \`${schemaName}\`.product AS p 
        ON l.product_id=p.id
        ORDER BY (l.isBought)
        `
      )
      .execute();
    session.close();

    return result.fetchAll().map(value => (
      { 'id': value[0], 'name': value[1], 'isBought': value[2] }
    ));
  },
  create: async (productId) => {
    let { session, table } = await getSessionTable();
    let result = await table.insert(['product_id', 'isBought']).values(productId, false).execute();
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
  },
  deleteMadePurchases: async () => {
    let { session, table } = await getSessionTable();
    let result = await table.delete().where('isBought=true').execute();
    session.close();

    return result.getAffectedItemsCount();
  }
};