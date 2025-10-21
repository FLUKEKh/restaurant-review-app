import { useState, useEffect, useCallback } from 'react'; // 1. import useCallback
import { getRestaurants } from '../services/api';
import RestaurantCard from './RestaurantCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';

function RestaurantList({ onSelectRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minRating: '',
    priceRange: ''
  });

  // Effect นี้จะทำงานเฉพาะตอน filters เปลี่ยน
  useEffect(() => {
    fetchRestaurants();
  }, [filters]); 

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getRestaurants(filters);
      if (result.success) {
        setRestaurants(result.data);
      }
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลร้านอาหารได้');
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // FIX 1: ห่อหุ้ม handleSearch ด้วย useCallback
  // ========================================
  const handleSearch = useCallback((searchTerm) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      search: searchTerm
    }));
  }, []); // array ว่าง = สร้างฟังก์ชันนี้แค่ครั้งเดียว

  // ========================================
  // FIX 2: ห่อหุ้ม handleFilterChange ด้วย useCallback
  // ========================================
  const handleFilterChange = useCallback((newFilter) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilter
    }));
  }, []); // array ว่าง = สร้างฟังก์ชันนี้แค่ครั้งเดียว

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="restaurant-list-container">
      {/* ส่งฟังก์ชันที่ "แช่แข็ง" แล้วไปให้ลูก */}
      <SearchBar onSearch={handleSearch} />
      <FilterPanel onFilterChange={handleFilterChange} filters={filters} />
      
      {loading && restaurants.length === 0 ? ( // โชว์ loading แค่ตอนโหลดครั้งแรก
        <div className="loading">กำลังโหลด...</div>
      ) : (
        <>
          {restaurants.length === 0 ? (
            <div className="no-results">ไม่พบร้านอาหารที่ตรงเงื่อนไข</div>
          ) : (
            <div className="restaurant-grid">
              {restaurants.map(restaurant => (
                <RestaurantCard 
                  key={restaurant.id}
                  restaurant={restaurant}
                  onSelect={() => onSelectRestaurant(restaurant.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RestaurantList;