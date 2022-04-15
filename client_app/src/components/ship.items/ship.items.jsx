import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ShipService } from "../../services/ship.service";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./ship.items.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addShip,
  getAllShips,
  updateShip,
  deleteShip,
  deleteShips,
} from "../../feature/ship/ship.slice";

const ShipItems = () => {
  let emptyShip = {
    id: null,
    name: "",
    length: 0,
    width: 0,
    code: null,
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mx-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
        />
      </React.Fragment>
    );
  };

  const [shipss, setShipss] = useState(null);

  const [shipDialog, setShipDialog] = useState(false);

  const [deleteShipDialog, setDeleteShipDialog] = useState(false);

  const [deleteShipsDialog, setDeleteShipsDialog] = useState(false);

  const [ship, setShip] = useState(emptyShip);

  const [selectedShips, setSelectedShips] = useState(null);

  const [submitted, setSubmitted] = useState(false);

  const [globalFilter, setGlobalFilter] = useState(null);

  const toast = useRef(null);

  const dt = useRef(null);

  const shipCodeValidation = /^[a-zA-Z]{4}-[0-9]{4}-[a-zA-Z]{1}[0-9]{1}$/;

  const [codeInvalid, setCodeInvalid] = useState(false);

  const dispatch = useDispatch();

  const { isLoading, ships, isAdded } = useSelector((state) => state.ships);

  const saveShip = () => {
    setSubmitted(true);
    if (ship.name.trim()) {
      let _ships = [...ships];
      let _ship = { ...ship };
      if (ship.id) {
        const index = findIndexById(ship.id);
        dispatch(updateShip(ship))
          .unwrap()
          .then(
            () => {
              setShipDialog(false);
              setShip(emptyShip);
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "Ship Updated",
                life: 3000,
              });
            },
            (e) => showError(e.message)
          );
      } else {
        // Add ship using ship_service
        const { id, ..._shipWihoutId } = _ship;
        dispatch(addShip(_shipWihoutId))
          .unwrap()
          .then(
            () => {
              setShipDialog(false);
              setShip(emptyShip);
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "Ship Created",
                life: 3000,
              });
            },
            (e) => {
              showError(e.message);
            }
          )
          .catch((e) => console.log(e));
      }
    }
  };

  const deleteShipById = () => {
    dispatch(deleteShip(ship.id))
      .unwrap()
      .then(
        () => {
          setDeleteShipDialog(false);
          setShip(emptyShip);
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Ship Deleted",
            life: 3000,
          });
        },
        (e) => {
          console.log(e.message);
        }
      );
  };

  const deleteSelectedShips = () => {
    dispatch(deleteShips(selectedShips))
      .unwrap()
      .then(
        () => {
          setDeleteShipsDialog(false);
          setSelectedShips(null);
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Ships Deleted",
            life: 3000,
          });
        },
        (e) => {
          showError(e.message);
        }
      );
  };

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error Message",
      detail: message,
    });
  };

  const openNew = () => {
    setShip(emptyShip);
    setSubmitted(false);
    setShipDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setShipDialog(false);
  };

  const hideDeleteShipDialog = () => {
    setDeleteShipDialog(false);
  };

  const hideDeleteShipsDialog = () => {
    setDeleteShipsDialog(false);
  };

  const editShip = (ship) => {
    setShip({ ...ship });
    setShipDialog(true);
  };

  const confirmDeleteShip = (ship) => {
    setShip(ship);
    setDeleteShipDialog(true);
  };

  // Find the index of the ship by Its Id in the
  // ship list
  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const confirmDeleteSelected = () => {
    setDeleteShipsDialog(true);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _ship = { ...ship };
    if (name === "code" && !val.match(shipCodeValidation)) {
      setCodeInvalid(true);
    } else setCodeInvalid(false);
    _ship[`${name}`] = val;

    setShip(_ship);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _ship = { ...ship };
    _ship[`${name}`] = val;

    setShip(_ship);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mx-2"
          onClick={() => editShip(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteShip(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manage Ships</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const shipDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveShip}
      />
    </React.Fragment>
  );
  const deleteShipDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteShipDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteShipById}
      />
    </React.Fragment>
  );
  const deleteShipsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteShipsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedShips}
      />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar className="mb-4 mx-2" left={leftToolbarTemplate}></Toolbar>

        <DataTable
          ref={dt}
          value={ships}
          selection={selectedShips}
          onSelectionChange={(e) => setSelectedShips(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} ships"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="length"
            header="Length"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="width"
            header="Width"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="code"
            header="Code"
            sortable
            style={{ minWidth: "15rem", alig: "center" }}
          ></Column>
          <Column
            header="Actions"
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={shipDialog}
        style={{ width: "450px" }}
        header="Ship Details"
        modal
        className="p-fluid"
        footer={shipDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name" className="my-2">
            Name
          </label>
          <InputText
            id="name"
            value={ship.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !ship.name })}
          />
          {submitted && !ship.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="length" className="my-2">
              Length
            </label>
            <InputNumber
              id="length"
              value={ship.length}
              onValueChange={(e) => onInputNumberChange(e, "length")}
              className={classNames({ "p-invalid": submitted && !ship.length })}
            />
            {submitted && !ship.length && (
              <small className="p-error">Length is required.</small>
            )}
          </div>
          <div className="field col">
            <label htmlFor="width" className="my-2">
              With
            </label>
            <InputNumber
              id="width"
              value={ship.width}
              onValueChange={(e) => onInputNumberChange(e, "width")}
              className={classNames({ "p-invalid": submitted && !ship.width })}
            />
            {submitted && !ship.width && codeInvalid && (
              <small className="p-error">Width is required.</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="code" className="my-2">
              Name
            </label>
            <InputText
              id="code"
              value={ship.code}
              onChange={(e) => onInputChange(e, "code")}
              required
              className={classNames({ "p-invalid": submitted && !ship.code })}
            />
            {/* {submitted && !ship.code && codeInvalid && <small className="p-error">Code field is empty or It's not a valid.</small>}  Submitted event invalid code */}
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteShipDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteShipDialogFooter}
        onHide={hideDeleteShipDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {ship && (
            <span>
              Are you sure you want to delete <b>{ship.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteShipsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteShipsDialogFooter}
        onHide={hideDeleteShipsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {ship && (
            <span>Are you sure you want to delete the selected ships?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default ShipItems;
