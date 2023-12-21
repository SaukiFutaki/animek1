"use client"
import Loading from "@/app/loading";
import VideoPlayer from "@/components/utils/VideoPlayer";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

interface Props {
  params: {
    id: number;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Page = ({ params }: Props) => {
  const { id } = params;
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime/${id}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>
  if (!data) return <div><Loading /></div>

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <div className="space-x-2">
            <div className="inline-flex items-center bg-blue-500 justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-blue-600 dark:focus:ring-gray-800">Rate : {data.data.score}</div>
            <div className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Rank : {data.data.rank}</div>
            </div>
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">{data.data.title} - {data.data.year}</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">{data.data.synopsis}</p>
            <div className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              total eps : {data.data.episodes}
            </div>
            <div className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              {data.data.duration}
            </div>
          </div>
          <div className=" lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
            <Image src={data.data.images.webp.image_url} alt="mockup" className="rounded-lg object-cover" width={500} height={500} />
          </div>
        </div>
      </section>
      <div className=""><VideoPlayer youtubeId={data.data.trailer.youtube_id}/></div>
    </>
  )
};

export default Page;
