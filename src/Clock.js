//https://www.reddit.com/r/OddSatisfying/comments/swygni/clock_hitting_midnight/
import { useState, useEffect } from "react";
import "./Clock.css";

function Clock() {
  useEffect(() => {
    addNum();
    setInterval(Move, 1000);
  }, []);

  const [showColon, setShowColon] = useState(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowColon((prevShowColon) => !prevShowColon);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const colonStyle = {
    color: "#0d9f00",
    fontSize: "30px",
    position: "relative",
    top: "12px",
    textShadow: "-2px 1px 3px #0d9f00",
    visibility: showColon ? "visible" : "hidden",
  };

  function addNum() {
    const six_bars = [
      {
        total_nums: 10,
        item: document.getElementById("hours-units"),
      },
      {
        total_nums: 3,
        item: document.getElementById("hours-tens"),
      },
      {
        total_nums: 10,
        item: document.getElementById("mins-units"),
      },
      {
        total_nums: 6,
        item: document.getElementById("mins-tens"),
      },
      {
        total_nums: 10,
        item: document.getElementById("secs-units"),
      },
      {
        total_nums: 6,
        item: document.getElementById("secs-tens"),
      },
    ];

    six_bars.forEach(({ item, total_nums }) => {
      const existingNums = item.querySelectorAll(".num");
      if (existingNums.length < total_nums) {
        const numToAdd = total_nums - existingNums.length;
        [...Array(numToAdd).keys()].forEach((num) => {
          const div = document.createElement("div");
          div.classList.add("num");
          item.appendChild(div);
          div.textContent = num;
        });
      }
    });
  }

  const numHeight = 60;

  function Move() {
    const now = new Date();

    const current_hours = now.getHours().toString().padStart(2, "0");
    const current_mins = now.getMinutes().toString().padStart(2, "0");
    const current_secs = now.getSeconds().toString().padStart(2, "0");

    const itemsToMove = [
      {
        time: current_hours,
        sections: [
          document.getElementById("hours-units"),
          document.getElementById("hours-tens"),
        ],
      },
      {
        time: current_mins,
        sections: [
          document.getElementById("mins-units"),
          document.getElementById("mins-tens"),
        ],
      },
      {
        time: current_secs,
        sections: [
          document.getElementById("secs-units"),
          document.getElementById("secs-tens"),
        ],
      },
    ];

    itemsToMove.forEach((item) => {
      const time = item.time;
      const [units, tens] = item.sections;

      const tensNum = parseInt(time.charAt(0));
      const unitsNum = parseInt(time.charAt(1));

      //https://codepen.io/bchiang7/pen/QWOmmyN
      units.style.transform = `translateY(-${numHeight * unitsNum}px)`;
      tens.style.transform = `translateY(-${numHeight * tensNum}px)`;
    });
  }
  return (
    <div className="container">
      <section className="digs hours">
        <div className="dig" id="hours-tens">
          <span className="highlight"></span>
        </div>
        <div className="dig" id="hours-units">
          <span className="highlight"></span>
        </div>
      </section>
      <div style={colonStyle}>:</div>
      <section className="digs mins">
        <div className="dig" id="mins-tens">
          <span className="highlight"></span>
        </div>
        <div className="dig" id="mins-units">
          <span className="highlight"></span>
        </div>
      </section>
      <div style={colonStyle}>:</div>
      <section className="digs secs">
        <div className="dig" id="secs-tens">
          <span className="highlight"></span>
        </div>
        <div className="dig" id="secs-units">
          <span className="highlight"></span>
        </div>
      </section>
    </div>
  );
}

export default Clock;
