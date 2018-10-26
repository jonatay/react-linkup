/*
    Jono : 18 10 10
    PdfAttendLog : Stateless Functional Component
*/
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import _ from 'lodash';
const cssSet = {
  widthName: 80,
  widthLog: 40,
  fontSize: 7
};

const colChunkSize = 18;
const debug = 2;

// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16
  },
  container: {
    borderWidth: 1,
    borderColor: '#080c0b',
    borderStyle: 'solid'
  },
  headRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#030ac9',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    height: 20,
    fontSize: cssSet.fontSize,
    paddingTop: 4,
    paddingLeft: 8,
    paddingBottom: 0,
    margin: 0
  },
  empRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#a5f6e7',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    height: 16,
    fontSize: cssSet.fontSize,
    paddingTop: 4,
    paddingLeft: 8,
    margin: 0
  },
  headName: {
    width: cssSet.widthName
  },
  headLog: {
    width: cssSet.widthLog,
    textAlign: 'center',
    verticalAlign: 'center'
  },
  colName: {
    width: cssSet.widthName
  },
  colLog: {
    width: cssSet.widthLog,
    textAlign: 'center',
    verticalAlign: 'center',
    fontSize: cssSet.fontSize - 1,
    borderLeftWidth: 1,
    borderLeftColor: '#a5f6e7',
    borderLeftStyle: 'solid'
  }
});

const Header = ({ cols }) => (
  <View style={styles.headRow} fixed>
    <Text style={styles.headName}>Name</Text>
    {cols.map(col => (
      <Text key={col} style={styles.headLog}>
        {col.substr(2, 8)}
      </Text>
    ))}
  </View>
);

const EmpRow = ({ cols, row }) => (
  <View style={styles.empRow}>
    <Text debug={debug === 3} style={styles.colName}>
      {row.name}
    </Text>
    {cols.map(col => (
      <Text key={`${row.id}-${col}`} debug={debug === 3} style={styles.colLog}>
        {row[col][0] ? row[col][0].log_time.substr(11, 5) : 'no'}-{' '}
        {row[col][1]
          ? row[col][row[col].length - 1].log_time.substr(11, 5)
          : 'nc'}
      </Text>
    ))}
  </View>
);

const PdfAttendLog = ({ attendLogPeriods, attendLogTableData }) => {
  const aCols = _.chunk(attendLogPeriods.reverse(), colChunkSize);
  return (
    <Document>
      <Page
        debug={debug === 1}
        size="A4"
        orientation="landscape"
        style={styles.page}
        wrap
      >
        {aCols.map(cols => (
          <View key={cols[0]} style={styles.container}>
            <Header cols={cols} />
            <View>
              {attendLogTableData.map(row => (
                <EmpRow cols={cols} row={row} key={row.id} />
              ))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default PdfAttendLog;
