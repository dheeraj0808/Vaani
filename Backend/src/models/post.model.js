const { pool } = require('../config/mysql');

class Post {
  // Create a new post
  static async create({ content, authorId, isReply = false, replyTo = null }) {
    const [result] = await pool.query(
      'INSERT INTO posts (content, author_id, is_reply, reply_to) VALUES (?, ?, ?, ?)',
      [content, authorId, isReply, replyTo]
    );
    return await Post.findById(result.insertId);
  }

  // Find post by ID with author info and counts
  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT p.*, 
        u.username, u.full_name, u.avatar,
        (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
        (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) as comment_count,
        (SELECT COUNT(*) FROM retweets WHERE post_id = p.id) as retweet_count
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.id = ?
    `, [id]);

    if (!rows[0]) return null;

    // Get images
    const [images] = await pool.query('SELECT image_url FROM post_images WHERE post_id = ?', [id]);
    rows[0].images = images.map(img => img.image_url);

    return rows[0];
  }

  // Get all posts (feed) with pagination
  static async getFeed(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(`
      SELECT p.*, 
        u.username, u.full_name, u.avatar,
        (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
        (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) as comment_count,
        (SELECT COUNT(*) FROM retweets WHERE post_id = p.id) as retweet_count
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.is_reply = FALSE
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    // Get images for each post
    for (const post of rows) {
      const [images] = await pool.query('SELECT image_url FROM post_images WHERE post_id = ?', [post.id]);
      post.images = images.map(img => img.image_url);
    }

    return rows;
  }

  // Get posts by user ID
  static async getByUserId(userId, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(`
      SELECT p.*, 
        u.username, u.full_name, u.avatar,
        (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
        (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) as comment_count,
        (SELECT COUNT(*) FROM retweets WHERE post_id = p.id) as retweet_count
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.author_id = ?
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `, [userId, limit, offset]);

    return rows;
  }

  // Delete post
  static async deleteById(id) {
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  // Like a post
  static async like(postId, userId) {
    await pool.query('INSERT IGNORE INTO post_likes (post_id, user_id) VALUES (?, ?)', [postId, userId]);
  }

  // Unlike a post
  static async unlike(postId, userId) {
    await pool.query('DELETE FROM post_likes WHERE post_id = ? AND user_id = ?', [postId, userId]);
  }

  // Check if user liked a post
  static async isLikedBy(postId, userId) {
    const [rows] = await pool.query('SELECT id FROM post_likes WHERE post_id = ? AND user_id = ?', [postId, userId]);
    return rows.length > 0;
  }

  // Add comment
  static async addComment(postId, authorId, content) {
    const [result] = await pool.query(
      'INSERT INTO post_comments (post_id, author_id, content) VALUES (?, ?, ?)',
      [postId, authorId, content]
    );
    return { id: result.insertId, post_id: postId, author_id: authorId, content };
  }

  // Get comments
  static async getComments(postId) {
    const [rows] = await pool.query(`
      SELECT c.*, u.username, u.full_name, u.avatar
      FROM post_comments c
      JOIN users u ON c.author_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at ASC
    `, [postId]);
    return rows;
  }

  // Add image to post
  static async addImage(postId, imageUrl) {
    await pool.query('INSERT INTO post_images (post_id, image_url) VALUES (?, ?)', [postId, imageUrl]);
  }

  // Retweet
  static async retweet(postId, userId) {
    await pool.query('INSERT IGNORE INTO retweets (post_id, user_id) VALUES (?, ?)', [postId, userId]);
  }

  // Undo retweet
  static async undoRetweet(postId, userId) {
    await pool.query('DELETE FROM retweets WHERE post_id = ? AND user_id = ?', [postId, userId]);
  }
}

module.exports = Post;
