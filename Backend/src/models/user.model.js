const bcrypt = require('bcryptjs');
const { pool } = require('../config/mysql');

class User {
  // Create a new user
  static async create({ username, email, password, fullName }) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, fullName]
    );
    return await User.findById(result.insertId);
  }

  // Find user by ID
  static async findById(id, excludeFields = []) {
    let selectFields = '*';
    if (excludeFields.length > 0) {
      const allFields = ['id', 'username', 'email', 'password', 'full_name', 'bio', 'avatar', 'cover_image', 'role', 'is_verified', 'refresh_token', 'created_at', 'updated_at'];
      const fields = allFields.filter(f => !excludeFields.includes(f));
      selectFields = fields.join(', ');
    }
    const [rows] = await pool.query(`SELECT ${selectFields} FROM users WHERE id = ?`, [id]);
    return rows[0] || null;
  }

  // Find user by username or email
  static async findByUsernameOrEmail(username, email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username || '', email || '']
    );
    return rows[0] || null;
  }

  // Find user by email
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  }

  // Find user by username
  static async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0] || null;
  }

  // Update user fields
  static async updateById(id, updates) {
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
    values.push(id);
    await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
    return await User.findById(id);
  }

  // Compare password
  static async isPasswordCorrect(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  // Get follower count
  static async getFollowerCount(userId) {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM followers WHERE following_id = ?', [userId]);
    return rows[0].count;
  }

  // Get following count
  static async getFollowingCount(userId) {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM followers WHERE follower_id = ?', [userId]);
    return rows[0].count;
  }

  // Follow user
  static async follow(followerId, followingId) {
    await pool.query('INSERT IGNORE INTO followers (follower_id, following_id) VALUES (?, ?)', [followerId, followingId]);
  }

  // Unfollow user
  static async unfollow(followerId, followingId) {
    await pool.query('DELETE FROM followers WHERE follower_id = ? AND following_id = ?', [followerId, followingId]);
  }

  // Convert user object to safe JSON (remove password)
  static toJSON(user) {
    if (!user) return null;
    const { password, refresh_token, ...safeUser } = user;
    return safeUser;
  }
}

module.exports = User;
