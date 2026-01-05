const { Pool } = require('pg');

// 创建数据库连接池
const pool = new Pool({
  host: 'db.nswxafyljltfykutpgqw.supabase.co',
  user: 'postgres',
  password: 'FAquLMGU8TNYAk3Q',
  database: 'postgres',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
    require: true,
  },
});

// 测试连接
async function testConnection() {
  try {
    console.log('正在测试数据库连接...');
    const client = await pool.connect();
    console.log('成功连接到数据库！');
    
    // 测试简单查询
    const res = await client.query('SELECT NOW()');
    console.log('当前时间:', res.rows[0].now);
    
    // 检查posts表是否存在（注意Post是大小写敏感的）
    const tables = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'Post'"
    );
    const hasPostsTable = tables.rows.length > 0;
    console.log('posts表是否存在:', hasPostsTable);
    
    // 查询表中的数据
    if (hasPostsTable) {
      const posts = await client.query('SELECT * FROM "Post"');
      console.log('表中数据数量:', posts.rows.length);
      if (posts.rows.length > 0) {
        console.log('第一条数据:', posts.rows[0]);
      }
    }
    
    client.release();
    await pool.end();
    console.log('连接测试完成！');
  } catch (error) {
    console.error('数据库连接失败:', error);
    await pool.end();
  }
}

testConnection();