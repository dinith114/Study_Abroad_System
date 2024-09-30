const FinancialModel = require("../models/FinancialModel");

const createFinancialRecord = async (req, res) => {
  try {
    const { date, amount, type, description } = req.body;

    const newRecord = new FinancialModel({
      date,
      amount,
      type,
      description,
    });

    const result = await newRecord.save();
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const editFinancialRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = {
      date: req.body.date,
      amount: req.body.amount,
      type: req.body.type,
      description: req.body.description,
    };

    const result = await FinancialModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Record not found!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteFinancialRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await FinancialModel.findByIdAndDelete(id);
    if (result) {
      res.status(200).send("Record deleted successfully");
    } else {
      res.status(404).send("Record not found!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const viewFinancialRecords = async (req, res) => {
  try {
    // Optional: Add pagination or filtering logic if needed
    const records = await FinancialModel.find({});
    res.status(200).json(records);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const viewOneFinancialRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await FinancialModel.findById(id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).send("Record not found!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const calculateMonthlyTotals = async (req, res) => {
  try {
    const { year } = req.params;
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    console.log(`Filtering data from ${startDate} to ${endDate}`);

    const results = await FinancialModel.aggregate([
      // Step 1: Convert date and trim type field
      {
        $addFields: {
          date: { $dateFromString: { dateString: "$date" } }, // Ensure date is in valid format
          trimmedType: { $trim: { input: "$type" } }, // Trim spaces in type field
        },
      },
      // Step 2: Match documents within the year range
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      // Step 3: Group by month and type (income/expense)
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            type: { $toLower: "$trimmedType" },
          }, // Use lowercase for consistent matching
          totalAmount: { $sum: "$amount" }, // Use amount as Number, no need for $toDouble
        },
      },
      // Step 4: Group by month and calculate total income and expenses
      {
        $group: {
          _id: "$_id.month",
          income: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "income"] }, "$totalAmount", 0], // Compare lowercase 'income'
            },
          },
          expenses: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "expense"] }, "$totalAmount", 0], // Compare lowercase 'expense'
            },
          },
        },
      },
      // Step 5: Project the required fields
      {
        $project: {
          _id: 0,
          month: "$_id",
          income: 1,
          expenses: 1,
          profit: { $subtract: ["$income", "$expenses"] }, // Profit = income - expenses
        },
      },
      // Step 6: Sort by month
      {
        $sort: { month: 1 },
      },
    ]);

    console.log("Aggregation results:", results);

    // Step 7: Format the result with month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedResults = results.map((result) => ({
      month: monthNames[result.month - 1],
      income: result.income,
      expense: result.expenses,
      profit: result.profit,
    }));

    // Send the final response
    res.status(200).json(formattedResults);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const calculateYearlyTotals = async (req, res) => {
  try {
    const { year } = req.params;

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    console.log(`Filtering data from ${startDate} to ${endDate}`);

    const results = await FinancialModel.aggregate([
      // Step 1: Convert date and trim type field
      {
        $addFields: {
          date: { $dateFromString: { dateString: "$date" } },
          trimmedType: { $trim: { input: "$type" } }, // Trim spaces in type field
        },
      },
      // Step 2: Match documents within the year range
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      // Step 3: Group by type (income/expense)
      {
        $group: {
          _id: { $toLower: "$trimmedType" }, // Use lowercase for consistent matching
          totalAmount: { $sum: "$amount" }, // Use amount as Number, no need for $toDouble
        },
      },
      // Step 4: Project the type and total amount
      {
        $project: {
          _id: 0,
          type: "$_id",
          totalAmount: 1,
        },
      },
    ]);

    console.log("Aggregation results:", results);

    // Step 5: Extract income, expenses, and calculate profit
    const income = results.find((r) => r.type === "income")?.totalAmount || 0; // Compare lowercase 'income'
    const expenses =
      results.find((r) => r.type === "expense")?.totalAmount || 0; // Compare lowercase 'expense'
    const profit = income - expenses;

    // Step 6: Format the response
    const response = {
      year,
      income,
      expense: expenses,
      profit,
    };

    // Step 7: Send the response
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createFinancialRecord,
  editFinancialRecord,
  deleteFinancialRecord,
  viewFinancialRecords,
  calculateMonthlyTotals,
  calculateYearlyTotals,
  viewOneFinancialRecord,
};
