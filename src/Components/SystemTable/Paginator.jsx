import React, { useState } from "react";
import style from "./Paginator.module.css"; // Путь к вашему файлу стилей

const Paginator = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChanged,
}) => {
  const pagesCount = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: pagesCount }, (_, index) => index + 1);

  return (
    <div className={style.paginator}>
      {pages.map((page) => (
        <span
          key={page}
          className={currentPage === page ? style.selectedPage : style.page}
          onClick={() => onPageChanged(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};

export default Paginator;
