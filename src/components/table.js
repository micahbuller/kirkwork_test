import React from "react";
import { forwardRef } from 'react';
import "../index.css";
import MaterialTable from "material-table";
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import moment from 'moment'

const tableIcons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
};

export default function tableView() {
  const columns = [
    { title: "Alarm #", field: "alarmNum" },
    { title: "Event Code", field: "eventCodeDesc" },
    { title: "Description", field: "pointDesc" },
    { title: "Signal Code", field: "signalCode" },
    { title: "X-Mit", field: "xmit" },
    { title: "Site Date", field: "siteDate", render: rowData => moment(rowData.validated_at).format('DD/MM/YYYY HH:MM:SS')},
  ];

  return (
    <MaterialTable
      title="Signals"
      columns={columns}
      icons={tableIcons}
      options={{ debounceInterval: 700, padding: "dense", search: false}}
      data={(query) =>
        new Promise((resolve, reject) => {
          let url = "https://grasperapi.azurewebsites.net/api/v1/Signals?";
          if (query.search) {
            url += `q=${query.search}&`;
          }
          url += `Page=${query.page + 1}`;
          url += `&Limit=${query.pageSize}`;
          var userInfo = localStorage.getItem("user-info");
          const initialValue = JSON.parse(userInfo);
          var token = initialValue.token;

          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then((resp) => resp.json())
            .then((resp) => {
              resolve({
                data: resp.items,
                page: query.page,
                totalCount: resp.numPages,
              });
            });
        })
      }
    />
  );
}
