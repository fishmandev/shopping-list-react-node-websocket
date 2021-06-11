import useClient from './useClient';

const useList = () => {
  const client = useClient();

  /**
   * Adds a new item to shopping list
   * 
   * @param {String} name 
   * @returns 
   */
  const create = (name) => client.fetch('lists', { body: { name: name } });

  /**
   * Fetches a whole shopping list
   * 
   * @returns {Array}
   */
  const read = () => client.fetch('lists').then(result => result.items);

  /**
   * Removes an item from shopping list 
   * 
   * @param {Integer} id 
   * @returns 
   */
  const remove = (id) => client.fetch(`lists/${id}`, { method: 'DELETE' });

  /**
   * Updates a buy status of the item
   * 
   * @param {Integer} id 
   * @param {Boolean} buyStatus 
   * @returns 
   */
  const update = (id, buyStatus) => client.fetch(
    `lists/${id}`,
    {
      method: 'PATCH',
      body: { "isBought": buyStatus }
    }
  );

  return { create, read, remove, update };
}

export default useList;