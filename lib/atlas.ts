import axios from 'axios';
const uri = process.env.MONGODB_URI;

export const getGenealogy = async () => {
  const data = JSON.stringify({
    collection: 'movies',
    database: 'sample_mflix',
    dataSource: 'Cluster0',
    projection: {
      _id: 1,
    },
  });

  const config = {
    method: 'get',
    url: 'https://data.mongodb-api.com/app/data-zkxpa/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': process.env.ATLAS_DATA_KEY,
    },
    data: data,
  };

  return await axios(config);

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
