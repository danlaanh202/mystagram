import { useEffect, useState } from "react";

export default function usePeer() {
  const [myPeer, setMyPeer] = useState<any>();
  const [myPeerId, setMyPeerId] = useState<string>("");
  useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
      const peer = new Peer(undefined, {
        path: "/peer",
        host: "/",
        port: 4001,
      });
      //open id
      peer.on("open", (id: string) => {
        console.log(id);
        setMyPeerId(id);
        setMyPeer(peer);
      });
    });
  }, []);
  return [myPeer, myPeerId];
}
