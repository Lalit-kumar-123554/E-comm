import jwt from 'jsonwebtoken';

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).send('Unauthorized');
  }

  // Verify refresh token
  jwt.verify(refreshToken, 'your_refresh_token_secret', (err, payload) => {
    if (err) {
      return res.status(403).send('Forbidden');
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userID: payload.userID },
      'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
      { expiresIn: '1h' }
    );

    res.status(200).json({ accessToken: newAccessToken });
  });
};
