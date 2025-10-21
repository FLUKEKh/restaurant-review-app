import React from 'react';

// เราเปลี่ยน props จาก { restaurant, onClick }
// เป็น { restaurant, onSelect } เพื่อให้ตรงกับที่ RestaurantList ส่งมา
function RestaurantCard({ restaurant, onSelect }) {
  return (
    // เมื่อ div นี้ถูกคลิก (onClick) ให้มันเรียกใช้ฟังก์ชัน onSelect
    <div className="restaurant-card" onClick={onSelect}>
      <img src={restaurant.image} alt={restaurant.name} className="card-image" />
      <div className="card-content">
        <h3>{restaurant.name}</h3>
        <p className="card-category">{restaurant.category}</p>
        <div className="card-info">
          <span className="rating">
            ⭐ {restaurant.averageRating > 0 ? restaurant.averageRating.toFixed(1) : 'N/A'}
          </span>
          <span className="price">{'฿'.repeat(restaurant.priceRange)}</span>
          <span className="reviews">({restaurant.totalReviews} รีวิว)</span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;