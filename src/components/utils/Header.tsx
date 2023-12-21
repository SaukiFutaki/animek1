"use client";
import { useRef } from "react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlass } from "@phosphor-icons/react";

const Header = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter()

  const searchAnime = () => {
    
    if (searchRef.current) {
      const searchValue = searchRef.current.value.trim();
      if (searchValue) {
        router.push(`/search/${searchValue}`);
      } else {
       return
      }
    }
  };


  const handleSearch = (event : React.MouseEvent<HTMLButtonElement>)=>{
    event.preventDefault();
    searchAnime()
  }

  const handleKeyPress = (event : React.KeyboardEvent<HTMLInputElement>)=>{
    if(event.key === 'Enter'){
      event.preventDefault();
      searchAnime()
    }
  }

  return (
    <>
      <header className="my-8 px-10 w-full ">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <Link href={`/`} className="text-3xl font-bold">
            ANIME<span className="text-red-500">K</span>
          </Link>
          <div className="relative">
            <input
              className=" md:block bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="cari sini"
              ref={searchRef}
              onKeyDown={handleKeyPress}
            />
            <button className="absolute top-2 end-2" onClick={handleSearch}><MagnifyingGlass size={24}/></button>
          </div>
        </div>
      </header>
      <div className="bg-black p-1 mb-10" ></div>
    </>
  );
};

export default Header;
