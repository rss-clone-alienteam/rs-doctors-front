const config = {
  API: {
    endpoints: [
      {
        region: process.env.REACT_APP_AWS_REGION,
        name: "rs-doctors-back",
        endpoint: process.env.REACT_APP_AWS_API_GATEWAY_URL,
      },
    ],
  },
  Auth: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_APP_CLIENT_ID,
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
  },
  Storage: {
    bucket: process.env.REACT_APP_ATTACHMENTS_BUCKET,
    region: process.env.REACT_APP_AWS_REGION,
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
  }
};

export default config;
