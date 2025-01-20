import {
  Column,
  Table as ReactTable,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DownlodCSVFromArray, DownlodExcelFromArray } from 'metaponder-utility';
import React, { useEffect, useRef, useState } from 'react';
import { Color } from 'react-bootstrap/esm/types';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { Dropdown, Modal } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  MPSButtonDelete,
  MPSButtonEdit,
  MPSCustomButton,
  MPSIconBS,
} from '../MPSComponents';

type MPSTableProps = {
  fields: MPSTableFieldsProps[];
  data: any[];
  showPagination?: boolean;
  showSorting?: boolean;
  showFilter?: boolean;
  paginationItemsCount?: number;
  showExcelExport?: boolean;
  showCSVExport?: boolean;
  exportButtonColor?: Color;
  caption?: string;
  outerClassName?: string;
  isEditable?: boolean;
  isDeletable?: boolean;
  onDelete?: Function;
  onEdit?: Function;
  emptyDataText?: string;

  showAdditionalButton?: boolean;
  additionalButtonText?: string;
  additionalButtonColumnHeader?: string;
  additionalButtonClickHandler?: Function;
  additionalButtonConfirmation?: boolean;
  additionalButtonConfirmationText?: string;
  additionalButtonIcon?: string;
  additionalButtonColor?: Color;
  additionalButtonShowParam?: string;
  showGlobalFilter?: boolean;
  showExporting?: boolean;
  showViewField?: boolean;

  showAdditionalButton2?: boolean;
  additionalButtonText2?: string;
  additionalButtonColumnHeader2?: string;
  additionalButtonClickHandler2?: Function;
  additionalButtonConfirmation2?: boolean;
  additionalButtonConfirmationText2?: string;
  additionalButtonIcon2?: string;
  additionalButtonColor2?: Color;
  additionalButtonShowParam2?: string;

  showAdditionalButton3?: boolean;
  additionalButtonText3?: string;
  additionalButtonColumnHeader3?: string;
  additionalButtonClickHandler3?: Function;
  additionalButtonConfirmation3?: boolean;
  additionalButtonConfirmationText3?: string;
  additionalButtonIcon3?: string;
  additionalButtonColor3?: Color;
  additionalButtonShowParam3?: string;

  showAdditionalButton4?: boolean;
  additionalButtonText4?: string;
  additionalButtonColumnHeader4?: string;
  additionalButtonClickHandler4?: Function;
  additionalButtonConfirmation4?: boolean;
  additionalButtonConfirmationText4?: string;
  additionalButtonIcon4?: string;
  additionalButtonColor4?: Color;
  additionalButtonShowParam4?: string;

  showAdditionalButton5?: boolean;
  additionalButtonText5?: string;
  additionalButtonColumnHeader5?: string;
  additionalButtonClickHandler5?: Function;
  additionalButtonConfirmation5?: boolean;
  additionalButtonConfirmationText5?: string;
  additionalButtonIcon5?: string;
  additionalButtonColor5?: Color;
  additionalButtonShowParam5?: string;
  component?: {
    type: string;
    props: Object;
  };
};

type MPSTableFieldsProps = {
  FieldValue: string;
  FieldHeader: string;
  component: any;
};

