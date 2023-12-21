"use client";
import React from "react";
import useSWR from "swr";
import Loading from "@/app/loading";
import Head from "@/app/header";
import AnimeList from "@/components/animelist";
import MangaList from "@/components/mangalist";

interface Props {
  params: {
    keyword: string;
  };
}

const fethcer = (url: string) => fetch(url).then((res) => res.json());
const Page = ({ params }: Props) => {
  const { keyword } = params;

  const { data: searchAnime, error: errorSearch } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${decodeURIComponent(keyword)}`,
    fethcer
  );

  const { data: searchManga, error: errorSearchManga } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/manga?q=${decodeURIComponent(keyword)}`, 
    fethcer
  )


  console.log(searchManga)
  console.log(searchAnime)
  if (errorSearch || errorSearchManga) {
    return <div>Terjadi kesalahan dalam pencarian.</div>;
  }

  if (!searchAnime && !searchManga) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (searchAnime?.data?.length === 0 && searchManga?.data?.length === 0) {
    return <div className="text-white text-center font-bold bg-blue-800 rounded-lg p-4   sm:m-0 lg:m-72 ">kata kunci yg anda cari tidak ada `${decodeURIComponent(keyword)}`.</div>;
  }

  return (
    <div>
      <Head titleHeader={`pencarian untuk ${decodeURIComponent(keyword)}`} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {searchAnime?.data?.map((anime: any) => (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {searchManga?.data?.map((manga: any) => (
          <MangaList
            key={manga.mal_id}
            title={manga.title}
            title_japanese={manga.title_japanese}
            images={manga.images.webp.image_url}
            type={manga.type}
            id={manga.mal_id}

          />
        ))}
      </div>
    </div>
  );
};

export default Page;
