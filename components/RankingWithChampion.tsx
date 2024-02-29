import Image from "next/image";
import { RankingProps } from "@/components/Ranking";

export function RankingWithChampion({ ranking }: RankingProps) {
  // 2位以降のランキングをカウントする
  let rank = 0;

  return (
    <div className="w-[calc(100dvw-320px)] h-[100dvh] fixed top-0 right-0 bg-[#ebeef4] overflow-hidden">
      {Array.from({ length: 50 }).map((_, index) => {
        const fallStamp = {
          position: Math.round(Math.random() * 90),
          size: Math.round(Math.random() * (120 - 30) + 30),
          duration: Math.round(Math.random() * 3000 + 150),
        };

        return (
          <div
            key={index}
            className="z-50 absolute flex justify-start items-center border-[5px] border-solid border-white rounded-lg animate-[fallStamp_3s_ease-in-out_forwards] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]"
            style={{
              width: `${fallStamp.size}px`,
              height: `${fallStamp.size}px`,
              left: `${fallStamp.position}%`,
              top: `-${fallStamp.duration}px`,
              transform: `rotate(${fallStamp.duration}deg)`,
            }}
          >
            <Image
              className="rounded-lg"
              src={ranking[0]?.imageUrl}
              alt="user icon"
              fill={true}
            />
          </div>
        );
      })}
      <div className="bg-white h-[400px] text-black flex justify-center items-center">
        <div className="flex flex-wrap items-center gap-5 justify-center text-black animate-[scaleUp_.3s_cubic-bezier(.36,.96,.69,1.42)_2s_forwards] scale-0">
          <div className="relative flex w-[200px] h-[200px] justify-start items-center border-[10px] border-solid border-white rounded-[30px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] mx-[calc(50%-100px)]">
            <Image
              className="rounded-[20px]"
              src={ranking[0].imageUrl}
              alt="user icon"
              fill={true}
            />
            <div className="absolute bg-yellow-300 h-[80px] w-[80px] rounded-full top-[-40px] left-[-40px] animate-ping"></div>
            <div className="absolute flex justify-center items-center text-[20px] bg-yellow-300 text-white p-3 h-[80px] w-[80px] rounded-full border-solid border-[5px] border-yellow-200 top-[-40px] left-[-40px] shadow-[#ffe98e_0px_0px_12px] font-bold">
              No.1
            </div>
          </div>
          <div>
            <div className="text-center font-bold text-[20px] py-2 px-5 bg-[#ebeef4] rounded-lg">
              :{ranking[0].name}:
            </div>
            <div className="text-center mt-2 text-[12px] text-gray-400 font-bold">
              使用回数：{ranking[0].count}回
            </div>
          </div>
        </div>
      </div>
      <div className="grid h-[calc(100dvh-400px)] flex-wrap min-w-[300px] py-8 justify-center gap-5 mx-auto overflow-auto">
        {
          // ランキングの2位以降の表示
          ranking.slice(1).map(({ imageUrl, name, count }, index) => {
            if (ranking[index]?.count !== count) rank = index + 2;

            return (
              <div
                key={index}
                className="flex items-center justify-start gap-8 w-full animate-[scaleUp_.3s_cubic-bezier(.36,.96,.69,1.42)_2.3s_forwards] scale-0"
              >
                <div className="relative flex w-[100px] h-[100px] justify-start items-center border-[5px] border-solid border-white rounded-[10px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]">
                  <Image
                    className="rounded-[5px]"
                    src={imageUrl}
                    alt="user icon"
                    fill={true}
                  />
                </div>
                <div className="text-black">
                  <div className="text-[20px]">
                    <span className="text-[18px] mr-[10px]">{rank}位</span>
                    <span className="text-[16px] text-white py-1 px-3 bg-[#becbe6] rounded-md">
                      :{name}:
                    </span>
                  </div>
                  <div className="mt-3 text-[12px] text-gray-400 font-bold">
                    使用回数：{count}回
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
