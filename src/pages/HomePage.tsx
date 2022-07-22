import React, { useEffect, useState } from "react";
import RepoCard from "../components/RepoCard";
import { useDebounce } from "../hooks/debounce";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    /* Пропускаем отправку дынных, если количество символов меньше 3х */
    skip: debounced.length < 3,

    /* Обновление данных при появлении активности на сайте спустя время */
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false)
  };

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  return (
    <div className="flex justify-center mx-auto pt-10 h-screen w-screen">
      {isError && (
        <h3 className="text-center text-red-600">Что-то пошло не так...</h3>
      )}

      <div className="relative w-[560px]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="border py-2 px-4 h-[42px] mb-2 w-full"
          placeholder="Поиск в гитхабе..."
        />

        {dropdown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className="text-center">Загрузка...</p>}
            {data?.map((user) => (
              <li
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                key={user.id}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className="container">
          {areReposLoading && (
            <p className="text-center">Загрузка репозитория...</p>
          )}

          {repos?.map(repo => <RepoCard repo={repo} key={repo.id} />)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
