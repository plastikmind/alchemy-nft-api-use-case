import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { NFTCard } from "./components/nftCard";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");

    const api_key = "4kOXho1C9uZZtCEBoT7gm-rMSDn7gC5D";
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    if (!collection.length) {
      var requestOptions = {
        method: "GET",
      };

      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    if (nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      const api_key = "4kOXho1C9uZZtCEBoT7gm-rMSDn7gC5D";
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log("NFTs in collection", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="mb-16 flex  flex-col items-center">
        <h1 className="font-bold text-8xl">NFT TRACKER</h1>
        <p>
          Look a wallet's all NFTs, for spesific collections, or just look a
          collection
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col">
          {/* Wallet address */}
          <input
            disabled={fetchForCollection}
            onChange={(e) => {
              setWalletAddress(e.target.value);
            }}
            value={wallet}
            type={"text"}
            className="border-purple-500 border my-2 text-gray-800 focus:outline-blue-300 disabled:bg-slate-200 disabled:text-red-600 disabled:border-red-600 rounded-md disabled:cursor-not-allowed"
            placeholder="Add wallet address"
          ></input>
          {/* collection address */}
          <input
            type={"text"}
            onChange={(e) => {
              setCollectionAddress(e.target.value);
            }}
            value={collection}
            className="border border-yellow-500 rounded-sm mb-10"
            placeholder="Add collection address"
          ></input>
        </div>
        {/* fetch collection */}
        <label>
          <input
            onChange={(e) => {
              setFetchForCollection(e.target.checked);
            }}
            type={"checkbox"}
            className="mr-1 mb-4"
          ></input>
          Fetch for a Collection
        </label>

        <button
          className="text-gray-900 bg-gradient-to-l from-teal-200 to-lime-200 hover:bg-gradient-to-r hover:from-teal-200 hover:to-lime-200 focus:ring-2 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm py-1 mx-8 text-center"
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection();
            } else fetchNFTs();
          }}
        >
          Go!
        </button>
      </div>
      <div>
        {NFTs.length &&
          NFTs.map((nft, z) => {
            return <NFTCard nft={nft} key={z} />;
          })}
      </div>
    </div>
  );
};

export default Home;
