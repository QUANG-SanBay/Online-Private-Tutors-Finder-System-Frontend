import React from "react";

const FilterSidebar = () => {
  return (
    <aside className="filter-sidebar">
      <h2 className="sidebar-title">Tìm gia sư</h2>
      <select>
        <option>Chọn lớp</option>
      </select>
      <select>
        <option>Trình độ chuyên môn</option>
        <option>Giáo viên</option>
        <option>Sinh viên</option>
        <option>Đại học</option>
        <option>Cao đẳng</option>
      </select>
      <select>
        <option>Chọn môn</option>
        <option>Toán học</option>
        <option>Vật lý</option>
        <option>Hóa học</option>  
        <option>Sinh học</option>
        <option>Ngữ văn</option>
        <option>Tiếng Anh</option>
        <option>Lịch sử</option>
        <option>Địa lý</option>
      </select>
      <select>
        <option>Chọn gia sư</option>
        <option>Gia sư Tiểu học</option>
        <option>Gia sư THCS</option>
        <option>Gia sư THPT</option>
        <option>Gia sư Tiếng Anh</option>
      </select>
      <select>
        <option>Chọn giới tính</option>
        <option>Nam</option>
        <option>Nữ</option>
      </select>
      <button className="search-btn">Tìm kiếm</button>
    </aside>
  );
};

export default FilterSidebar;
