const omise = require("omise")({
  secretKey: process.env.OMISE_SECRET_KEY
});

exports.createCus = async (req, res, next) => {
  try {
    // omise.customers.destroy(
    //   "cust_test_5uwcrjmv2xcf0ouskld",
    //   function (error, customer) {
    //     /* Response. */
    //   }
    // );

    // console.log(req.body);
    let cusId = "";
    await omise.customers.create(
      {
        description: "full test (id:2)",
        email: "b@ga.com",
        card: req.body.token
      },
      function (error, customer) {
        console.log("err", error, "cust", customer);
        cusId = customer.id;
        // console.log(cusId);
      }
    );

    function addOneYear(date) {
      const dateCopy = new Date(date);
      dateCopy.setFullYear(dateCopy.getFullYear() + 1);
      return dateCopy;
    }
    const date = new Date();
    const enddate = addOneYear(date);
    let chartOnDate = date.getDate();
    // console.log(chartOnDate);
    // console.log(date, enddate);
    await omise.schedules.create(
      {
        every: 3,
        period: "month",
        start_date: date,
        end_date: enddate,
        on: {
          days_of_month: [chartOnDate]
        },
        charge: {
          customer: cusId,
          amount: 1234562,
          description: "MemberrShip feee"
        }
      },
      function (error, schedule) {
        console.log("errr", error, "succc", schedule);
      }
    );
    res.status(200).json("dfkjh");
  } catch (err) {
    console.log(err);
  }
};
