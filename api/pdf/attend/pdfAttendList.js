const PDFDocument = require('pdfkit');
const faker = require('faker');

const _ = require('lodash');

const doHeader = (doc, headers, x, y, options) => {
  let currentX = x;
  const startY = y;
  console.log(headers);
  headers.forEach((head, idx) => {
    doc
      .fillColor('black')
      .fillOpacity(1)
      .text(head, currentX + options.xIndent, startY);

    //Create rectangles
    let blockSize =
      options.columnWidths.length > idx
        ? options.columnWidths[idx]
        : options.columnWidths.length > 0
          ? options.columnWidths[options.columnWidths.length - 1]
          : options.width / size;
    doc
      .lineJoin('miter')
      .rect(currentX, startY - 2, blockSize, options.rowHeight)
      .lineWidth(1)
      .fillOpacity(0.3)
      .fillAndStroke('#a7cbf4', '#7e96f4');
    currentX += blockSize;
  });
};

const doRow = (doc, row, x, y, options) => {
  let currentX = x;
  const startY = y;
  //console.log(row);
  row.forEach((text, idx) => {
    //Create rectangles
    let blockSize =
      options.columnWidths.length > idx
        ? options.columnWidths[idx]
        : options.columnWidths.length > 0
          ? options.columnWidths[options.columnWidths.length - 1]
          : options.width / size;
    if (currentX + blockSize > options.width) {
      return idx;
    }
    doc
      .fillColor('black')
      .fillOpacity(1)
      .text(text, currentX + options.xIndent, startY);
    doc
      .lineJoin('miter')
      .rect(currentX, startY - 2, blockSize, options.rowHeight)
      .lineWidth(0.25)
      .strokeOpacity(0.5)
      .stroke('#7e96f4');
    currentX += blockSize;
  });
};

const createTable = (doc, data, options = {}) => {
  // set some default options
  options = {
    fontSize: 9,
    width: 550,
    pageHeight: 585,
    rowHeight: 12,
    xIndent: 4,
    columnWidths: [],
    fixedColumns: [],
    ...options
  };

  // init starts & doc
  const startY = doc.y,
    startX = doc.x;
  let currentY = startY;
  doc.fontSize(options.fontSize);

  let aRows = options.chunkColomns
    ? _.chunk(data.slice(options.chunkColomns.from), options.chunkColomns.count).map()
    : [data];
  // do header if req
  aRows.forEach();
  if (options.headers && options.headers.length > 0) {
    doHeader(doc, options.headers, startX, startY, options);
    currentY += options.rowHeight;
  }

  data.forEach(value => {
    let currentX = startX,
      size = value.length;
    doRow(doc, value, currentX, currentY, options);

    currentY += options.rowHeight;
    if (currentY > options.pageHeight) {
      doc.addPage({ layout: 'landscape', margin: 20 });
      currentY = startY;
      if (options.headers && options.headers.length > 0) {
        doHeader(doc, options.headers, startX, startY, options);
        currentY += options.rowHeight;
      }
    }
  });
};

const testTableArray = (height, width) => {
  const res = [];
  let line = [];
  for (let y = 0; y < height; y++) {
    line = [];
    for (let x = 0; x < width; x++) {
      line.push(faker.lorem.word());
    }
    res.push(line);
  }
  return res;
};

exports.report = (req, res) => {
  const testArr = testTableArray(12, 9);
  // console.log(testArr);
  const doc = new PDFDocument({
    bufferPages: true,
    autoFirstPage: false,
    layout: 'landscape',
    margin: 20
  });
  doc.addPage({ layout: 'landscape', margin: 20 });
  doc.pipe(res);
  doc.font('fonts/consola.ttf').fontSize(4);
  createTable(doc, testArr.slice(1), {
    width: 760,
    columnWidths: [140, 90, 85],
    headers: testArr.slice(0, 1)[0],
    fixedColumns: [0],
    chunkColumns: { from: 1, count: 7 }
  });
  doc.end();
};
