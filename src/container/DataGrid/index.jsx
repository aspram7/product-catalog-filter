import { useCallback, useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import Rate from "../../components/Rate";
import Loading from "../../components/Loading";
import { useFilters } from "../../context/filters";
import { getData } from "../../service";

import "react-dropdown/style.css";
import "./style.css";

const sortOptions = [
  { value: 0, label: "Default" },
  { value: 1, label: "Name (A - Z)" },
  { value: 2, label: "Name (Z - A)" },
  { value: 3, label: "Price (Low > High)" },
  { value: 4, label: "Price (High > Low)" },
  { value: 5, label: "Rate (High - Low)" },
  { value: 6, label: "Rate (Low - High)" },
];

const DataGrid = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [sort, setSort] = useState(sortOptions[0]);
  const { filters } = useFilters();

  const handleFetchData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const { result, hasMore } = await getData({ page, filters, sort });

        setData((data) => ({ ...data, [page]: result }));        
        setHasMore(hasMore);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [filters, sort]
  );

  const handlePagination = useCallback(() => {
    setPage((page) => page + 1);
    handleFetchData(page + 1);
  }, [page, handleFetchData]);
  
  useEffect(() => {
    const sort = localStorage.getItem("sort");

    if (sort) {
      setSort(JSON.parse(sort));
    }
  }, []);

  const handleSort = useCallback((sort) => {
    setSort(sort);
    localStorage.setItem("sort", JSON.stringify(sort));
  }, []);

  useEffect(() => {
    setPage(1);
    setData({});
    handleFetchData(1);
  }, [filters, sort, handleFetchData]);

  return (
    <div className="data-grid-container">
      {loading && <Loading title="loading" />}
      <div className="sort">
        Sort by:&nbsp;
        <Dropdown className="sort-dropdown" options={sortOptions} onChange={handleSort} value={sort} />
      </div>
      <div className="grid-box">
        {Object.values(data)
          .flat()
          .map((item) => {
            return (
              <div className="data-grid-item" key={item.id}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                />
                <div className="title">
                  {item.category} / {item.brand} / {item.name}
                </div>
                <div className="price">
                  <span>{item.price}</span>
                  <div className="item-rating">
                    <Rate readOnly defaultValue={item.rating} />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {!loading && <div className="empty-box">No products found</div>}
      {hasMore && !loading && (
        <div className="pagination">
          <button onClick={handlePagination}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default DataGrid;
