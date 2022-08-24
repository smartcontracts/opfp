import './MirrorCard.scss'
import Tilt from 'react-parallax-tilt'

export const MirrorCard = () => {
  return (
    <Tilt
      className="mirrorCard__container"
      glareEnable={true}
      glareMaxOpacity={0.69}
      glareColor="white"
      glarePosition="all"
    >
      <img
        className="mirrorCard__image"
        src="https://quixotic.io/_next/image?url=https%3A%2F%2Ffanbase-1.s3.amazonaws.com%2Fnft_image%2F0x5c9D55b78FEBCC2061715BA4f57EcF8EA2711F2c%2F2709%2F1659351910%2Fimage.png&w=1920&q=75"
        alt="mirror"
      />

      <div className="mirrorCard__content">
        <div className="row">
          <p>Contract</p>
          <p>0x123...123</p>
        </div>
        <div className="row">
          <p>Token ID</p>
          <p>123123...</p>
        </div>
        <div className="row">
          <p>Last updated</p>
          <p>1 day ago</p>
        </div>
      </div>
    </Tilt>
  )
}
