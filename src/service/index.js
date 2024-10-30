import allData from "../data.json";

export const getData = ({ page, itemPerPage = 9, filters, sort }) => {
  return new Promise((res) => {
    setTimeout(() => {
      
      const filteredData = allData.filter((d) => {
        // filter categories
        if (filters.categories.length > 0 && !filters.categories.includes(d.category)) {
          return false;
        }

        // filter brands
        if (filters.brands.length > 0 && !filters.brands.includes(d.brand)) {
          return false;
        }

        // filter price
        if (d.price < filters.price[0] || d.price > filters.price[1]) {
          return false;
        }

        // filter rating
        if (d.rating > 0 && d.rating < filters.rating) {
          return false;
        }

        return true;
      });

      const sortedData =
        sort.value === 0
          ? filteredData
          : filteredData.sort((a, b) => {
              if (sort.value === 1) {
                return a.name.localeCompare(b.name);
              } else if (sort.value === 2) {
                return b.name.localeCompare(a.name);
              } else if (sort.value === 3) {
                return a.price - b.price;
              } else if (sort.value === 4) {
                return b.price - a.price;
              } else if (sort.value === 5) {
                return b.rating - a.rating;
              } else if (sort.value === 6) {
                return a.rating - b.rating;
              }

              return 0;
            });

      const result = sortedData.slice((page - 1) * itemPerPage, page * itemPerPage);

      res({ result, hasMore: page * itemPerPage < filteredData.length });
    }, 500);
  });
};
