import React, { useEffect, useState } from "react";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortPropety: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://64ed91b91f872182714164d4.mockapi.io/app/photos/alif-test-junior?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType.sortPropety}&order=desc`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const onClickCategory = (index) => {
    setCategoryId(index);
  };
 
  return (
    <div className="p-[40px]">
      <div className="container">
        <div className="flex items-center justify-between">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
        </div>
        <h2 className="flex items-center text-[32px] font-bold pb-[25px]">
          Все пиццы
        </h2>
        <div className="flex flex-wrap gap-[20px]">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((item) => <PizzaBlock {...item} key={item.id} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
