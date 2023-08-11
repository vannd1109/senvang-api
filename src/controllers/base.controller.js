const db = require("../models");
const Base = db.base;

let rp = require("request-promise");
const { DBConnectionMFAssets } = require("../connection/conn");

exports.getDataFromBase = (req, res) => {
  try {
    const body = req.body;

    const { url, access_token } = body;

    const options = {
      uri: url,
      qs: {
        access_token: access_token,
      },
      headers: {
        "User-Agent": "Request-Promise",
      },
      json: true,
    };

    rp(options)
      .then(async (result) => {
        const connMFAssets = await new DBConnectionMFAssets().getConnection();

        const employeeList = result.employees;

        employeeList.forEach(async (employee) => {
          await connMFAssets
            .request()
            .query(
              `
            BEGIN
            IF NOT EXISTS (SELECT * FROM hr_base_employee 
                            WHERE userID = '${employee.code}')
            BEGIN
            INSERT INTO hr_base_employee (userID, metatype, first_name, last_name, full_name, title, address, ssn, marital, pob, nationality, 
              permanent_residence, note, insurance_enrollment_id, tax_enrollment_id, is_primary, 
              user_id, email, gender, phone, dob_day, dob_month, dob_year, tax_id, insurance_id,
              bank_number, bank_name, bank_branch, bank_holder, basic_salary, salary, team_id,
              timesheet_id, office_id, employee_type_id, area_id, position_id, payroll_policy_id, is_terminated, terminated_date, start_date, official_start_date)
              VALUES (N'${employee.code}', N'${employee.metatype}', N'${
                employee.first_name
              }', N'${employee.last_name}', N'${employee.name}', N'${
                employee.title
              }',
              N'${employee.profile.address || "null"}', N'${
                employee.profile.ssn || "null"
              }', N'${employee.profile.marital || "null"}', N'${
                employee.profile.pob || "null"
              }', N'${employee.profile.nationality || "null"}', N'${
                employee.profile.permanent_residence || "null"
              }',
              N'${employee.profile.note || "null"}', N'${
                employee.profile.insurance_enrollment_id || "null"
              }', N'${employee.profile.tax_enrollment_id || "null"}', N'${
                employee.is_primary || "null"
              }', N'${employee.user_id || "null"}', N'${
                employee.email || "null"
              }',
              N'${employee.gender}', N'${employee.phone}', N'${
                employee.dob_day
              }', N'${employee.dob_month}', N'${employee.dob_year}', N'${
                employee.tax_id
              }',
              N'${employee.insurance_id}', N'${
                employee.bank.number || "null"
              }', N'${employee.bank.name || "null"}', N'${
                employee.bank.branch || "null"
              }', N'${employee.bank.holder || "null"}', N'${
                employee.basic_salary || "null"
              }',
              N'${employee.salary}', N'${employee.team_id}', N'${
                employee.timesheet_id
              }', N'${employee.office_id}', N'${
                employee.employee_type_id
              }', N'${employee.area_id}',
              N'${employee.position_id}', N'${employee.payroll_policy_id}', N'${
                employee.is_terminated
              }', N'${employee.terminated_date}', N'${
                employee.start_date
              }', N'${employee.official_start_date}')
              END
            END
              `
            );
        });
        res.send({
          message: "Lấy dữ liệu thành công và lưu vào cơ sở dữ liệu!",
        });
        connProduction.close();
      })
      .catch(function (err) {
        // API call failed...
      });
  } catch (error) {
    console.log(error.message);
  }
};
