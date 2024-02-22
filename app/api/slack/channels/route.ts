import { WebClient } from "@slack/web-api";
import { NextResponse } from "next/server";

const client = new WebClient(process.env.SLACK_TOKEN);

type Channel = {
  name: string;
  id: string;
};

export async function GET(): Promise<NextResponse<Channel[] | undefined>> {
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
