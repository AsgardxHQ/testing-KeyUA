let slider = tns({
  container: ".slick",
  items: 2,
  controls: false,
  navPosition: "bottom",
  mouseDrag: true
});
Element.prototype.asTimer = function(obj) {
  let seconds = obj.seconds;
  let asInterval = setInterval(timer, 1000);
  let _this = this;
  function timer() {
    let days = Math.floor(seconds / 24 / 60 / 60);
    let hoursLeft = Math.floor(seconds - days * 86400);
    let hours = Math.floor(hoursLeft / 3600);
    let minutesLeft = Math.floor(hoursLeft - hours * 3600);
    let minutes = Math.floor(minutesLeft / 60);
    let remainingSeconds = seconds % 60;

    let ref_days = declOfNum(["D", "D", "D"])(days);
    let ref_hours = declOfNum(["h", "h", "h"])(hours);
    let ref_minutes = declOfNum(["m", "m", "m"])(minutes);
    let ref_seconds = declOfNum(["s", "s", "s"])(remainingSeconds);

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (remainingSeconds < 10) {
      remainingSeconds = "0" + remainingSeconds;
    }
    if (days != 0) {
      _this.querySelector(".days").innerText = days;
      _this.querySelector(".days_ref").innerText = ref_days;
    } else {
      _this.querySelector(".days").innerText = "";
      _this.querySelector(".days_ref").innerText = "";
    }
    _this.querySelector(".hours").innerText = hours;
    _this.querySelector(".minutes").innerText = minutes;
    _this.querySelector(".seconds").innerText = remainingSeconds;

    _this.querySelector(".hours_ref").innerText = ref_hours;
    _this.querySelector(".minutes_ref").innerText = ref_minutes;
    _this.querySelector(".seconds_ref").innerText = ref_seconds;
    if (seconds == 0) {
      clearInterval(asInterval);
      document.getElementById("countdown").innerHTML = "Completed";
    } else {
      seconds--;
    }
  }
};

let declOfNum = (function() {
  let cases = [2, 0, 1, 1, 1, 2];
  let declOfNumSubFunction = function(titles, number) {
    number = Math.abs(number);
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };
  return function(_titles) {
    if (arguments.length === 1) {
      return function(_number) {
        return declOfNumSubFunction(_titles, _number);
      };
    } else {
      return declOfNumSubFunction.apply(null, arguments);
    }
  };
})();

var app = new Vue({
  el: "#app",
  data() {
    return {
      currentItem: null,
      show: true,
      items: [{
        id: 0,
        image: "https://img.icons8.com/dusk/64/000000/low-price.png",
        name: "Trial",
        another_name: "The first week only for",
        price: "$0.99",
        desc: "Rebills at $8.99 per month after your trial is completed.",
        special: true,
        special_text: "LIMITED SUMMER OFFER",
        timer: true
      },{
        id: 1,
        image: "https://img.icons8.com/dusk/64/000000/expensive-2.png",
        name: "Annual plan",
        another_name: "",
        price: "$39.00 / year",
        desc: "Your premium plan will auto-renew. Cencel any time.",
        special: false,
        special_text: "",
        tymer: false
      }],
      form : {
        card: {data: null, err: null},
        month: {data: "Month", err: null},
        year: {data: "Year", err: null},
        firstName: {data:null, err:null},
        lastName: {data:null, err:null},
      }
    };
  },
  methods: {
    changePayment(i) {
      let item = this.items.filter(item => item.id === i);
      this.show = !this.show;
      this.currentItem = item[0];
    },
    returnStep(){
      this.currentItem = null;
      this.show = !this.show;
    },
    sendForm(){
      if(this.form.card.data === null || this.form.card.data.length < 12) this.form.card.err = true;
      else this.form.card.err = false;
      if(this.form.month.data === null || this.form.month.data === "Month") this.form.month.err = true;
      else this.form.month.err = false;
      if(this.form.year.data === null && this.form.year.data === "Year") this.form.year.err = true;
      else this.form.year.err = false;
      if(this.form.firstName.data === null) this.form.firstName.err = true;
      else this.form.firstName.err = false;
      if(this.form.lastName.data === null) this.form.lastName.err = true;
      else this.form.lastName.err = false;
      let flag = true;
      for(let key in this.form){
        if(!this.form[key].err) flag = false;
      }
      if(flag){
        alert("Send to server!");
      }
    }
  },
  mounted() {
    document.querySelector(".countdown").asTimer({
      seconds: 172800
    });
  }
});

function clearForm(){
  return {
    card: {data: null, err: null},
    month: {data: "Month", err: null},
    year: {data: "Year", err: null},
    firstName: {data:null, err:null},
    lastName: {data:null, err:null},
  }
}
