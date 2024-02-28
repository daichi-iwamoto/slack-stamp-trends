import { WebClient } from "@slack/web-api";
import { Reaction } from "@slack/web-api/dist/types/response/ConversationsHistoryResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { channelId } = await request.json();
  if (typeof channelId !== "string") {
    return NextResponse.json([]);
  }

  const client = new WebClient(process.env.SLACK_TOKEN);

  // チャンネル内のメッセージを取得
  const histories = await client.conversations.history({
    token: process.env.SLACK_TOKEN,
    channel: channelId, // チャンネルID
    limit: 1000, // 取得するメッセージ数
  });

  if (
    typeof histories === "undefined" ||
    typeof histories.messages === "undefined"
  ) {
    return NextResponse.json([]);
  }

  // カスタム絵文字の一覧取得
  const emoji = await client.emoji.list({
    token: process.env.SLACK_TOKEN,
    include_categories: false,
  });

  const emojiList = Object.keys(emoji.emoji || {}).map((key) => {
    return {
      name: key,
      image: emoji.emoji?.[key],
    };
  });

  const emojiListMap = new Map(
    emojiList.map(({ name, image }) => [name, image])
  );

  // リアクションの一覧を取得
  const reactions = histories.messages
    .map(({ reactions }) => reactions)
    .flat()
    .filter(
      (reaction): reaction is Reaction => typeof reaction !== "undefined"
    );

  type ReactionScore = {
    name: string;
    count: number;
  };

  // リアクションの使用頻度を集計
  const reactionRanking = reactions.reduce<ReactionScore[]>(
    (acc: ReactionScore[], { name, count }) => {
      if (typeof name === "undefined" || typeof count === "undefined")
        return acc;

      const foundReaction = acc.find((ranking) => ranking.name === name);

      if (foundReaction) {
        foundReaction.count += count;
      } else {
        acc.push({ name, count });
      }
      return acc;
    },
    []
  );

  // ランキング順に並び替え
  const response = reactionRanking
    .filter(({ name }) => emojiListMap.has(name))
    .map((ranking) => ({
      ...ranking,
      imageUrl: emojiListMap.get(ranking.name),
    }))
    .sort(({ count: a }, { count: b }) => b - a);

  return NextResponse.json(response);
}
