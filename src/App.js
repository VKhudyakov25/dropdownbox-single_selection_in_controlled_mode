import "devextreme/dist/css/dx.dark.css";
import "./App.css";
import Button from "devextreme-react/button";
import TextBox from "devextreme-react/text-box";
import { useCallback, useState, useRef } from "react";

let textValue = "";

function App() {
  const [content, setContent] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleValueChanged = useCallback((v) => {
    setValue(v.value);
  }, []);

  const onClick = () => {
    textValue = value;
    setContent(!content);
  };

  return (
    <div className="App">
      <Button text="Click me!" type="success" onClick={onClick} />
      <TextBox
        className="textbox"
        value={value}
        onValueChanged={handleValueChanged}
        label="Link"
        labelMode="floating"
      />
      <TextBox
        className="textbox"
        ref={inputRef}
        defaultValue=""
        label="Link"
        labelMode="floating"
      />
      {content && <TextBoxesContent inputRef={inputRef} value={textValue} />}
    </div>
  );
}

function TextBoxesContent(props) {
  const { value, inputRef } = props;
  return (
    <div className="text-boxes-value">
      <p>{value}</p>
      <p>{inputRef.current.instance.option("value")}</p>
    </div>
  );
}

export default App;
