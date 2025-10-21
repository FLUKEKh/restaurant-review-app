## รายละเอียดโปรเจค
ปรเจคนี้คือเว็บไซต์รีวิวร้านอาหารแบบ Full-stack ที่สาธิตการทำงานร่วมกันระหว่าง Frontend (React) และ Backend (Node.js/Express) ผู้ใช้สามารถค้นหา, กรอง, และดูรายละเอียดร้านอาหาร รวมถึงการเขียนรีวิวใหม่ได้ โดยระบบ Backend จะบันทึกข้อมูลลงไฟล์ JSON และคำนวณคะแนนเฉลี่ยของร้านให้อัตโนมัติ
## เทคโนโลยีที่ใช้
- Frontend: React 18 + Vite
- Backend: Node.js + Express
- Database: JSON File Storage

## Features ที่ทำได้
### Required Features (70 คะแนน)
- [x] แสดงรายการร้านอาหาร
- [x] ค้นหาร้าน
- [x] กรองตามหมวด/rating/ราคา
- [x] ดูรายละเอียดร้าน
- [x] เพิ่มรีวิว
- [x] Validation
- [x] อัพเดท rating อัตโนมัติ

### Bonus Features (ถ้ามี)
- [ ] Sort restaurants
- [ ] Responsive design
- [ ] Animations

## วิธีติดตั้งและรัน

### Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## API Endpoints
- GET `/api/restaurants` - ดึงรายการร้านทั้งหมด
- GET `/api/restaurants/:id` - ดึงร้านตาม ID
- POST `/api/reviews` - เพิ่มรีวิว
- GET `/api/stats` - ดึงสถิติ

## Screenshots
### หน้าแรก
<img width="1855" height="863" alt="image" src="https://github.com/user-attachments/assets/16380933-a1f1-4702-a2b1-79dadbc06800" />



### รายละเอียดร้าน
<img width="1326" height="610" alt="image" src="https://github.com/user-attachments/assets/ac46070f-974c-4a63-b67d-732187d803a9" />



### ฟอร์มรีวิว
<img width="1117" height="693" alt="image" src="https://github.com/user-attachments/assets/c6dfcf90-6555-4608-89f6-49bada531937" />



## ผู้พัฒนา
- นายวรรธนะ คำมาลัย
- รหัสนักศึกษา 67543210023-7
- wanthana_kh67@live.rmutl.ac.th

## License
MIT License
