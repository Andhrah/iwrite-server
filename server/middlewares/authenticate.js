import jwt from 'jsonwebtoken';
import { env } from '../helpers/utils';

/**
 * Verifies user token
 *
 * @example
 * // Allowed token format [Authorization: Bearer <access_token>]
 *
 * @export
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @returns {(Error|Function)} Proceeds to the next middleware else throws http error
 */
function authenticate(req, res) {
  // Get auth header value
  const token = req.headers.authorization;
  if (!token) {
    throw Error('You are unauthorized to access the requested resource. Please log in.');
  }

  return jwt.verify(token, env('APP_KEY'), (err, decoded) => {
    if (err || !decoded) {
      throw Error('Authentication failure, Invalid access token.');
    }

    const { user } = decoded;
    req.user = user || decoded;
    res.locals.userId = req.user.id;
  });
}

export default authenticate;
