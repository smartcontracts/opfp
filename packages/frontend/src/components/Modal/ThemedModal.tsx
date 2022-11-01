import Modal from 'react-modal'

import { Button } from '../Button'
import Spinner from '../Spinner/Spinner'
import { HexagonIcon } from '../../assets/HexagonIcon'
import { RefreshIcon } from '../../assets/RefreshIcon'

import './ThemedModal.scss'

interface Props {
  isOpen: boolean
  handleClose: () => void
  transactionState: any
  modalType: ModalType
}

export enum ModalType {
  MINT = 'mint',
  UPDATE = 'update',
  HELP = 'help',
}

Modal.setAppElement(document.getElementById('root'))
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: `var(--card)`,
    borderRadius: '22px',
    border: 'none',
  },

  overlay: {
    backgroundColor: `rgba(0,0,0,0.8)`,
    backdropFilter: 'blur(10px)',
  },
}
export const ThemedModal = ({
  isOpen,
  handleClose,
  transactionState,
  modalType,
}: Props) => {
  let title = ''

  if (transactionState === 'error' || transactionState === 'idle') {
    title = 'Confirm transaction in wallet'
  } else if (transactionState === 'loading') {
    title =
      modalType === ModalType.MINT
        ? 'Minting NFT'
        : 'Calling the Magic Mirror...'
  } else if (transactionState === 'success') {
    title = 'Transaction confirmed'
  }

  const buttonText =
    modalType === ModalType.MINT ? 'Continue' : 'View Mirrored NFT'

  if (modalType === ModalType.HELP) {
    return (
      <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
        <div className="modalContentWrapper helpModalContentWrapper">
          <ul>
            <li>
              <div className="modal__titleWrapper">
                <RefreshIcon />
                <p className="modal__title">Refresh the metadata on OpenSea</p>
              </div>

              <p className="modal__description">
                If you are minting your NFT for the first time, you may need to
                refresh the metadata on OpenSea manually.{' '}
                <a href="https://opensea.io/account" target="_blank">
                  View your MagicMirror NFT on OpenSea here
                </a>
                , and click the <b>refresh metadata button</b>.
              </p>
            </li>
            <li>
              <div className="modal__titleWrapper">
                <HexagonIcon />
                <p className="modal__title">
                  Update your profile picture on Twitter
                </p>
              </div>

              <p className="modal__description">
                <a
                  href="https://support.opensea.io/hc/en-us/articles/4415562648851-How-do-I-set-my-NFT-as-my-Twitter-profile-picture-"
                  target="_blank"
                >
                  Follow this guide
                </a>{' '}
                to update your profile picture on twitter to your MagicMirror
                NFT.
              </p>
            </li>
          </ul>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
      <div className="modalContentWrapper">
        {transactionState === 'success' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            width="22px"
            fill="currentColor"
            viewBox="0 0 67.64 67.64"
          >
            <path d="M47.72,21.23c1.1-1.1,2.89-1.1,3.99,0,1.1,1.1,1.1,2.89,0,3.99l-21.19,21.19c-1.1,1.1-2.89,1.1-3.99,0l-10.6-10.6c-1.1-1.1-1.1-2.89,0-3.99,1.1-1.1,2.89-1.1,3.99,0l8.6,8.6,19.2-19.2ZM33.82,0c9.34,0,17.79,3.79,23.91,9.91,6.12,6.12,9.91,14.58,9.91,23.91s-3.79,17.79-9.91,23.91c-6.12,6.12-14.58,9.91-23.91,9.91s-17.79-3.79-23.91-9.91C3.79,51.61,0,43.16,0,33.82S3.79,16.03,9.91,9.91C16.03,3.79,24.48,0,33.82,0Zm19.92,13.9c-5.1-5.1-12.14-8.25-19.92-8.25s-14.82,3.15-19.92,8.25c-5.1,5.1-8.25,12.14-8.25,19.92s3.15,14.83,8.25,19.92c5.1,5.1,12.14,8.25,19.92,8.25s14.82-3.15,19.92-8.25c5.1-5.1,8.25-12.14,8.25-19.92s-3.15-14.82-8.25-19.92Z" />
          </svg>
        ) : (
          <Spinner />
        )}

        <p className="modalTitle">{title}</p>
        {transactionState === 'success' && (
          <Button onClick={handleClose}>{buttonText}</Button>
        )}
      </div>
    </Modal>
  )
}
