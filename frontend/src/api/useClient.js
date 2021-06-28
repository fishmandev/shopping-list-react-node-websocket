const useClient = () => {
  const fetch = (endpoint, { body, ...customConfig } = {}) => {
    const apiUrl = process.env.REACT_APP_API_SERVER_URL || 'http://localhost';
    const headers = { 'Content-Type': 'application/json' };
    const config = {
      method: body ? 'POST' : 'GET',
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    };
    if (body) {
      config.body = JSON.stringify(body)
    }

    return window
      .fetch(`${apiUrl}/${endpoint}`, config)
      .then(response => {
        if (response.ok) {
          if (response.status === 200 || response.status === 201)
            return response.json();
          return '';
        } else {
          return response.text().then((err) => {
            throw new Error(err);
          });
        }
      });
  };

  return { fetch };
}

export default useClient;