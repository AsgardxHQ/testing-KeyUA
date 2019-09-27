let slider = tns({
  container: ".slick",
  items: 2,
  controls: false,
  navPosition: "bottom",
  mouseDrag: true,
  responsive: {
    789: {
      edgePadding: 20,
      gutter: 20,
      items: 2
    },
    414: {
      items: 1
    }
  }
});

Vue.filter('two_digits', function (value) {
    if(value.toString().length <= 1)
    {
        return "0"+value.toString();
    }
    return value.toString();
});

var app = new Vue({
  el: "#app",
  computed:{
    seconds() {
        return (this.date - this.now) % 60;
    },

    minutes() {
        return Math.trunc((this.date - this.now) / 60) % 60;
    },

    hours() {
        return Math.trunc((this.date - this.now) / 60 / 60) % 24;
    },

    days() {
        return Math.trunc((this.date - this.now) / 60 / 60 / 24);
    }
  },
  created(){
    window.setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000);
    },1000);
  },
  data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000),
      date : Math.trunc((new Date().getTime() / 1000 + 172800)),
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
      this.form = clearForm();
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
    
  }
});

function clearForm(){
  return {
    card: {data: null, err: false},
    month: {data: "Month", err: false},
    year: {data: "Year", err: false},
    firstName: {data:null, err:false},
    lastName: {data:null, err:false},
  }
}
