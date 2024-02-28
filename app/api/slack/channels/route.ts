import { WebClient } from "@slack/web-api";
import { NextResponse } from "next/server";

type Channel = {
  name: string;
  id: string;
};

export async function POST(): Promise<NextResponse<Channel[] | undefined>> {
  const client = new WebClient(process.env.SLACK_TOKEN);

  // ボットが参加しているチャンネル一覧を取得
  const response = await client.users.conversations({
    exclude_archived: true, // アーカイブされたチャンネルを除外する
    limit: 999, // 取得するチャンネル数の上限（最大値が999)
  });

  const channels = response.channels
    ?.map(({ name, id }) => {
      if (!name || !id) return null;

      return { name, id };
    })
    .filter((channel): channel is Channel => channel !== null);

  return NextResponse.json(channels);
}
