import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DownlodExcelFromArray } from 'metaponder-utility';
import { useEffect, useRef, useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import React from 'react';
import { MPSIconBS } from '../MPSComponents';

type CustomTableProps = {
  data: any[];
  columns: any[];
  tagCaption?: string;
  buttons?: any[];
  showItemPerPage: number;
  showPagination?: boolean;
  showCheckbox?: boolean;
  selectedData?: Function;
  showSearch?: boolean;
  showExport?: boolean;
  ShowViewField?: boolean;
};
const MPSCustomTable = ({
  data,
  columns,
  tagCaption,
  buttons,
  showItemPerPage,
  showPagination,
  showCheckbox,
  selectedData,
  showSearch,
  showExport,
  ShowViewField,
}: CustomTableProps) => {
  const allData = data;
  const [showDataParPage, setShowDataParPage] = useState<any>(showItemPerPage);
  const [tableData, setTableData] = useState<any>(data);
  // Table
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  useEffect(() => {
    if (tableData.length === 0) {
      setSelectAll(false);
    }
  }, [tableData]);

  const toggleSelectAll = async () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      let myarr = [];
      for (let i = 0; i < visibleData.length; i++) {
        myarr.push(i);
      }
      setSelectedRows(myarr);
      setSelectAll(true);
    }
    // setSelectAll(!selectAll);
  };
  const handleRowToggle = (index: any) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter(i => i !== index));
      setSelectAll(false);
    } else {
      setSelectedRows([...selectedRows, index]);
      if (selectedRows.length === visibleData.length - 1) {
        setSelectAll(true);
      }
    }
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    showCheckbox &&
      selectedData &&
      selectedData(selectedRows?.map((index: any) => data[index]));
  }, [selectedRows]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tableData.length / showDataParPage);
  const startIndex = (currentPage - 1) * showDataParPage;
  const visibleData = tableData.slice(startIndex, startIndex + showDataParPage);
  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };
  const handleCellValueChange = (rowIndex: any, colKey: any, newValue: any) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][colKey] = newValue;
    setTableData(updatedData);
  };

  const handleCSVDownload = async () => {
    // const worksheet = XLSX.utils.json_to_sheet(tableData);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // XLSX.writeFile(workbook, `${new Date().toLocaleDateString()} Report.xlsx`);
    DownlodExcelFromArray(
      `new Date().toLocaleDateString()} Report.xlsx`,
      tableData
    );
  };

  return (
    <div>
      <Table
        data={visibleData}
        allData={allData}
        columns={columns}
        tagCaption={tagCaption ? tagCaption : ''}
        selectedRows={selectedRows?.length > 0 ? selectedRows : []}
        onRowToggle={handleRowToggle}
        buttons={buttons && buttons.length > 0 ? buttons : []}
        showCheckbox={showCheckbox}
        showSearch={showSearch}
        startIndexNO={startIndex}
        editableValue={handleCellValueChange}
        onCSVDownload={handleCSVDownload}
        onAllRowToggle={toggleSelectAll}
        selectAllOnOff={selectAll}
        showExport={showExport}
        ShowViewField={ShowViewField}
      />
      {showPagination && (
        <div className="d-flex align-items-center gap-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          {tableData.length > 0 && (
            <>
              <span>
                Showing <span className="fw-bold"> {startIndex + 1}</span> to{' '}
                <span className="fw-bold">{startIndex + showDataParPage} </span>{' '}
                per page
              </span>
              <span>
                <select
                  className="form-select form-select-sm"
                  value={showDataParPage}
                  onChange={e => (
                    setCurrentPage(1),
                    setShowDataParPage(Number(e.target.value))
                  )}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={tableData.length}>Show All</option>
                </select>
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MPSCustomTable;

const Table = ({
  data,
  allData,
  columns,
  tagCaption,
  selectedRows,
  onRowToggle,
  buttons,
  showCheckbox,
  showSearch,
  startIndexNO,
  editableValue,
  onAllRowToggle,
  selectAllOnOff,
  showExport = true,
  ShowViewField = true,
}: any) => {
  const componentRef = useRef<any>(null);
  const [showPrintButton, setShowPrintButton] = useState<boolean>(true);
  const [filterText, setFilterText] = useState('');
  const [viewsColumnObj, setViewsColumnsObj] = useState<any>();
  const [visibleFieldsModel, setVisibleFieldsModel] = useState<boolean>(false);

  const filteredData = data.filter((item: any) =>
    columns.some((column: any) =>
      item[column.key]
        ?.toString()
        .toLowerCase()
        .includes(filterText.toLowerCase())
    )
  );

  const handleRowToggle = (index: any) => {
    onRowToggle(index);
  };

  const handleCellValueChange = (index: any, key: any, newValue: any) => {
    editableValue(index, key, newValue);
  };

  const handlePrint = useReactToPrint({
    pageStyle: '@page {  size: landscape;  margin: 4mm; }   }',
    content: () => componentRef.current,
  });

  useEffect(() => {
    setViewsColumnsObj(
      columns.map((column: any) => {
        return {
          ...column,
          label: column.label,
          value: column.key,
          isVisible: true,
        };
      })
    );
  }, [columns]);

  const onChangeViewColumns = async (item: any) => {
    const update = [...viewsColumnObj];
    update.map((column: any) => {
      if (column.value === item) {
        column.isVisible = !column.isVisible;
      }
      return column;
    });
    setViewsColumnsObj(update);
  };

  const handleExportPDF = () => {
    const doc: any = new jsPDF();
    const headerNames = viewsColumnObj
      .filter((field: any) => field.isVisible)
      .map((field: any) => field.label);
    doc.autoTable({
      head: [headerNames],
      body: filteredData.map((row: any) => {
        return viewsColumnObj
          .filter((field: any) => field.isVisible)
          .map((field: any) => {
            return row[field.value];
          });
      }),
      // theme: "grid",
      // headStyles: {
      //   fillColor: [255, 255, 255],
      //   textColor: [0, 0, 0],
      //   fontStyle: "normal",
      //   fontSize: 10,
      //   lineColor: [0, 0, 0],
      //   cellWidth: "auto",
      //   overflow: "linebreak",
      // },
      // bodyStyles: {
      //   fillColor: [255, 255, 255],
      //   textColor: [0, 0, 0],
      //   fontStyle: "normal",
      //   fontSize: 8,
      //   lineColor: [0, 0, 0],
      //   cellWidth: "auto",
      //   overflow: "linebreak",
      // },
      // margin: {
      //   top: 5,
      //   bottom: 5,
      //   left: 2,
      //   right: 2,
      // },
    });
    doc.save('table.pdf');
  };

  const onExportAllExcel = () => {
    DownlodExcelFromArray('CustomTable.xlsx', allData);
  };

  const onExportFilteredExcel = () => {
    var viewData = [];
    for (let i = 0; i < filteredData.length; i++) {
      const myObj: any = {};
      for (let j = 0; j < viewsColumnObj.length; j++) {
        if (!viewsColumnObj[j].isVisible) continue;
        var myarr = viewsColumnObj[j].value.split('.');
        if (myarr.length > 1) {
          myObj[viewsColumnObj[j].label] = filteredData[i][myarr[0]];
        }
        myObj[viewsColumnObj[j].label] =
          filteredData[i][viewsColumnObj[j].value];
      }
      viewData.push(myObj);
    }
    DownlodExcelFromArray('CustomTable.xlsx', viewData);
  };

  return (
    <div className="row">
      <div className="d-flex justify-content-between align-items-center gap-2 mb-2 flex-wrap ">
        <div>
          <h6 className="" style={{ color: '#989e99' }}>
            {tagCaption}
          </h6>
        </div>

        <div className="d-flex gap-2">
          {showSearch && (
            <div className="d-flex gap-2 align-items-center">
              <input
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                className="form-control"
              />
            </div>
          )}

          {ShowViewField && (
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setVisibleFieldsModel(!visibleFieldsModel)}
            >
              View Field
            </button>
          )}

          <Modal
            show={visibleFieldsModel}
            onHide={() => setVisibleFieldsModel(false)}
            animation={false}
            centered
            size="sm"
            scrollable
          >
            <Modal.Header closeButton>
              <Modal.Title>Check Fields</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                {viewsColumnObj?.map((column: any) => {
                  return (
                    <p className="p-0 m-0 d-flex gap-2 align-items-center">
                      <input
                        type="checkbox"
                        checked={column.isVisible}
                        onChange={() =>
                          // e: any
                          {
                            onChangeViewColumns(column.value);
                          }
                        }
                      />
                      {column.label}
                    </p>
                  );
                })}
                <p className="p-0 m-0 d-flex gap-2 align-items-center">
                  <input
                    type="checkbox"
                    checked={showPrintButton}
                    onChange={() =>
                      // e: any
                      setShowPrintButton(!showPrintButton)
                    }
                  />
                  View Print Button
                </p>
              </>
            </Modal.Body>
          </Modal>

          {showExport && (
            <Dropdown>
              <Dropdown.Toggle className="btn btn-md btn-secondary">
                <MPSIconBS icon="bi-save" /> Export
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: '120px' }}>
                <Dropdown.Item onClick={() => onExportAllExcel()}>
                  <MPSIconBS icon="bi-filetype-xlsx fa-lg fw-bold text-success " />
                  Excel (all columns)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onExportFilteredExcel()}>
                  <MPSIconBS icon="bi-filetype-xlsx fa-lg fw-bold text-success " />
                  Excel
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handlePrint()}>
                  <MPSIconBS icon="bi-printer fa-lg fw-bold text-primary" />
                  Print
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleExportPDF()}>
                  <MPSIconBS icon="bi-filetype-pdf fa-lg fw-bold text-danger" />
                  PDF
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="table-responsive" ref={componentRef} id="table">
        <table className="table table-bordered table-hover shadow  table-sm rounded">
          <thead>
            <tr>
              <th>#</th>
              {showCheckbox && (
                <th>
                  {' '}
                  <input
                    type="checkbox"
                    checked={selectAllOnOff}
                    onChange={onAllRowToggle}
                    className="form-check-input form-check-input-sm"
                  />
                </th>
              )}
              {viewsColumnObj
                ?.filter((column: any) => column.isVisible)
                ?.map((column: any) => (
                  <th key={column.key}>{column.label}</th>
                ))}

              {showPrintButton &&
                buttons?.map((item: any, i: any) => (
                  <th key={i}>{item.head}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData?.map((row: any, index: any) => (
                <tr key={index}>
                  <td>{index + 1 + startIndexNO}</td>
                  {showCheckbox && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows?.includes(index)}
                        onChange={() => handleRowToggle(index)}
                        className="form-check-input form-check-input-sm"
                      />
                    </td>
                  )}
                  {viewsColumnObj
                    ?.filter((column: any) => column.isVisible)
                    ?.map((column: any) => {
                      const valueFormate = row[column.key];
                      const stylingCellData = column.style || {};
                      const classss = column.keyClass || {};
                      const cellFormate =
                        column.format || ((value: any) => value);

                      return (
                        <td
                          key={column.key}
                          style={stylingCellData}
                          // className={classss}
                          className={
                            column?.keyClass
                              ? column?.keyClass(valueFormate)
                              : classss
                          }
                        >
                          {column?.editable ? (
                            <input
                              type={
                                column?.inputType === 'date' ? 'date' : 'text'
                              }
                              onKeyPress={event => {
                                if (column?.inputType === 'number') {
                                  if (!/^[0-9.]*$/.test(event.key)) {
                                    event.preventDefault();
                                  }
                                }
                              }}
                              className="form-control form-control-sm"
                              value={row[column.key]}
                              onChange={e =>
                                handleCellValueChange(
                                  index,
                                  column.key,
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            cellFormate(valueFormate)
                          )}
                          {/* {cellFormate(valueFormate)} */}
                        </td>
                      );
                    })}
                  {showPrintButton &&
                    buttons?.map((button: any, buttonIndex: any) => (
                      <td>
                        <button
                          key={buttonIndex}
                          onClick={() => button.onClick(row)}
                          {...button.props}
                        >
                          {button?.btnIcons && (
                            <i className={`bi ${button?.btnIcons} me-1`} />
                          )}

                          {button.label}
                        </button>
                      </td>
                    ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns?.length + 2}
                  style={{ textAlign: 'center' }}
                  className="fw-bold"
                >
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  return (
    <div className="d-flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 rounded-l btn  btn-sm link"
      >
        Previous
      </button>
      <span className="px-2 py-1">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 rounded-l btn link btn-sm"
      >
        Next
      </button>
    </div>
  );
};
