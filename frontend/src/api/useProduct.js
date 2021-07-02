import useClient from './useClient';

const useProduct = () => {
  const client = useClient();

  /**
   * Makes search by products
   * 
   * @param {String} query 
   * @returns 
   */
  const search = (query) => client.fetch('search', { body: { query: query } });

  return { search };
}

export default useProduct;