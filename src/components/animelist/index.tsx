import Image from "next/image";
import Link from "next/link";


interface PropsData {
  title: string;
  title_japanese : string
  images : string
  type : string
  id : number

}


export default function AnimeList({title,title_japanese,images,type,id,}:PropsData){
return (
  <Link href={`/anime/${id}`}>
        <div className="">
            <div className="max-w-sm mx-auto relative rounded-lg cursor-pointer shadow-lg">
              <Image src={images} alt="..." width={350} height={350} className="w-full h-auto object-cover rounded-lg max-h-96"/>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="mt-2">{title_japanese}</p>
                <h1>{type}</h1>
               
              </div>
            </div>
        </div>
    </Link>
);
};
