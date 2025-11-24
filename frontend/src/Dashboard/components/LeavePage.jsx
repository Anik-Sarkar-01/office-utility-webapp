import React from 'react';
import { Form, Input, Checkbox, Row, Col } from 'antd';
import './LeavePage.css';
import durontoLogo from "../../images/logo2.png"

const LeavePage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div className="leave-form-wrapper">
      {/* OFFICE COPY */}
      <div className="leave-form-container">
        {/* Header */}
        <div className="form-header">
          <div className="company-logo">Renaissance</div>
          <div className="company-info">
            <div className="company-name">Barind Media Ltd.</div>
            <div>Ahmed Tower, 28 & 30, Kemal Ataturk Avenue</div>
            <div>Banani, Dhaka 1213, Bangladesh</div>
          </div>
          <div className="logo-box">
            <img src={durontoLogo} alt="" />
          </div>
        </div>

        <div className="form-title-section">
          <div className="form-title-box">Leave Application Form</div>
          <div className="copy-label">Office copy</div>
        </div>

        <Form form={form} onFinish={onFinish} className="leave-form">
          {/* Basic Info Row */}
          <table className="form-table">
            <tbody>
              <tr>
                <td className="label-cell">Applicant Name :</td>
                <td>
                  <Input bordered={false} className="form-input" />
                </td>
                <td className="label-cell">Employee ID :</td>
                <td>
                  <Input bordered={false} className="form-input" />
                </td>
              </tr>
              <tr>
                <td className="label-cell">Designation :</td>
                <td>
                  <Input bordered={false} className="form-input" />
                </td>
                <td className="label-cell">Department :</td>
                <td>
                  <Input bordered={false} className="form-input" />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Details of Requesting Leave */}
          <div className="section-header">Details of Requesting Leave</div>

          <table className="form-table details-table">
            <tbody>
              <tr>
                <td rowSpan={3} className="label-cell" style={{width: '15%'}}>No. of Day(s)</td>
                <td rowSpan={3} style={{width: '12%', textAlign: 'center'}}>
                  <Input bordered={false} className="form-input center-input" />
                  <div className="sub-label">day(s)</div>
                </td>
                <td className="label-cell" style={{width: '10%'}}>From:</td>
                <td style={{width: '23%'}}>
                  <Input bordered={false} className="form-input" />
                </td>
                <td className="label-cell" style={{width: '10%'}}>To:</td>
                <td style={{width: '30%'}}>
                  <Input bordered={false} className="form-input" />
                </td>
              </tr>
              <tr>
                <td className="checkbox-cell">
                  <Checkbox /> Morning
                </td>
                <td></td>
                <td className="checkbox-cell">
                  <Checkbox /> Evening
                </td>
                <td></td>
              </tr>
              <tr>
                <td className="checkbox-cell">
                  <Checkbox defaultChecked /> Sick
                </td>
                <td className="checkbox-cell">
                  <Checkbox /> Annual
                </td>
                <td className="checkbox-cell">
                  <Checkbox /> Replacement
                </td>
                <td className="checkbox-cell">
                  <Checkbox /> Without Pay
                </td>
              </tr>
            </tbody>
          </table>

          <table className="form-table">
            <tbody>
              <tr>
                <td className="label-cell" style={{width: '20%'}}>If Half Day</td>
                <td className="checkbox-cell">
                   Not Required <Checkbox />
                </td>
                <td className="checkbox-cell">
                   Morning <Checkbox />
                </td>
                <td className="checkbox-cell">
                   Evening <Checkbox />
                </td>
                <td className="checkbox-cell"></td>
                <td className="checkbox-cell"></td>
              </tr>
              <tr>
                <td className="label-cell">Leave Type</td>
                <td className="checkbox-cell">
                   Casual <Checkbox />
                </td>
                <td className="checkbox-cell">
                   Sick <Checkbox />
                </td>
                <td className="checkbox-cell">
                   Annual <Checkbox />
                </td>
                <td className="checkbox-cell">
                   Replacement <Checkbox />
                </td>
                <td className="checkbox-cell">
                   Without Pay <Checkbox />
                </td>
              </tr>
              <tr>
                <td className="label-cell">Available Leave</td>
                <td>
                  <Input bordered={false} className="form-input" /> day(s)
                </td>
                <td>
                  <Input bordered={false} className="form-input" /> day(s)
                </td>
                <td>
                  <Input bordered={false} className="form-input" /> day(s)
                </td>
                <td className="checkbox-cell">
                   <Input bordered={false} className="form-input" /> day(s)
                </td>
                <td className="checkbox-cell">
                  <Input bordered={false} className="form-input" /> day(s)
                </td>
              </tr>
              <tr>
                <td className="label-cell">Station<br/>(During Leave) :</td>
                <td colSpan={2}>
                  <Input bordered={false} className="form-input" />
                </td>
                <td className="label-cell">Contact<br/>(During Leave) :</td>
                <td colSpan={2}>
                  <Input bordered={false} className="form-input" />
                </td>
              </tr>
              <tr>
                <td className="label-cell" style={{verticalAlign: 'top'}}>Person In-Charge<br/>(During My Leave) :</td>
                <td colSpan={5}>
                  <Input bordered={false} className="form-input" />
                  <div className="signature-line">Signature</div>
                </td>
              </tr>
              <tr>
                <td className="label-cell">Reporting To :</td>
                <td colSpan={5}>
                  <Input bordered={false} className="form-input" />
                  <div className="signature-line">Signature</div>
                </td>
              </tr>
              <tr>
                <td className="label-cell" style={{verticalAlign: 'top'}}>Reason of Leave :</td>
                <td colSpan={5}>
                  <Input.TextArea bordered={false} rows={3} className="form-textarea" />
                  <div className="signature-section">
                    <div className='applicant-signature-line'>Applicant's Signature <br /> Date</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Approval Section */}
          <table className="form-table approval-table">
            <tbody>
              <tr>
                <td className="approval-cell">
                  <div className="approval-title">Approved by Departmental Head</div>
                  <div className="approval-space"></div>
                  <div className="approval-date">Date:</div>
                </td>
                <td className="approval-cell">
                  <div className="approval-title">Approved by Final Authority</div>
                  <div className="approval-space"></div>
                  <div className="approval-date">Date:</div>
                </td>
                <td className="approval-cell">
                  <div className="approval-title">Endorsed by HR Department</div>
                  <div className="approval-space"></div>
                  <div className="approval-date">Date:</div>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </div>

      {/* APPLICANT COPY */}
      <div className="leave-form-container" style={{marginTop: '40px'}}>
        <div className="form-header">
          <div className="company-logo">Renaissance</div>
          <div className="company-info">
            <div className="company-name">Barind Media Ltd.</div>
            <div>Ahmed Tower, 28 & 30, Kemal Ataturk Avenue</div>
            <div>Banani, Dhaka 1213, Bangladesh</div>
          </div>
          <div className="logo-box">
            <img src={durontoLogo} alt="" />
          </div>
        </div>

        <div className="form-title-section">
          <div className="form-title-box">Leave Application Form</div>
          <div className="copy-label">Applicant copy</div>
        </div>

        <table className="form-table">
          <tbody>
            <tr>
              <td className="label-cell" style={{width: '15%'}}>Date:</td>
              <td style={{width: '35%'}}>
                <Input bordered={false} className="form-input" />
              </td>
              <td className="label-cell" style={{width: '20%'}}>Employee ID :</td>
              <td style={{width: '30%'}}>
                <Input bordered={false} className="form-input" />
              </td>
            </tr>
            <tr>
              <td className="label-cell">Applicant Name :</td>
              <td>
                <Input bordered={false} className="form-input" />
              </td>
              <td className="label-cell">Department :</td>
              <td>
                <Input bordered={false} className="form-input" />
              </td>
            </tr>
            <tr>
              <td className="label-cell">Designation :</td>
              <td colSpan={3}>
                <Input bordered={false} className="form-input" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="section-header">Details of Requesting Leave</div>

        <table className="form-table details-table">
          <tbody>
            <tr>
              <td rowSpan={3} className="label-cell" style={{width: '15%'}}>No. of Day(s)</td>
              <td rowSpan={3} style={{width: '12%', textAlign: 'center'}}>
                <Input bordered={false} className="form-input center-input" />
                <div className="sub-label">day(s)</div>
              </td>
              <td className="label-cell" style={{width: '10%'}}>From:</td>
              <td style={{width: '23%'}}>
                <Input bordered={false} className="form-input" />
              </td>
              <td className="label-cell" style={{width: '10%'}}>To:</td>
              <td style={{width: '30%'}}>
                <Input bordered={false} className="form-input" />
              </td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox /> Morning
              </td>
              <td></td>
              <td className="checkbox-cell">
                <Checkbox /> Evening
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="checkbox-cell">
                <Checkbox /> Sick
              </td>
              <td className="checkbox-cell">
                <Checkbox /> Annual
              </td>
              <td className="checkbox-cell">
                <Checkbox /> Replacement
              </td>
              <td className="checkbox-cell">
                <Checkbox /> Without Pay
              </td>
            </tr>
          </tbody>
        </table>

        <table className="form-table">
          <tbody>
            <tr>
              <td className="label-cell" style={{width: '15%'}}>If Half Day</td>
              <td style={{width: '12%'}}>
                <Checkbox defaultChecked /> Not Required
              </td>
              <td style={{width: '10%', textAlign: 'center'}}>
                <Input bordered={false} className="form-input small-input" defaultValue="0" />
                <div className="sub-label">day(s)</div>
              </td>
              <td style={{width: '23%'}}></td>
              <td style={{width: '10%', textAlign: 'center'}}>
                <Input bordered={false} className="form-input small-input" defaultValue="0" />
                <div className="sub-label">days</div>
              </td>
              <td style={{width: '30%'}}></td>
            </tr>
            <tr>
              <td className="label-cell">Leave Type</td>
              <td className="checkbox-cell">
                <Checkbox /> Casual
              </td>
              <td style={{textAlign: 'center'}}>
                <Input bordered={false} className="form-input small-input" defaultValue="0" />
                <div className="sub-label">day(s)</div>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="label-cell">Available Leave</td>
              <td style={{textAlign: 'center'}}>
                <Input bordered={false} className="form-input small-input" defaultValue="0" />
                <div className="sub-label">day(s)</div>
              </td>
              <td colSpan={4} className="endorsement-section">
                <div className="endorsed-text">Endorsed by HR Department</div>
                <div className="name-field">
                  <div>Name:</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="footer-info">
          <div>Date:</div>
          <div className="issue-info">
            <div>Issue Date: July 27, 2021</div>
            <div>Ref.: BML/HRF/V1/010/21</div>
          </div>
          <div className="form-type">
            <div>LAF</div>
            <div>HR Form of BML</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeavePage;