"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Link from "next/link";

type ChannelData = {
  name: string;
  id: string;
};

export type SideMenuProps = {
  userName: string;
  image: string;
  channels: ChannelData[];
};

export function SideMenu({
  userName,
  image,
  channels,
}: SideMenuProps): JSX.Element {
  const router = useRouter();

  return (
    <div className="bg-[#0d1f49] h-[100dvh] w-[320px] fixed top-0 left-0">
      <div className="flex justify-start gap-[10px] items-center py-[20px] mx-[10px] border-b-[1px] border-solid">
        <Image
          src={image || ""}
          alt="user icon"
          width={45}
          height={45}
          className="rounded-full border-[3px] border-solid"
        />
        <div className="flex flex-wrap items-center">
          <div className="text-[14px] w-full">{userName}</div>
          <button
            className="text-[12px] text-[#aeaeae] border-b-[1px] border-[#0d1f49] hover:border-[#8a96b1]"
            onClick={() => signOut()}
          >
            Sign out <RiLogoutBoxRLine className="inline" />
          </button>
        </div>
      </div>
      <div className="py-[20px] mx-[10px] max-h-[calc(100dvh-100px)] overflow-auto">
        {channels.map(({ id, name }) => (
          <Link
            key={id}
            className="w-full block text-left hover:bg-[#364974] p-[5px] rounded-sm text-[12px]"
            href={`/?channelId=${id}`}
          >
            <span>&#035;</span> {name}
          </Link>
        ))}
      </div>
    </div>
  );
}
