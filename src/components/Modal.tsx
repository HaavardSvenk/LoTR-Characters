import IMG from "./lotr.jpg";

interface IOwnProps {
  open: boolean;
  onClose: (any: any) => void;
  modalName: string;
  modalQuote: string;
}

const Modal = ({ open, onClose, modalName, modalQuote }: IOwnProps) => {
  if (!open) return null;
  return (
    <div className="overlay">
      <div className="modalContainer">
        <img src={IMG} alt="" />
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="title">Quote from {modalName}</div>
          <div className="content">
            <p>{modalQuote}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
