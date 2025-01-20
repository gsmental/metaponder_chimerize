import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { v4 as uuid } from "uuid";

type MultipleArraysToExcelType = {
  [key: string]: any[];
};

declare const XLSX: any;
export class AdvanceSolutions {
  static ExcelFileToArray(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          blankRows: false,
          defval: "",
        });
        resolve(jsonData);
      };

      if (!file) {
        reject("File Not Found");
      }
      reader.readAsArrayBuffer(file);
    });
  }

  static download_table_as_csv(table_id, separator = ",") {
    // Select rows from table_id
    var rows = document.querySelectorAll("table#" + table_id + " tr");
    // Construct csv
    var csv = [];
    //looping through the table
    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");
      //looping through the tr
      for (var j = 0; j < cols.length; j++) {
        // removing space from the data
        var data = cols[j].innerHTML
          .replace(/(\r\n|\n|\r)/gm, "")
          .replace(/(\s\s)/gm, " ");
        // removing double qoute from the data
        data = data.replace(/"/g, `""`);
        // Push escaped string
        row.push(`"` + data + `"`);
      }
      csv.push(row.join(separator));
    }
    var csv_string = csv.join("\n");
    // Download it
    var filename =
      "export_" + table_id + "_" + new Date().toLocaleDateString() + ".csv";
    var link = document.createElement("a");
    link.style.display = "none";
    link.setAttribute("target", "_blank");
    link.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(csv_string)
    );
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static Global_Search_Filter_From_Table(tableid, value) {
    var  filter, table, tr, td, i, txtValue;
    filter = value.toUpperCase();
    table = document.getElementById(tableid);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  static decodeBase64 = (base64Str) => {
    const binaryString = window.atob(base64Str);
    const byteArray = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    return byteArray;
  };

  // static ExcelBase64ToArray = (base64Str) => {
  //   const base64Data = base64Str?.includes(",")
  //     ? base64Str.split(",")[1]
  //     : base64Str;

  //   const byteArray = this.decodeBase64(base64Data);
  //   const workbook = XLSX.read(byteArray, { type: "array" });
  //   const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  //   const data = XLSX.utils.sheet_to_json(firstSheet);
  //   return data;
  // };

  static ExcelFormatDownload = ({
    header,
    sampleData,
    fileName,
  }: {
    header: string[];
    sampleData: object[];
    fileName: string;
  }) => {
    // Prepare the header row
    const headerRow = header;
  
    // Prepare the rows by extracting values based on header fields
    const rows = sampleData.map((row: any) =>
      headerRow.map((key) => row[key] || "")
    );
  
    // Combine header and rows
    const data = [headerRow, ...rows];
  
    // Create the worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);
  
    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
    // Write the Excel file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };
  

  // static ExcelBase64ToArray(base64String) {
  //   return new Promise((resolve, reject) => {
  //     // Decode base64 string
  //     const binaryString = window.atob(base64String);
  //     const binaryLen = binaryString.length;
  //     const bytes = new Uint8Array(binaryLen);

  //     // Convert binary string to Uint8Array
  //     for (let i = 0; i < binaryLen; i++) {
  //       bytes[i] = binaryString.charCodeAt(i);
  //     }

  //     try {
  //       // Read Excel data
  //       const workbook = XLSX.read(bytes, { type: "array" });

  //       const firstSheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[firstSheetName];

  //       const jsonData = XLSX.utils.sheet_to_json(worksheet, {
  //         blankRows: false,
  //         defval: "",
  //       });
  //       resolve(jsonData);
  //     } catch (error) {
  //       reject("Error parsing Excel file: " + error);
  //     }
  //   });
  // }

  static ArrayToExcel = (fileName, dataObject) => {
    var ws = XLSX.utils.json_to_sheet(dataObject);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
  };

  static FileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          // The base64 string is available in reader.result
          resolve(reader.result);
        };
      } else {
        reject("File Not Found");
      }
    });
  };

  static NumberToWords = (num) => {
    var a = [
      "",
      "one ",
      "two ",
      "three ",
      "four ",
      "five ",
      "six ",
      "seven ",
      "eight ",
      "nine ",
      "ten ",
      "eleven ",
      "twelve ",
      "thirteen ",
      "fourteen ",
      "fifteen ",
      "sixteen ",
      "seventeen ",
      "eighteen ",
      "nineteen ",
    ];
    var b = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    //////////console.log('num', num)

    if ((num = num?.toString()).length > 9) return "overflow";
    let n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return null;
    var str = "";
    str +=
      Number(n[1]) != 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
        : "";
    str +=
      Number(n[2]) != 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
        : "";
    str +=
      Number(n[3]) != 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
        : "";
    str +=
      Number(n[4]) != 0
        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
        : "";
    str +=
      Number(n[5]) != 0
        ? (str != "" ? "and " : "") +
          (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
          "only "
        : "";
    return str;
  };

  static ArrayToPDF = (data: any[]) => {
    try {
      const table = document.createElement("table");
      table.style.border = "1px solid black";
      const tableHeader = document.createElement("thead");
      const headerRow = tableHeader.insertRow(0);

      const headerKeys = Object.keys(data[0]);

      //////console.log(headerKeys);
      headerKeys.forEach((key) => {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
      });

      table.appendChild(tableHeader);

      const tableBody = document.createElement("tbody");
      data.forEach((item) => {
        const row = tableBody.insertRow();

        headerKeys.forEach((key) => {
          const cell = row.insertCell();
          cell.textContent = item[key];
        });
      });

      table.appendChild(tableBody);
      const numColumns = Object.keys(data[0]).length;
      const cellWidth = 80;
      const tableWidth = numColumns * cellWidth;

      const pdf = new jsPDF("landscape", "px", [tableWidth, 500]);

      autoTable(pdf, {
        html: table,
        theme: "grid",
        headStyles: { lineWidth: 1, lineColor: "black", fillColor: "#4a4947" },
        bodyStyles: { lineWidth: 1, lineColor: "black", textColor: "black" },
        margin: 15,
      });

      pdf.save(uuid() + ".pdf");
    } catch (error) {}
  };

  static MultipleArraysToExcel = (
    arrayObj: MultipleArraysToExcelType,
    filename: string = "data.xlsx"
  ) => {
    if (typeof window === "undefined") return; // Ensure window is defined in SSR scenarios
    // @ts-ignore: Accessing xlsx from the global window object
    const XLSX2 = window.XLSX;
    const wb = XLSX2.utils.book_new();

    for (const key in arrayObj) {
      const ws1 = XLSX2.utils.json_to_sheet(arrayObj[key]);
      XLSX2.utils.book_append_sheet(wb, ws1, key);
    }
    const wbout = XLSX2.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
}
