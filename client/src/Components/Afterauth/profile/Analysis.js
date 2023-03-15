import React, { useState } from "react";
import "./analysis.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Button,
  Font,
  Options,
  Themes,
  ChartColors,
} from "../../../styling/Styles";
import ReactSelect from "react-select";
import { ChevronDown, Plus, X } from "../../assets/Icons";
import Donut from "./Doughnut";
import { Images } from "../assets/Assets";
import { Popover } from "react-tiny-popover";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Analysis() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        // display: true,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          align: "center",
          text: "Date range",
          color: "#242424",
          font: {
            size: 14,
            weight: "500",
            family: "elza",
          },
          padding: {
            top: 10,
          },
        },
        ticks: {
          color: "#242424",
          font: {
            size: 12,
            weight: "400",
            family: "elza",
          },
        },
      },
      y: {
        grid: {
          tickColor: "#F5F5F5",
          tickLength: 24,
        },
        border: {
          display: false,
        },
        title: {
          display: true,
          align: "center",
          text: "Date range",
          color: "#242424",
          font: {
            size: 14,
            weight: "500",
            family: "elza",
          },
          padding: {
            bottom: 19,
          },
        },
        ticks: {
          color: "#242424",
          font: {
            size: 12,
            weight: "400",
            family: "elza",
          },
        },
      },
    },
    elements: {
      point: {
        radius: 5.5,
        hoverRadius: 5.5,
      },
    },
  };

  const a = [10, 20, 23, 24, 14, 32];
  const b = [16, 23, 28, 44, 34, 47];
  const c = [2, 13, 30, 34, 12, 52];
  const d = [34, 45, 33, 48, 50, 13];

  const mydata = [12, 15, 25, 23, 28, 31, 37];

  const [competitor, setCompetitors] = useState([
    "Amazon",
    "Flipkart",
    "Myntra",
    "Snapdeal",
    "fifth",
    "sixth",
  ]);
  const duration = [
    "1 month",
    "2 months",
    "3 months",
    "4 months",
    "5 months",
    "6 months",
    "8 months",
    "1 year",
  ];

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const datasetcom = [
    {
      label: competitor[0],
      data: a,
      borderWidth: 1.5,
      hoverBorderWidth: 1.5,
      borderColor: ChartColors[0],
      backgroundColor: ChartColors[0],
    },
    {
      label: competitor[1],
      data: b,
      borderWidth: 1.5,
      hoverBorderWidth: 1.5,
      borderColor: ChartColors[1],
      backgroundColor: ChartColors[1],
    },
    {
      label: competitor[2],
      data: c,
      borderWidth: 1.5,
      hoverBorderWidth: 1.5,
      borderColor: ChartColors[2],
      backgroundColor: ChartColors[2],
    },
    {
      label: competitor[3],
      data: d,
      borderWidth: 1.5,
      hoverBorderWidth: 1.5,
      borderColor: ChartColors[3],
      backgroundColor: ChartColors[3],
    },
  ];

  const datasetself = [
    {
      label: "Amazone",
      data: mydata,
      borderWidth: 1.5,
      hoverBorderWidth: 1.5,
      borderColor: ChartColors[0],
      backgroundColor: ChartColors[0],
    },
  ];

  const [dataset, setDataset] = useState([...datasetcom]);

  let memberData = [];
  for (let i = 0; i < members.length; i++) {
    let membe = [];
    for (let j = 0; j < members[i]["member"].length; j++) {
      let mem = members[i]["member"][j];
      let b = {
        name: mem.name,
        imglink: mem.imglink,
        checked: false,
      };
      membe.push(b);
    }
    let type = {
      type: members[i].type,
      member: [],
    };
    type = {
      ...type,
      member: [...membe],
    };
    memberData.push(type);
    // console.log(membe);
  }

  const dataline = {
    labels,
    datasets: dataset,
  };

  const [currcomp, setCurrcopm] = useState([...competitor]);

  const handleChangesideCheckbox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCurrcopm([...currcomp, value]);
    } else {
      let arr = [];
      arr = [...currcomp];
      arr.filter((e) => e !== value);
      setCurrcopm([...arr]);
    }
  };

  const handleSideCheckbox = () => {
    setCompetitors([...currcomp]);
    setShowComp(!showComp);
  };

  const [ana, setAna] = useState(true);
  const changeHandler = (bool) => {
    setAna(bool);
    setDataset(!ana ? [...datasetcom] : [...datasetself]);
  };

  const [showComp, setShowComp] = useState(false);

  const Dropdown = (props) => {
    const [val, setVal] = useState();

    const option = props.data.map((item, i) => {
      return {
        label: item,
        value: i,
        ...item,
      };
    });

    return (
      <ReactSelect
        options={option}
        value={val}
        className="w-full"
        classNamePrefix="mySelect"
        theme={(theme) => Themes(theme)}
        styles={Options}
        placeholder={props.placeholder}
        onChange={(value) => setVal(value)}
      />
    );
  };

  const ComPopover = () => {
    const [showfirst, setShowfirst] = useState(false);

    const Myfunc = () => {
      const handleRemoveCom = (value) => {
        let arr = [];
        arr = [...competitor];
        console.log(arr);
        // arr = arr.filter(function(item) {
        //   return item !== value
        // })
        arr = arr.filter((e) => e !== value);
        setCompetitors([...arr]);
        console.log(arr);
      };

      return (
        <>
          <div className="com-checkbox">
            <div className={`flex flex-col items-start py-3 px-6`}>
              <p
                className={`${Font.font} ${Font.label} ${Font.medium}`}
                style={{ color: "#424242" }}
              >
                {competitor.length} competitors
              </p>
              {competitor.length > 4 && (
                <p
                  className={`${Font.label} ${Font.font} ${Font.regular}`}
                  style={{ color: "#616161" }}
                >
                  You can choose max. of 4 competitors at once
                </p>
              )}
            </div>
            {competitor.map((item, i) => (
              <div key={i} className="checkbox-competitors">
                <div className="flex w-full justify-between items-center">
                  <div className="flex flex-row gap-3 items-center">
                    <input
                      type="checkbox"
                      name=""
                      id="addcomp"
                      className="checkbo"
                    />
                    <p
                      className={`${Font.medium} ${Font.body2} ${Font.font}`}
                      style={{ marginTop: 5 }}
                    >
                      {item}
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      handleRemoveCom(item);
                      setShowfirst(true);
                    }}
                  >
                    <X color="#424242" height="16px" width="16px" />{" "}
                  </div>
                </div>
              </div>
            ))}
            <div className="comp-buttom-container">
              <button
                disabled={competitor.length === 0}
                className={`${Button.button} ${Button.tertiary} ${
                  Button.large
                } ${Button.disable && competitor.length === 0}`}
                onClick={() => setShowfirst(false)}
              >
                <Plus color="#242424" />
                <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                  Add New
                </p>
              </button>
              <button
                disabled={competitor.length === 0}
                className={`${Button.button} ${Button.primary} ${
                  Button.large
                } ${Button.disable && competitor.length === 0}`}
                onClick={() => setShowfirst(false)}
              >
                <p className={`${Font.font} ${Font.body1} ${Font.medium} `}>
                  See Analysis
                </p>
              </button>
            </div>
          </div>
        </>
      );
    };

    return (
      <Popover
        isOpen={showfirst}
        positions={["bottom", "right"]}
        content={<Myfunc />}
      >
        <div onClick={() => setShowfirst(!showfirst)}>
          <label
            htmlFor="editSocial"
            className={`input ${false && "error"} ${
              false && "disable"
            } flex justify-between`}
            // onClick={()=>setShowPopInput(!showPopInput)}
          >
            <p
              className={`${Font.font} ${Font.body1} ${Font.regular}`}
              style={{ color: "#969393" }}
            >
              Select Competitors
            </p>
            <ChevronDown color="#C7C7C7" />
          </label>
        </div>
      </Popover>
    );
  };

  return (
    <div className="analysis">
      {showComp && (
        <div className="group-competitors">
          <div className="g-c-heading">
            <p className={`${Font.font} ${Font.heading1} ${Font.medium}`}>
              Add Competitors
            </p>
            <div onClick={() => setShowComp(!showComp)}>
              <X color="#101828" height="24px" width="24px" />
            </div>
          </div>
          {memberData.map((input, i) => (
            <div key={i} className="flex flex-col gap-2 w-full">
              <h3
                className={`${Font.font} ${Font.subheadline} ${Font.medium} px-4 py-1`}
                style={{ color: "#616161" }}
              >
                {input.type}
              </h3>
              {input["member"].map((member, i) => (
                <div
                  key={i}
                  className="flex flex-row justify-between items-start py-3 px-4 w-full"
                >
                  <div className="flex flex-row items-end gap-3">
                    <img
                      src={Images.profileImage}
                      style={{ width: 24, height: 24 }}
                      alt=""
                    />
                    <p
                      className={`${Font.font} ${Font.body2} ${Font.medium}`}
                      style={{ color: "#242424" }}
                    >
                      {member.name}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name=""
                    disabled={member["checked"]}
                    id="addcompany"
                    onChange={handleChangesideCheckbox}
                    value={member.name}
                    className="checkbo"
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="flex flex-row items-center pt-3 w-full">
            <div className="flex flex-row gap-4">
              <div
                className={`${Button.button} ${Button.primary} ${Button.large}`}
                onClick={handleSideCheckbox}
              >
                <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                  Add
                </p>
              </div>
              <div
                className={`${Button.button} ${Button.secondary} ${Button.large}`}
                onClick={() => setShowComp(!showComp)}
              >
                <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                  Cancel
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-8 pb-14">
        <p className={`${Font.font} ${Font.heading3} ${Font.bold}`}>Analysis</p>
        <div className="analysis-nav">
          <p
            onClick={() => changeHandler(false)}
            className={`${Font.font} ${Font.body1} ${Font.medium} ${
              !ana && "myactive"
            }`}
          >
            My Coverage
          </p>
          <p
            onClick={() => changeHandler(true)}
            className={`${Font.font} ${Font.body1} ${Font.medium} ${
              ana && "myactive"
            }`}
          >
            Competitor Analysis
          </p>
        </div>
        {ana && (
          <div className="flex flex-row w-full justify-between">
            <div className="drop-add inputborder">
              <div className="duration">
                <Dropdown placeholder="Select Duration" data={duration} />
              </div>
              <div className="competitor">
                {/* <Dropdown placeholder='Select Competitors' data={competitor} /> */}
                <ComPopover />
              </div>
            </div>
            <div
              className={`${Button.button} ${Button.secondary} ${Button.large}`}
              onClick={() => setShowComp(!showComp)}
            >
              <Plus color="#242424" />
              <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                Add Competitors
              </p>
            </div>
          </div>
        )}
        <div className="chart-box">
          <div className="flex flex-row justify-between mb-14 items-center">
            <p className={`${Font.font} ${Font.subheadline} ${Font.medium}`}>
              30 Days Timeline
            </p>
            {!ana && (
              <div className="duration inputborder">
                <Dropdown placeholder="Select Duration" data={duration} />
              </div>
            )}
          </div>
          <Line options={options} data={dataline} />
          <div className="flex flex-row py-2 gap-6 w-full justify-center items-center mt-6">
            {dataset.map((item, i) => (
              <div
                key={i}
                className="flex flex-row gap-1 items-center justify-between"
              >
                <p
                  className="comp-mark"
                  style={{ backgroundColor: item.backgroundColor }}
                ></p>
                <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        {ana && <Donut />}
        {!ana && (
          <>
            <div className="flex flex-row justify-between gap-4 w-full items-center">
              <div className="flex-1 mycoverage">
                <p className={`${Font.label} ${Font.medium} ${Font.font}`}>
                  No. of coverages (Monthly)
                </p>
                <p className={`${Font.font} ${Font.display} ${Font.medium}`}>
                  2,287
                </p>
              </div>
              <div className="flex-1 mycoverage">
                <p className={`${Font.label} ${Font.medium} ${Font.font}`}>
                  Ad Rate Value
                </p>
                <p className={`${Font.font} ${Font.display} ${Font.medium}`}>
                  20 lacs
                </p>
              </div>
              <div className="flex-1 mycoverage">
                <p className={`${Font.label} ${Font.medium} ${Font.font}`}>
                  Total Share
                </p>
                <p className={`${Font.font} ${Font.display} ${Font.medium}`}>
                  39,920
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const members = [
  {
    type: "Bussinesses",
    member: [
      { imglink: "", name: "Kathryn Murphy" },
      { imglink: "", name: "Darrell Steward" },
      { imglink: "", name: "Theresa Webb" },
      { imglink: "", name: "Cameron Williamson" },
    ],
  },
  {
    type: "Entrepreneurs",
    member: [
      { imglink: "", name: "Arlene McCoy" },
      { imglink: "", name: "Marvin McKinney" },
      { imglink: "", name: "Jacob Jones" },
      { imglink: "", name: "Cameron Williamson" },
    ],
  },
  {
    type: "ContentCreators",
    member: [
      { imglink: "", name: "Arlene McCoy" },
      { imglink: "", name: "Marvin McKinney" },
      { imglink: "", name: "Jacob Jones" },
      { imglink: "", name: "Cameron Williamson" },
    ],
  },
];

export default Analysis;
