const API_URL = 'http://localhost:3000/api';

/**
 * ฟังก์ชันสำหรับดึงรายการร้านอาหารทั้งหมด พร้อม filtering
 * @param {Object} filters - ตัวกรอง { search, category, minRating, priceRange }
 * @returns {Promise} - ข้อมูลร้านอาหาร
 */
export const getRestaurants = async (filters = {}) => {
  try {
    // TODO 1: สร้าง query string จาก filters
    const queryParams = new URLSearchParams();
    // เพิ่ม query parameter เฉพาะเมื่อมีค่าเท่านั้น
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.minRating) queryParams.append('minRating', filters.minRating);
    if (filters.priceRange) queryParams.append('priceRange', filters.priceRange);
    
    // TODO 2: สร้าง URL พร้อม query string
    const queryString = queryParams.toString();
    // เพิ่ม '?' ต่อเมื่อ queryString ไม่ใช่ค่าว่าง
    const url = `${API_URL}/restaurants${queryString ? `?${queryString}` : ''}`;

    // TODO 3: fetch ข้อมูล
    const response = await fetch(url);
    
    // TODO 4: ตรวจสอบ response
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }
    
    // TODO 5: แปลง response เป็น JSON และ return
    return await response.json();
    
  } catch (error) {
    console.error('API Error:', error);
    throw error; // ส่ง error ต่อให้ component ที่เรียกใช้
  }
};

/**
 * ฟังก์ชันสำหรับดึงข้อมูลร้านอาหารตาม ID พร้อมรีวิว
 * @param {number} id - รหัสร้าน
 * @returns {Promise} - ข้อมูลร้านและรีวิว
 */
export const getRestaurantById = async (id) => {
  try {
    // TODO 6: เติมโค้ดตามตัวอย่าง getRestaurants
    const response = await fetch(`${API_URL}/restaurants/${id}`);
    
    if (!response.ok) {
      // ถ้าไม่เจอ (404) หรือ server error (500)
      // เราอ่าน error message จาก backend เพื่อแสดงผลที่แม่นยำขึ้น
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch restaurant');
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * ฟังก์ชันสำหรับเพิ่มรีวิวใหม่
 * @param {Object} reviewData - ข้อมูลรีวิว
 * @returns {Promise} - ผลลัพธ์การเพิ่มรีวิว
 */
export const addReview = async (reviewData) => {
  try {
    // TODO 7: เขียน POST request
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    });
    
    // TODO 8: ตรวจสอบ response
    if (!response.ok) {
      // ถ้า response ไม่ ok (เช่น 400 Bad Request)
      const errorData = await response.json();
      // ส่ง errorData ทั้งก้อน (ที่มี errors array) ให้ component
      throw errorData; 
    }
    
    // TODO 9: return ข้อมูล JSON (ถ้าสำเร็จ 201 Created)
    return await response.json();
    
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};