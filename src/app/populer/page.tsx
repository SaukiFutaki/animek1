"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "../header";
import Pagination from "@/components/utils/Pagination";
import AnimeList from "@/components/animelist";
import Loading from "../loading";
import useSWR from "swr";

interface DataListProps {
  title: string;
  images: { webp: { image_url: string } };
  mal_id: number;
  title_japanese: string;
  type: string;
}

const fetcher = (url : string) => fetch(url).then((res)=> res.json())

const Page = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data: animeTopList, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?page=${currentPage}`,
    fetcher
  );

  if (error) {
    return <div>Error fetching data!</div>;
  }

  if (!animeTopList) {
    return <div><Loading/></div>;
  }

  const { data, pagination } = animeTopList;

  return (
    <div>
      <div>
        <Head titleHeader={`Anime Paling Populer ${currentPage}`} LinkTitle="anjay"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {animeTopList.data.map((anime: any) => (
          <AnimeList
            key={anime.mal_id}
            title={anime.title}
            title_japanese={anime.title_japanese}
            images={anime.images.webp.image_url}
            type={anime.type}
            id={anime.mal_id}
          
          />
        ))}
      </div>
   
      <div>
        <Pagination page={currentPage} lastPage={pagination?.last_visible_page} setPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default Page;