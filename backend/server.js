const express = require('express');
const cors = require('cors');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');
const { readJsonFile } = require('./utils/fileManager');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🍜 Restaurant Review API',
    version: '1.0.0',
    endpoints: {
      restaurants: '/api/restaurants',
      reviews: '/api/reviews',
      stats: '/api/stats'
    }
  });
});

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);

// ========================================
// GET /api/stats - ดึงสถิติทั้งหมด
// ========================================
app.get('/api/stats', async (req, res) => {
  try {
    // 1. อ่านข้อมูล restaurants.json และ reviews.json
    // (สันนิษฐานว่าไฟล์อยู่ในโฟลเดอร์ data)
    const [restaurants, reviews] = await Promise.all([
      readJsonFile('./data/restaurants.json'),
      readJsonFile('./data/reviews.json')
    ]);

    // 2. คำนวณสถิติ
    // - totalRestaurants: จำนวนร้านทั้งหมด
    const totalRestaurants = restaurants.length;

    // - totalReviews: จำนวนรีวิวทั้งหมด
    const totalReviews = reviews.length;

    // - averageRating: คะแนนเฉลี่ยของร้านทั้งหมด (ปัดเศษ 1 ตำแหน่ง)
    //   คำนวณจากร้านที่มีรีวิวแล้ว (averageRating > 0)
    const ratedRestaurants = restaurants.filter(r => r.averageRating > 0);
    const totalAverageSum = ratedRestaurants.reduce((sum, r) => sum + r.averageRating, 0);
    let averageRating = ratedRestaurants.length > 0 ? (totalAverageSum / ratedRestaurants.length) : 0;
    averageRating = parseFloat(averageRating.toFixed(1)); // ปัดเศษ 1 ตำแหน่ง

    // - topRatedRestaurants: ร้าน 5 อันดับแรกที่มี rating สูงสุด
    const topRatedRestaurants = [...restaurants]
      .sort((a, b) => b.averageRating - a.averageRating) // เรียงจากมากไปน้อย
      .slice(0, 5); // เอา 5 อันดับแรก

    // 3. ส่งข้อมูลกลับ
    res.json({
      success: true,
      data: {
        totalRestaurants,
        totalReviews,
        averageRating,
        topRatedRestaurants
      }
    });
    
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงสถิติ'
    });
  }
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});