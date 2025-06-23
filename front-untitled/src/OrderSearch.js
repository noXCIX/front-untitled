import React, {useEffect, useRef, useState} from 'react';
import DataTable from 'react-data-table-component';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faUpRightFromSquare,
  faEllipsis,
  faHourglassStart,
  faAngleDown,
  faCalendarDays
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderSearch.css';
import { format, startOfMonth, endOfMonth } from 'date-fns';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

function formatDecimal(value, min = 2, max = 2) {
  const num = Number(value);
  if (isNaN(num)) return '-';
  return num.toLocaleString(undefined, {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });
}

export default function OrderSearchPage() {
  const bindField = (field) => ({
    value: form[field],
    onChange: (e) => setForm({ ...form, [field]: e.target.value }),
  });

  const customStyles = {
    headCells: {
      style: {
        color: '#326c90',
        fontWeight: 'bold',
        fontSize: '14px',
        justifyContent: 'center',
      },
    },
  };

  const width = useWindowWidth();

  const columns = [
    {name: 'Account', selector: row => row.accountNo, sortable: true, cell: row => (<div className="text-primary fw-bold">{row.accountNo}</div>), center: true, minWidth: '80px',},
    {name: 'Operation', selector: row => row.operation, sortable: true, cell: row => (<div className="">{row.operation}</div>), center: true, minWidth: '100px',},
    {name: 'Symbol', selector: row => row.symbol, sortable: true, cell: row => (<div className="fw-bold">{row.symbol}</div>), center: true, minWidth: '80px',},
    {name: 'Description', selector: row => row.description, sortable: true, omit: width < 768, cell: row => (<div className="">{row.description}</div>), minWidth: '200px',},
    {name: 'Qty.', selector: row => row.qty, sortable: true, omit: width < 768, cell: row => (<div className="">{row.qty}</div>), center: true, minWidth: '60px',},
    {name: 'Filled Qty', selector: row => row.filledQty, sortable: true, omit: width < 768, cell: row => (<div className="">{row.filledQty}</div>), center: true, minWidth: '100px',},
    {name: 'Price', selector: row => row.price, sortable: true, omit: width < 768, cell: row => (<div className="">{formatDecimal(row.price)}</div>), center: true, minWidth: '100px',},
    {name: 'Status', selector: row => row.status, sortable: true, cell: row => (<div className=""><FontAwesomeIcon className="me-2 common-label" icon={faHourglassStart}/>{row.status}</div>), center: true, minWidth: '80px',},
    {name: 'Date', selector: row => row.date, sortable: true, omit: width < 768, cell: row => (<div className="text-secondary">{row.date}</div>), center: true, minWidth: '130px',},
    {name: 'Expiration', selector: row => row.expiration, sortable: true, omit: width < 768, cell: row => (<div className="text-secondary">{row.expiration}</div>), center: true, minWidth: '140px',},
    {name: 'No. Ref.', selector: row => row.noRef, sortable: true, omit: width < 768, cell: row => (<div className="">{row.noRef}</div>), center: true, minWidth: '100px',},
    {name: 'Ext. Ref.', selector: row => row.extRef, sortable: true, omit: width < 768, cell: row => (<div className="text-secondary d-flex align-items-center">{row.extRef}<FontAwesomeIcon className="ms-2 common-label p-1 rounded-circle" style={{ backgroundColor: '#eff5fb' }} icon={faEllipsis}/></div>), center: true, minWidth: '140px',},
  ];

  const today = new Date();
  const firstDayOfMonth = format(startOfMonth(today), 'yyyy-MM-dd');
  const lastDayOfMonth = format(endOfMonth(today), 'yyyy-MM-dd');

  let [form, setForm] = useState({
    period: 'transmission',
    status: 'waiting',
    from: firstDayOfMonth,
    to: lastDayOfMonth,
  });

  let [data, setData] = useState([]);
  let [initTable, setInitTable] = useState(false);
  let [periodDropdown, setPeriodDropdown] = useState([]);
  let [statusDropdown, setStatusDropdown] = useState([]);

  let search = () => {
    setInitTable(false);
    setData([
      {
        accountNo: '10000000',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 11,
        filledQty: 1,
        price: 135.00,
        status: 'Waiting',
        date: '2022/12/22 03:02:14',
        expiration: '2022/12/22 03:02:14',
        noRef: '95749207',
        extRef: '2-XXXXXXX1-0',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000001',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 5,
        filledQty: 0,
        price: 526.00,
        status: 'Waiting',
        date: '2022/12/08 05:12:36',
        expiration: '2022/12/08 05:12:36',
        noRef: '13830581',
        extRef: '2-XXXXXXX1-1',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000002',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 90,
        filledQty: 0,
        price: 744.00,
        status: 'Waiting',
        date: '2022/12/15 23:30:32',
        expiration: '2022/12/15 23:30:32',
        noRef: '13830581',
        extRef: '2-XXXXXXX1-2',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000003',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 15,
        filledQty: 0,
        price: 612.00,
        status: 'Waiting',
        date: '2022/12/16 10:20:00',
        expiration: '2022/12/16 10:20:00',
        noRef: '13830583',
        extRef: '2-XXXXXXX1-3',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000004',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 20,
        filledQty: 0,
        price: 500.00,
        status: 'Waiting',
        date: '2022/12/17 08:15:22',
        expiration: '2022/12/17 08:15:22',
        noRef: '13830584',
        extRef: '2-XXXXXXX1-4',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000005',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 40,
        filledQty: 0,
        price: 680.00,
        status: 'Waiting',
        date: '2022/12/18 14:50:11',
        expiration: '2022/12/18 14:50:11',
        noRef: '13830585',
        extRef: '2-XXXXXXX1-5',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000006',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 10,
        filledQty: 0,
        price: 720.00,
        status: 'Waiting',
        date: '2022/12/19 09:40:59',
        expiration: '2022/12/19 09:40:59',
        noRef: '13830586',
        extRef: '2-XXXXXXX1-6',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000007',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 7,
        filledQty: 0,
        price: 560.00,
        status: 'Waiting',
        date: '2022/12/20 11:22:44',
        expiration: '2022/12/20 11:22:44',
        noRef: '13830587',
        extRef: '2-XXXXXXX1-7',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000008',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 12,
        filledQty: 0,
        price: 590.00,
        status: 'Waiting',
        date: '2022/12/21 15:35:19',
        expiration: '2022/12/21 15:35:19',
        noRef: '13830588',
        extRef: '2-XXXXXXX1-8',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000009',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 35,
        filledQty: 0,
        price: 725.00,
        status: 'Waiting',
        date: '2022/12/22 17:05:10',
        expiration: '2022/12/22 17:05:10',
        noRef: '13830589',
        extRef: '2-XXXXXXX1-9',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000010',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 50,
        filledQty: 0,
        price: 710.00,
        status: 'Waiting',
        date: '2022/12/23 19:45:00',
        expiration: '2022/12/23 19:45:00',
        noRef: '13830590',
        extRef: '2-XXXXXXX1-10',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000011',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 30,
        filledQty: 0,
        price: 675.00,
        status: 'Waiting',
        date: '2022/12/24 13:30:44',
        expiration: '2022/12/24 13:30:44',
        noRef: '13830591',
        extRef: '2-XXXXXXX1-11',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000012',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 60,
        filledQty: 0,
        price: 730.00,
        status: 'Waiting',
        date: '2022/12/25 21:10:15',
        expiration: '2022/12/25 21:10:15',
        noRef: '13830592',
        extRef: '2-XXXXXXX1-12',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000013',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 8,
        filledQty: 0,
        price: 495.00,
        status: 'Waiting',
        date: '2022/12/26 12:45:33',
        expiration: '2022/12/26 12:45:33',
        noRef: '13830593',
        extRef: '2-XXXXXXX1-13',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000014',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 22,
        filledQty: 0,
        price: 565.00,
        status: 'Waiting',
        date: '2022/12/27 16:30:21',
        expiration: '2022/12/27 16:30:21',
        noRef: '13830594',
        extRef: '2-XXXXXXX1-14',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },
      {
        accountNo: '00000015',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 45,
        filledQty: 0,
        price: 700.00,
        status: 'Waiting',
        date: '2022/12/28 20:15:00',
        expiration: '2022/12/28 20:15:00',
        noRef: '13830595',
        extRef: '2-XXXXXXX1-15',
        detail: {
          firstName: 'FIRST-NAME',
          lastName: 'LAST-NAME',
          accountNo: '10103ZA',
          margin: 'US Margin',
          netAmount: '1,152.95 USD',
          price: 135.00,
          exchangeRate: 1.3357,
          osLimit: 140.0,
          referenceNo: '1234567890',
          dateTime: '2023/01/04 03:05:43',
          telephone: '000-000-0000',
          userId: '12344321',
        }
      },

    ]);
    console.log(form)
    setInitTable(true);
  };

  useEffect(() => {
    getDropdown();
    search();
  }, []);

  let getDropdown = () => {
    let periodDropdownItem = [{value: 'transmission', label: 'Transmission',},{value: 'start', label: 'Start',}]
    setPeriodDropdown(periodDropdownItem);
    let statusDropdownItem = [{value: 'waiting', label: 'Waiting',},{value: 'completed', label: 'Completed',}]
    setStatusDropdown(statusDropdownItem);
  };

  const expandableComponent = ({data}) => (
    <div className="label-2 bg-light">
      <div className="col-12 p-2">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 d-flex gap-2">
            <label className="text-primary fw-bold my-auto" style={{ fontSize: '16px' }}>
              {data.detail.firstName} {data.detail.lastName} ({data.detail.accountNo} - {data.detail.margin})
            </label>
            <button className="btn btn-sm btn-outline-secondary rounded-5">
              <label className="common-label text-nowrap ms-2">Full review details<FontAwesomeIcon className="ms-2 me-2" icon={faUpRightFromSquare}/></label>
            </button>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 d-flex gap-2" style={{ justifyContent: width < 768 ? 'start' : 'end' }}>
            <button className="btn btn-sm btn-primary button-width rounded-5">ACCEPT</button>
            <button className="btn btn-sm btn-outline-danger button-width rounded-5">Reject<FontAwesomeIcon className="ms-2" icon={faAngleDown}/></button>
          </div>
        </div>
        <hr className="mt-2"/>
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
            <label>Net Amount: <b>{data.detail.netAmount}</b></label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
            <label>Price: <b>{data.detail.price}</b></label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
            <label>Exchange Rate: <b>{data.detail.exchangeRate}</b></label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
            <label>O/S Limit: <b>{data.detail.osLimit}</b></label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
            <label>Reference Number: <b>{data.detail.referenceNo}</b></label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
            <label>Date / Time: <b>{data.detail.dateTime}</b></label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
            <label>Telephone: <b>{data.detail.telephone}</b></label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
            <label>User ID: <b>{data.detail.userId}</b></label>
          </div>
        </div>
        <div className="row p-2">
          <div className="rounded-1" style={{ background: '#f0f0f0' }}>
            <label className="common-label mt-2">Warning(s)</label>
            <ul style={{ fontSize: '14px' }}>
              <li>To trade this security in this account, a currency conversion will be made at the current rate.</li>
              <li>A similar order has already been submitted.</li>
              <li>Your transaction will be processed the following business day.</li>
              <li>It is not possible to calculate the buying power of this order.</li>
              <li>A cancellation will not be possible during business hours on market orders.</li>
              <li>For the above-mentioned reason(s), your order will be processed by one of our representatives</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );


  const dateTo = useRef();
  const dateFrom = useRef();

  return (
    <div className="container-fluid p-4">
      <div className="col-12">
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12">
            <h5 className="fw-bold mb-0">Search</h5>
            <label style={{ fontSize: '12px' }}>Search results: {data.length}</label>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex gap-2 mb-2">
                <label className="common-label my-auto label-width">Period</label>
                <select className="form-select common-font-size" value={form.period} {...bindField('period')}>
                  <option value="">Select All</option>
                  {periodDropdown.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex gap-2 mb-2">
                <label className="common-label my-auto label-width">Status</label>
                <select className="form-select common-font-size" value={form.status} {...bindField('status')}>
                  <option value="">Select All</option>
                  {statusDropdown.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex gap-2 mb-2">
                <label className="common-label my-auto label-width">From</label>
                <div className="d-flex flex-column flex-grow-1">
                  <div className="d-flex position-relative flex-grow-1">
                    <input className="form-control common-font-size custom-padding" value={form.from} {...bindField('from')}/>
                    <input type="date" className="form-control common-font-size visually-hidden" value={form.from} {...bindField('from')} ref={dateFrom}/>
                    <div className="input-suffix text-nowrap">
                      <FontAwesomeIcon icon={faCalendarDays} style={{color: '#326c90', cursor: 'pointer'}}
                                       onClick={() => dateFrom.current?.showPicker?.()}></FontAwesomeIcon>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex gap-2 mb-2">
                <label className="common-label my-auto label-width">To</label>
                <div className="d-flex flex-column flex-grow-1">
                  <div className="d-flex position-relative flex-grow-1">
                    <input className="form-control common-font-size custom-padding" value={form.to} {...bindField('to')}/>
                    <input type="date" className="form-control common-font-size visually-hidden" value={form.to} {...bindField('to')} ref={dateTo}/>
                    <div className="input-suffix text-nowrap">
                      <FontAwesomeIcon icon={faCalendarDays} style={{color: '#326c90', cursor: 'pointer'}}
                                       onClick={() => dateTo.current?.showPicker?.()}></FontAwesomeIcon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              </div>
              <div className="col-lg-1 col-md-12 col-sm-12">
            <div className="row">
              <div className="col-lg-12">
                <button className="btn btn-primary form-control rounded-5" onClick={() => {search()}}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="row">
          {initTable &&
            <DataTable
              columns={columns}
              data={data}
              customStyles={customStyles}
              responsive
              highlightOnHover
              expandableRows
              expandableRowsComponent={expandableComponent}>
            </DataTable>
          }
        </div>
      </div>
    </div>
  );
}
