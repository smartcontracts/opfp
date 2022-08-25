import './TraitCard.scss'

interface TraitCardProps {
  name: string
  value: string
}

export const TraitCard = ({ name, value }: TraitCardProps) => {
  return (
    <div className="traitCard__container">
      <p className="name">{name}</p>
      <p className="value">{value}</p>
    </div>
  )
}
