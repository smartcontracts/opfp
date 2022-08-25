import './NFTCard.scss'

interface NFTCardProps {
  name: string
  img: string
  isActive?: boolean
  onClick?: () => void
}

export const NFTCard = ({ name, img, isActive, onClick }: NFTCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`nftCard__container ${
        isActive ? 'nftCard__container--active' : ''
      }`}
    >
      <img className="img" src={img} alt={name} />
      <p className="name">{name}</p>
    </div>
  )
}
