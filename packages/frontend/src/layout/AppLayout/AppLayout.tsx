import './AppLayout.scss'

interface AppLayoutProps {
  mirrorCard: React.ReactNode
  content: React.ReactNode
}

export const AppLayout = ({ mirrorCard, content }: AppLayoutProps) => {
  return (
    <div className="appLayout__container">
      {mirrorCard}
      <div className="appLayout__content">{content}</div>
    </div>
  )
}
