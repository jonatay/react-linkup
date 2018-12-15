const PDFDocument = require('pdfkit');
const faker = require('faker');

const _ = require('lodash');

const blockToTextDiv = 5.2;

const getTruncatedText = (text, blockSize) =>
  text.length <= blockSize / blockToTextDiv
    ? text
    : text.slice(0, blockSize / blockToTextDiv);

const doHeader = (doc, headers, x, y, options) => {
  let currentX = x;
  const startY = y;
  //console.log(headers);
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
    if (text.length <= blockSize / blockToTextDiv) {
      doc
        .fillColor('black')
        .fillOpacity(1)
        .text(text, currentX + options.xIndent, startY);
    } else {
      doc
        .fillColor('black')
        .fillOpacity(1)
        .text(
          text.slice(0, blockSize / blockToTextDiv),
          currentX + options.xIndent,
          startY
        )
        .fontSize(3)
        .text('...', currentX + blockSize - 5, startY + 7)
        .fontSize(options.fontSize);
    }

    doc
      .lineJoin('miter')
      .rect(currentX, startY - 2, blockSize, options.rowHeight)
      .lineWidth(0.25)
      .strokeOpacity(0.5)
      .stroke('#7e96f4');
    currentX += blockSize;
  });
};

const createTable = (doc, tableData, options = {}) => {
  // set some default options
  options = {
    fontSize: 9,
    width: 550,
    pageHeight: 585,
    rowHeight: 12,
    xIndent: 4,
    columnWidths: [],
    ...options
  };

  // init starts & doc
  const startY = doc.y,
    startX = doc.x;
  let currentY = startY;
  doc.fontSize(options.fontSize);

  // init Header
  const fixHead = options.headers.slice(0, options.chunkColumns.from);
  const chunkHead =
    options.chunkColumns && options.chunkColumns.count > 0
      ? _.chunk(
          options.headers.slice(options.chunkColumns.from),
          options.chunkColumns.count
        ).map((chunk, chunkIdx) => [...fixHead, ...chunk])
      : [tableData];

  // chunk Table
  const chunkData =
    options.chunkColumns && options.chunkColumns.count > 0
      ? tableData.reduce((acc, row) => {
          const fixCol = row.slice(0, options.chunkColumns.from);
          return _.chunk(
            row.slice(options.chunkColumns.from),
            options.chunkColumns.count
          ).map((chunk, chunkIdx) => {
            return acc.length === 0
              ? [[...fixCol, ...chunk]]
              : [...acc[chunkIdx], [...fixCol, ...chunk]];
          });
        }, [])
      : tableData;
  //draw table
  chunkData.forEach((chunk, chunkIdx) => {
    chunk.forEach((chunkRow, rowIdx) => {
      let currentX = startX,
        size = chunkRow.length;
      if (
        (rowIdx === 0 || currentY === startY) &&
        (chunkHead && chunkHead[chunkIdx])
      ) {
        currentY += options.rowHeight;
        doHeader(doc, chunkHead[chunkIdx], startX, currentY, options);
        currentY += options.rowHeight;
      }
      doRow(doc, chunkRow, currentX, currentY, options);

      currentY += options.rowHeight;
      if (currentY > options.pageHeight) {
        doc.addPage({ layout: 'landscape', margin: 20 });
        currentY = startY;
      }
    });
  });
};

const testTableArray = (height, width) => {
  const res = [];
  let line = [];
  for (let y = 0; y < height; y++) {
    line = [];
    for (let x = 0; x < width; x++) {
      line.push(`${x} ${y} ${faker.lorem.word()}`);
    }
    res.push(line);
  }
  return res;
};

const buildAttendLogTable = ({
  listParams: { depts, dateRange, excludeWeekends }
}) => new Promise((resolve, reject) => {});

exports.report = (req, res) => {
  // const params = JSON.parse(req.params.params);
  // console.log(depts, dateRange, excludeWeekends);

  const testArr = testTableArray(100, 30);
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
    pageHeight: 570,
    columnWidths: [140, 70],
    headers: testArr[0],
    chunkColumns: { from: 2, count: 7 }
  });
  doc.end();
};

/* The basic principal per console
[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]].reduce(
  (acc, curr) =>
    _.chunk(curr, 2).map(
      (c, i) => (acc.length === 0 ? [c] : [...acc[i], [...c]])
    ),
  []
);
*/
