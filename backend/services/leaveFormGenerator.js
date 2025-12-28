const fs = require("fs");
const path = require("path");
const fontkit = require("@pdf-lib/fontkit");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

module.exports = async function generateLeaveForm(data) {
  const filePath = path.join(__dirname, "../templates/LeaveApplicationForm.pdf");
  const fontPath = path.join(__dirname, "../fonts/DejaVuSans.ttf");

  const existingPdf = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(existingPdf);

  // ✅ REQUIRED for custom fonts
  pdfDoc.registerFontkit(fontkit);

  // Standard font for normal text
  const textFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Unicode font for ✓
  const tickFontBytes = fs.readFileSync(fontPath);
  const tickFont = await pdfDoc.embedFont(tickFontBytes);

  const page = pdfDoc.getPages()[0];

  const draw = (text, x, y, size = 10) => {
    page.drawText(text || "", {
      x,
      y,
      size,
      font: textFont,
      color: rgb(0, 0, 0),
    });
  };

  // ✅ Real tick sign
  const tick = (x, y) => {
  page.drawText("✓", {
    x,
    y,
    size: 40,          // VERY BIG
    font: tickFont,
    color: rgb(1, 0, 0), // RED
  });
};

  // ---------------- TEXT FIELDS ----------------
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

  // ---------------- CHECKBOXES ----------------

// Half day
if (data.halfDay === "Required") {
  tick(260, 665);
}

if (data.halfDay === "Not Required") {
  tick(380, 665);
}

// Half day type
if (data.halfDayType === "First Half") {
  tick(260, 645);
}

if (data.halfDayType === "Second Half") {
  tick(380, 645);
}

// Leave type
switch (data.leaveType) {
  case "Casual":
    tick(130, 620);
    break;
  case "Sick":
    tick(220, 620);
    break;
  case "Annual":
    tick(300, 620);
    break;
  case "Replacement":
    tick(400, 620);
    break;
}


  return await pdfDoc.save();
};
