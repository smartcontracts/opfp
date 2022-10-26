import Modal from 'react-modal'

import './ThemedModal.scss'

interface Props {
  isOpen: boolean
  handleClose: () => void
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
    backgroundColor: `rebeccapurple`,
  },
  overlay: {
    backgroundColor: `rgba(0,0,0,0.8)`,
    backdropFilter: 'blur(10px)',
  },
}
export const ThemedModal = ({ isOpen, handleClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
      heyy
    </Modal>
  )
}
