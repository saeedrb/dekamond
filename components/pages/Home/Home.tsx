import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import utils from "../../../utils/utils";
import data from "../../../data.json";

interface PriceItem {
  id: number;
  title: string;
  price: string;
  category: string;
}

const Home: React.FC = () => {
  const [list, setList] = useState<PriceItem[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setList(data.priceList);
  }, []);

useEffect(() => {
  const newList = data.priceList.filter(item =>
    item.title.includes(search)
  );

  setList(newList);
}, [search, data.priceList]);
  return (
    <div className={styles.container}>
      <h1>نرخ خدمات کافینت شهرستان ساری</h1>
      <Search search={search} setSearch={setSearch} />
      <div id="pos-article-text-card-109255"></div>
      <DataList list={list} />
    </div>
  );
};

interface SearchProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  return (
    <div className={styles.search}>
      <div>
        <input
          name="title"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="نرخ مورد نظر را جستجو کن"
        />
      </div>
    </div>
  );
};

interface DataListProps {
    list: PriceItem[]
}

const DataList: React.FC<DataListProps> = ({ list }) => {
  return (
    <div className={styles.dataList}>
      <div className={styles.dataHeader}>
        <div>
          <span>ردیف</span>
        </div>
        <div>
          <span>عنوان</span>
        </div>
        <div>
          <span>گروه / دسته</span>
        </div>
        <div>
          <span>قیمت</span>
        </div>
      </div>
      {list.map((item, index) => {
        return (
          <div className={styles.dataRow} key={index}>
            <div>
              <span>{utils.parseDigit(`${index+1}`)}</span>
            </div>
            <div>
              <span>{utils.parseDigit(item.title)}</span>
            </div>
            <div>
              <span>{utils.parseDigit(item.category)}</span>
            </div>
            <div>
              <span>{utils.parseDigit(utils.putCommas(item.price))} تومان</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Home;
