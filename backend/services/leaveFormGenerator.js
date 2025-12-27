const fs = require("fs");
const path = require("path");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

module.exports = async function generateLeaveForm(data) {
  const filePath = path.join(__dirname, "../templates/LeaveApplicationForm.pdf");

  const existingPdf = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(existingPdf);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.getPages()[0];

  const draw = (text, x, y, size = 10) => {
    page.drawText(text || "", {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  };

  // 🧩 Field Mapping (initial calibration)
  draw(data.date, 50, 758);
  draw(data.applicantName, 130, 740);
  draw(data.employeeId, 400, 740);
  draw(data.designation, 130, 722);
  draw(data.department, 400, 722);

  draw(data.leaveDays, 164, 688);
  draw(data.leaveFrom, 260, 688);
  draw(data.leaveTo, 420, 688);

  draw(data.station, 120, 570);
  draw(data.contact, 120, 545);
  draw(data.personInCharge, 120, 520);
  draw(data.reportingTo, 120, 495);

  draw(data.reason, 120, 455);

  return await pdfDoc.save();
};