export function MPSTableVarient({
  fields,
  data,
  showPagination = false,
  showSorting = true,
  showFilter = false,
  showGlobalFilter = false,
  paginationItemsCount = 10,
  showExcelExport = false,
  showCSVExport = false,
  exportButtonColor = 'secondary',
  outerClassName = 'mt-2',
  caption = '',
  isEditable = false,
  isDeletable = false,
  onDelete,
  onEdit,
  emptyDataText = 'No data found !',
  showExporting = true,
  showViewField = true,

  showAdditionalButton,
  additionalButtonClickHandler,
  additionalButtonColumnHeader,
  additionalButtonText,
  additionalButtonConfirmation = false,
  additionalButtonConfirmationText = 'You want to save this',
  additionalButtonIcon = 'bi-pencil-square',
  additionalButtonColor = 'info',
  additionalButtonShowParam = null,

  showAdditionalButton2,
  additionalButtonClickHandler2,
  additionalButtonColumnHeader2,
  additionalButtonText2,
  additionalButtonConfirmation2 = false,
  additionalButtonConfirmationText2 = 'You want to save this',
  additionalButtonIcon2 = 'bi-pencil-square',
  additionalButtonColor2 = 'info',
  additionalButtonShowParam2 = null,

  showAdditionalButton3,
  additionalButtonClickHandler3,
  additionalButtonColumnHeader3,
  additionalButtonText3,
  additionalButtonConfirmation3 = false,
  additionalButtonConfirmationText3 = 'You want to save this',
  additionalButtonIcon3 = 'bi-pencil-square',
  additionalButtonColor3 = 'info',
  additionalButtonShowParam3 = null,

  showAdditionalButton4,
  additionalButtonClickHandler4,
  additionalButtonColumnHeader4,
  additionalButtonText4,
  additionalButtonConfirmation4 = false,
  additionalButtonConfirmationText4 = 'You want to save this',
  additionalButtonIcon4 = 'bi-pencil-square',
  additionalButtonColor4 = 'info',
  additionalButtonShowParam4 = null,

  showAdditionalButton5,
  additionalButtonClickHandler5,
  additionalButtonColumnHeader5,
  additionalButtonText5,
  additionalButtonConfirmation5 = false,
  additionalButtonConfirmationText5 = 'You want to save this',
  additionalButtonIcon5 = 'bi-pencil-square',
  additionalButtonColor5 = 'info',
  additionalButtonShowParam5 = null,
}: MPSTableProps) {
  return (
    <>
      <Table
        data={data}
        fields={fields}
        showPagination={showPagination}
        paginationItemsCount={paginationItemsCount}
        showFilter={showFilter}
        showSorting={showSorting}
        showExcelExport={showExcelExport}
        showCSVExport={showCSVExport}
        exportButtonColor={exportButtonColor}
        caption={caption}
        showExporting={showExporting}
        outerClassName={outerClassName}
        isDeletable={isDeletable}
        isEditable={isEditable}
        onEdit={onEdit}
        onDelete={onDelete}
        emptyDataText={emptyDataText}
        showAdditionalButton={showAdditionalButton}
        additionalButtonClickHandler={additionalButtonClickHandler}
        additionalButtonColumnHeader={additionalButtonColumnHeader}
        additionalButtonText={additionalButtonText}
        additionalButtonConfirmation={additionalButtonConfirmation}
        additionalButtonConfirmationText={additionalButtonConfirmationText}
        additionalButtonIcon={additionalButtonIcon}
        additionalButtonColor={additionalButtonColor}
        additionalButtonShowParam={additionalButtonShowParam}
        showAdditionalButton2={showAdditionalButton2}
        additionalButtonClickHandler2={additionalButtonClickHandler2}
        additionalButtonColumnHeader2={additionalButtonColumnHeader2}
        additionalButtonText2={additionalButtonText2}
        additionalButtonConfirmation2={additionalButtonConfirmation2}
        additionalButtonConfirmationText2={additionalButtonConfirmationText2}
        additionalButtonIcon2={additionalButtonIcon2}
        additionalButtonColor2={additionalButtonColor2}
        additionalButtonShowParam2={additionalButtonShowParam2}
        showAdditionalButton3={showAdditionalButton3}
        additionalButtonClickHandler3={additionalButtonClickHandler3}
        additionalButtonColumnHeader3={additionalButtonColumnHeader3}
        additionalButtonText3={additionalButtonText3}
        additionalButtonConfirmation3={additionalButtonConfirmation3}
        additionalButtonConfirmationText3={additionalButtonConfirmationText3}
        additionalButtonIcon3={additionalButtonIcon3}
        additionalButtonColor3={additionalButtonColor3}
        additionalButtonShowParam3={additionalButtonShowParam3}
        showAdditionalButton4={showAdditionalButton4}
        additionalButtonClickHandler4={additionalButtonClickHandler4}
        additionalButtonColumnHeader4={additionalButtonColumnHeader4}
        additionalButtonText4={additionalButtonText4}
        additionalButtonConfirmation4={additionalButtonConfirmation4}
        additionalButtonConfirmationText4={additionalButtonConfirmationText4}
        additionalButtonIcon4={additionalButtonIcon4}
        additionalButtonColor4={additionalButtonColor4}
        additionalButtonShowParam4={additionalButtonShowParam4}
        showAdditionalButton5={showAdditionalButton5}
        additionalButtonClickHandler5={additionalButtonClickHandler5}
        additionalButtonColumnHeader5={additionalButtonColumnHeader5}
        additionalButtonText5={additionalButtonText5}
        additionalButtonConfirmation5={additionalButtonConfirmation5}
        additionalButtonConfirmationText5={additionalButtonConfirmationText5}
        additionalButtonIcon5={additionalButtonIcon5}
        additionalButtonColor5={additionalButtonColor5}
        additionalButtonShowParam5={additionalButtonShowParam5}
        showGlobalFilter={showGlobalFilter}
        showViewField={showViewField}
      />
    </>
  );
}

