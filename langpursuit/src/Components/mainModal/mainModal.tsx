// MainModal.tsx
import "./mainModal.css";
import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import AddWordForm from "./addWords/addWordForm/addWordForm";
import AddWordFromFile from "./addWords/addWordFromFile/addWordFromFile";

interface MainModalProps {
  open: boolean;
  onClose: () => void;
  type: string;
  data?: any;
}

function MainModal(props: MainModalProps): JSX.Element {
  return (
    <>
      {/* <Button
        variant="outlined"
        color="neutral"
        onClick={props.onClose} // Toggle the modal open/close state from the parent
      >
        {props.type}
      </Button> */}
      <Modal
        open={props.open}
        onClose={() => {
          props.onClose();
        }}
      >
        <ModalDialog>
          {props.type === "addWords" && (
            <>
              <AddWordForm data={props.data} onClose={props.onClose} />
              <AddWordFromFile data={props.data} onClose={props.onClose} />
            </>
          )}
        </ModalDialog>
      </Modal>
    </>
  );
}
//addMIssion

export default MainModal;