const HTTPClient = module.exports;
const rp = require('request-promise');

HTTPClient.get = (url, params = {}, headers = {}) => {
  const conf = {
    uri: url,
    method: 'GET',
    json: true,
    headers,
    qs: params,
  };
  console.log(`Request ${JSON.stringify(conf)}`);

  return rp(conf).then((resp) => {
    console.log(`response from url ${url}::=> ${JSON.stringify(resp)}`);

    return resp;
  }).catch((error) => {
    console.log(`error from url ${url}::=> ${JSON.stringify(error)}`);
    throw error;
  });
};

HTTPClient.post = (url, body = {}, headers = {}) => {
  const conf = {
    uri: url,
    method: 'POST',
    json: true,
    headers,
    body,
  };
  console.log(`Request ${JSON.stringify(conf)}`);

  return rp(conf).then((resp) => {
    console.log(`response from url ${url}::=> ${JSON.stringify(resp)}`);

    return resp;
  }).catch((error) => {
    console.log(`error from url ${url}::=> ${JSON.stringify(error)}`);
    throw error;
  });
};

HTTPClient.put = (url, body = {}, headers = {}) => {
  const conf = {
    uri: url,
    method: 'PUT',
    json: true,
    headers,
    body,
  };
  console.log(`Request ${JSON.stringify(conf)}`);

  return rp(conf).then((resp) => {
    console.log(`response from url ${url}::=> ${JSON.stringify(resp)}`);

    return resp;
  }).catch((error) => {
    console.log(`error from url ${url}::=> ${JSON.stringify(error)}`);
    throw error;
  });
};

HTTPClient.delete = (url, body = {}, headers = {}) => {
  const conf = {
    uri: url,
    method: 'DELETE',
    json: true,
    headers,
    body,
  };
  console.log(`Request ${JSON.stringify(conf)}`);

  return rp(conf).then((resp) => {
    console.log(`response from url ${url}::=> ${JSON.stringify(resp)}`);

    return resp;
  }).catch((error) => {
    console.log(`error from url ${url}::=> ${JSON.stringify(error)}`);
    throw error;
  });
};
