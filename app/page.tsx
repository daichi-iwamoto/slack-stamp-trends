"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import { Spinner } from "@/components/Spinner";
import { SideMenu, SideMenuProps } from "@/components/SideMenu";
import { useSearchParams } from "next/navigation";
import { Ranking, RankingProps } from "@/components/Ranking";

// ボットが参加しているチャンネル一覧を取得する
const getChannels = async () => {
  const data = await fetch("/api/slack/channels", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));

  return data;
};

// 絵文字の使用頻度ランキングを取得する
const getReactionRanking = async (channelId: string) => {
  const data = await fetch("/api/slack/reactionRanking", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({ channelId: channelId }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));

  return data;
};

export default function Home() {
  const { data: session, status } = useSession();
  const [channels, setChannels] = useState<SideMenuProps["channels"]>([]);
  const [ranking, setRanking] = useState<RankingProps["ranking"]>([]);

  const searchParams = useSearchParams();
  const channelId = searchParams.get("channelId");

  useEffect(() => {
    setChannels([]);
    setRanking([]);

    getChannels().then((data) => setChannels(data));
    getReactionRanking(channelId || "").then((data) => setRanking(data));
  }, [channelId]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen justify-center p-24 content-center flex-wrap">
        <Spinner />
      </main>
    );
  }

  if (session?.user?.name && session?.user?.image) {
    const { name, image } = session.user;

    return (
      <main className="flex min-h-screen min-w-screen justify-start content-start flex-wrap text-white">
        <SideMenu
          image={image}
          channels={channels}
          userName={name}
          channelId={channelId || ""}
        />
        {ranking && channelId ? <Ranking ranking={ranking} /> : null}
      </main>
    );
  }

  return (
    <main className="flex min-h-screen justify-center p-24 content-center flex-wrap">
      <button
        onClick={() => signIn()}
        className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
      >
        Sign in
      </button>
    </main>
  );
}
