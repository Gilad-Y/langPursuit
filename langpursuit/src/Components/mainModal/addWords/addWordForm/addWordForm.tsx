import "./addWordForm.css";
interface props {
  onClose: () => void;
  data?: any;
}
function AddWordForm(props: props): JSX.Element {
  return <div className="addWordForm"></div>;
}

export default AddWordForm;
