import style from "./Table.module.css";
import book from "./../../assets/images/book.svg";
import bookMark from "./../../assets/images/bookMark.png";
import sever from "./../../assets/images/stak.png";
import right from "./../../assets/images/rightArrow.svg";
import Paginator from "./Paginator";
import React, { useState, useEffect } from "react";

function Table({ data, searchTerm }) {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data && data.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChanged = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset current page when changing items per page
  };
  const filteredData = data
    ? data.filter(
        (item) =>
          typeof item.name === "string" &&
          typeof searchTerm === "string" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className={style.table}>
      {data && data.length > 0 ? (
        <>
          <div className={style.blockList}>
            <div className={style.listText}>Список АИС</div>
            <div className={style.filterBlock}>
              Показывать по:
              <button
                className={style.butFilter}
                onClick={() => handleItemsPerPageChange(5)}
              >
                5
              </button>
              <button
                className={style.butFilter}
                onClick={() => handleItemsPerPageChange(10)}
              >
                10
              </button>
              <button
                className={style.butFilter}
                onClick={() => handleItemsPerPageChange(15)}
              >
                15
              </button>
            </div>
          </div>
          <div className={style.tablePagination}>
            <table>
              <tbody>
                {currentItems &&
                  currentItems.map((item) => (
                    <tr key={item.id} className={style.mainTable}>
                      <td className={style.mainTextTable}>{item.name}</td>

                      <div className={style.blockIcons}>
                        <td className={style.iconTable}>
                          <img src={book} alt="book" />
                          {item.book}
                          <img src={right} alt="right" />
                        </td>
                        <td className={style.iconTable}>
                          <img src={sever} alt="sever" />
                          {item.server}
                          <img src={right} alt="right" />
                        </td>
                        <td className={style.iconTable}>
                          <img src={bookMark} alt="bookMark" />
                          {item.bookmark}
                          <img src={right} alt="right" />
                        </td>
                      </div>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Paginator
              totalItems={data ? data.length : 0}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChanged={onPageChanged}
            />
          </div>
        </>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default Table;