function Table({
  data,
  fields,
  showPagination,
  showSorting,
  showFilter,
  paginationItemsCount,
  showExcelExport,
  showCSVExport,
  exportButtonColor,
  caption,
  outerClassName,
  isEditable = false,
  isDeletable = false,
  onDelete,
  onEdit,
  emptyDataText,
  showExporting,

  showAdditionalButton = false,
  additionalButtonClickHandler,
  additionalButtonText,
  additionalButtonColumnHeader,
  additionalButtonConfirmation,
  additionalButtonConfirmationText,
  additionalButtonIcon,
  additionalButtonColor,
  additionalButtonShowParam,

  showAdditionalButton2 = false,
  additionalButtonClickHandler2,
  additionalButtonText2,
  additionalButtonColumnHeader2,
  additionalButtonConfirmation2,
  additionalButtonConfirmationText2,
  additionalButtonIcon2,
  additionalButtonColor2,
  additionalButtonShowParam2,

  showAdditionalButton3 = false,
  additionalButtonClickHandler3,
  additionalButtonText3,
  additionalButtonColumnHeader3,
  additionalButtonConfirmation3,
  additionalButtonConfirmationText3,
  additionalButtonIcon3,
  additionalButtonColor3,
  additionalButtonShowParam3,

  showAdditionalButton4 = false,
  additionalButtonClickHandler4,
  additionalButtonText4,
  additionalButtonColumnHeader4,
  additionalButtonConfirmation4,
  additionalButtonConfirmationText4,
  additionalButtonIcon4,
  additionalButtonColor4,
  additionalButtonShowParam4,

  showAdditionalButton5 = false,
  additionalButtonClickHandler5,
  additionalButtonText5,
  additionalButtonColumnHeader5,
  additionalButtonConfirmation5,
  additionalButtonConfirmationText5,
  additionalButtonIcon5,
  additionalButtonColor5,
  additionalButtonShowParam5,

  showGlobalFilter = false,
  showViewField,
}: MPSTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columnHelper = createColumnHelper<MPSTableFieldsProps>();
  const [viewsColumnObj, setViewsColumnsObj] = useState<any[]>([]);
  const [visibleFieldsModel, setVisibleFieldsModel] = useState<boolean>(false);
  const [showPrintButton, setShowPrintButton] = useState<boolean>(true);
  const [currCol, setCurrCol] = useState('');
  const [ind, setInd] = useState(null);
  const [selectAll, setSelectAll] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [tblPagCount, setTblPagCount] = useState<number>(paginationItemsCount);
  // const [notAllowSorting, setNotAllowSorting] = useState<string[]>([]);

  const aggregationFns = {
    sum: values => values.reduce((a, b) => a + b, 0),
    mul: values => values.reduce((a, b) => a * b, 1),
    count: values => values.length,
    min: values => Math.min(...values),
    max: values => Math.max(...values),
    extent: values => [Math.min(...values), Math.max(...values)],
    mean: values => values.reduce((a, b) => a + b, 0) / values.length,
    median: values => {
      const sorted = [...values].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
    },
    unique: values => new Set(values),
    uniqueCount: values => new Set(values).size,
  };

  const columns = viewsColumnObj
    .filter((field: any) => field.isVisible)
    .map((field: any) => {
      const aggregationFn = field.aggregationFn
        ? aggregationFns[field.aggregationFn]
        : undefined;
      if (field?.component) {
        if (field?.component.type && field?.component.type === 'input') {
          return columnHelper.accessor(field.FieldValue, {
            cell: ({ row }) => (
              <input
                value={row.original[field.FieldValue]}
                onChange={e => {
                  setInd(row.index);
                  setCurrCol(field.FieldValue);
                  field?.component?.changeHandler(
                    row.index,
                    e.target.value,
                    row.original
                  );
                }}
                autoFocus={field.FieldValue === currCol && ind === row.index}
                {...field.component?.props}
              />
            ),
            header: () => <span>{field.FieldHeader}</span>,
            id: field.FieldValue + '_4c8b3ead996f4a4b81292798d463a14b',
            footer: () =>
              field?.component?.renderFooter
                ? field?.component?.renderFooter()
                : null,
          });
        } else if (
          field?.component.type &&
          field?.component.type === 'select'
        ) {
          return columnHelper.accessor(field.FieldValue, {
            cell: ({ row }) => (
              <select
                value={row.original[field.FieldValue]}
                onChange={e => {
                  setInd(null);
                  setCurrCol('');
                  field?.component?.changeHandler(
                    row.index,
                    e.target.value,
                    row.original
                  );
                }}
                {...field.component?.props}
              >
                <option value={''}>Select</option>
                {field?.component?.options?.data?.map((op, index) => {
                  // ////console.log(op, index)
                  return (
                    <option
                      key={index}
                      value={op[field?.component?.options?.value]}
                    >
                      {op[field?.component?.options?.label]}
                    </option>
                  );
                })}
              </select>
            ),
            header: () => <span>{field.FieldHeader}</span>,
            id: field.FieldValue + '_4c8b3ead996f4a4b81292798d463a14b',
            footer: () =>
              field?.component?.renderFooter
                ? field?.component?.renderFooter()
                : null,
          });
        } else if (
          field?.component.type &&
          field?.component.type === 'checkbox'
        ) {
          return columnHelper.accessor(field.FieldValue, {
            cell: ({ row }) => (
              <input
                type="checkbox"
                checked={Boolean(row.original[field.FieldValue])}
                key={Math.random()}
                onChange={e => {
                  setInd(null);
                  setCurrCol('');
                  field?.component?.changeHandler &&
                    field?.component?.changeHandler(
                      row.index,
                      e.target.checked,
                      row.original
                    );
                  e.stopPropagation();
                }}
                {...field.component?.props}
                className="form-check-input"
              />
            ),
            header: () => (
              <span>
                {field?.component?.selectAllHandler && data?.length > 0 && (
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={field.FieldValue}
                    checked={selectAll[field.FieldHeader]}
                    onChange={e => {
                      let kkk = { ...selectAll };
                      kkk[field.FieldHeader] = e.target.checked;
                      setSelectAll(kkk);
                      field.component?.selectAllHandler(e.target.checked);
                    }}
                  />
                )}
                <label className="form-check-label" htmlFor={field.FieldValue}>
                  &nbsp; {field.FieldHeader}
                </label>
              </span>
            ),
            id: field.FieldValue + '_4c8b3ead996f4a4b81292798d463a14b',
            footer: () =>
              field?.component?.renderFooter
                ? field?.component?.renderFooter()
                : null,
          });
        } else {
          return columnHelper.accessor(field.FieldValue, {
            cell: ({ row }) =>
              field?.component?.render({ index: row.index, ...row.original }),
            header: () => <span>{field.FieldHeader}</span>,
            id: field.FieldValue + '_4c8b3ead996f4a4b81292798d463a14b',
            footer: () =>
              field?.component?.renderFooter
                ? field?.component?.renderFooter()
                : null,
          });
        }
      }
      return columnHelper.accessor(field.FieldValue, {
        cell: info => info.renderValue(),
        header: () => <span>{field.FieldHeader}</span>,
        // id: `${field.FieldValue}_default`,
        footer: () =>
          field?.showAggregation && field.showAggregation === true ? (
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '0.9',
                color: 'purple',
              }}
            >
              {field.aggregationHeader}
              {aggregationFn &&
                data &&
                aggregationFn(data.map(row => row[field.FieldValue]))}
            </span>
          ) : null,
        aggregationFn,
      });
    });

  useEffect(() => {
    setViewsColumnsObj(
      fields.map((column: any) => {
        return {
          ...column,
          FieldHeader: column.FieldHeader,
          FieldValue: column.FieldValue,
          isVisible: true,
        };
      })
    );
    if (!selectAll) {
      let obj = {};

      fields.map(col => {
        if (
          col.component?.type === 'checkbox' &&
          col.component?.selectAllHandler
        ) {
          obj[col.FieldHeader] = false;
        }
      });

      setSelectAll(obj);
    }
  }, [fields]);

  const onChangeViewColumns = async (item: any) => {
    const update = [...viewsColumnObj];
    update.map((column: any) => {
      if (column.FieldValue === item) {
        column.isVisible = !column.isVisible;
      }
      return column;
    });
    setViewsColumnsObj(update);
  };

  const [globalFilterState, setGlobalfilterState] = useState<any>('');

  const table = useReactTable({
    data,
    columns,
    // Pipeline
    state: {
      sorting,
      globalFilter: globalFilterState,
      pagination: {
        pageIndex: currentPage,
        pageSize: tblPagCount,
      },
    },

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (showPagination === false) {
      setTblPagCount(data?.length ?? paginationItemsCount);
    } else {
      setTblPagCount(paginationItemsCount);
    }
  }, [showPagination, data?.length, paginationItemsCount]);

  const DownloadExcel = (Type: String) => {
    const kk = [];
    for (let i = 0; i < data.length; i++) {
      const myObj: any = {};
      for (let j = 0; j < fields.length; j++) {
        var myarr = fields[j].FieldValue.split('.');
        if (myarr.length > 1) {
          myObj[fields[j].FieldHeader] = data[i][myarr[0]][myarr[1]];
        } else {
          myObj[fields[j].FieldHeader] = data[i][fields[j].FieldValue];
        }
      }
      kk.push(myObj);
    }
    let fileName = uuidv4();
    if (Type === 'Excel') {
      DownlodExcelFromArray(fileName + '.xlsx'.toString(), kk);
    } else {
      DownlodCSVFromArray(fileName + '.csv', kk);
    }
  };

  const printComponentRef = useRef<any>(null);
  const handlerOnPrint = useReactToPrint({
    pageStyle: '@page {  size: landscape;  margin: 4mm; }   }',
    content: () => printComponentRef.current,
  });

  const handleExportPDF = () => {
    const doc: any = new jsPDF();
    const headerNames = viewsColumnObj
      .filter((field: any) => field.isVisible)
      .map((field: any) => field.FieldHeader);
    doc.autoTable({
      head: [headerNames],
      body: data.map((row: any) => {
        return viewsColumnObj
          .filter((field: any) => field.isVisible)
          .map((field: any) => row[field.FieldValue]);
      }),
    });
    let fileName = uuidv4();
    doc.save(fileName + '.pdf'.toString());
  };

  const onExportFilteredExcel = () => {
    var viewData = [];
    for (let i = 0; i < data.length; i++) {
      const myObj: any = {};
      for (let j = 0; j < viewsColumnObj.length; j++) {
        if (!viewsColumnObj[j].isVisible) continue;
        var myarr = viewsColumnObj[j].FieldValue.split('.');
        if (myarr.length > 1) {
          myObj[viewsColumnObj[j].FieldHeader] = data[i][myarr[0]];
        }
        myObj[viewsColumnObj[j].FieldHeader] =
          data[i][viewsColumnObj[j].FieldValue];
      }
      viewData.push(myObj);
    }
    let fileName = uuidv4();
    DownlodExcelFromArray(fileName + '.xlsx'.toString(), viewData);
  };

  return (
    <div className={outerClassName}>
      <div className="d-flex justify-content-between mb-1">
        <span className="mb-0 ">
          <h6 style={{ color: '#989e99' }}>{caption}</h6>
        </span>

        <div className="d-flex gap-2">
          {/* search */}
          {showGlobalFilter && (
            <div>
              <input
                type="text"
                value={globalFilterState}
                onChange={e => setGlobalfilterState(e.target.value)}
                className="form-control form-control-sm"
                placeholder="Search any value....."
              />
            </div>
          )}

          {/* view field  */}
          {showViewField && (
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
            style={{ zIndex: 9999 }}
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
                        onChange={() => {
                          onChangeViewColumns(column.FieldValue);
                        }}
                      />
                      {column.FieldHeader}
                    </p>
                  );
                })}
                <p className="p-0 m-0 d-flex gap-2 align-items-center">
                  <input
                    type="checkbox"
                    checked={showPrintButton}
                    onChange={() => setShowPrintButton(!showPrintButton)}
                  />
                  View Print Button
                </p>
              </>
            </Modal.Body>
          </Modal>

          {/* excel and csv file export */}
          {showExcelExport && data && data.length > 0 && (
            <button
              className={`btn btn-${exportButtonColor} btn-sm`}
              onClick={() => {
                DownloadExcel('Excel');
              }}
            >
              <MPSIconBS icon="bi-filetype-xlsx" /> Excel
            </button>
          )}
          {showCSVExport && data && data.length > 0 && (
            <button
              className={`btn btn-${exportButtonColor} btn-sm `}
              onClick={() => {
                DownloadExcel('CSV');
              }}
            >
              <MPSIconBS icon="bi-filetype-csv" /> CSV
            </button>
          )}
          {showExporting && (
            <div>
              <Dropdown>
                <Dropdown.Toggle className="btn btn-sm btn-secondary">
                  <MPSIconBS icon="bi-save" /> Export
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => DownloadExcel('Excel')}>
                    <MPSIconBS icon="bi-filetype-xlsx fa-lg fw-bold text-success " />
                    Excel (all columns)
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => DownloadExcel('CSV')}>
                    <MPSIconBS icon="bi-filetype-csv fa-lg fw-bold text-success" />
                    CSV (all columns)
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => onExportFilteredExcel()}>
                    <MPSIconBS icon="bi-filetype-xlsx fa-lg fw-bold text-success " />
                    Excel
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handlerOnPrint()}>
                    <MPSIconBS icon="bi-printer fa-lg fw-bold text-primary" />
                    Print
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleExportPDF()}>
                    <MPSIconBS icon="bi-filetype-pdf fa-lg fw-bold text-danger" />{' '}
                    PDF
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      </div>

      <div
        className="table-responsive scrollbar"
        ref={printComponentRef}
        id="my-table"
      >
        <table className="table table-bordered table-sm shadow-sm table-striped table-hover">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr
                key={headerGroup.id}
                style={{ backgroundColor: 'rgba(54, 162, 235, 0.2)' }}
              >
                <th>#</th>
                {headerGroup.headers.map(header => {
                  let tokenkey = header.id.split('_');
                  let allowSorting = true;

                  if (tokenkey.length > 1) {
                    if (
                      tokenkey[tokenkey.length - 1] ===
                      '4c8b3ead996f4a4b81292798d463a14b'
                    ) {
                      allowSorting = false;
                    } else {
                      allowSorting = true;
                    }
                  } else {
                    allowSorting = true;
                  }
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          <div
                            className={
                              header.column.getCanSort() &&
                              allowSorting === true
                                ? 'cursor-pointer select-none'
                                : ''
                            }
                            onClick={
                              showSorting === true && allowSorting === true
                                ? header.column.getToggleSortingHandler()
                                : function() {}
                            }
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {showSorting && allowSorting === true ? (
                              <>
                                {{
                                  asc: (
                                    <MPSIconBS icon="bi-sort-alpha-up-alt" />
                                  ),
                                  desc: (
                                    <MPSIconBS icon="bi-sort-alpha-down-alt" />
                                  ),
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </>
                            ) : null}
                          </div>
                          {showFilter && header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </th>
                  );
                })}
                {showPrintButton && (
                  <>
                    {isEditable && <th>Edit</th>}
                    {isDeletable && <th>Delete</th>}
                    {showAdditionalButton && (
                      <th>{additionalButtonColumnHeader}</th>
                    )}
                    {showAdditionalButton2 && (
                      <th>{additionalButtonColumnHeader2}</th>
                    )}
                    {showAdditionalButton3 && (
                      <th>{additionalButtonColumnHeader3}</th>
                    )}
                    {additionalButtonColumnHeader4 && (
                      <th>{additionalButtonColumnHeader4}</th>
                    )}
                    {additionalButtonColumnHeader5 && (
                      <th>{additionalButtonColumnHeader5}</th>
                    )}
                  </>
                )}
              </tr>
            ))}
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              table.getRowModel().rows.map((row, index) => {
                return (
                  <tr key={row.id}>
                    <td>
                      {table.getState().pagination.pageIndex *
                        paginationItemsCount +
                        index +
                        1}
                    </td>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                    {showPrintButton && (
                      <>
                        {isEditable && (
                          <td>
                            <MPSButtonEdit
                              onClickHandler={() => {
                                onEdit({ ...row.original, index: row.index });
                              }}
                            />
                          </td>
                        )}
                        {isDeletable && (
                          <td>
                            <MPSButtonDelete
                              onClickHandler={() => {
                                onDelete({ ...row.original, index: row.index });
                              }}
                            />
                          </td>
                        )}

                        {showAdditionalButton &&
                        (additionalButtonShowParam
                          ? Boolean(row.original[additionalButtonShowParam])
                          : true) ? (
                          <td align="center">
                            <MPSCustomButton
                              text={additionalButtonText}
                              buttonIcon={additionalButtonIcon}
                              buttonColor={additionalButtonColor}
                              buttonSize="sm"
                              onClickHandler={() => {
                                if (additionalButtonConfirmation) {
                                  Swal.fire({
                                    title: 'Are you sure ?',
                                    text: additionalButtonConfirmationText,
                                    icon: 'info',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes, Save it!',
                                    cancelButtonText: 'No, Cancel it',
                                    confirmButtonColor: '#338a25',
                                  }).then(resp => {
                                    if (resp.isConfirmed) {
                                      additionalButtonClickHandler({
                                        ...row.original,
                                        index: row.index,
                                      });
                                    } else {
                                      return;
                                    }
                                  });
                                } else {
                                  additionalButtonClickHandler({
                                    ...row.original,
                                    index: row.index,
                                  });
                                }
                              }}
                            />
                          </td>
                        ) : (
                          showAdditionalButton && <td></td>
                        )}

                        {showAdditionalButton2 &&
                        (additionalButtonShowParam2
                          ? Boolean(row.original[additionalButtonShowParam2])
                          : true) ? (
                          <td align="center">
                            <MPSCustomButton
                              text={additionalButtonText2}
                              buttonIcon={additionalButtonIcon2}
                              buttonColor={additionalButtonColor2}
                              buttonSize="sm"
                              onClickHandler={() => {
                                if (additionalButtonConfirmation2) {
                                  Swal.fire({
                                    title: 'Are you sure ?',
                                    text: additionalButtonConfirmationText2,
                                    icon: 'info',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes, Save it!',
                                    cancelButtonText: 'No, Cancel it',
                                    confirmButtonColor: '#338a25',
                                  }).then(resp => {
                                    if (resp.isConfirmed) {
                                      additionalButtonClickHandler2({
                                        ...row.original,
                                        index: row.index,
                                      });
                                    } else {
                                      return;
                                    }
                                  });
                                } else {
                                  additionalButtonClickHandler2({
                                    ...row.original,
                                    index: row.index,
                                  });
                                }
                              }}
                            />
                          </td>
                        ) : (
                          showAdditionalButton2 && <td></td>
                        )}

                        {showAdditionalButton3 &&
                        (additionalButtonShowParam3
                          ? Boolean(row.original[additionalButtonShowParam3])
                          : true) ? (
                          <td align="center">
                            <MPSCustomButton
                              text={additionalButtonText3}
                              buttonIcon={additionalButtonIcon3}
                              buttonColor={additionalButtonColor3}
                              buttonSize="sm"
                              onClickHandler={() => {
                                if (additionalButtonConfirmation3) {
                                  Swal.fire({
                                    title: 'Are you sure ?',
                                    text: additionalButtonConfirmationText3,
                                    icon: 'info',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes, Save it!',
                                    cancelButtonText: 'No, Cancel it',
                                    confirmButtonColor: '#338a25',
                                  }).then(resp => {
                                    if (resp.isConfirmed) {
                                      additionalButtonClickHandler3({
                                        ...row.original,
                                        index: row.index,
                                      });
                                    } else {
                                      return;
                                    }
                                  });
                                } else {
                                  additionalButtonClickHandler3({
                                    ...row.original,
                                    index: row.index,
                                  });
                                }
                              }}
                            />
                          </td>
                        ) : (
                          showAdditionalButton3 && <td></td>
                        )}

                        {showAdditionalButton4 &&
                        (additionalButtonShowParam4
                          ? Boolean(row.original[additionalButtonShowParam4])
                          : true) ? (
                          <td align="center">
                            <MPSCustomButton
                              text={additionalButtonText4}
                              buttonIcon={additionalButtonIcon4}
                              buttonColor={additionalButtonColor4}
                              buttonSize="sm"
                              onClickHandler={() => {
                                if (additionalButtonConfirmation4) {
                                  Swal.fire({
                                    title: 'Are you sure ?',
                                    text: additionalButtonConfirmationText4,
                                    icon: 'info',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes, Save it!',
                                    cancelButtonText: 'No, Cancel it',
                                    confirmButtonColor: '#338a25',
                                  }).then(resp => {
                                    if (resp.isConfirmed) {
                                      additionalButtonClickHandler4({
                                        ...row.original,
                                        index: row.index,
                                      });
                                    } else {
                                      return;
                                    }
                                  });
                                } else {
                                  additionalButtonClickHandler4({
                                    ...row.original,
                                    index: row.index,
                                  });
                                }
                              }}
                            />
                          </td>
                        ) : (
                          showAdditionalButton4 && <td></td>
                        )}
                        {showAdditionalButton5 &&
                        (additionalButtonShowParam5
                          ? Boolean(row.original[additionalButtonShowParam5])
                          : true) ? (
                          <td align="center">
                            <MPSCustomButton
                              text={additionalButtonText5}
                              buttonIcon={additionalButtonIcon5}
                              buttonColor={additionalButtonColor5}
                              buttonSize="sm"
                              onClickHandler={() => {
                                if (additionalButtonConfirmation5) {
                                  Swal.fire({
                                    title: 'Are you sure ?',
                                    text: additionalButtonConfirmationText5,
                                    icon: 'info',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes, Save it!',
                                    cancelButtonText: 'No, Cancel it',
                                    confirmButtonColor: '#338a25',
                                  }).then(resp => {
                                    if (resp.isConfirmed) {
                                      additionalButtonClickHandler5({
                                        ...row.original,
                                        index: row.index,
                                      });
                                    } else {
                                      return;
                                    }
                                  });
                                } else {
                                  additionalButtonClickHandler5({
                                    ...row.original,
                                    index: row.index,
                                  });
                                }
                              }}
                            />
                          </td>
                        ) : (
                          showAdditionalButton5 && <td></td>
                        )}
                      </>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={
                    fields.length +
                    1 +
                    (showAdditionalButton ? 1 : 0) +
                    (showAdditionalButton2 ? 1 : 0) +
                    (showAdditionalButton3 ? 1 : 0) +
                    (showAdditionalButton4 ? 1 : 0) +
                    (showAdditionalButton5 ? 1 : 0) +
                    (isDeletable ? 1 : 0) +
                    (isEditable ? 1 : 0)
                  }
                  style={{ textAlign: 'center' }}
                >
                  <div className="d-flex flex-column align-items-center justify-content-center text-center py-4">
                    <h5 className="text-primary">{emptyDataText}</h5>
                    <p className="text-muted">
                      We couldn't find any data at the moment.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          {data?.length > 0 && (
            <tfoot>
              {table.getFooterGroups().map(footerGroup => (
                <tr key={footerGroup.id}>
                  <td></td>
                  {footerGroup.headers.map(header => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                  {isEditable && <td></td>}
                  {isDeletable && <td></td>}
                  {showAdditionalButton && <td></td>}
                  {showAdditionalButton2 && <td></td>}
                  {showAdditionalButton3 && <td></td>}
                  {additionalButtonColumnHeader4 && <td></td>}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
        {showPagination && data?.length > paginationItemsCount && (
          <div className="d-flex  gap-2">
            <button
              className="border rounded p-1"
              onClick={() => {
                table.setPageIndex(0);
                setCurrentPage(0);
              }}
              disabled={data ? !table.getCanPreviousPage() : true}
            >
              {'<<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => {
                table.previousPage();
                setCurrentPage(currentPage - 1);
              }}
              disabled={data ? !table.getCanPreviousPage() : true}
            >
              {'<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => {
                table.nextPage();
                setCurrentPage(currentPage + 1);
              }}
              disabled={data ? !table.getCanNextPage() : true}
            >
              {'>'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => {
                table.setPageIndex(table.getPageCount() - 1);
                setCurrentPage(table.getPageCount() - 1);
              }}
              disabled={data ? !table.getCanNextPage() : true}
            >
              {'>>'}
            </button>
            <span className="d-flex items-center gap-1">
              <div>Page</div>
              <strong>
                {data ? table.getState().pagination.pageIndex + 1 : 1} of{' '}
                {data ? table.getPageCount() : 1}
              </strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: ReactTable<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className="d-flex gap-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="border  rounded"
        style={{ width: '60px' }}
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="border  rounded"
        style={{ maxWidth: '60px', width: 'auto' }}
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border  rounded"
    />
  );
}
