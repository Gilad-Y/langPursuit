import "./addWordForm.css";
interface props {
  onClose: () => void;
  data?: any;
}
function AddWordForm(props: props): JSX.Element {
  return (
    <div className="addWordForm">
      <h1>add manualy </h1>
    </div>
  );
}

export default AddWordForm;
