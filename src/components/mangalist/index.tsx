import Image from "next/image";
import Link from "next/link";

interface MangaProps {
  title: string;
  title_japanese : string
  images : string
  type : string
  id : number
}

export default function MangaList({title,title_japanese,images,type,id}: MangaProps){
  return (
    <Link href={`/manga/${id}`}>
  <div className="group relative m-0 flex h-72 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
    <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
      <Image src={images} className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt=".." width={350} height={350} />
    </div>
    <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
      <h1 className="font-serif text-2xl font-bold text-white shadow-xl">{title}</h1>
      <h1 className="text-sm font-bold text-gray-200 shadow-xl group-hover:text-black">{title_japanese}</h1>
      <h1 className=" text-sm font-bold text-black-200 shadow-xl group-hover:text-white">{type}</h1>
    </div>
  </div>

    </Link>
  )
}