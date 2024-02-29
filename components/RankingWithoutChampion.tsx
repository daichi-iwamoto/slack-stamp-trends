import Image from "next/image";
import { RankingProps } from "@/components/Ranking";

export function RankingWithoutChampion({ ranking }: RankingProps) {
  let rank = 1;

  return (
    <div className="w-[calc(100dvw-320px)] h-[100dvh] fixed top-0 right-0 bg-[#ebeef4] overflow-hidden">
      <div className="grid h-[100dvh] flex-wrap min-w-[300px] py-8 justify-center gap-5 mx-auto overflow-auto">
        {
          // ランキングの表示
          ranking.map(({ imageUrl, name, count }, index) => {
            if (index !== 0 && ranking[index - 1].count !== count)
              rank = index + 1;

            return (
              <div
                key={index}
                className="flex items-center justify-start gap-8 w-full animate-[scaleUp_.3s_cubic-bezier(.36,.96,.69,1.42)_0s_forwards] scale-0"
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
