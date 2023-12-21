"use client";

import useSWR from "swr";

import AnimeList from "@/components/animelist";
import MangaList from "./../components/mangalist/index";
import Head from "./header";
import Loading from "./loading";

const fethcer = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=10`,
    fethcer
  );
  const { data: dataManga, error: errorManga } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/manga?limit=10`,
    fethcer
  );
  if (error) return <div>{error.message}</div>;
  if (!data) return <div><Loading/></div>;

  if (errorManga) return <div>{errorManga.message}</div>;
  if (!dataManga) return <div><Loading/></div>;

  return (
    <div className=" flex flex-col ">
      <Head titleHeader="Anime" LinkTitle="Lihat Semua" href="/populer"/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.data.map((anime: any) => (
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
      <Head titleHeader="Manga" LinkTitle="Lihat Semua"  />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dataManga.data.map((manga: any) => (
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
}
