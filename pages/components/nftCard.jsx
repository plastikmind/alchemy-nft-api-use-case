export const NFTCard = ({ nft }) => {
  return (
    <div>
      <div>
        <img src={nft.media[0].gateway} />
      </div>
      <p>{nft.title}</p>
    </div>
  );
};
