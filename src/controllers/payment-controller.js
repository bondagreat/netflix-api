// const cron = require('node-cron');
const { Transaction, User } = require('../models');
const omise = require('omise')({
  secretKey: process.env.OMISE_SECRET_KEY,
});

exports.createCus = async (req, res, next) => {
  try {
    // omise.customers.destroy(
    //   "cust_test_5uwcrjmv2xcf0ouskld",
    //   function (error, customer) {
    //     /* Response. */
    //   }
    // );

    // console.log('body', req.body);
    // console.log('user', req.user);
    let cusId = '';
    await omise.customers.create(
      {
        description: 'user id:' + req.user.id,
        email: req.user.email,
        card: req.body.token,
      },
      function (error, customer) {
        console.log('err', error, 'cust', customer);
        cusId = customer.id;
        // console.log(cusId);
      }
    );

    function addThreeYear(date) {
      const dateCopy = new Date(date);
      dateCopy.setFullYear(dateCopy.getFullYear() + 3);
      return dateCopy;
    }
    const date = new Date();
    const enddate = addThreeYear(date);
    let chartOnDate = date.getDate();
    // console.log(chartOnDate);
    // console.log(date, enddate);
    await omise.schedules.create(
      {
        every: req.body.period,
        period: 'month',
        start_date: date,
        end_date: enddate,
        on: {
          days_of_month: [chartOnDate],
        },
        charge: {
          customer: cusId,
          amount: req.body.price,
          description: 'MemberrShip feee',
        },
      },
      function (error, schedule) {
        console.log('errr', error, 'succc', schedule);
        if (schedule) {
          Transaction.create({
            paymentId: cusId,
            start: schedule.charge.created_at,
            end: schedule.charge.created_at,
            packageId: req.body.plan,
            userId: req.user.id,
          });
          User.update({ isActive: 1 }, { where: { id: req.user.id } });
        }
        return;
      }
    );
    // send req to omise for check customer schedules list
    await omise.customers.schedules(cusId, function (error, schedules) {
      console.dir('get sche', schedules);
    });
    // const checkPayment = cron.schedule('*/10 * * * *', async () => {
    //   console.log('running a task every ten minutes');
    //   // await Transaction.create();
    // });
    res.status(200).json('dfkjh');
  } catch (err) {
    console.log(err);
  }
};
