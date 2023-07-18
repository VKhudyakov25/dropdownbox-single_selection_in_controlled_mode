import "devextreme/dist/css/dx.dark.css";
import "./App.css";

import DropDownBox from "devextreme-react/drop-down-box";
import DataGrid, {
  FilterRow,
  Paging,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";
import ArrayStore from "devextreme/data/array_store";
import { useReducer } from "react";

import { customers } from "./customers";

const initialState = {
  gridBoxValue: [1],
  selectedValue: [1],
  isGridBoxOpened: false,
};
const store = new ArrayStore({
  key: "ID",
  data: customers,
});

const gridColumns = ["CompanyName", "City", "Phone"];
const ownerLabel = { "aria-label": "Owner" };

function reducer(state, action) {
  switch (action.type) {
    case "toggle_dropdownbox_state": {
      return {
        ...state,
        isGridBoxOpened: !state.isGridBoxOpened,
      };
    }

    case "change_gridbox_value": {
      return {
        ...state,
        gridBoxValue: action.newValue,
        isGridBoxOpened: false,
      };
    }

    case "grid_selection_change": {
      return {
        ...state,
        selectedValue: action.newValue,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dataGridOnSelectionChanged = (e) => {
    dispatch({
      type: "grid_selection_change",
      newValue: e.currentSelectedRowKeys,
    });
  };

  const gridBoxDisplayExpr = (item) => {
    return item && `${item.CompanyName} <${item.Phone}>`;
  };

  const syncDataGridSelection = (e) => {
    dispatch({
      type: "change_gridbox_value",
      newValue: e.value,
    });
  };

  const onGridBoxOpened = (e) => {
    if (e.name === "opened") {
      dispatch({ type: "toggle_dropdownbox_state" });
    }
  };

  const enterKeyHandler = (e) => {
    if (e.event && e.event.key === "Enter") {
      dispatch({
        type: "change_gridbox_value",
        newValue: state.selectedValue,
      });
    }
  };

  const keyboardSelectionHandler = (e) => {
    dispatch({
      type: "grid_selection_change",
      newValue: [e.rowIndex + 1],
    });
  };

  const dataGridRender = (state) => {
    return (
      <DataGrid
        dataSource={store}
        columns={gridColumns}
        hoverStateEnabled={true}
        selectedRowKeys={state.gridBoxValue}
        onSelectionChanged={dataGridOnSelectionChanged}
        height="100%"
        focusedRowEnabled={true}
        onKeyDown={enterKeyHandler}
        onFocusedRowChanged={keyboardSelectionHandler}
      >
        <Selection mode="single" />
        <Scrolling mode="virtual" />
        <Paging enabled={true} pageSize={10} />
        <FilterRow visible={true} />
      </DataGrid>
    );
  };

  return (
    <div className="App">
      <DropDownBox
        value={state.gridBoxValue}
        opened={state.isGridBoxOpened}
        valueExpr="ID"
        inputAttr={ownerLabel}
        displayExpr={gridBoxDisplayExpr}
        placeholder="Select a value..."
        showClearButton={true}
        dataSource={store}
        onValueChanged={syncDataGridSelection}
        onOptionChanged={onGridBoxOpened}
        contentRender={() => dataGridRender(state)}
      ></DropDownBox>
    </div>
  );
}

export default App;
