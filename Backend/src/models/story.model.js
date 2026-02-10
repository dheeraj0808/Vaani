const { pool } = require('../config/mysql');

class Story {
  // Create a new story (expires in 24 hours)
  static async create({ content, authorId, mediaUrl, mediaType }) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // +24 hours
    const [result] = await pool.query(
      'INSERT INTO stories (content, author_id, media_url, media_type, expires_at) VALUES (?, ?, ?, ?, ?)',
      [content, authorId, mediaUrl, mediaType, expiresAt]
    );
    return await Story.findById(result.insertId);
  }

  // Find story by ID
  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT s.*, u.username, u.full_name, u.avatar,
        (SELECT COUNT(*) FROM story_viewers WHERE story_id = s.id) as view_count
      FROM stories s
      JOIN users u ON s.author_id = u.id
      WHERE s.id = ? AND s.expires_at > NOW()
    `, [id]);
    return rows[0] || null;
  }

  // Get active stories (not expired)
  static async getActiveStories() {
    const [rows] = await pool.query(`
      SELECT s.*, u.username, u.full_name, u.avatar,
        (SELECT COUNT(*) FROM story_viewers WHERE story_id = s.id) as view_count
      FROM stories s
      JOIN users u ON s.author_id = u.id
      WHERE s.expires_at > NOW()
      ORDER BY s.created_at DESC
    `);
    return rows;
  }

  // Get stories by user
  static async getByUserId(userId) {
    const [rows] = await pool.query(`
      SELECT s.*,
        (SELECT COUNT(*) FROM story_viewers WHERE story_id = s.id) as view_count
      FROM stories s
      WHERE s.author_id = ? AND s.expires_at > NOW()
      ORDER BY s.created_at DESC
    `, [userId]);
    return rows;
  }

  // Mark story as viewed
  static async addViewer(storyId, userId) {
    await pool.query('INSERT IGNORE INTO story_viewers (story_id, user_id) VALUES (?, ?)', [storyId, userId]);
  }

  // Get viewers of a story
  static async getViewers(storyId) {
    const [rows] = await pool.query(`
      SELECT sv.viewed_at, u.id, u.username, u.full_name, u.avatar
      FROM story_viewers sv
      JOIN users u ON sv.user_id = u.id
      WHERE sv.story_id = ?
      ORDER BY sv.viewed_at DESC
    `, [storyId]);
    return rows;
  }

  // Delete story
  static async deleteById(id) {
    const [result] = await pool.query('DELETE FROM stories WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  // Cleanup expired stories
  static async cleanupExpired() {
    const [result] = await pool.query('DELETE FROM stories WHERE expires_at <= NOW()');
    return result.affectedRows;
  }
}

module.exports = Story;
