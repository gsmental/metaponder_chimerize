import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { v4 as uuid } from 'uuid';

type MultipleArraysToExcelType = {
  [key: string]: any[];
};

declare const XLSX: any;
export class AdvanceSolutions {
  static ExcelFileToArray(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          blankRows: false,
          defval: '',
        });
        resolve(jsonData);
      };

      if (!file) {
        reject('File Not Found');
      }
      reader.readAsArrayBuffer(file);
    });
  }

  static ExcelBase64ToArray(base64String) {
    return new Promise((resolve, reject) => {
      // Decode base64 string
      const binaryString = atob(base64String);
      const binaryLen = binaryString.length;
      const bytes = new Uint8Array(binaryLen);

      // Convert binary string to Uint8Array
      for (let i = 0; i < binaryLen; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      try {
        // Read Excel data
        const workbook = XLSX.read(bytes, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          blankRows: false,
          defval: '',
        });
        resolve(jsonData);
      } catch (error) {
        reject('Error parsing Excel file: ' + error);
      }
    });
  }

  static ArrayToExcel = (fileName, dataObject) => {
    var ws = XLSX.utils.json_to_sheet(dataObject);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  };
  static FileToBase64 = file => {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          // The base64 string is available in reader.result
          resolve(reader.result);
        };
      } else {
        reject('File Not Found');
      }
    });
  };
  static NumberToWords = num => {
    var a = [
      '',
      'one ',
      'two ',
      'three ',
      'four ',
      'five ',
      'six ',
      'seven ',
      'eight ',
      'nine ',
      'ten ',
      'eleven ',
      'twelve ',
      'thirteen ',
      'fourteen ',
      'fifteen ',
      'sixteen ',
      'seventeen ',
      'eighteen ',
      'nineteen ',
    ];
    var b = [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ];

    ////////console.log('num', num)

    if ((num = num?.toString())?.length > 9) return 'overflow';
    let n = ('000000000' + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return null;
    var str = '';
    str +=
      Number(n[1]) != 0
        ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore '
        : '';
    str +=
      Number(n[2]) != 0
        ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh '
        : '';
    str +=
      Number(n[3]) != 0
        ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand '
        : '';
    str +=
      Number(n[4]) != 0
        ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred '
        : '';
    str +=
      Number(n[5]) != 0
        ? (str != '' ? 'and ' : '') +
          (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) +
          'only '
        : '';
    return str;
  };

  static ArrayToPDF = (data: any[]) => {
    try {
      const table = document.createElement('table');
      table.style.border = '1px solid black';
      const tableHeader = document.createElement('thead');
      const headerRow = tableHeader.insertRow(0);

      const headerKeys = Object.keys(data[0]);

      ////console.log(headerKeys);
      headerKeys.forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
      });

      table.appendChild(tableHeader);

      const tableBody = document.createElement('tbody');
      data.forEach(item => {
        const row = tableBody.insertRow();

        headerKeys.forEach(key => {
          const cell = row.insertCell();
          cell.textContent = item[key];
        });
      });

      table.appendChild(tableBody);
      const numColumns = Object.keys(data[0]).length;
      const cellWidth = 80;
      const tableWidth = numColumns * cellWidth;

      const pdf = new jsPDF('landscape', 'px', [tableWidth, 500]);

      autoTable(pdf, {
        html: table,
        theme: 'grid',
        headStyles: { lineWidth: 1, lineColor: 'black', fillColor: '#4a4947' },
        bodyStyles: { lineWidth: 1, lineColor: 'black', textColor: 'black' },
        margin: 15,
      });

      pdf.save(uuid() + '.pdf');
    } catch (error) {}
  };

  static MultipleArraysToExcel = (
    arrayObj: MultipleArraysToExcelType,
    filename: string = 'data.xlsx'
  ) => {
    if (typeof window === 'undefined') return; // Ensure window is defined in SSR scenarios
    // @ts-ignore: Accessing xlsx from the global window object
    const XLSX2 = window.XLSX;
    const wb = XLSX2.utils.book_new();

    for (const key in arrayObj) {
      const ws1 = XLSX2.utils.json_to_sheet(arrayObj[key]);
      XLSX2.utils.book_append_sheet(wb, ws1, key);
    }
    const wbout = XLSX2.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
}
