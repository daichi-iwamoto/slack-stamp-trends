import { RankingWithoutChampion } from "@/components/RankingWithoutChampion";
import { RankingWithChampion } from "@/components/RankingWithChampion";

type Ranking = {
  name: string;
  imageUrl: string;
  count: number;
};

export type RankingProps = {
  ranking: Ranking[];
};

export function Ranking({ ranking }: RankingProps) {
  const isWithoutChampion = ranking[0]?.count === ranking[1]?.count;

  return isWithoutChampion ? (
    <RankingWithoutChampion ranking={ranking} />
  ) : (
    <RankingWithChampion ranking={ranking} />
  );
}
