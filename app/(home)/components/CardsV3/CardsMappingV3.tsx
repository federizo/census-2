"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import census from "@/app/assets/census.png";

const Page: React.FC = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function handleCardClick(href: string) {
    if (isMounted) {
      router.push(href);
    }
  }

  return (
    <div className="flex justify-center xl:w-full h-full relative mt-20 gap-5 ">
      {data.map((item, index) => (
        <div
          key={index}
          className="h-[500px] w-[320px] text-white relative group overflow-hidden hover:scale-105 duration-300 hover:bg-top border-solid border-2 border-gray-150 rounded-lg"
          onClick={() => handleCardClick(item.href)}
        >
          <img
            src={item.imageSrc}
            alt={item.title1}
            className="h-full w-full object-cover object-bottom absolute group-hover:h-[800px] group-hover:object-left-top duration-300"
          />
          <div className="hover:backdrop-blur-3xl w-full h-full absolute flex flex-col duration-500">
            <div className="p-7">
              <label
                className={`font-bold text-[2rem] uppercase ${
                  index === 0 || index === 1 || index === 2 || index === 3
                    ? "text-black"
                    : "text-white"
                }`}
              >
                {item.title1}
              </label>
              <h2
                className={`font-semibold text-[2.5vh] mt-6 ${
                  index === 0 || index === 1 || index === 2 || index === 3
                    ? "text-black"
                    : "text-white"
                }`}
              >
                {item.title2}
              </h2>
            </div>
            <div className="translate-x-full group-hover:translate-x-0 duration-300 delay-100 flex flex-col justify-between h-full mt-2 text-justify">
              <p
                className={`px-7 w-[95%] ${
                  index === 0 || index === 1 || index === 2 || index === 3
                    ? "text-black"
                    : "text-white"
                }`}
              >
                {item.description}
              </p>
            </div>
            <label
              className={`flex gap-1 text-[2vh] font-semibold w-full justify-end px-5 mb-10 items-center delay-100 translate-y-[200px] group-hover:translate-y-0 duration-300 ${
                index === 0 || index === 1 || index === 2 || index === 3
                  ? "text-black"
                  : "text-white"
              }`}
            >
              See More
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

const data = [
  {
    title1: "PB Census",
    title2: "Pulong Buhangin Census Management System.",
    description:
      "The project PB Census is a Web-Based Census Management System that will optimize the census process by replacing manual data collection and entry with a digital solution.",
    href: "/components/landing-page/pb-census",
    imageSrc:
      "https://scontent.xx.fbcdn.net/v/t1.15752-9/462636565_479361017790178_497837260792210135_n.png?_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeGJrJIYdLsLDiRVt5g1S87e3W2zO3EwrSfdbbM7cTCtJ3XD1o19EDGHn4NMptf8blCsk_d43CUd1eX1W_4VfKOF&_nc_ohc=0ppUH-B679wQ7kNvgEnVdd2&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QEpw2F_QnhaVdLDJ4SZC9c5HHwMEUqx_Wqp8FgVFgr1Sg&oe=676903E3",
  },
  {
    title1: "Census Graph",
    title2: "Pulong Buhangin Census of Population",
    description:
      "Through the PB Census Management System, personnels and officials will be able to visualize data population, sort demographics by various criteria.",
    href: "/components/landing-page/census-graph",
    imageSrc:
      "https://scontent.xx.fbcdn.net/v/t1.15752-9/462646852_1018816676666708_7107228387943979409_n.png?_nc_cat=106&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeGO4o-4bWjup8YRyBM6Sk4IAnftfZbZoBQCd-19ltmgFLemvJVEHY-vXelzrsQpQVvaGISjPvrsOOxvK65p26La&_nc_ohc=VUUxDC_GZSQQ7kNvgFwyBda&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QFUFcIvUiUckPpelL9gD3VaC0DujulemwueBtRA7owxqQ&oe=6768ED2F",
  },
  {
    title1: "Digitalized Census Form",
    title2: "",
    description:
      "The digitize census management process in Barangay Pulong Buhangin will provide a more effective and reliable solution for data collection, storage, and analysis.",
    href: "/components/landing-page/digitalized-census",
    imageSrc:
      "https://scontent.xx.fbcdn.net/v/t1.15752-9/462551342_538739105749068_7525481000466823232_n.png?_nc_cat=104&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeFWBkDJQOVt4IOJzh96NKCZsdj1-ptBxDqx2PX6m0HEOjv5t3OQ9BAYOKq1cqS08nP61F_tuJXPtEkE9z1TmHlL&_nc_ohc=Sr2QbV1pTZwQ7kNvgGA_VK-&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QE9Jw8SVtwv8Gaq3FKBgojb4VMc2GW3GQp5OqV_TMJE9A&oe=6768EDD4",
  },
  {
    title1: "News",
    title2: "Updates from PB Census",
    description:
      "The project PB Census is a Web-Based Census Management System that will optimize the census process by replacing manual data collection and entry with a digital solution.",
    href: "/components/landing-page/news",
    imageSrc:
      "https://scontent.xx.fbcdn.net/v/t1.15752-9/462555483_538336409128585_3837568306665648744_n.png?_nc_cat=106&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeGk-rtpKo2VwOythmUSNWOi0HOv0uF5rtnQc6_S4Xmu2cPtIm6tPNDYuZpbe0_0u0Tczdsi-S88TjjeBIL74fmI&_nc_ohc=xBaTo7MSWa8Q7kNvgExhmfw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QG1GkDVBOJygW9M5483KywXOEJ4SDVilhh744nWnKawcw&oe=676912F8",
  },
];
export default Page;
